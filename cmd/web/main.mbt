///|
pub fn run(input : String) -> String {
  try {
    let assemble = input.has_prefix("assemble:")
    let data = unhex(if assemble { input[9:].to_owned() } else { input })
    let d = @lib.Decoder::new()
    let frames = d.feed(data)
    d.finish()
    let lines = []
    if assemble {
      let assembler = @lib.Assembler::new()
      for frame in frames {
        if assembler.push(frame) is Some(content) {
          lines.push(
            Repr(content).to_string() + "\nBody hex: " + hex(content.body),
          )
        }
      }
      assembler.finish()
      return lines.join("\n\n")
    }
    for frame in frames {
      lines.push(
        Repr(frame).to_string() + "\nRe-encoded: " + hex(frame.encode()),
      )
    }
    lines.join("\n\n")
  } catch {
    e => "ERROR: " + Repr(e).to_string()
  }
}

///|
fn main {

}

///|
fn unhex(text : String) -> Bytes raise {
  let out : Array[Byte] = []
  let mut high = -1
  if text.length() > 200000 {
    raise Failure("input too long")
  }
  for c in text.iter() {
    if c == ' ' || c == '\n' || c == '\r' || c == '\t' {
      continue
    }
    let n = if c >= '0' && c <= '9' {
      c.to_int() - 48
    } else if c >= 'a' && c <= 'f' {
      c.to_int() - 87
    } else if c >= 'A' && c <= 'F' {
      c.to_int() - 55
    } else {
      raise Failure("invalid hex character")
    }
    if high < 0 {
      high = n
    } else {
      out.push((high * 16 + n).to_byte())
      high = -1
    }
  }
  if high >= 0 {
    raise Failure("odd hex length")
  }
  Bytes::from_array(out)
}

///|
fn hex(data : Bytes) -> String {
  let alphabet = "0123456789abcdef"
  let out = []
  for b in data {
    let n = b.to_int()
    out.push(
      alphabet[n / 16:n / 16 + 1].to_owned() +
      alphabet[n % 16:n % 16 + 1].to_owned(),
    )
  }
  out.join("")
}
