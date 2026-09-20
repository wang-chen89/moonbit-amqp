///|
/// Parsed AMQP address. No Debug/Show implementation: this contains credentials.
/// Parsing preserves values; the transport separately validates usable ranges.
pub struct URI {
  scheme : String
  host : String
  port : Int
  username : String
  password : String
  vhost : String
  cert_file : String
  ca_cert_file : String
  key_file : String
  server_name : String
  auth_mechanism : Array[String]
  heartbeat_seconds : Int64?
  connection_timeout : Int64
  channel_max : Int
}

///|
fn uri_hex(c : Byte) -> Int {
  let c = c.to_int()
  if c >= 48 && c <= 57 {
    c - 48
  } else if c >= 65 && c <= 70 {
    c - 55
  } else if c >= 97 && c <= 102 {
    c - 87
  } else {
    -1
  }
}

///|
fn uri_unreserved(c : Byte) -> Bool {
  (c >= b'A' && c <= b'Z') ||
  (c >= b'a' && c <= b'z') ||
  (c >= b'0' && c <= b'9') ||
  c == b'-' ||
  c == b'_' ||
  c == b'.' ||
  c == b'~'
}

///|
fn uri_host_byte(c : Byte) -> Bool {
  uri_unreserved(c) ||
  "!$&'()*+,;=:[]<>\"".contains(c.to_int().unsafe_to_char().to_string())
}

///|
// 0 path/user, 1 query, 2 host, 3 IPv6 zone.
fn uri_decode(text : String, mode : Int) -> String raise FrameError {
  let bytes = @utf8.encode(text)
  let out : Array[Byte] = []
  let mut i = 0
  while i < bytes.length() {
    let c = bytes[i]
    if c == b'%' {
      if i + 2 >= bytes.length() {
        raise Invalid("invalid URI escape")
      }
      let a = uri_hex(bytes[i + 1])
      let b = uri_hex(bytes[i + 2])
      if a < 0 || b < 0 {
        raise Invalid("invalid URI escape")
      }
      let value = ((a << 4) | b).to_byte()
      if (mode == 2 && value < 128 && value != b'%') ||
        (mode == 3 && value != b'%' && value != b' ' && !uri_host_byte(value)) {
        raise Invalid("invalid URI host escape")
      }
      out.push(value)
      i += 3
    } else {
      if mode >= 2 && c < 128 && !uri_host_byte(c) {
        raise Invalid("invalid URI host")
      }
      out.push(if mode == 1 && c == b'+' { b' ' } else { c })
      i += 1
    }
  }
  @utf8.decode(Bytes::from_array(out), ignore_bom=false) catch {
    _ => raise Invalid("invalid URI UTF-8")
  }
}

///|
fn uri_number(text : String, signed : Bool) -> Int64 raise FrameError {
  let bytes = @utf8.encode(text)
  let start = if signed &&
    bytes.length() > 0 &&
    (bytes[0] == b'+' || bytes[0] == b'-') {
    1
  } else {
    0
  }
  if start == bytes.length() {
    raise Invalid("invalid URI integer")
  }
  for i in start..<bytes.length() {
    if bytes[i] < b'0' || bytes[i] > b'9' {
      raise Invalid("invalid URI integer")
    }
  }
  @string.parse_int64(text[:], base=10) catch {
    _ => raise Invalid("URI integer out of range")
  }
}

///|
fn uri_ipv6(text : String) -> Bool {
  let address = match text.split_once("%") {
    Some((a, zone)) => if zone.is_empty() { return false } else { a.to_owned() }
    None => text
  }
  let halves = address.split("::").to_array()
  if halves.length() > 2 {
    return false
  }
  let groups : Array[String] = []
  for half in halves {
    if !half.is_empty() {
      for group in half.to_owned().split(":") {
        groups.push(group.to_owned())
      }
    }
  }
  let mut count = 0
  for i in 0..<groups.length() {
    let group = groups[i]
    if group.contains(".") {
      if i != groups.length() - 1 || !address.has_suffix(group[:]) {
        return false
      }
      let parts = group.split(".").to_array()
      if parts.length() != 4 {
        return false
      }
      for part in parts {
        if part.is_empty() ||
          part.length() > 3 ||
          (part.length() > 1 && part[0] == 48) {
          return false
        }
        let n = uri_number(part.to_owned(), false) catch { _ => return false }
        if n > 255 {
          return false
        }
      }
      count += 2
    } else {
      if group.is_empty() ||
        group.length() > 4 ||
        @utf8.encode(group).iter().any(c => uri_hex(c) < 0) {
        return false
      }
      count += 1
    }
  }
  if halves.length() == 2 {
    count < 8
  } else {
    count == 8
  }
}

