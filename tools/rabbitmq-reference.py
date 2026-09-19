"""Disposable RabbitMQ 4.0 reference server using extracted Ubuntu packages.
No installation, user creation, global config edits or service registration.
Prints READY JSON; one input line or stdin EOF stops and removes the instance.
"""
from pathlib import Path
import base64, hashlib, json, os, shlex, signal, socket, subprocess, sys, tempfile, time

root = Path(sys.argv[1]).resolve()
authentication = '--auth' in sys.argv[2:]
oauth = '--oauth' in sys.argv[2:]
if authentication and oauth: raise ValueError('Choose one broker test profile')
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
    auth_files = {}
    if authentication:
        def openssl(*args):
            subprocess.run(['openssl',*map(str,args)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        ca, ca_key = base/'ca.pem', base/'ca.key'
        openssl('req','-x509','-newkey','rsa:2048','-nodes','-keyout',ca_key,'-out',ca,'-days','1','-subj','/CN=AMQP disposable test CA','-addext','basicConstraints=critical,CA:TRUE')
        def issue(stem,cn,usage,serial):
            private,request,certificate,extensions=[base/(stem+suffix) for suffix in ['.key','.csr','.pem','.ext']]
            openssl('req','-new','-newkey','rsa:2048','-nodes','-keyout',private,'-out',request,'-subj','/CN='+cn)
            extensions.write_text('basicConstraints=critical,CA:FALSE\nkeyUsage=digitalSignature,keyEncipherment\nextendedKeyUsage='+usage+'\n'+('subjectAltName=DNS:localhost\n' if usage=='serverAuth' else ''))
            openssl('x509','-req','-in',request,'-CA',ca,'-CAkey',ca_key,'-set_serial',serial,'-out',certificate,'-days','1','-extfile',extensions)
            return certificate,private
        cert,key=issue('server','localhost','serverAuth',1)
        client,client_key=issue('client','demo','clientAuth',2)
        unknown,unknown_key=issue('unknown','no-such-user','clientAuth',3)
        rogue,rogue_key=base/'rogue.pem',base/'rogue.key'
        openssl('req','-x509','-newkey','rsa:2048','-nodes','-keyout',rogue_key,'-out',rogue,'-days','1','-subj','/CN=demo','-addext','extendedKeyUsage=clientAuth')
        auth_files={name:base64.b64encode(path.read_bytes()).decode() for name,path in {'ca':ca,'clientCert':client,'clientKey':client_key,'unknownCert':unknown,'unknownKey':unknown_key,'rogueCert':rogue,'rogueKey':rogue_key}.items()}
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
    if authentication:
        config.write_text(config.read_text().replace('ssl_options.verify = verify_none','ssl_options.verify = verify_peer')+f'\nssl_options.cacertfile = {ca}\nssl_cert_login_from = common_name\nauth_mechanisms.1 = EXTERNAL\nauth_mechanisms.2 = AMQPLAIN\nauth_mechanisms.3 = PLAIN\n')
    oauth_files = {}
    if oauth:
        signing_key, public_key = base/'oauth.key', base/'oauth.pub'
        subprocess.run(['openssl','genpkey','-algorithm','RSA','-pkeyopt','rsa_keygen_bits:2048','-out',str(signing_key)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        subprocess.run(['openssl','pkey','-in',str(signing_key),'-pubout','-out',str(public_key)],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
        config.write_text(config.read_text()+f'\nauth_backends.1 = oauth2\nauth_mechanisms.1 = PLAIN\nauth_oauth2.resource_server_id = localreview\nauth_oauth2.signing_keys.local-test = {public_key}\nauth_oauth2.default_key = local-test\nauth_oauth2.algorithms.1 = RS256\n')
        oauth_files={'signingKey':base64.b64encode(signing_key.read_bytes()).decode(),'publicKey':base64.b64encode(public_key.read_bytes()).decode()}
    (base/'enabled_plugins').write_text('[rabbitmq_auth_backend_oauth2].\n' if oauth else '[rabbitmq_auth_mechanism_ssl].\n' if authentication else '[].\n')
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
        print('READY '+json.dumps({'port':port,'tlsPort':tls_port,'certificate':base64.b64encode(cert.read_bytes()).decode(),'packages':hashes,'authentication':auth_files,'oauth':oauth_files}),flush=True)
        sys.stdin.readline()
    finally:
        stop(server); stop(epmd); log.close()
