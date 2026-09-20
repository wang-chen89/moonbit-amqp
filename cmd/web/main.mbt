///|
pub fn run(input : String) -> String {
  if input.has_prefix("inspect:") {
    return inspect_wire(input[8:].to_owned(), false)
  }
  if input.has_prefix("strict:") {
    return inspect_wire(input[7:].to_owned(), true)
  }
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
fn unhex(text : String, max_length? : Int = 200000) -> Bytes raise {
  if text.length() > max_length {
    raise Failure("input too long")
  }
  // Validate before allocating; keep whitespace, error precedence and size limits.
  let mut digits = 0
  for i in 0..<text.length() {
    let c = text[i].to_int()
    if hex_digit(c) >= 0 {
      digits += 1
    } else if c != 32 && c != 10 && c != 13 && c != 9 {
      raise Failure("invalid hex character")
    }
  }
  if digits % 2 != 0 {
    raise Failure("odd hex length")
  }
  let mut cursor = 0
  Bytes::makei(digits / 2, _ => {
    let mut high = hex_digit(text[cursor].to_int())
    while high < 0 {
      cursor += 1
      high = hex_digit(text[cursor].to_int())
    }
    cursor += 1
    let mut low = hex_digit(text[cursor].to_int())
    while low < 0 {
      cursor += 1
      low = hex_digit(text[cursor].to_int())
    }
    cursor += 1
    (high * 16 + low).to_byte()
  })
}

///|
fn hex_digit(c : Int) -> Int {
  if c >= 48 && c <= 57 {
    c - 48
  } else if c >= 97 && c <= 102 {
    c - 87
  } else if c >= 65 && c <= 70 {
    c - 55
  } else {
    -1
  }
}

///|
fn hex(data : Bytes) -> String {
  let alphabet = b"0123456789abcdef"
  let out = Bytes::makei(data.length() * 2, i => {
    let n = data[i / 2].to_int()
    alphabet[if i % 2 == 0 { n / 16 } else { n % 16 }]
  })
  // Every byte is ASCII, so the checked decoder cannot fail.
  try! @utf8.decode(out)
}