///|
/// Pinned amqp091-go URI defaults and escaping, with strict UTF-8 and a 64 KiB limit.
/// Invalid query pairs are ignored, as in net/url.Values; unknown parameters are ignored.
/// Diagnostics deliberately never include the input URI or its credentials.
pub fn parse_uri(input : String) -> URI raise FrameError {
  if input.length() > 65536 || @utf8.encode(input).length() > 65536 {
    raise Invalid("URI exceeds 64 KiB")
  }
  if input.iter().any(c => c.to_int() <= 32 || c.to_int() == 127) {
    raise Invalid("invalid URI whitespace or control")
  }
  let (base, fragment) = match input.split_once("#") {
    Some((a, b)) => (a.to_owned(), b.to_owned())
    None => (input, "")
  }
  ignore(uri_decode(fragment, 0))
  let (address, query) = match base.split_once("?") {
    Some((a, b)) => (a.to_owned(), b.to_owned())
    None => (base, "")
  }
  let (scheme, rest) = match address.split_once(":") {
    Some((a, b)) => (a.to_lower().to_owned(), b.to_owned())
    None => raise Invalid("missing AMQP URI scheme")
  }
  if scheme != "amqp" && scheme != "amqps" {
    raise Invalid("invalid AMQP URI scheme")
  }
  let mut authority = ""
  let mut path = ""
  if rest.has_prefix("//") {
    let tail = rest[2:].to_owned()
    match tail.find("/") {
      Some(i) => {
        authority = tail[:i].to_owned()
        path = tail[i:].to_owned()
      }
      None => authority = tail
    }
  } else if rest.has_prefix("/") {
    path = rest
  }
  // Non-slash scheme:opaque has no path in Go's net/url parser.
  let mut host_port = authority
  let mut username = "guest"
  let mut password = "guest"
  match authority.rev_find("@") {
    Some(i) => {
      let user = authority[:i].to_owned()
      if @utf8.encode(user)
        .iter()
        .any(c => {
          !(uri_unreserved(c) ||
          "!$&'()*+,;=:%@".contains(c.to_int().unsafe_to_char().to_string()))
        }) {
        raise Invalid("invalid URI user information")
      }
      host_port = authority[i + 1:].to_owned()
      match user.split_once(":") {
        Some((a, b)) => {
          username = uri_decode(a.to_owned(), 0)
          password = uri_decode(b.to_owned(), 0)
        }
        None => username = uri_decode(user, 0)
      }
    }
    None => ()
  }
  let mut host = host_port
  let mut port_text = ""
  if host_port.has_prefix("[") {
    let end = match host_port.rev_find("]") {
      Some(i) => i
      None => raise Invalid("unclosed URI IP literal")
    }
    let suffix = host_port[end + 1:].to_owned()
    if !suffix.is_empty() {
      if !suffix.has_prefix(":") {
        raise Invalid("invalid URI port")
      }
      port_text = suffix[1:].to_owned()
    }
    let encoded = host_port[1:end].to_owned()
    host = match encoded.find("%25") {
      Some(i) =>
        uri_decode(encoded[:i].to_owned(), 2) +
        uri_decode(encoded[i:].to_owned(), 3)
      None => uri_decode(encoded, 2)
    }
    if !uri_ipv6(host) {
      raise Invalid("invalid URI IPv6 literal")
    }
  } else {
    match host_port.rev_find(":") {
      Some(i) => {
        host = host_port[:i].to_owned()
        port_text = host_port[i + 1:].to_owned()
      }
      None => ()
    }
    host = uri_decode(host, 2)
  }
  let mut port = if scheme == "amqps" { 5671 } else { 5672 }
  if !port_text.is_empty() {
    let number = uri_number(port_text, false)
    if number > 2147483647 {
      raise Invalid("URI port out of range")
    }
    port = number.to_int()
  }
  if host.is_empty() {
    host = "localhost"
  }
  let decoded_path = uri_decode(path, 0)
  let mut vhost = "/"
  if decoded_path.has_prefix("/") {
    let offset = if host_port.is_empty() && decoded_path.has_prefix("///") {
      3
    } else {
      1
    }
    if decoded_path.length() > offset {
      vhost = decoded_path[offset:].to_owned()
    }
  } else if !decoded_path.is_empty() {
    vhost = decoded_path
  }
  let values : Map[String, Array[String]] = Map([])
  for pair in query.split("&") {
    if pair.is_empty() || pair.contains(";") {
      continue
    }
    let (key, value) = match pair.to_owned().split_once("=") {
      Some((a, b)) => (a.to_owned(), b.to_owned())
      None => (pair.to_owned(), "")
    }
    try {
      let key = uri_decode(key, 1)
      let value = uri_decode(value, 1)
      match values.get(key) {
        Some(previous) => previous.push(value)
        None => values[key] = [value]
      }
    } catch {
      _ => ()
    }
  }
  fn first(key : String) -> String {
    match values.get(key) {
      Some(items) => items[0]
      None => ""
    }
  }
  let heartbeat_seconds = if values.contains("heartbeat") {
    Some(uri_number(first("heartbeat"), true))
  } else {
    None
  }
  let connection_timeout = if values.contains("connection_timeout") {
    uri_number(first("connection_timeout"), true)
  } else {
    0L
  }
  let channel_max = if values.contains("channel_max") {
    uri_number(first("channel_max"), false)
  } else {
    0L
  }
  if channel_max > 65535 {
    raise Invalid("URI channel_max out of range")
  }
  {
    scheme,
    host,
    port,
    username,
    password,
    vhost,
    cert_file: first("certfile"),
    ca_cert_file: first("cacertfile"),
    key_file: first("keyfile"),
    server_name: first("server_name_indication"),
    auth_mechanism: values.get("auth_mechanism").unwrap_or([]),
    heartbeat_seconds,
    connection_timeout,
    channel_max: channel_max.to_int(),
  }
}

