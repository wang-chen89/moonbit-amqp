///|
fn describe(frame : @lib.Frame) -> Json raise {
  let detail : Json = match frame.kind {
    1 => {
      let command = @lib.Method::decode(frame)
      let spec = @lib.method_spec(command.class_id, command.method_id).unwrap()
      let args : Array[Json] = []
      for i, value in command.arguments {
        args.push({
          "name": spec.fields[i].0.to_json(),
          "value": Repr(value).to_string().to_json(),
        })
      }
      {
        "name": spec.name.to_json(),
        "arguments": args.to_json(),
        "carriesContent": spec.carries_content.to_json(),
      }
    }
    2 => {
      let header = @lib.BasicHeader::decode(frame)
      {
        "bodySize": header.body_size.to_string().to_json(),
        "properties": Repr(header.properties).to_string().to_json(),
      }
    }
    _ =>
      {
        "bytes": frame.payload.length().to_json(),
        "hex": hex(frame.payload).to_json(),
      }
  }
  {
    "kind": frame.kind.to_json(),
    "channel": frame.channel.to_json(),
    "detail": detail,
  }
}

///|
/// Inspect at most 1 MiB of frame bytes. Argument descriptions preserve integer/byte types.
pub fn inspect_wire(input : String, assemble : Bool) -> String {
  try {
    let data = unhex(input, max_length=3145728)
    if data.length() > 1048576 {
      raise Failure("inspection limit: 1 MiB")
    }
    let decoder = @lib.Decoder::new(max_size=1048576)
    let frames = decoder.feed(data)
    decoder.finish()
    let results : Array[Json] = []
    if assemble {
      let assembler = @lib.Assembler::new(max_body=1048576, strict_methods=true)
      for frame in frames {
        if assembler.push(frame) is Some(content) {
          results.push({
            "channel": content.channel.to_json(),
            "properties": Repr(content.basic_header().properties)
            .to_string()
            .to_json(),
            "bodyHex": hex(content.body).to_json(),
            "bodyBytes": content.body.length().to_json(),
          })
        }
      }
      assembler.finish()
    } else {
      for frame in frames {
        results.push(describe(frame))
      }
    }
    results.to_json().stringify()
  } catch {
    e => "ERROR: " + Repr(e).to_string()
  }
}

///|
pub fn schemas() -> String {
  let records : Array[Json] = []
  for name in @lib.method_names() {
    let spec = @lib.method_spec_by_name(name).unwrap()
    let fields : Array[Json] = spec.fields.map(pair => {
      "name": pair.0.to_json(),
      "kind": Repr(pair.1).to_string().to_json(),
    })
    records.push({
      "name": name.to_json(),
      "classId": spec.class_id.to_json(),
      "methodId": spec.method_id.to_json(),
      "fields": fields.to_json(),
      "carriesContent": spec.carries_content.to_json(),
    })
  }
  records.to_json().stringify()
}
