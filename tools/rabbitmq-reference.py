"""Disposable RabbitMQ 4.0 reference server using extracted Ubuntu packages.
No installation, user creation, global config edits or service registration.
Prints READY JSON; one input line or stdin EOF stops and removes the instance.
"""
from pathlib import Path
import base64, hashlib, json, os, shlex, signal, socket, subprocess, sys, tempfile, time

root = Path(sys.argv[1]).resolve()
erlang = root/'usr/lib/erlang'
erts = next(erlang.glob('erts-*'))/'bin'
rabbit = (root/'usr/lib/rabbitmq/bin/rabbitmq-server').resolve()

def free_port():
    with socket.socket() as s:
        s.bind(('127.0.0.1', 0)); return s.getsockname()[1]

def stop(process):
    if process.poll() is None:
        os.killpg(process.pid, signal.SIGTERM)
        try: process.wait(timeout=8)
        except subprocess.TimeoutExpired:
            os.killpg(process.pid, signal.SIGKILL); process.wait(timeout=5)

with tempfile.TemporaryDirectory(prefix='moonbit-rabbitmq-') as directory:
    base = Path(directory)
    (base/'bin').mkdir()
    # Debian's erl shell script hardcodes /usr/lib/erlang. Point its unmodified
    # erlexec binary at the extracted runtime via the normal runtime variables.
    launcher = base/'bin/erl'
    launcher.write_text('#!/bin/sh\nexport ROOTDIR='+shlex.quote(str(erlang))+'\nexport BINDIR='+shlex.quote(str(erts))+'\nexport EMU=beam\nexport PROGNAME=erl\nexec '+shlex.quote(str(erts/'erlexec'))+' "$@"\n')
    launcher.chmod(0o700)
    cert, key = base/'cert.pem', base/'key.pem'
    subprocess.run(['openssl','req','-x509','-newkey','rsa:2048','-nodes','-keyout',str(key),'-out',str(cert),'-days','1','-subj','/CN=localhost','-addext','subjectAltName=DNS:localhost'],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    ports = set()
    while len(ports) < 4: ports.add(free_port())
    port, tls_port, dist_port, epmd_port = sorted(ports)
    config = base/'rabbitmq.conf'
    config.write_text(f'''listeners.tcp.1 = 127.0.0.1:{port}
listeners.ssl.1 = 127.0.0.1:{tls_port}
ssl_options.certfile = {cert}
ssl_options.keyfile = {key}
ssl_options.verify = verify_none
ssl_options.fail_if_no_peer_cert = false
default_user = demo
default_pass = test-only
loopback_users = none
heartbeat = 4
channel_max = 16
frame_max = 8192
distribution.listener.interface = 127.0.0.1
distribution.listener.port_range.min = {dist_port}
distribution.listener.port_range.max = {dist_port}
log.console = true
log.console.level = warning
log.file = false
''')
    (base/'enabled_plugins').write_text('[].\n')
    env = dict(os.environ)
    env.update(PATH=str(base/'bin')+':'+str(erts)+':'+env['PATH'],
        LD_LIBRARY_PATH=str(root/'usr/lib/x86_64-linux-gnu'),
        ERL_EPMD_PORT=str(epmd_port), ERL_EPMD_ADDRESS='127.0.0.1',
        RABBITMQ_NODENAME='codex_amqp_'+str(os.getpid())+'@localhost',
        RABBITMQ_CONF_ENV_FILE='/dev/null', RABBITMQ_CONFIG_FILE=str(config),
        RABBITMQ_ADVANCED_CONFIG_FILE=str(base/'absent.config'),
        RABBITMQ_MNESIA_BASE=str(base/'mnesia'), RABBITMQ_LOG_BASE=str(base/'logs'),
        RABBITMQ_PID_FILE=str(base/'rabbit.pid'), RABBITMQ_PLUGINS_EXPAND_DIR=str(base/'plugins'),
        RABBITMQ_ENABLED_PLUGINS_FILE=str(base/'enabled_plugins'),
        RABBITMQ_ERLANG_COOKIE='codex_local_reference_cookie_only',
        RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS='+S 2:2 +A 2 -start_epmd false')
    log = open(base/'launcher.log','w+')
    epmd = subprocess.Popen([str(erts/'epmd'),'-address','127.0.0.1','-port',str(epmd_port)],env=env,stdout=log,stderr=log,start_new_session=True)
    server = subprocess.Popen([str(rabbit)],env=env,stdout=log,stderr=log,start_new_session=True)
    try:
        ready = False
        for _ in range(300):
            if server.poll() is not None: break
            try:
                with socket.create_connection(('127.0.0.1',port),timeout=.1): pass
                with socket.create_connection(('127.0.0.1',tls_port),timeout=.1): pass
                ready = True; break
            except OSError: time.sleep(.1)
        if not ready:
            log.flush(); log.seek(0); raise RuntimeError('RabbitMQ startup failed: '+log.read()[-12000:])
        hashes = {p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in (root.parent/'packages').glob('*.deb')}
        print('READY '+json.dumps({'port':port,'tlsPort':tls_port,'certificate':base64.b64encode(cert.read_bytes()).decode(),'packages':hashes}),flush=True)
        sys.stdin.readline()
    finally:
        stop(server); stop(epmd); log.close()