///|
// 0 query component, 1 user info, 2 path fallback, 3 host.
fn uri_escape(text : String, mode : Int) -> String {
  let out = StringBuilder()
  let hex = b"0123456789ABCDEF"
  for c in @utf8.encode(text) {
    let literal = uri_unreserved(c) ||
      (mode == 1 && "$&+,;=".contains(c.to_int().unsafe_to_char().to_string())) ||
      (
        mode == 2 &&
        "$&+,/:;=@".contains(c.to_int().unsafe_to_char().to_string())
      ) ||
      (mode == 3 && uri_host_byte(c))
    if literal {
      out.write_char(c.to_int().unsafe_to_char())
    } else if mode == 0 && c == b' ' {
      out.write_char('+')
    } else {
      out.write_char('%')
      out.write_char(hex[c.to_int() >> 4].to_int().unsafe_to_char())
      out.write_char(hex[c.to_int() & 15].to_int().unsafe_to_char())
    }
  }
  out.to_string()
}

///|
/// Canonical Go-compatible URI string. Includes the password; use redacted for logs.
/// Like upstream URI.String, serializes TLS parameters only, not tuning/SASL queries.
pub fn URI::to_string(self : URI) -> String {
  self.format(false)
}

///|
pub fn URI::redacted(self : URI) -> String {
  self.format(true)
}

///|
fn URI::format(self : URI, redact : Bool) -> String {
  let out = StringBuilder()
  out.write_string(self.scheme + "://")
  if self.username != "guest" || self.password != "guest" {
    out.write_string(uri_escape(self.username, 1))
    if self.password != "guest" {
      out.write_string(
        ":" + (if redact { "xxxxx" } else { uri_escape(self.password, 1) }),
      )
    }
    out.write_char('@')
  }
  let host = if self.host.contains(":") {
    "[" + self.host + "]"
  } else {
    self.host
  }
  out.write_string(uri_escape(host, 3))
  if self.port != (if self.scheme == "amqps" { 5671 } else { 5672 }) {
    out.write_string(":" + self.port.to_string())
  }
  let path = if self.vhost == "/" {
    "/"
  } else if self.vhost.contains(" ") {
    uri_escape(self.vhost, 2)
  } else {
    uri_escape(self.vhost, 0)
  }
  if !path.is_empty() && !path.has_prefix("/") {
    out.write_char('/')
  }
  out.write_string(path)
  let mut separator = "?"
  for
    (key, value) in [
      ("cacertfile", self.ca_cert_file),
      ("certfile", self.cert_file),
      ("keyfile", self.key_file),
      ("server_name_indication", self.server_name),
    ] {
    if !value.is_empty() {
      out.write_string(separator + key + "=" + uri_escape(value, 0))
      separator = "&"
    }
  }
  out.to_string()
}

///|
pub fn URI::plain_auth(self : URI) -> Authentication raise FrameError {
  Authentication::plain(self.username, self.password)
}

///|
pub fn URI::amqplain_auth(self : URI) -> Authentication raise FrameError {
  Authentication::amqplain(self.username, self.password)
}
