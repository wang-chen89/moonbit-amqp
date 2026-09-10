///|
/// Split a body into frame payloads. max_frame_size includes the 8 byte envelope.
pub fn body_frames(
  channel : Int,
  body : Bytes,
  max_frame_size : Int,
) -> Array[Frame] raise FrameError {
  if channel < 1 ||
    channel > 65535 ||
    max_frame_size < 9 ||
    max_frame_size > 1048584 ||
    body.length() > 1048576 {
    raise Invalid("body frame bounds")
  }
  let capacity = max_frame_size - 8
  let frames = []
  let mut pos = 0
  while pos < body.length() {
    let end = if pos + capacity < body.length() {
      pos + capacity
    } else {
      body.length()
    }
    frames.push({ kind: 3, channel, payload: body[pos:end].to_owned(), })
    pos = end
  }
  frames
}
