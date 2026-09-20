///|
fn metadata_field_json(value : @lib.FieldValue) -> Json {
  match value {
    LongString(bytes) =>
      @utf8.decode(bytes, ignore_bom=false).to_json() catch {
        _ => field_json(value)
      }
    ArrayValue(values) => values.map(metadata_field_json).to_json()
    TableValue(entries) => metadata_table_json(entries)
    _ => field_json(value)
  }
}

///|
fn metadata_table_json(entries : Array[(String, @lib.FieldValue)]) -> Json {
  let out : Map[String, Json] = Map([])
  for (key, value) in entries {
    out[key] = metadata_field_json(value)
  }
  Json::object(out)
}

///|
pub fn connection_properties(input : String) -> String {
  try {
    let entries = parse_client_properties(input)
    let encoded = @lib.normalize_connection_properties(entries)
    metadata_table_json(@lib.decode_table(encoded)).stringify()
  } catch {
    _ => "ERROR: invalid client properties"
  }
}

///|
pub fn default_connection_properties() -> String {
  metadata_table_json(@lib.new_connection_properties()).stringify()
}

///|
fn parse_client_properties(
  input : String,
) -> Array[(String, @lib.FieldValue)] raise {
  if input.length() > 2097152 {
    raise Failure("properties size limit")
  }
  let properties = obj(@json.parse(input))
  if properties.contains("capabilities") {
    properties["capabilities"] = false
  }
  table_parse(Json::object(properties), 0)
}

///|
pub fn session_metadata(key : String) -> String {
  try {
    let s = session(key)
    let version : Json = match s.server_version() {
      Some((major, minor)) =>
        { "major": major.to_json(), "minor": minor.to_json() }
      None => Json::null()
    }
    (
      {
        "clientProperties": metadata_table_json(s.client_properties()),
        "serverProperties": metadata_table_json(s.server_properties()),
        "serverLocales": s.server_locales().to_json(),
        "serverVersion": version,
        "vhost": s.virtual_host().to_json(),
        "locale": s.locale().to_json(),
      } : Json).stringify()
  } catch {
    _ => "ERROR: connection metadata unavailable"
  }
}
