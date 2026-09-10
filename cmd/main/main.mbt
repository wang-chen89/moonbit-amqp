///|
fn main raise {
  let frame : @lib.Frame = {
    kind: 1,
    channel: 1,
    payload: b"\x00\x3c\x00\x28",
  }
  let decoder = @lib.Decoder::new()
  println(Repr(decoder.feed(frame.encode())))
}
