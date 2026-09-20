function _M0DTPB4Json4Null() {}
_M0DTPB4Json4Null.prototype.$tag = 0;
const _M0DTPB4Json4Null__ = new _M0DTPB4Json4Null();
function _M0DTPB4Json4True() {}
_M0DTPB4Json4True.prototype.$tag = 1;
const _M0DTPB4Json4True__ = new _M0DTPB4Json4True();
function _M0DTPB4Json5False() {}
_M0DTPB4Json5False.prototype.$tag = 2;
const _M0DTPB4Json5False__ = new _M0DTPB4Json5False();
function _M0DTPB4Json6Number(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPB4Json6Number.prototype.$tag = 3;
function _M0DTPB4Json6String(param0) {
  this._0 = param0;
}
_M0DTPB4Json6String.prototype.$tag = 4;
function _M0DTPB4Json5Array(param0) {
  this._0 = param0;
}
_M0DTPB4Json5Array.prototype.$tag = 5;
function _M0DTPB4Json6Object(param0) {
  this._0 = param0;
}
_M0DTPB4Json6Object.prototype.$tag = 6;
const $reinterpret_view = new DataView(new ArrayBuffer(8));
function $i64_reinterpret_f64(a) {
  $reinterpret_view.setBigUint64(0, BigInt.asUintN(64, a), false);
  return $reinterpret_view.getFloat64(0, false);
}
function _M0TPC28internal7strconv9FloatInfo(param0, param1, param2) {
  this.mantissa_bits = param0;
  this.exponent_bits = param1;
  this.bias = param2;
}
function _M0TPB9ArrayViewGUsRP211localreview4amqp7SessionEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
class $PanicError extends Error {}
function $panic() {
  throw new $PanicError();
}
function $oob() {
  throw new Error("Index out of bounds");
}
function _M0TPB13StringBuilder(param0) {
  this.val = param0;
}
function _M0TPC16string10StringView(param0, param1, param2) {
  this.str = param0;
  this.start = param1;
  this.end = param2;
}
const _M0FPB12random__seed = () => {
  if (globalThis.crypto?.getRandomValues) {
    const array = new Uint32Array(1);
    globalThis.crypto.getRandomValues(array);
    return array[0] | 0; // Convert to signed 32
  } else {
    return Math.floor(Math.random() * 0x100000000) | 0; // Fallback to Math.random
  }
};
const _M0FPB19int__to__string__js = (x, radix) => {
  return x.toString(radix);
};
const _M0FPB20uint__to__string__js = (x, radix) => {
  return (x >>> 0).toString(radix);
};
const _M0FPB21int64__to__string__js = (num, radix) => BigInt.asIntN(64, num).toString(radix);
const _M0FPB22uint64__to__string__js = (num, radix) => num.toString(radix);
function _M0TPB4IterGcE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function _M0TPB4IterGyE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function _M0TPB4IterGUsRPB4JsonEE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function $make_array_len_and_init(a, b) {
  const arr = new Array(a);
  arr.fill(b);
  return arr;
}
function _M0TPB9ArrayViewGkE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function $makebytes(a, b) {
  const arr = new Uint8Array(a);
  if (b !== 0) {
    arr.fill(b);
  }
  return arr;
}
function _M0TPB8MutLocalGiE(param0) {
  this.val = param0;
}
const _M0MPB7JSArray4push = (arr, val) => { arr.push(val); };
function _M0TPB4IterGsE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function _M0TPB4IterGRPC16string10StringViewE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function _M0TPB8MutLocalGORPC16string10StringViewE(param0) {
  this.val = param0;
}
function _M0TPB9ArrayViewGUsRP211localreview4amqp12ArgumentKindEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0DTPC16result6ResultGRP211localreview4amqp10MethodSpecRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp10MethodSpecRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp10MethodSpecRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp10MethodSpecRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGUsRP211localreview4amqp12ArgumentKindERPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGUsRP211localreview4amqp12ArgumentKindERPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGUsRP211localreview4amqp12ArgumentKindERPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGUsRP211localreview4amqp12ArgumentKindERPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP211localreview4amqp7SessionRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp7SessionRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp7SessionRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp7SessionRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGUiRP211localreview4amqp14AuthenticationERP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGUiRP211localreview4amqp14AuthenticationERP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGUiRP211localreview4amqp14AuthenticationERP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGUiRP211localreview4amqp14AuthenticationERP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGmRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGmRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGmRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGmRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB4JsonRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB4JsonRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB4JsonRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB4JsonRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP211localreview4amqp13StreamPendingRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp13StreamPendingRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp13StreamPendingRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp13StreamPendingRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0TPB3MapGsRPB4JsonE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
function _M0TPB3MapGsRPB5ArrayGsEE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
function _M0TPB3MapGiRP211localreview4amqp7PendingE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
function _M0TPB3MapGisE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
function _M0TPB3MapGibE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
function _M0TPB3MapGimE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
function _M0TPB3MapGiRP211localreview4amqp13StreamPendingE(param0, param1, param2, param3, param4, param5, param6) {
  this.entries = param0;
  this.size = param1;
  this.capacity = param2;
  this.capacity_mask = param3;
  this.grow_at = param4;
  this.head = param5;
  this.tail = param6;
}
function _M0TPB5EntryGsRP211localreview4amqp7SessionE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGsRPB5ArrayGsEE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGsRPB4JsonE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGisE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGibE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGimE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGiRP211localreview4amqp7PendingE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGsRP211localreview4amqp8ArgumentE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGiRP211localreview4amqp13StreamPendingE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB5EntryGsRPC15debug4ReprE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0DTPC16option6OptionGRPB5ArrayGsEE4None() {}
_M0DTPC16option6OptionGRPB5ArrayGsEE4None.prototype.$tag = 0;
const _M0DTPC16option6OptionGRPB5ArrayGsEE4None__ = new _M0DTPC16option6OptionGRPB5ArrayGsEE4None();
function _M0DTPC16option6OptionGRPB5ArrayGsEE4Some(param0) {
  this._0 = param0;
}
_M0DTPC16option6OptionGRPB5ArrayGsEE4Some.prototype.$tag = 1;
function _M0TPB8MutLocalGORPB5EntryGsRPB4JsonEE(param0) {
  this.val = param0;
}
function _M0TPB8MutLocalGORPB5EntryGisEE(param0) {
  this.val = param0;
}
function _M0DTPC16result6ResultGRPB5ArrayGRPB4JsonERPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRPB4JsonERPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRPB4JsonERPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRPB4JsonERPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB5ArrayGzERP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGzERP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGzERP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGzERP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp14AuthenticationERPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp14AuthenticationERPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp14AuthenticationERPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp14AuthenticationERPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp10FieldValueERPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp10FieldValueERPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp10FieldValueERPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp10FieldValueERPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0TPC15bytes9BytesView(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
const _M0MPB7JSArray4copy = (arr) => arr.slice(0);
const $bytes_literal$0 = new Uint8Array();
const _M0MPB7JSArray11set__length = (arr, len) => { arr.length = len; };
const _M0MPB7JSArray12append__view = (dst, src, src_offset, len) => {
   for (let i = 0; i < len; i++) {
     dst.push(src[src_offset + i]);
   }
 };
const _M0MPB7JSArray3pop = (arr) => arr.pop();
function _M0TPB9ArrayViewGsE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPB9ArrayViewGRPC16string10StringViewE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0DTPC15debug4Repr7UnitLit() {}
_M0DTPC15debug4Repr7UnitLit.prototype.$tag = 0;
function _M0DTPC15debug4Repr7Integer(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr7Integer.prototype.$tag = 1;
function _M0DTPC15debug4Repr9DoubleLit(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr9DoubleLit.prototype.$tag = 2;
function _M0DTPC15debug4Repr8FloatLit(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr8FloatLit.prototype.$tag = 3;
function _M0DTPC15debug4Repr7BoolLit(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr7BoolLit.prototype.$tag = 4;
function _M0DTPC15debug4Repr7CharLit(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr7CharLit.prototype.$tag = 5;
function _M0DTPC15debug4Repr9StringLit(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr9StringLit.prototype.$tag = 6;
function _M0DTPC15debug4Repr5Tuple(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr5Tuple.prototype.$tag = 7;
function _M0DTPC15debug4Repr5Array(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr5Array.prototype.$tag = 8;
function _M0DTPC15debug4Repr6Record(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr6Record.prototype.$tag = 9;
function _M0DTPC15debug4Repr4Enum(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15debug4Repr4Enum.prototype.$tag = 10;
function _M0DTPC15debug4Repr3Map(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr3Map.prototype.$tag = 11;
function _M0DTPC15debug4Repr11RecordField(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15debug4Repr11RecordField.prototype.$tag = 12;
function _M0DTPC15debug4Repr14EnumLabeledArg(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15debug4Repr14EnumLabeledArg.prototype.$tag = 13;
function _M0DTPC15debug4Repr6Opaque(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15debug4Repr6Opaque.prototype.$tag = 14;
function _M0DTPC15debug4Repr7Literal(param0) {
  this._0 = param0;
}
_M0DTPC15debug4Repr7Literal.prototype.$tag = 15;
function _M0DTPC15debug4Repr8MapEntry(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15debug4Repr8MapEntry.prototype.$tag = 16;
function _M0DTPC15debug4Repr7Omitted() {}
_M0DTPC15debug4Repr7Omitted.prototype.$tag = 17;
const _M0DTPC15debug4Repr7Omitted__ = new _M0DTPC15debug4Repr7Omitted();
function _M0TPC15debug13ContentParens(param0, param1) {
  this.size = param0;
  this.lines = param1;
}
function _M0TPC15debug7Content(param0, param1, param2) {
  this.size = param0;
  this.lines = param1;
  this.needs_parens = param2;
}
const _M0FPC28encoding4utf816encode__utf8__js = (() => {
   const encoder = new TextEncoder();
   return function(src, start, len, bom) {
     const end = start + len;
     const encoded = encoder.encode(src.slice(start, end));
     if (!bom) {
       return encoded;
     }
     const result = new Uint8Array(encoded.length + 3);
     result[0] = 0xEF;
     result[1] = 0xBB;
     result[2] = 0xBF;
     result.set(encoded, 3);
     return result;
   };
 })();
const _M0FPC28encoding4utf816decode__utf8__js = ((preserveBOMDecoder, dropBOMDecoder) => function(bytes, start, len, preserveBOM) {
   try {
     const end = start + len;
     const slice = bytes.subarray(start, end);
     const decoder = preserveBOM ? preserveBOMDecoder : dropBOMDecoder;
     return [decoder.decode(slice)];
   } catch (_) {
     return [];
   }
 })(
   new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }),
   new TextDecoder("utf-8", { fatal: true, ignoreBOM: false }),
 );
const _M0FPC28encoding4utf823decode__utf8__lossy__js = ((preserveBOMDecoder, dropBOMDecoder) => function(bytes, start, len, preserveBOM) {
   const end = start + len;
   const slice = bytes.subarray(start, end);
   const decoder = preserveBOM ? preserveBOMDecoder : dropBOMDecoder;
   return decoder.decode(slice);
 })(
   new TextDecoder("utf-8", { ignoreBOM: true }),
   new TextDecoder("utf-8", { ignoreBOM: false }),
 );
function _M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE2Ok.prototype.$tag = 1;
function _M0DTPC15error5Error60moonbitlang_2fcore_2fencoding_2futf8_2eMalformed_2eMalformed(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error60moonbitlang_2fcore_2fencoding_2futf8_2eMalformed_2eMalformed.prototype.$tag = 8;
function _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid.prototype.$tag = 7;
function _M0DTPC15error5Error52moonbitlang_2fcore_2fjson_2eParseError_2eInvalidChar(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15error5Error52moonbitlang_2fcore_2fjson_2eParseError_2eInvalidChar.prototype.$tag = 6;
function _M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof() {}
_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof.prototype.$tag = 5;
const _M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__ = new _M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof();
function _M0DTPC15error5Error54moonbitlang_2fcore_2fjson_2eParseError_2eInvalidNumber(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC15error5Error54moonbitlang_2fcore_2fjson_2eParseError_2eInvalidNumber.prototype.$tag = 4;
function _M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eInvalidIdentEscape(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eInvalidIdentEscape.prototype.$tag = 3;
function _M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded() {}
_M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded.prototype.$tag = 2;
const _M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded__ = new _M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded();
function _M0DTPC15error5Error61moonbitlang_2fcore_2fjson_2eJsonDecodeError_2eJsonDecodeError(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error61moonbitlang_2fcore_2fjson_2eJsonDecodeError_2eJsonDecodeError.prototype.$tag = 1;
function _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure.prototype.$tag = 0;
function _M0DTPC16result6ResultGUiRPC16string10StringViewbERPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGUiRPC16string10StringViewbERPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGUiRPC16string10StringViewbERPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGUiRPC16string10StringViewbERPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGUiRPC16string10StringViewbERPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGUiRPC16string10StringViewbERPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGiRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGiRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGlRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGlRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGlRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGlRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGdRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGdRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGdRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGdRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGORPC28internal7strconv6NumberRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGORPC28internal7strconv6NumberRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGmRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGmRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGmRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGmRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0TPC28internal7strconv6Number(param0, param1, param2, param3) {
  this.exponent = param0;
  this.mantissa = param1;
  this.negative = param2;
  this.many_digits = param3;
}
function _M0DTPC16result6ResultGdRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGdRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGdRPC15error5ErrorE2Ok.prototype.$tag = 1;
function $i64_clz(a) {
  a = BigInt.asUintN(64, a);
  if (a === 0n) return 64;
  const hi = Number(a >> 32n);
  if (hi !== 0) {
    return Math.clz32(hi);
  }
  return 32 + Math.clz32(Number(a & 0xffffffffn));
}
function _M0DTPC16result6ResultGlRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGlRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGlRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGlRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0TPC28internal7strconv12EiselProduct(param0, param1) {
  this.lo = param0;
  this.hi = param1;
}
function _M0TPC28internal7strconv7Decimal(param0, param1, param2, param3, param4, param5) {
  this.digits = param0;
  this.digits_num = param1;
  this.decimal_point = param2;
  this.negative = param3;
  this.truncated = param4;
  this.overflowed = param5;
}
function _M0DTPC16result6ResultGRPC28internal7strconv7DecimalRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC28internal7strconv7DecimalRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPC28internal7strconv7DecimalRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC28internal7strconv7DecimalRPC15error5ErrorE2Ok.prototype.$tag = 1;
function $f64_convert_i64_u(a) {
  return Number(a);
}
function _M0DTPC16option6OptionGdE4None() {}
_M0DTPC16option6OptionGdE4None.prototype.$tag = 0;
const _M0DTPC16option6OptionGdE4None__ = new _M0DTPC16option6OptionGdE4None();
function _M0DTPC16option6OptionGdE4Some(param0) {
  this._0 = param0;
}
_M0DTPC16option6OptionGdE4Some.prototype.$tag = 1;
function _M0TPB9ArrayViewGUsRPC15debug4ReprEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPC14json8Position(param0, param1) {
  this.line = param0;
  this.column = param1;
}
function _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGuRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGiRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGiRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGmRPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGmRPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGmRPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGmRPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0TPC14json12ParseContext(param0, param1, param2) {
  this.offset = param0;
  this.input = param1;
  this.end_offset = param2;
}
function $f64_convert_i64(a) {
  return Number(BigInt.asIntN(64, a));
}
function _M0TPC14json11LexedNumber(param0, param1) {
  this.repr = param0;
  this.value = param1;
}
function _M0TPC14json14JsonNumberScan(param0, param1, param2, param3, param4) {
  this.negative = param0;
  this.is_integer = param1;
  this.mantissa = param2;
  this.exponent = param3;
  this.many_digits = param4;
}
function _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok.prototype.$tag = 1;
function _M0DTPC14json5Token4Null() {}
_M0DTPC14json5Token4Null.prototype.$tag = 0;
const _M0DTPC14json5Token4Null__ = new _M0DTPC14json5Token4Null();
function _M0DTPC14json5Token4True() {}
_M0DTPC14json5Token4True.prototype.$tag = 1;
const _M0DTPC14json5Token4True__ = new _M0DTPC14json5Token4True();
function _M0DTPC14json5Token5False() {}
_M0DTPC14json5Token5False.prototype.$tag = 2;
const _M0DTPC14json5Token5False__ = new _M0DTPC14json5Token5False();
function _M0DTPC14json5Token6Number(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC14json5Token6Number.prototype.$tag = 3;
function _M0DTPC14json5Token6String(param0) {
  this._0 = param0;
}
_M0DTPC14json5Token6String.prototype.$tag = 4;
function _M0DTPC14json5Token6LBrace() {}
_M0DTPC14json5Token6LBrace.prototype.$tag = 5;
const _M0DTPC14json5Token6LBrace__ = new _M0DTPC14json5Token6LBrace();
function _M0DTPC14json5Token6RBrace() {}
_M0DTPC14json5Token6RBrace.prototype.$tag = 6;
const _M0DTPC14json5Token6RBrace__ = new _M0DTPC14json5Token6RBrace();
function _M0DTPC14json5Token8LBracket() {}
_M0DTPC14json5Token8LBracket.prototype.$tag = 7;
const _M0DTPC14json5Token8LBracket__ = new _M0DTPC14json5Token8LBracket();
function _M0DTPC14json5Token8RBracket() {}
_M0DTPC14json5Token8RBracket.prototype.$tag = 8;
const _M0DTPC14json5Token8RBracket__ = new _M0DTPC14json5Token8RBracket();
function _M0DTPC14json5Token5Comma() {}
_M0DTPC14json5Token5Comma.prototype.$tag = 9;
const _M0DTPC14json5Token5Comma__ = new _M0DTPC14json5Token5Comma();
function _M0TPB9ArrayViewGUsRPB4JsonEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0DTPC14json10WriteFrame5Array(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC14json10WriteFrame5Array.prototype.$tag = 0;
function _M0DTPC14json10WriteFrame6Object(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC14json10WriteFrame6Object.prototype.$tag = 1;
function _M0DTPC14json8JsonPath4Root() {}
_M0DTPC14json8JsonPath4Root.prototype.$tag = 0;
const _M0DTPC14json8JsonPath4Root__ = new _M0DTPC14json8JsonPath4Root();
function _M0DTPC14json8JsonPath3Key(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC14json8JsonPath3Key.prototype.$tag = 1;
function _M0DTPC14json8JsonPath5Index(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTPC14json8JsonPath5Index.prototype.$tag = 2;
function _M0DTPC16result6ResultGlRPC14json15JsonDecodeErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGlRPC14json15JsonDecodeErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGlRPC14json15JsonDecodeErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGlRPC14json15JsonDecodeErrorE2Ok.prototype.$tag = 1;
function _M0TP211localreview4amqp10WireWriter(param0, param1) {
  this.bytes = param0;
  this.nodes = param1;
}
function _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP211localreview4amqp10WireReaderRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp10WireReaderRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp10WireReaderRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp10WireReaderRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0TP211localreview4amqp10WireReader(param0, param1, param2, param3) {
  this.bytes = param0;
  this.pos = param1;
  this.end = param2;
  this.nodes = param3;
}
function _M0TPB8MutLocalGmE(param0) {
  this.val = param0;
}
function _M0DTPC16result6ResultGzRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGzRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGzRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGzRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGsRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGiRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGiRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0TP211localreview4amqp5Frame(param0, param1, param2) {
  this.kind = param0;
  this.channel = param1;
  this.payload = param2;
}
function _M0TPB9ArrayViewGyE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0DTPC16result6ResultGlRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGlRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGlRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGlRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP211localreview4amqp3URIRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp3URIRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp3URIRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp3URIRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0TPB8MutLocalGsE(param0) {
  this.val = param0;
}
function _M0TPB9ArrayViewGUsRPB5ArrayGsEEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TP211localreview4amqp3URI(param0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11, param12, param13) {
  this.scheme = param0;
  this.host = param1;
  this.port = param2;
  this.username = param3;
  this.password = param4;
  this.vhost = param5;
  this.cert_file = param6;
  this.ca_cert_file = param7;
  this.key_file = param8;
  this.server_name = param9;
  this.auth_mechanism = param10;
  this.heartbeat_seconds = param11;
  this.connection_timeout = param12;
  this.channel_max = param13;
}
const $bytes_literal$1 = new Uint8Array([48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70]);
function _M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0TP211localreview4amqp14Authentication(param0, param1) {
  this.mechanism = param0;
  this.response = param1;
}
function _M0DTP211localreview4amqp10FieldValue7Boolean(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp10FieldValue7Boolean.prototype.$tag = 0;
function _M0DTP211localreview4amqp10FieldValue7Signed8(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp10FieldValue7Signed8.prototype.$tag = 1;
function _M0DTP211localreview4amqp10FieldValue9Unsigned8(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp10FieldValue9Unsigned8.prototype.$tag = 2;
function _M0DTP211localreview4amqp10FieldValue8Signed16(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp10FieldValue8Signed16.prototype.$tag = 3;
function _M0DTP211localreview4amqp10FieldValue10Unsigned16(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp10FieldValue10Unsigned16.prototype.$tag = 4;
function _M0DTP211localreview4amqp10FieldValue8Signed32(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp10FieldValue8Signed32.prototype.$tag = 5;
function _M0DTP211localreview4amqp10FieldValue10Unsigned32(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp10FieldValue10Unsigned32.prototype.$tag = 6;
function _M0DTP211localreview4amqp10FieldValue8Signed64(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp10FieldValue8Signed64.prototype.$tag = 7;
function _M0DTP211localreview4amqp10FieldValue11Float32Bits(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp10FieldValue11Float32Bits.prototype.$tag = 8;
function _M0DTP211localreview4amqp10FieldValue11Float64Bits(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp10FieldValue11Float64Bits.prototype.$tag = 9;
function _M0DTP211localreview4amqp10FieldValue7Decimal(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP211localreview4amqp10FieldValue7Decimal.prototype.$tag = 10;
function _M0DTP211localreview4amqp10FieldValue10LongString(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp10FieldValue10LongString.prototype.$tag = 11;
function _M0DTP211localreview4amqp10FieldValue9ByteArray(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp10FieldValue9ByteArray.prototype.$tag = 12;
function _M0DTP211localreview4amqp10FieldValue9Timestamp(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp10FieldValue9Timestamp.prototype.$tag = 13;
function _M0DTP211localreview4amqp10FieldValue10ArrayValue(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp10FieldValue10ArrayValue.prototype.$tag = 14;
function _M0DTP211localreview4amqp10FieldValue10TableValue(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp10FieldValue10TableValue.prototype.$tag = 15;
function _M0DTP211localreview4amqp10FieldValue4Void() {}
_M0DTP211localreview4amqp10FieldValue4Void.prototype.$tag = 16;
const _M0DTP211localreview4amqp10FieldValue4Void__ = new _M0DTP211localreview4amqp10FieldValue4Void();
const $bytes_literal$2 = new Uint8Array([109,111,111,110,98,105,116,45,97,109,113,112]);
const $bytes_literal$3 = new Uint8Array([48,46,50,52,46,48]);
const $bytes_literal$4 = new Uint8Array([109,111,111,110,98,105,116]);
const $bytes_literal$5 = new Uint8Array([65,77,81,80,0,0,9,1]);
function _M0DTPC16result6ResultGRP211localreview4amqp9AssemblerRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp9AssemblerRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp9AssemblerRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp9AssemblerRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0TP211localreview4amqp9Assembler(param0, param1, param2, param3, param4, param5) {
  this.pending = param0;
  this.max_body = param1;
  this.strict_methods = param2;
  this.metadata = param3;
  this.buffered = param4;
  this.failed = param5;
}
function _M0TPB9ArrayViewGUiRP211localreview4amqp7PendingEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0DTPC16result6ResultGRP211localreview4amqp7DecoderRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp7DecoderRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp7DecoderRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp7DecoderRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0TP211localreview4amqp7Decoder(param0, param1, param2, param3) {
  this.buffer = param0;
  this.limit = param1;
  this.expected = param2;
  this.poisoned = param3;
}
function _M0TP211localreview4amqp15StreamAssembler(param0, param1) {
  this.pending = param0;
  this.metadata = param1;
}
function _M0TPB9ArrayViewGUiRP211localreview4amqp13StreamPendingEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0DTPC16result6ResultGRP211localreview4amqp7SessionRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp7SessionRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp7SessionRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp7SessionRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0TP211localreview4amqp7Session(param0, param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11, param12, param13, param14, param15, param16, param17, param18, param19, param20, param21) {
  this.decoder = param0;
  this.assembler = param1;
  this.stream_assembler = param2;
  this.stream_bodies = param3;
  this.state = param4;
  this.auth = param5;
  this.selected_auth = param6;
  this.locale = param7;
  this.vhost = param8;
  this.client_properties_wire = param9;
  this.server_properties_wire = param10;
  this.server_locales = param11;
  this.server_version = param12;
  this.channel_limit = param13;
  this.frame_limit = param14;
  this.heartbeat_seconds = param15;
  this.channels = param16;
  this.paused = param17;
  this.blocked = param18;
  this.secret_update = param19;
  this.sending = param20;
  this.output = param21;
}
const $bytes_literal$6 = new Uint8Array([0,0,0,0]);
function _M0TPB9ArrayViewGUisEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPB9ArrayViewGUibEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TPB9ArrayViewGUimEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TP211localreview4amqp10MethodSpec(param0, param1, param2, param3, param4) {
  this.class_id = param0;
  this.method_id = param1;
  this.name = param2;
  this.fields = param3;
  this.carries_content = param4;
}
function _M0DTPC16result6ResultGRP211localreview4amqp5FrameRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp5FrameRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp5FrameRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp5FrameRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP211localreview4amqp6MethodRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp6MethodRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp6MethodRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp6MethodRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0TP211localreview4amqp6Method(param0, param1, param2) {
  this.class_id = param0;
  this.method_id = param1;
  this.arguments = param2;
}
function _M0TPB9ArrayViewGUsRP211localreview4amqp8ArgumentEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0TP211localreview4amqp11BasicHeader(param0, param1) {
  this.body_size = param0;
  this.properties = param1;
}
function _M0DTP211localreview4amqp8Argument3Bit(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp8Argument3Bit.prototype.$tag = 0;
function _M0DTP211localreview4amqp8Argument5Octet(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp8Argument5Octet.prototype.$tag = 1;
function _M0DTP211localreview4amqp8Argument5Short(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp8Argument5Short.prototype.$tag = 2;
function _M0DTP211localreview4amqp8Argument4Long(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp8Argument4Long.prototype.$tag = 3;
function _M0DTP211localreview4amqp8Argument8LongLong(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp8Argument8LongLong.prototype.$tag = 4;
function _M0DTP211localreview4amqp8Argument11ShortString(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp8Argument11ShortString.prototype.$tag = 5;
function _M0DTP211localreview4amqp8Argument10LongString(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp8Argument10LongString.prototype.$tag = 6;
function _M0DTP211localreview4amqp8Argument5Table(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp8Argument5Table.prototype.$tag = 7;
function _M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGORP211localreview4amqp7ContentRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGORP211localreview4amqp7ContentRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGORP211localreview4amqp7ContentRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGORP211localreview4amqp7ContentRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0TP211localreview4amqp7Pending(param0, param1, param2, param3) {
  this.method_payload = param0;
  this.header = param1;
  this.expected = param2;
  this.body = param3;
}
function _M0TP211localreview4amqp7Content(param0, param1, param2, param3) {
  this.channel = param0;
  this.method_payload = param1;
  this.header = param2;
  this.body = param3;
}
function _M0TP211localreview4amqp13StreamPending(param0, param1, param2) {
  this.command = param0;
  this.metadata = param1;
  this.remaining = param2;
}
function _M0DTP211localreview4amqp12SessionEvent5Ready() {}
_M0DTP211localreview4amqp12SessionEvent5Ready.prototype.$tag = 0;
const _M0DTP211localreview4amqp12SessionEvent5Ready__ = new _M0DTP211localreview4amqp12SessionEvent5Ready();
function _M0DTP211localreview4amqp12SessionEvent23AuthenticationRequested(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP211localreview4amqp12SessionEvent23AuthenticationRequested.prototype.$tag = 1;
function _M0DTP211localreview4amqp12SessionEvent8Received(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP211localreview4amqp12SessionEvent8Received.prototype.$tag = 2;
function _M0DTP211localreview4amqp12SessionEvent7Message(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp12SessionEvent7Message.prototype.$tag = 3;
function _M0DTP211localreview4amqp12SessionEvent12MessageStart(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP211localreview4amqp12SessionEvent12MessageStart.prototype.$tag = 4;
function _M0DTP211localreview4amqp12SessionEvent11MessageData(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP211localreview4amqp12SessionEvent11MessageData.prototype.$tag = 5;
function _M0DTP211localreview4amqp12SessionEvent10MessageEnd(param0) {
  this._0 = param0;
}
_M0DTP211localreview4amqp12SessionEvent10MessageEnd.prototype.$tag = 6;
function _M0DTP211localreview4amqp12SessionEvent13ChannelClosed(param0, param1, param2) {
  this._0 = param0;
  this._1 = param1;
  this._2 = param2;
}
_M0DTP211localreview4amqp12SessionEvent13ChannelClosed.prototype.$tag = 7;
function _M0DTP211localreview4amqp12SessionEvent6Closed(param0, param1) {
  this._0 = param0;
  this._1 = param1;
}
_M0DTP211localreview4amqp12SessionEvent6Closed.prototype.$tag = 8;
function _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp12SessionEventERP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp12SessionEventERP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp12SessionEventERP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp12SessionEventERP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0TPB8MutLocalGOUiRP211localreview4amqp14AuthenticationEE(param0) {
  this.val = param0;
}
const $bytes_literal$7 = new Uint8Array([0,42,0,42]);
function _M0DTPC16result6ResultGsRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGsRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGiRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGiRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGiRPC15error5ErrorE2Ok.prototype.$tag = 1;
function $f64_convert_i32_u(a) {
  return a < 0 ? a + 4294967296.0 : a + 0.0;
}
function _M0DTPC16result6ResultGjRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGjRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGjRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGjRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGjRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGjRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGjRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGjRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB3MapGsRPB4JsonERPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB3MapGsRPB4JsonERPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB3MapGsRPB4JsonERPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB3MapGsRPB4JsonERPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB3MapGsRPB4JsonERPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB3MapGsRPB4JsonERPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB3MapGsRPB4JsonERPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB3MapGsRPB4JsonERPC15error5ErrorE2Ok.prototype.$tag = 1;
const $bytes_literal$8 = new Uint8Array([48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102]);
function _M0DTPC16result6ResultGzRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGzRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGzRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGzRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGzRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGzRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGzRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGzRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16option6OptionGRPB5ArrayGUsRP211localreview4amqp10FieldValueEEE4None() {}
_M0DTPC16option6OptionGRPB5ArrayGUsRP211localreview4amqp10FieldValueEEE4None.prototype.$tag = 0;
const _M0DTPC16option6OptionGRPB5ArrayGUsRP211localreview4amqp10FieldValueEEE4None__ = new _M0DTPC16option6OptionGRPB5ArrayGUsRP211localreview4amqp10FieldValueEEE4None();
function _M0DTPC16option6OptionGRPB5ArrayGUsRP211localreview4amqp10FieldValueEEE4Some(param0) {
  this._0 = param0;
}
_M0DTPC16option6OptionGRPB5ArrayGUsRP211localreview4amqp10FieldValueEEE4Some.prototype.$tag = 1;
function _M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERPB7FailureE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRPC15error5ErrorE2Ok.prototype.$tag = 1;
function _M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRPB7FailureE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRPB7FailureE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRPB7FailureE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRPB7FailureE2Ok.prototype.$tag = 1;
const _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger = { method_0: _M0IPB13StringBuilderPB6Logger13write__string, method_1: _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE, method_2: _M0IPB13StringBuilderPB6Logger11write__view, method_3: _M0IPB13StringBuilderPB6Logger11write__char, method_4: _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE, method_5: _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE };
const _M0FP049Int_24as_24_40moonbitlang_2fcore_2fbuiltin_2eShow = { method_0: _M0IP016_24default__implPB4Show6outputGiE, method_1: _M0IPC13int3IntPB4Show10to__string };
const _M0FP052String_24as_24_40moonbitlang_2fcore_2fbuiltin_2eShow = { method_0: _M0IP016_24default__implPB4Show6outputGsE, method_1: _M0IPC16string6StringPB4Show10to__string };
function _M0FP15Error8to__repr(_e) {
  switch (_e.$tag) {
    case 1: {
      return _M0IPC14json15JsonDecodeErrorPC15debug5Debug8to__reprGRPC14json15JsonDecodeErrorE(_e);
    }
    case 8: {
      return _M0IPC28encoding4utf89MalformedPC15debug5Debug8to__reprGRPC28encoding4utf89MalformedE(_e);
    }
    case 4: {
      return _M0IPC14json10ParseErrorPC15debug5Debug8to__reprGRPC14json10ParseErrorE(_e);
    }
    case 0: {
      return _M0IPB7FailurePC15debug5Debug8to__reprGRPB7FailureE(_e);
    }
    case 5: {
      return _M0IPC14json10ParseErrorPC15debug5Debug8to__reprGRPC14json10ParseErrorE(_e);
    }
    case 6: {
      return _M0IPC14json10ParseErrorPC15debug5Debug8to__reprGRPC14json10ParseErrorE(_e);
    }
    case 3: {
      return _M0IPC14json10ParseErrorPC15debug5Debug8to__reprGRPC14json10ParseErrorE(_e);
    }
    case 2: {
      return _M0IPC14json10ParseErrorPC15debug5Debug8to__reprGRPC14json10ParseErrorE(_e);
    }
    default: {
      return _M0IP211localreview4amqp10FrameErrorPC15debug5Debug8to__reprGRP211localreview4amqp10FrameErrorE(_e);
    }
  }
}
function _M0FP15Error10to__string(_e) {
  switch (_e.$tag) {
    case 1: {
      return _M0IP016_24default__implPB4Show10to__stringGRPC14json15JsonDecodeErrorE(_e);
    }
    case 8: {
      return "moonbitlang/core/encoding/utf8.Malformed.Malformed";
    }
    case 4: {
      return _M0IP016_24default__implPB4Show10to__stringGRPC14json10ParseErrorE(_e);
    }
    case 0: {
      return _M0IP016_24default__implPB4Show10to__stringGRPB7FailureE(_e);
    }
    case 5: {
      return _M0IP016_24default__implPB4Show10to__stringGRPC14json10ParseErrorE(_e);
    }
    case 6: {
      return _M0IP016_24default__implPB4Show10to__stringGRPC14json10ParseErrorE(_e);
    }
    case 3: {
      return _M0IP016_24default__implPB4Show10to__stringGRPC14json10ParseErrorE(_e);
    }
    case 2: {
      return _M0IP016_24default__implPB4Show10to__stringGRPC14json10ParseErrorE(_e);
    }
    default: {
      return "localreview/amqp.FrameError.Invalid";
    }
  }
}
const _M0MPC16string6String4trimN7_2abindS6861 = "\t\n\r ";
const _M0FPB4null = _M0DTPB4Json4Null__;
const _M0MPB4Iter4nextN6constrS9855GRPC16string10StringViewE = 0;
const _M0MPB4Iter4nextN6constrS9856GRPC16string10StringViewE = 0;
const _M0MPB4Iter4nextN6constrS9855GcE = 0;
const _M0MPB4Iter4nextN6constrS9856GcE = 0;
const _M0MPB4Iter4nextN6constrS9855GyE = 0;
const _M0MPB4Iter4nextN6constrS9856GyE = 0;
const _M0MPB4Iter3newN6constrS9863GcE = 0;
const _M0MPB4Iter3newN6constrS9863GyE = 0;
const _M0MPB4Iter3newN6constrS9863GUsRPB4JsonEE = 0;
const _M0FPC16double14not__a__number = $i64_reinterpret_f64(9221120237041090561n);
const _M0FPC16double8infinity = $i64_reinterpret_f64(9218868437227405312n);
const _M0FPC16double13neg__infinity = $i64_reinterpret_f64(18442240474082181120n);
const _M0FPC15debug14compact__linesN7_2abindS1134 = "";
const _M0FPC15debug14compact__linesN7_2abindS1147 = " ";
const _M0FPC15debug14compact__linesN7_2abindS1141 = ",";
const _M0FPC15debug14compact__linesN7_2abindS1139 = " ";
const _M0FPC15debug14compact__linesN7_2abindS1138 = " ";
const _M0FPC15debug14compact__linesN7_2abindS1136 = "";
const _M0FPC15debug14compact__linesN7_2abindS1148 = "(";
const _M0FPC15debug14compact__linesN7_2abindS1152 = "";
const _M0FPC15debug14compact__linesN7_2abindS1161 = " ";
const _M0FPC15debug14compact__linesN7_2abindS1155 = ",";
const _M0FPC15debug14compact__linesN7_2abindS1166 = " ";
const _M0FPC15debug19bracket__seq__linesN7_2abindS1175 = "";
const _M0FPC15debug14print__contentN7_2abindS1244 = "\n";
const _M0FPC28internal7strconv14base__err__str = "invalid base";
const _M0FPC28internal7strconv15range__err__str = "value out of range";
const _M0FPC28internal7strconv16syntax__err__str = "invalid syntax";
const _M0FPC28internal7strconv21parse__uint64_2einnerN7_2abindS486 = "";
const _M0FPC28internal7strconv17min__19digit__int = 1000000000000000000n;
const _M0FPC28internal7strconv17parse__scientificN8exp__numS354 = 0n;
const _M0FPC28internal7strconv20parse__int64_2einnerN7_2abindS682 = "";
const _M0FPC28internal7strconv27eisel__lemire__pow10__table = [18054884314459144840n, 1671618768450675795n, 11284302696536965525n, 1044761730281672372n, 14105378370671206906n, 5917638181279478369n, 17631722963339008632n, 16620419763454123769n, 11019826852086880395n, 10387762352158827356n, 13774783565108600494n, 8373016921771146291n, 17218479456385750618n, 1242899115359157055n, 10761549660241094136n, 5388497965526861063n, 13451937075301367670n, 6735622456908576329n, 16814921344126709587n, 17642900107990496220n, 10509325840079193492n, 8720969558280366185n, 13136657300098991865n, 10901211947850457732n, 16420821625123739831n, 18238200953240460069n, 10263013515702337394n, 18316404623416369399n, 12828766894627921743n, 13672133742415685941n, 16035958618284902179n, 12478481159592219522n, 10022474136428063862n, 5493207715531443249n, 12528092670535079827n, 16089881681269079869n, 15660115838168849784n, 15500666083158961933n, 9787572398855531115n, 9687916301974351208n, 12234465498569413894n, 7498209359040551106n, 15293081873211767368n, 149389661945913074n, 9558176170757354605n, 93368538716195671n, 11947720213446693256n, 4728396691822632493n, 14934650266808366570n, 5910495864778290617n, 9334156416755229106n, 8305745933913819539n, 11667695520944036383n, 1158810380537498616n, 14584619401180045478n, 15283571030954036982n, 18230774251475056848n, 9881091751837770420n, 11394233907171910530n, 6175682344898606512n, 14242792383964888162n, 16942974967978033949n, 17803490479956110203n, 11955346673117766628n, 11127181549972568877n, 5166248661484910190n, 13908976937465711096n, 11069496845283525642n, 17386221171832138870n, 13836871056604407053n, 10866388232395086794n, 4036358391950366504n, 13582985290493858492n, 14268820026792733938n, 16978731613117323115n, 17836025033490917422n, 10611707258198326947n, 8841672636718129437n, 13264634072747908684n, 6440404777470273892n, 16580792590934885855n, 8050505971837842365n, 10362995369334303659n, 11949095260039733334n, 12953744211667879574n, 10324683056622278764n, 16192180264584849468n, 3682481783923072647n, 10120112665365530917n, 11524923151806696212n, 12650140831706913647n, 571095884476206553n, 15812676039633642058n, 14548927910877421904n, 9882922524771026286n, 13704765962725776594n, 12353653155963782858n, 7907585416552444934n, 15442066444954728573n, 661109733835780360n, 9651291528096705358n, 2719036592861056677n, 12064114410120881697n, 12622167777931096654n, 15080143012651102122n, 1942651667131707105n, 9425089382906938826n, 5825843310384704845n, 11781361728633673532n, 16505676174835656864n, 14726702160792091916n, 2185351144835019464n, 18408377700990114895n, 2731688931043774330n, 11505236063118821809n, 8624834609543440812n, 14381545078898527261n, 15392729280356688919n, 17976931348623159077n, 5405853545163697437n, 11235582092889474423n, 5684501474941004850n, 14044477616111843029n, 2493940825248868159n, 17555597020139803786n, 7729112049988473103n, 10972248137587377366n, 9442381049670183593n, 13715310171984221708n, 2579604275232953683n, 17144137714980277135n, 3224505344041192104n, 10715086071862673209n, 8932844867666826921n, 13393857589828341511n, 15777742103010921555n, 16742321987285426889n, 15110491610336264040n, 10463951242053391806n, 2526528228819083169n, 13079939052566739757n, 12381532322878629770n, 16349923815708424697n, 1641857348316123500n, 10218702384817765435n, 12555375888766046947n, 12773377981022206794n, 11082533842530170780n, 15966722476277758493n, 4629795266307937667n, 9979201547673599058n, 5199465050656154994n, 12474001934591998822n, 15722703350174969551n, 15592502418239998528n, 10430007150863936130n, 9745314011399999080n, 6518754469289960081n, 12181642514249998850n, 8148443086612450102n, 15227053142812498563n, 962181821410786819n, 9516908214257811601n, 16742264702877599426n, 11896135267822264502n, 7092772823314835570n, 14870169084777830627n, 18089338065998320271n, 9293855677986144142n, 8999993282035256217n, 11617319597482680178n, 2026619565689294464n, 14521649496853350222n, 11756646493966393888n, 18152061871066687778n, 5472436080603216552n, 11345038669416679861n, 8031958568804398249n, 14181298336770849826n, 14651634229432885715n, 17726622920963562283n, 9091170749936331336n, 11079139325602226427n, 3376138709496513133n, 13848924157002783033n, 18055231442152805128n, 17311155196253478792n, 8733981247408842698n, 10819471997658424245n, 5458738279630526686n, 13524339997073030306n, 11435108867965546262n, 16905424996341287883n, 5070514048102157020n, 10565890622713304927n, 863228270850154185n, 13207363278391631158n, 14914093393844856443n, 16509204097989538948n, 9419244705451294746n, 10318252561243461842n, 15110399977761835024n, 12897815701554327303n, 9664627935347517973n, 16122269626942909129n, 7469098900757009562n, 10076418516839318205n, 16197401859041600736n, 12595523146049147757n, 6411694268519837208n, 15744403932561434696n, 12626303854077184414n, 9840252457850896685n, 7891439908798240259n, 12300315572313620856n, 14475985904425188227n, 15375394465392026070n, 18094982380531485284n, 9609621540870016294n, 6697677969404790399n, 12012026926087520367n, 17595469498610763806n, 15015033657609400459n, 17382650854836066854n, 9384396036005875287n, 8558313775058847832n, 11730495045007344109n, 6086206200396171886n, 14663118806259180136n, 12219443768922602761n, 18328898507823975170n, 15274304711153253452n, 11455561567389984481n, 14158126462898171311n, 14319451959237480602n, 3862600023340550427n, 17899314949046850752n, 14051622066030463842n, 11187071843154281720n, 8782263791269039901n, 13983839803942852150n, 10977829739086299876n, 17479799754928565188n, 4498915137003099037n, 10924874846830353242n, 12035193997481712706n, 13656093558537941553n, 5820620459997365075n, 17070116948172426941n, 11887461593424094248n, 10668823092607766838n, 9735506505103752857n, 13336028865759708548n, 2946011094524915263n, 16670036082199635685n, 3682513868156144079n, 10418772551374772303n, 4607414176811284001n, 13023465689218465379n, 1147581702586717097n, 16279332111523081723n, 15269535183515560084n, 10174582569701926077n, 7237616480483531100n, 12718228212127407596n, 13658706619031801779n, 15897785265159259495n, 17073383273789752224n, 9936115790724537184n, 17588393573759676996n, 12420144738405671481n, 3538747893490044629n, 15525180923007089351n, 9035120885289943691n, 9703238076879430844n, 12564479580947296663n, 12129047596099288555n, 15705599476184120828n, 15161309495124110694n, 15020313326802763131n, 9475818434452569184n, 4776009810824339053n, 11844773043065711480n, 5970012263530423816n, 14805966303832139350n, 7462515329413029771n, 9253728939895087094n, 52386062455755702n, 11567161174868858867n, 9288854614924470436n, 14458951468586073584n, 6999382250228200141n, 18073689335732591980n, 8749227812785250177n, 11296055834832869987n, 14691639419845557168n, 14120069793541087484n, 13752863256379558556n, 17650087241926359355n, 17191079070474448196n, 11031304526203974597n, 8438581409832836170n, 13789130657754968246n, 15159912780718433117n, 17236413322193710308n, 9726518939043265588n, 10772758326371068942n, 15302446373756816800n, 13465947907963836178n, 9904685930341245193n, 16832434884954795223n, 3157485376071780683n, 10520271803096747014n, 8890957387685944783n, 13150339753870933768n, 1890324697752655170n, 16437924692338667210n, 2362905872190818963n, 10273702932711667006n, 6088502188546649756n, 12842128665889583757n, 16833999772538088003n, 16052660832361979697n, 7207441660390446292n, 10032913020226237310n, 16033866083812498692n, 12541141275282796638n, 10818960567910847557n, 15676426594103495798n, 4300328673033783639n, 9797766621314684873n, 16522763475928278486n, 12247208276643356092n, 6818396289628184396n, 15309010345804195115n, 8522995362035230495n, 9568131466127621947n, 3021029092058325107n, 11960164332659527433n, 17611344420355070096n, 14950205415824409292n, 8179122470161673908n, 9343878384890255807n, 14335323580705822000n, 11679847981112819759n, 13307468457454889596n, 14599809976391024699n, 12022649553391224092n, 18249762470488780874n, 10416625923311642211n, 11406101544055488046n, 11122077220497164286n, 14257626930069360058n, 4679224488766679549n, 17822033662586700072n, 15072402647813125244n, 11138771039116687545n, 9420251654883203278n, 13923463798895859431n, 16387000587031392001n, 17404329748619824289n, 15872064715361852097n, 10877706092887390181n, 3002511419460075705n, 13597132616109237726n, 8364825292752482535n, 16996415770136547158n, 1232659579085827361n, 10622759856335341973n, 14605470292210805812n, 13278449820419177467n, 4421779809981343554n, 16598062275523971834n, 915538744049291538n, 10373788922202482396n, 5183897733458195115n, 12967236152753102995n, 6479872166822743894n, 16209045190941378744n, 3488154190101041964n, 10130653244338361715n, 2180096368813151227n, 12663316555422952143n, 16560178516298602746n, 15829145694278690179n, 16088537126945865529n, 9893216058924181362n, 7749492695127472003n, 12366520073655226703n, 463493832054564196n, 15458150092069033378n, 14414425345350368957n, 9661343807543145861n, 13620701859271368502n, 12076679759428932327n, 3190819268807046916n, 15095849699286165408n, 17823582141290972357n, 9434906062053853380n, 11139738838306857723n, 11793632577567316725n, 13924673547883572154n, 14742040721959145907n, 3570783879572301480n, 18427550902448932383n, 18298537904747540562n, 11517219314030582739n, 18354115218108294707n, 14396524142538228424n, 18330958004207980480n, 17995655178172785531n, 4466953431550423984n, 11247284486357990957n, 486002885505321038n, 14059105607947488696n, 5219189625309039202n, 17573882009934360870n, 6523987031636299002n, 10983676256208975543n, 17912549950054850588n, 13729595320261219429n, 17779001419141175331n, 17161994150326524287n, 8388693718644305452n, 10726246343954077679n, 12160462601793772764n, 13407807929942597099n, 10588892233814828051n, 16759759912428246374n, 8624429273841147159n, 10474849945267653984n, 778582277723329070n, 13093562431584567480n, 973227847154161338n, 16366953039480709350n, 1216534808942701673n, 10229345649675443343n, 14595392310871352257n, 12786682062094304179n, 13632554370161802418n, 15983352577617880224n, 12429006944274865118n, 9989595361011175140n, 7768129340171790699n, 12486994201263968925n, 9710161675214738374n, 15608742751579961156n, 16749388112445810871n, 9755464219737475723n, 1244995533423855986n, 12194330274671844653n, 15391302472061983695n, 15242912843339805817n, 5404070034795315907n, 9526820527087378635n, 14906758817815542202n, 11908525658859223294n, 14021762503842039848n, 14885657073574029118n, 8303831092947774002n, 9303535670983768199n, 578208414664970847n, 11629419588729710248n, 14557818573613377271n, 14536774485912137810n, 18197273217016721589n, 18170968107390172263n, 13523219484416126178n, 11356855067118857664n, 15369541205401160717n, 14196068833898572081n, 765182433041899281n, 17745086042373215101n, 5568164059729762005n, 11090678776483259438n, 5785945546544795205n, 13863348470604074297n, 16455803970035769814n, 17329185588255092872n, 6734696907262548556n, 10830740992659433045n, 4209185567039092847n, 13538426240824291306n, 9873167977226253963n, 16923032801030364133n, 3118087934678041646n, 10576895500643977583n, 4254647968387469981n, 13221119375804971979n, 706623942056949572n, 16526399219756214973n, 14718337982853350677n, 10328999512347634358n, 11504804248497038125n, 12911249390434542948n, 5157633273766521849n, 16139061738043178685n, 6447041592208152311n, 10086913586276986678n, 6335244004343789146n, 12608641982846233347n, 17142427042284512241n, 15760802478557791684n, 16816347784428252397n, 9850501549098619803n, 1286845328412881940n, 12313126936373274753n, 15443614715798266137n, 15391408670466593442n, 5469460339465668959n, 9619630419041620901n, 8030098730593431003n, 12024538023802026126n, 14649309431669176658n, 15030672529752532658n, 9088264752731695015n, 9394170331095332911n, 10291851488884697288n, 11742712913869166139n, 8253128342678483706n, 14678391142336457674n, 5704724409920716729n, 18347988927920572092n, 16354277549255671720n, 11467493079950357558n, 998051431430019017n, 14334366349937946947n, 10470936326142299579n, 17917957937422433684n, 8476984389250486570n, 11198723710889021052n, 14521487280136329914n, 13998404638611276315n, 18151859100170412392n, 17498005798264095394n, 18078137856785627587n, 10936253623915059621n, 15910522178918405146n, 13670317029893824527n, 6053094668365842720n, 17087896287367280659n, 2954682317029915496n, 10679935179604550411n, 17987577512639554849n, 13349918974505688014n, 17872785872372055657n, 16687398718132110018n, 13117610303610293764n, 10429624198832568761n, 12810192458183821506n, 13037030248540710952n, 2177682517447613171n, 16296287810675888690n, 2722103146809516464n, 10185179881672430431n, 6313000485183335694n, 12731474852090538039n, 3279564588051781713n, 15914343565113172548n, 17934513790346890853n, 9946464728195732843n, 1985699082112030975n, 12433080910244666053n, 16317181907922202431n, 15541351137805832567n, 6561419329620589327n, 9713344461128645354n, 11018416108653950185n, 12141680576410806693n, 4549648098962661924n, 15177100720513508366n, 10298746142130715309n, 9485687950320942729n, 1825030320404309164n, 11857109937901178411n, 6892973918932774359n, 14821387422376473014n, 4004531380238580045n, 9263367138985295633n, 16337890167931276240n, 11579208923731619542n, 6587304654631931588n, 14474011154664524427n, 17457502855144690293n, 18092513943330655534n, 17210192550503474962n, 11307821214581659709n, 6144684325637283947n, 14134776518227074636n, 12292541425473992838n, 17668470647783843295n, 15365676781842491048n, 11042794154864902059n, 16521077016292638761n, 13803492693581127574n, 16039660251938410547n, 17254365866976409468n, 10826203278068237376n, 10783978666860255917n, 15989749085647424168n, 13479973333575319897n, 6152128301777116498n, 16849966666969149871n, 12301846395648783526n, 10531229166855718669n, 14606183024921571560n, 13164036458569648337n, 4422670725869800738n, 16455045573212060421n, 10140024425764638826n, 10284403483257537763n, 8643358275316593218n, 12855504354071922204n, 6192511825718353619n, 16069380442589902755n, 7740639782147942024n, 10043362776618689222n, 2532056854628769813n, 12554203470773361527n, 12388443105140738074n, 15692754338466701909n, 10873867862998534689n, 9807971461541688693n, 9102010423587778132n, 12259964326927110866n, 15989199047912110569n, 15324955408658888583n, 10763126773035362404n, 9578097130411805364n, 13644483260788183358n, 11972621413014756705n, 17055604075985229198n, 14965776766268445882n, 7484447039699372786n, 9353610478917778676n, 9289465418239495895n, 11692013098647223345n, 11611831772799369869n, 14615016373309029182n, 679731660717048624n, 18268770466636286477n, 10073036612751086588n, 11417981541647679048n, 8601490892183123069n, 14272476927059598810n, 10751863615228903837n, 17840596158824498513n, 4216457482181353988n, 11150372599265311570n, 14164500972431816002n, 13937965749081639463n, 8482254178684994195n, 17422457186352049329n, 5991131704928854840n, 10889035741470030830n, 15273672361649004035n, 13611294676837538538n, 9868718415206479236n, 17014118346046923173n, 3112525982153323237n, 10633823966279326983n, 4251171748059520975n, 13292279957849158729n, 702278666647013314n, 16615349947311448411n, 5489534351736154547n, 10384593717069655257n, 1125115960621402640n, 12980742146337069071n, 6018080969204141204n, 16225927682921336339n, 2910915193077788601n, 10141204801825835211n, 17960223060169475539n, 12676506002282294014n, 17838592806784456520n, 15845632502852867518n, 13074868971625794843n, 9903520314283042199n, 3560107088838733872n, 12379400392853802748n, 18285191916330581053n, 15474250491067253436n, 4409745821703674700n, 9671406556917033397n, 11979463175419572495n, 12089258196146291747n, 1139270913992301907n, 15111572745182864683n, 15259146697772541096n, 9444732965739290427n, 7231123676894144233n, 11805916207174113034n, 4427218577690292387n, 14757395258967641292n, 14757395258967641292n, 9223372036854775808n, 0n, 11529215046068469760n, 0n, 14411518807585587200n, 0n, 18014398509481984000n, 0n, 11258999068426240000n, 0n, 14073748835532800000n, 0n, 17592186044416000000n, 0n, 10995116277760000000n, 0n, 13743895347200000000n, 0n, 17179869184000000000n, 0n, 10737418240000000000n, 0n, 13421772800000000000n, 0n, 16777216000000000000n, 0n, 10485760000000000000n, 0n, 13107200000000000000n, 0n, 16384000000000000000n, 0n, 10240000000000000000n, 0n, 12800000000000000000n, 0n, 16000000000000000000n, 0n, 10000000000000000000n, 0n, 12500000000000000000n, 0n, 15625000000000000000n, 0n, 9765625000000000000n, 0n, 12207031250000000000n, 0n, 15258789062500000000n, 0n, 9536743164062500000n, 0n, 11920928955078125000n, 0n, 14901161193847656250n, 0n, 9313225746154785156n, 4611686018427387904n, 11641532182693481445n, 5764607523034234880n, 14551915228366851806n, 11817445422220181504n, 18189894035458564758n, 5548434740920451072n, 11368683772161602973n, 17302829768357445632n, 14210854715202003717n, 7793479155164643328n, 17763568394002504646n, 14353534962383192064n, 11102230246251565404n, 4359273333062107136n, 13877787807814456755n, 5449091666327633920n, 17347234759768070944n, 2199678564482154496n, 10842021724855044340n, 1374799102801346560n, 13552527156068805425n, 1718498878501683200n, 16940658945086006781n, 6759809616554491904n, 10587911840678754238n, 6530724019560251392n, 13234889800848442797n, 17386777061305090048n, 16543612251060553497n, 7898413271349198848n, 10339757656912845935n, 16465723340661719040n, 12924697071141057419n, 15970468157399760896n, 16155871338926321774n, 15351399178322313216n, 10097419586828951109n, 4982938468024057856n, 12621774483536188886n, 10840359103457460224n, 15777218104420236108n, 4327076842467049472n, 9860761315262647567n, 11927795063396681728n, 12325951644078309459n, 10298057810818464256n, 15407439555097886824n, 8260886245095692416n, 9629649721936179265n, 5163053903184807760n, 12037062152420224081n, 11065503397408397604n, 15046327690525280101n, 18443565265187884909n, 9403954806578300063n, 13833071299956122020n, 11754943508222875079n, 12679653106517764621n, 14693679385278593849n, 11237880364719817872n, 18367099231598242312n, 212292400617608628n, 11479437019748901445n, 132682750386005392n, 14349296274686126806n, 4777539456409894645n, 17936620343357658507n, 15195296357367144114n, 11210387714598536567n, 7191217214140771119n, 14012984643248170709n, 4377335499248575995n, 17516230804060213386n, 10083355392488107898n, 10947644252537633366n, 10913783138732455340n, 13684555315672041708n, 4418856886560793367n, 17105694144590052135n, 5523571108200991709n, 10691058840368782584n, 10369760970266701674n, 13363823550460978230n, 12962201212833377092n, 16704779438076222788n, 6979379479186945558n, 10440487148797639242n, 13585484211346616781n, 13050608935997049053n, 7758483227328495169n, 16313261169996311316n, 14309790052588006865n, 10195788231247694572n, 18166990819722280098n, 12744735289059618216n, 4261994450943298507n, 15930919111324522770n, 5327493063679123134n, 9956824444577826731n, 7941369183226839863n, 12446030555722283414n, 5315025460606161924n, 15557538194652854267n, 15867153862612478214n, 9723461371658033917n, 7611128154919104931n, 12154326714572542396n, 14125596212076269068n, 15192908393215677995n, 17656995265095336336n, 9495567745759798747n, 8729779031470891258n, 11869459682199748434n, 6300537770911226168n, 14836824602749685542n, 17099044250493808518n, 9273015376718553464n, 6075216638131242420n, 11591269220898191830n, 7594020797664053025n, 14489086526122739788n, 269153960225290473n, 18111358157653424735n, 336442450281613091n, 11319598848533390459n, 7127805559067090038n, 14149498560666738074n, 4298070930406474644n, 17686873200833422592n, 14595960699862869113n, 11054295750520889120n, 9122475437414293195n, 13817869688151111400n, 11403094296767866494n, 17272337110188889250n, 14253867870959833118n, 10795210693868055781n, 13520353437777283602n, 13494013367335069727n, 3065383741939440791n, 16867516709168837158n, 17666787732706464701n, 10542197943230523224n, 6430056314514152534n, 13177747429038154030n, 8037570393142690668n, 16472184286297692538n, 823590954573587527n, 10295115178936057836n, 5126430365035880108n, 12868893973670072295n, 6408037956294850135n, 16086117467087590369n, 3398361426941174765n, 10053823416929743980n, 13653190937906703988n, 12567279271162179975n, 17066488672383379985n, 15709099088952724969n, 16721424822051837077n, 9818186930595453106n, 3533361486141316317n, 12272733663244316382n, 13640073894531421205n, 15340917079055395478n, 7826720331309500698n, 9588073174409622174n, 280014188641050032n, 11985091468012027717n, 9573389772656088348n, 14981364335015034646n, 16578423234247498339n, 9363352709384396654n, 5749828502977298558n, 11704190886730495817n, 16410657665576399005n, 14630238608413119772n, 6678264026688335045n, 18287798260516399715n, 8347830033360418806n, 11429873912822749822n, 2911550761636567802n, 14287342391028437277n, 12862810488900485560n, 17859177988785546597n, 2243455055843443238n, 11161986242990966623n, 3708002419115845976n, 13952482803738708279n, 23317005467419566n, 17440603504673385348n, 13864204312116438170n, 10900377190420865842n, 17888499731927549664n, 13625471488026082303n, 13137252628054661272n, 17031839360032602879n, 11809879766640938686n, 10644899600020376799n, 14298703881791668535n, 13306124500025470999n, 13261693833812197764n, 16632655625031838749n, 11965431273837859301n, 10395409765644899218n, 9784237555362356015n, 12994262207056124023n, 3006924907348169211n, 16242827758820155028n, 17593714189467375226n, 10151767349262596893n, 1772699331562333708n, 12689709186578246116n, 6827560182880305039n, 15862136483222807645n, 8534450228600381299n, 9913835302014254778n, 7639874402088932264n, 12392294127517818473n, 326470965756389522n, 15490367659397273091n, 5019774725622874806n, 9681479787123295682n, 831516194300602802n, 12101849733904119602n, 10262767279730529310n, 15127312167380149503n, 3605087062808385830n, 9454570104612593439n, 9170708441896323000n, 11818212630765741799n, 6851699533943015846n, 14772765788457177249n, 3952938399001381903n, 9232978617785735780n, 13999801545444333449n, 11541223272232169725n, 17499751931805416812n, 14426529090290212157n, 8039631859474607303n, 18033161362862765196n, 14661225842770647033n, 11270725851789228247n, 18386638188586430203n, 14088407314736535309n, 18371611717305649850n, 17610509143420669137n, 9129456591349898601n, 11006568214637918210n, 17235125415662156385n, 13758210268297397763n, 12320534732722919674n, 17197762835371747204n, 10788982397476261688n, 10748601772107342002n, 15966486035277439363n, 13435752215134177503n, 10734735507242023396n, 16794690268917721879n, 8806733365625141341n, 10496681418073576174n, 12421737381156795194n, 13120851772591970218n, 6303799689591218185n, 16401064715739962772n, 17103121648843798539n, 10250665447337476733n, 1466078993672598279n, 12813331809171845916n, 6444284760518135752n, 16016664761464807395n, 8055355950647669691n, 10010415475915504622n, 2728754459941099604n, 12513019344894380777n, 12634315111781150314n, 15641274181117975972n, 1957835834444274180n, 9775796363198734982n, 10447019433382447170n, 12219745453998418728n, 3835402254873283155n, 15274681817498023410n, 4794252818591603944n, 9546676135936264631n, 7608094030047140369n, 11933345169920330789n, 4898431519131537557n, 14916681462400413486n, 10734725417341809851n, 9322925914000258429n, 2097517367411243253n, 11653657392500323036n, 7233582727691441970n, 14567071740625403795n, 9041978409614302462n, 18208839675781754744n, 6690786993590490174n, 11380524797363596715n, 4181741870994056359n, 14225655996704495894n, 615491320315182544n, 17782069995880619867n, 9992736187248753989n, 11113793747425387417n, 3939617107816777291n, 13892242184281734271n, 9536207403198359517n, 17365302730352167839n, 7308573235570561493n, 10853314206470104899n, 11485387299872682789n, 13566642758087631124n, 9745048106413465582n, 16958303447609538905n, 12181310133016831978n, 10598939654755961816n, 695789805494438130n, 13248674568444952270n, 869737256868047663n, 16560843210556190337n, 10310543607939835386n, 10350527006597618960n, 17973304801030866876n, 12938158758247023701n, 4019886927579031980n, 16172698447808779626n, 9636544677901177879n, 10107936529880487266n, 10634526442115624078n, 12634920662350609083n, 4069786015789754290n, 15793650827938261354n, 475546501309804958n, 9871031767461413346n, 4908902581746016003n, 12338789709326766682n, 15359500264037295811n, 15423487136658458353n, 9976003293191843956n, 9639679460411536470n, 17764217104313372233n, 12049599325514420588n, 12981899343536939483n, 15061999156893025735n, 16227374179421174354n, 9413749473058141084n, 17059637889779315827n, 11767186841322676356n, 2877803288514593168n, 14708983551653345445n, 3597254110643241460n, 18386229439566681806n, 9108253656731439729n, 11491393399729176129n, 1080972517029761926n, 14364241749661470161n, 5962901664714590312n, 17955302187076837701n, 12065313099320625794n, 11222063866923023563n, 9846663696289085073n, 14027579833653779454n, 7696643601933968437n, 17534474792067224318n, 397432465562684739n, 10959046745042015198n, 14083453346258841674n, 13698808431302518998n, 8380944645968776284n, 17123510539128148748n, 1252808770606194547n, 10702194086955092967n, 10006377518483647400n, 13377742608693866209n, 7896285879677171346n, 16722178260867332761n, 14482043368023852087n, 10451361413042082976n, 2133748077373825698n, 13064201766302603720n, 2667185096717282123n, 16330252207878254650n, 3333981370896602653n, 10206407629923909156n, 6695424375237764562n, 12758009537404886445n, 8369280469047205703n, 15947511921756108056n, 15073286604736395033n, 9967194951097567535n, 9420804127960246895n, 12458993688871959419n, 7164319141522920715n, 15573742111089949274n, 4343712908476262990n, 9733588819431218296n, 7326506586225052273n, 12166986024289022870n, 9158133232781315341n, 15208732530361278588n, 2224294504121868368n, 9505457831475799117n, 10613556101930943538n, 11881822289344748896n, 17878631145841067327n, 14852277861680936121n, 3901544858591782542n, 9282673663550585075n, 13967680582688333849n, 11603342079438231344n, 12847914709933029407n, 14504177599297789180n, 16059893387416286759n, 18130221999122236476n, 1628122660560806833n, 11331388749451397797n, 10240948699705280078n, 14164235936814247246n, 17412871893058988002n, 17705294921017809058n, 12542717829468959195n, 11065809325636130661n, 12450884661845487401n, 13832261657045163327n, 1728547772024695539n, 17290327071306454158n, 15995742770313033136n, 10806454419566533849n, 5385653213018257806n, 13508068024458167311n, 11343752534700210161n, 16885085030572709139n, 9568004649947874797n, 10553178144107943212n, 3674159897003727796n, 13191472680134929015n, 4592699871254659745n, 16489340850168661269n, 1129188820640936778n, 10305838031355413293n, 3011586022114279438n, 12882297539194266616n, 8376168546070237202n, 16102871923992833270n, 10470210682587796502n, 10064294952495520794n, 1932195658189984910n, 12580368690619400992n, 11638616609592256945n, 15725460863274251240n, 14548270761990321182n, 9828413039546407025n, 9092669226243950738n, 12285516299433008781n, 15977522551232326327n, 15356895374291260977n, 6136845133758244197n, 9598059608932038110n, 15364743254667372383n, 11997574511165047638n, 9982557031479439671n, 14996968138956309548n, 3254824252494523781n, 9373105086847693467n, 11257637194663853171n, 11716381358559616834n, 9460360474902428559n, 14645476698199521043n, 2602078556773259891n, 18306845872749401303n, 17087656251248738576n, 11441778670468375814n, 17597314184671543466n, 14302223338085469768n, 12773270693984653525n, 17877779172606837210n, 15966588367480816906n, 11173611982879273256n, 14590803748102898470n, 13967014978599091570n, 18238504685128623088n, 17458768723248864463n, 13574758819556003052n, 10911730452030540289n, 15401753289863583763n, 13639663065038175362n, 5417133557047315992n, 17049578831297719202n, 15994788983163920798n, 10655986769561074501n, 14608429132904838403n, 13319983461951343127n, 4425478360848884291n, 16649979327439178909n, 920161932633717460n, 10406237079649486818n, 2880944217109767365n, 13007796349561858522n, 12824552308241985014n, 16259745436952323153n, 6807318348447705459n, 10162340898095201970n, 15783789013848285672n, 12702926122619002463n, 10506364230455581282n, 15878657653273753079n, 8521269269642088699n, 9924161033296095674n, 12243322321167387293n, 12405201291620119593n, 6080780864604458308n, 15506501614525149491n, 12212662099182960789n, 9691563509078218432n, 5327070802775656541n, 12114454386347773040n, 6658838503469570676n, 15143067982934716300n, 8323548129336963345n, 9464417489334197687n, 14425589617690377899n, 11830521861667747109n, 13420301003685584469n, 14788152327084683887n, 2940318199324816875n, 9242595204427927429n, 8755227902219092403n, 11553244005534909286n, 15555720896201253407n, 14441555006918636608n, 10221279083396790951n, 18051943758648295760n, 12776598854245988689n, 11282464849155184850n, 7985374283903742931n, 14103081061443981063n, 758345818024902856n, 17628851326804976328n, 14782990327813292282n, 11018032079253110205n, 9239368954883307676n, 13772540099066387756n, 16160897212031522499n, 17215675123832984696n, 1754377441329851508n, 10759796952395615435n, 1096485900831157192n, 13449746190494519293n, 15205665431321110202n, 16812182738118149117n, 5172023733869224041n, 10507614211323843198n, 5538357842881958977n, 13134517764154803997n, 16146319340457224530n, 16418147205193504997n, 6347841120289366950n, 10261342003245940623n, 6273243709394548296n, 12826677504057425779n, 3229868618315797466n, 16033346880071782223n, 17872393828176910545n, 10020841800044863889n, 18087775170251650946n, 12526052250056079862n, 8774660907532399971n, 15657565312570099828n, 1744954097560724156n, 9785978320356312392n, 10313968347830228405n, 12232472900445390490n, 12892460434787785506n, 15290591125556738113n, 6892203506629956075n, 9556619453472961320n, 15836842237712192307n, 11945774316841201651n, 1349308723430688768n, 14932217896051502063n, 15521693959570524672n, 9332636185032188789n, 16618587752372659776n, 11665795231290235987n, 6938176635183661008n, 14582244039112794984n, 4061034775552188356n, 18227805048890993730n, 5076293469440235445n, 11392378155556871081n, 7784369436827535057n, 14240472694446088851n, 14342147814461806725n, 17800590868057611064n, 13315998749649870503n, 11125369292536006915n, 8322499218531169064n, 13906711615670008644n, 5791438004736573426n, 17383389519587510805n, 7239297505920716783n, 10864618449742194253n, 6830403950414141941n, 13580773062177742816n, 13149690956445065330n, 16975966327722178520n, 16437113695556331663n, 10609978954826361575n, 10273196059722707289n, 13262473693532951969n, 8229809056225996208n, 16578092116916189961n, 14898947338709883164n, 10361307573072618726n, 2394313059052595121n, 12951634466340773407n, 12216263360670519709n, 16189543082925966759n, 10658643182410761733n, 10118464426828729224n, 13579181016647807939n, 12648080533535911530n, 16973976270809759924n, 15810100666919889413n, 11994098301657424097n, 9881312916824930883n, 9802154447749584012n, 12351641146031163604n, 7641007041259592112n, 15439551432538954505n, 9551258801574490140n, 9649719645336846565n, 17498751797052526097n, 12062149556671058207n, 8038381691033493909n, 15077686945838822759n, 5436291095364479483n];
const _M0FPC28internal7strconv12double__info = new _M0TPC28internal7strconv9FloatInfo(52, 11, -1023);
const _M0FPC28internal7strconv25min__exponent__fast__path = 18446744073709551594n;
const _M0FPC28internal7strconv25max__exponent__fast__path = 22n;
const _M0FPC28internal7strconv36max__exponent__disguised__fast__path = 37n;
const _M0FPC28internal7strconv25max__mantissa__fast__path = 9007199254740992n;
const _M0FPC28internal7strconv6powtab = [1, 3, 6, 9, 13, 16, 19, 23, 26, 29, 33, 36, 39, 43, 46, 49, 53, 56, 59];
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1023 = { _0: 0, _1: "" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1024 = { _0: 1, _1: "5" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1025 = { _0: 1, _1: "25" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1026 = { _0: 1, _1: "125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1027 = { _0: 2, _1: "625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1028 = { _0: 2, _1: "3125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1029 = { _0: 2, _1: "15625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1030 = { _0: 3, _1: "78125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1031 = { _0: 3, _1: "390625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1032 = { _0: 3, _1: "1953125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1033 = { _0: 4, _1: "9765625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1034 = { _0: 4, _1: "48828125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1035 = { _0: 4, _1: "244140625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1036 = { _0: 4, _1: "1220703125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1037 = { _0: 5, _1: "6103515625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1038 = { _0: 5, _1: "30517578125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1039 = { _0: 5, _1: "152587890625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1040 = { _0: 6, _1: "762939453125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1041 = { _0: 6, _1: "3814697265625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1042 = { _0: 6, _1: "19073486328125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1043 = { _0: 7, _1: "95367431640625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1044 = { _0: 7, _1: "476837158203125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1045 = { _0: 7, _1: "2384185791015625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1046 = { _0: 7, _1: "11920928955078125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1047 = { _0: 8, _1: "59604644775390625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1048 = { _0: 8, _1: "298023223876953125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1049 = { _0: 8, _1: "1490116119384765625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1050 = { _0: 9, _1: "7450580596923828125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1051 = { _0: 9, _1: "37252902984619140625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1052 = { _0: 9, _1: "186264514923095703125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1053 = { _0: 10, _1: "931322574615478515625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1054 = { _0: 10, _1: "4656612873077392578125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1055 = { _0: 10, _1: "23283064365386962890625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1056 = { _0: 10, _1: "116415321826934814453125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1057 = { _0: 11, _1: "582076609134674072265625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1058 = { _0: 11, _1: "2910383045673370361328125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1059 = { _0: 11, _1: "14551915228366851806640625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1060 = { _0: 12, _1: "72759576141834259033203125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1061 = { _0: 12, _1: "363797880709171295166015625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1062 = { _0: 12, _1: "1818989403545856475830078125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1063 = { _0: 13, _1: "9094947017729282379150390625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1064 = { _0: 13, _1: "45474735088646411895751953125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1065 = { _0: 13, _1: "227373675443232059478759765625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1066 = { _0: 13, _1: "1136868377216160297393798828125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1067 = { _0: 14, _1: "5684341886080801486968994140625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1068 = { _0: 14, _1: "28421709430404007434844970703125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1069 = { _0: 14, _1: "142108547152020037174224853515625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1070 = { _0: 15, _1: "710542735760100185871124267578125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1071 = { _0: 15, _1: "3552713678800500929355621337890625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1072 = { _0: 15, _1: "17763568394002504646778106689453125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1073 = { _0: 16, _1: "88817841970012523233890533447265625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1074 = { _0: 16, _1: "444089209850062616169452667236328125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1075 = { _0: 16, _1: "2220446049250313080847263336181640625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1076 = { _0: 16, _1: "11102230246251565404236316680908203125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1077 = { _0: 17, _1: "55511151231257827021181583404541015625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1078 = { _0: 17, _1: "277555756156289135105907917022705078125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1079 = { _0: 17, _1: "1387778780781445675529539585113525390625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1080 = { _0: 18, _1: "6938893903907228377647697925567626953125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1081 = { _0: 18, _1: "34694469519536141888238489627838134765625" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1082 = { _0: 18, _1: "173472347597680709441192448139190673828125" };
const _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1083 = { _0: 19, _1: "867361737988403547205962240695953369140625" };
const _M0FPC28internal7strconv19left__shift__cheats = [_M0FPC28internal7strconv19left__shift__cheatsN5tupleS1023, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1024, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1025, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1026, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1027, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1028, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1029, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1030, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1031, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1032, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1033, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1034, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1035, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1036, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1037, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1038, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1039, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1040, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1041, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1042, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1043, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1044, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1045, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1046, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1047, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1048, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1049, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1050, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1051, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1052, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1053, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1054, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1055, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1056, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1057, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1058, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1059, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1060, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1061, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1062, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1063, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1064, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1065, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1066, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1067, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1068, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1069, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1070, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1071, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1072, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1073, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1074, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1075, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1076, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1077, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1078, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1079, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1080, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1081, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1082, _M0FPC28internal7strconv19left__shift__cheatsN5tupleS1083];
const _M0FPC28internal7strconv10int__pow10 = [1n, 10n, 100n, 1000n, 10000n, 100000n, 1000000n, 10000000n, 100000000n, 1000000000n, 10000000000n, 100000000000n, 1000000000000n, 10000000000000n, 100000000000000n, 1000000000000000n];
const _M0FPC28internal7strconv5table = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000, 1e+012, 1e+013, 1e+014, 1e+015, 1e+016, 1e+017, 1e+018, 1e+019, 1e+020, 1e+021, 1e+022, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const _M0FPC28internal7strconv12checked__mulN6constrS1164 = 0n;
const _M0FPC14json17int__pow10__table = [1n, 10n, 100n, 1000n, 10000n, 100000n, 1000000n, 10000000n, 100000000n, 1000000000n, 10000000000n, 100000000000n, 1000000000000n, 10000000000000n, 100000000000000n, 1000000000000000n];
const _M0FPC14json12pow10__table = [1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000, 1000000000, 10000000000, 100000000000, 1e+012, 1e+013, 1e+014, 1e+015, 1e+016, 1e+017, 1e+018, 1e+019, 1e+020, 1e+021, 1e+022, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const _M0IPC14json8JsonPathPB4Show6outputN7_2abindS1595 = "~/";
const _M0FPC14json12checked__mulN6constrS1891 = 0n;
const _M0MPC16string10StringView4findN6constrS9865 = 0;
const _M0FPB4seed = _M0FPB12random__seed();
const _M0FPC15debug6renderN6constrS1705 = 16;
const _bind = [];
const _M0FP411localreview4amqp3cmd3web8sessions = _M0MPB3Map3MapGsRP211localreview4amqp7SessionE(new _M0TPB9ArrayViewGUsRP211localreview4amqp7SessionEE(_bind, 0, 0), undefined);
const _M0FPC28internal7strconv17check__underscoreN25_2atransition__table__222S230 = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4, 5, 5, 5, 5, 5, 0, 1, 2, 5];
const _M0FPC28internal7strconv15parse__inf__nanN25_2atransition__table__304S312 = [14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 3, 4, 14, 14, 14, 14, 14, 14, 14, 7, 14, 14, 14, 14, 5, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 6, 14, 14, 14, 0, 14, 14, 14, 14, 14, 14, 14, 14, 14, 8, 14, 14, 14, 14, 14, 1, 14, 14, 9, 14, 14, 14, 14, 14, 14, 14, 14, 10, 14, 14, 14, 14, 14, 14, 11, 14, 14, 14, 14, 14, 14, 14, 14, 14, 12, 14, 14, 14, 14, 14, 14, 14, 14, 13, 14, 1, 14, 14, 14, 14, 14, 14, 14];
const _M0IPC14json8JsonPathPC15debug5Debug8to__reprN6constrS1889 = "key";
const _M0IPC14json8JsonPathPC15debug5Debug8to__reprN6constrS1890 = "index";
function _M0FPC15abort5abortGRPC16string10StringViewE(msg) {
  return $panic();
}
function _M0FPC15abort5abortGkE(msg) {
  return $panic();
}
function _M0FPC15abort5abortGuE(msg) {
  $panic();
}
function _M0FPC15abort5abortGOiE(msg) {
  return $panic();
}
function _M0MPC14json4Json5array(array) {
  return new _M0DTPB4Json5Array(array);
}
function _M0IPC16string6StringPB6ToJson8to__json(self) {
  return new _M0DTPB4Json6String(self);
}
function _M0MPB6Logger13write__objectGRPC14json8JsonPathE(self, obj) {
  _M0IPC14json8JsonPathPB4Show6output(obj, self);
}
function _M0MPB6Logger13write__objectGsE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGsE(obj, self);
}
function _M0MPB6Logger13write__objectGiE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGiE(obj, self);
}
function _M0IPB7FailurePB4Show6output(_x_5578, _x_5579) {
  const _Failure = _x_5578;
  const _$42$arg_5580 = _Failure._0;
  _x_5579.method_table.method_0(_x_5579.self, "Failure(");
  _M0MPB6Logger13write__objectGsE(_x_5579, _$42$arg_5580);
  _x_5579.method_table.method_0(_x_5579.self, ")");
}
function _M0FPB4rotl(x, r) {
  return x << r | (x >>> (32 - r | 0) | 0);
}
function _M0FPB13consume4__acc(acc, input) {
  return Math.imul(_M0FPB4rotl((acc >>> 0) + ((Math.imul(input, -1028477379) | 0) >>> 0) | 0, 17), 668265263) | 0;
}
function _M0MPC15array10FixedArray12unsafe__blitGRPB17UnsafeMaybeUninitGyEE(dst, dst_offset, src, src_offset, len) {
  if (dst === src && dst_offset < src_offset) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        if (_tmp$2 >>> 0 < dst.length) {
          dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
        } else {
          $oob();
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  } else {
    let _tmp = len - 1 | 0;
    while (true) {
      const i = _tmp;
      if (i >= 0) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        if (_tmp$2 >>> 0 < dst.length) {
          dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
        } else {
          $oob();
        }
        _tmp = i - 1 | 0;
        continue;
      } else {
        return;
      }
    }
  }
}
function _M0MPC15array10FixedArray12unsafe__blitGyE(dst, dst_offset, src, src_offset, len) {
  if (dst === src && dst_offset < src_offset) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        if (_tmp$2 >>> 0 < dst.length) {
          dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
        } else {
          $oob();
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  } else {
    let _tmp = len - 1 | 0;
    while (true) {
      const i = _tmp;
      if (i >= 0) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        if (_tmp$2 >>> 0 < dst.length) {
          dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
        } else {
          $oob();
        }
        _tmp = i - 1 | 0;
        continue;
      } else {
        return;
      }
    }
  }
}
function _M0MPC15array10FixedArray12unsafe__blitGRPB17UnsafeMaybeUninitGsEE(dst, dst_offset, src, src_offset, len) {
  if (dst === src && dst_offset < src_offset) {
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < len) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        if (_tmp$2 >>> 0 < dst.length) {
          dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
        } else {
          $oob();
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        return;
      }
    }
  } else {
    let _tmp = len - 1 | 0;
    while (true) {
      const i = _tmp;
      if (i >= 0) {
        const _tmp$2 = dst_offset + i | 0;
        const _tmp$3 = src_offset + i | 0;
        if (_tmp$2 >>> 0 < dst.length) {
          dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
        } else {
          $oob();
        }
        _tmp = i - 1 | 0;
        continue;
      } else {
        return;
      }
    }
  }
}
function _M0MPB18UninitializedArray12unsafe__blitGyE(dst, dst_offset, src, src_offset, len) {
  _M0MPC15array10FixedArray12unsafe__blitGRPB17UnsafeMaybeUninitGyEE(dst, dst_offset, src, src_offset, len);
}
function _M0MPB18UninitializedArray12unsafe__blitGsE(dst, dst_offset, src, src_offset, len) {
  _M0MPC15array10FixedArray12unsafe__blitGRPB17UnsafeMaybeUninitGsEE(dst, dst_offset, src, src_offset, len);
}
function _M0MPB18UninitializedArray23unsafe__make__and__blitGyE(src, allocate_len, src_offset, dst_offset, blit_len) {
  const dst = new Uint8Array(allocate_len);
  _M0MPB18UninitializedArray12unsafe__blitGyE(dst, dst_offset, src, src_offset, blit_len);
  return dst;
}
function _M0MPB13StringBuilder13write__objectGdE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGdE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder13write__objectGsE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGsE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder13write__objectGRPC15error5ErrorE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGRPC15error5ErrorE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder13write__objectGiE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGiE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(self, obj) {
  _M0IPC16string10StringViewPB4Show6output(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPC13int3Int16unsafe__to__char(self) {
  return self;
}
function _M0MPC14byte4Byte8to__char(self) {
  return self;
}
function _M0MPB13StringBuilder21StringBuilder_2einner(size_hint) {
  return new _M0TPB13StringBuilder("");
}
function _M0MPB13StringBuilder10to__string(self) {
  return self.val;
}
function _M0IPB13StringBuilderPB6Logger11write__char(self, ch) {
  self.val = `${self.val}${String.fromCodePoint(ch)}`;
}
function _M0IPB13StringBuilderPB6Logger13write__string(self, str) {
  self.val = `${self.val}${str}`;
}
function _M0MPC16uint166UInt1622is__leading__surrogate(self) {
  return self >= 55296 && self <= 56319;
}
function _M0MPC16uint166UInt1623is__trailing__surrogate(self) {
  return self >= 56320 && self <= 57343;
}
function _M0FPB32code__point__of__surrogate__pair(leading, trailing) {
  return (((Math.imul(leading - 55296 | 0, 1024) | 0) + trailing | 0) - 56320 | 0) + 65536 | 0;
}
function _M0MPC16uint166UInt1616unsafe__to__char(self) {
  return self;
}
function _M0MPC16string6String16unsafe__char__at(self, index) {
  const c1 = self.charCodeAt(index);
  if (_M0MPC16uint166UInt1622is__leading__surrogate(c1)) {
    const c2 = self.charCodeAt(index + 1 | 0);
    return _M0FPB32code__point__of__surrogate__pair(c1, c2);
  } else {
    return _M0MPC16uint166UInt1616unsafe__to__char(c1);
  }
}
function _M0IPC14byte4BytePB3Add3add(self, that) {
  return (self + that | 0) & 255;
}
function _M0IPC14byte4BytePB3Div3div(self, that) {
  if (that === 0) {
    $panic();
  }
  return (self / that | 0) & 255;
}
function _M0IPC14byte4BytePB3Mod3mod(self, that) {
  if (that === 0) {
    $panic();
  }
  return (self % that | 0) & 255;
}
function _M0IPC14byte4BytePB3Sub3sub(self, that) {
  return (self - that | 0) & 255;
}
function _M0MPC14byte4Byte7to__hexN14to__hex__digitS3978(i) {
  return i < 10 ? _M0MPC14byte4Byte8to__char(_M0IPC14byte4BytePB3Add3add(i, 48)) : _M0MPC14byte4Byte8to__char(_M0IPC14byte4BytePB3Sub3sub(_M0IPC14byte4BytePB3Add3add(i, 97), 10));
}
function _M0MPC14byte4Byte7to__hex(b) {
  const _self = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0IPB13StringBuilderPB6Logger11write__char(_self, _M0MPC14byte4Byte7to__hexN14to__hex__digitS3978(_M0IPC14byte4BytePB3Div3div(b, 16)));
  _M0IPB13StringBuilderPB6Logger11write__char(_self, _M0MPC14byte4Byte7to__hexN14to__hex__digitS3978(_M0IPC14byte4BytePB3Mod3mod(b, 16)));
  return _M0MPB13StringBuilder10to__string(_self);
}
function _M0MPC16string10StringView6length(self) {
  return self.end - self.start | 0;
}
function _M0MPC16string10StringView11sub_2einner(self, start, end) {
  const str_len = self.str.length;
  let abs_end;
  if (end === undefined) {
    abs_end = self.end;
  } else {
    const _Some = end;
    const _end = _Some;
    abs_end = self.start + _end | 0;
  }
  const abs_start = self.start + start | 0;
  if (abs_start >= self.start && (abs_start <= abs_end && abs_end <= self.end)) {
    if (abs_start < str_len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.str.charCodeAt(abs_start))) {
      } else {
        $panic();
      }
    }
    if (abs_end < str_len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.str.charCodeAt(abs_end))) {
      } else {
        $panic();
      }
    }
    return new _M0TPC16string10StringView(self.str, abs_start, abs_end);
  } else {
    return $panic();
  }
}
function _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS3963(_env, seg, i) {
  const logger = _env._1;
  const self = _env._0;
  if (i > seg) {
    logger.method_table.method_2(logger.self, _M0MPC16string10StringView11sub_2einner(self, seg, i));
    return;
  } else {
    return;
  }
}
function _M0MPC16string10StringView18escape__to_2einner(self, logger, quote) {
  if (quote) {
    logger.method_table.method_3(logger.self, 34);
  }
  const len = self.end - self.start | 0;
  const _env = { _0: self, _1: logger };
  let _tmp = 0;
  let _tmp$2 = 0;
  _L: while (true) {
    const i = _tmp;
    const seg = _tmp$2;
    if (i >= len) {
      _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS3963(_env, seg, i);
      break;
    }
    const code = self.str.charCodeAt(self.start + i | 0);
    let c;
    _L$2: {
      switch (code) {
        case 34: {
          c = code;
          break _L$2;
        }
        case 92: {
          c = code;
          break _L$2;
        }
        case 10: {
          _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS3963(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\n");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        case 13: {
          _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS3963(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\r");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        case 8: {
          _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS3963(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\b");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        case 9: {
          _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS3963(_env, seg, i);
          logger.method_table.method_0(logger.self, "\\t");
          _tmp = i + 1 | 0;
          _tmp$2 = i + 1 | 0;
          continue _L;
        }
        default: {
          if (code < 32) {
            _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS3963(_env, seg, i);
            logger.method_table.method_0(logger.self, "\\u{");
            logger.method_table.method_0(logger.self, _M0MPC14byte4Byte7to__hex(code & 255));
            logger.method_table.method_3(logger.self, 125);
            _tmp = i + 1 | 0;
            _tmp$2 = i + 1 | 0;
            continue _L;
          } else {
            _tmp = i + 1 | 0;
            continue _L;
          }
        }
      }
    }
    _M0MPC16string10StringView18escape__to_2einnerN14flush__segmentS3963(_env, seg, i);
    logger.method_table.method_3(logger.self, 92);
    logger.method_table.method_3(logger.self, _M0MPC16uint166UInt1616unsafe__to__char(c));
    _tmp = i + 1 | 0;
    _tmp$2 = i + 1 | 0;
    continue;
  }
  if (quote) {
    logger.method_table.method_3(logger.self, 34);
    return;
  } else {
    return;
  }
}
function _M0MPC16string6String14escape_2einner(self, quote) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0MPC16string10StringView18escape__to_2einner(new _M0TPC16string10StringView(self, 0, self.length), { self: buf, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger }, quote);
  return _M0MPB13StringBuilder10to__string(buf);
}
function _M0MPC15array13ReadOnlyArray11unsafe__getGiE(self, index) {
  return self[index];
}
function _M0MPC16string10StringView12view_2einner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.end - self.start | 0;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= (self.end - self.start | 0)) ? new _M0TPC16string10StringView(self.str, self.start + start_offset | 0, self.start + end_offset$2 | 0) : _M0FPC15abort5abortGRPC16string10StringViewE("Invalid index for View");
}
function _M0MPC16uint646UInt648to__byte(self) {
  return (Number(BigInt.asIntN(32, self)) | 0) & 255;
}
function _M0IPC16uint166UInt16PB2Eq5equal(self, that) {
  return self === that;
}
function _M0IPC16uint166UInt16PB2Eq10not__equal(self, that) {
  return self !== that;
}
function _M0MPC14json4Json6number(number, repr) {
  return new _M0DTPB4Json6Number(number, repr);
}
function _M0MPC16uint166UInt168to__uint(self) {
  return self;
}
function _M0MPC13int3Int10to__uint64(self) {
  return BigInt.asUintN(64, BigInt(self));
}
function _M0IP016_24default__implPB2Eq10not__equalGsE(x, y) {
  return !(x === y);
}
function _M0IP016_24default__implPB2Eq10not__equalGOsE(x, y) {
  return !_M0IPC16option6OptionPB2Eq5equalGsE(x, y);
}
function _M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(x, y) {
  return !_M0IPC16string10StringViewPB2Eq5equal(x, y);
}
function _M0IP016_24default__implPB2Eq10not__equalGbE(x, y) {
  return !(x === y);
}
function _M0FPB14avalanche__acc(acc) {
  let acc$2 = acc;
  acc$2 = acc$2 ^ (acc$2 >>> 15 | 0);
  acc$2 = Math.imul(acc$2, -2048144777) | 0;
  acc$2 = acc$2 ^ (acc$2 >>> 13 | 0);
  acc$2 = Math.imul(acc$2, -1028477379) | 0;
  acc$2 = acc$2 ^ (acc$2 >>> 16 | 0);
  return acc$2;
}
function _M0FPB13finalize__acc(acc) {
  return _M0FPB14avalanche__acc(acc);
}
function _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE(self, show) {
  show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE(self, show) {
  show.method_table.method_0(show.self, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPC16string6String11sub_2einner(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end;
  }
  if (start >= 0 && (start <= end$2 && end$2 <= len)) {
    if (start < len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(start))) {
      } else {
        $panic();
      }
    }
    if (end$2 < len) {
      if (!_M0MPC16uint166UInt1623is__trailing__surrogate(self.charCodeAt(end$2))) {
      } else {
        $panic();
      }
    }
    return new _M0TPC16string10StringView(self, start, end$2);
  } else {
    return $panic();
  }
}
function _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(self, value, start, len) {
  _M0IPB13StringBuilderPB6Logger11write__view(self, _M0MPC16string6String11sub_2einner(value, start, start + len | 0));
}
function _M0MPC16string10StringView4data(self) {
  return self.str;
}
function _M0MPC16string10StringView13start__offset(self) {
  return self.start;
}
function _M0IP016_24default__implPB4Show6outputGdE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC16double6DoublePB4Show10to__string(self));
}
function _M0IP016_24default__implPB4Show6outputGsE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC16string6StringPB4Show10to__string(self));
}
function _M0IP016_24default__implPB4Show6outputGRPC15error5ErrorE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC15error5ErrorPB4Show10to__string(self));
}
function _M0IP016_24default__implPB4Show6outputGiE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC13int3IntPB4Show10to__string(self));
}
function _M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(self) {
  const logger = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0IPC15debug4ReprPB4Show6output(self, { self: logger, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  return _M0MPB13StringBuilder10to__string(logger);
}
function _M0IP016_24default__implPB4Show10to__stringGRPC14json15JsonDecodeErrorE(self) {
  const logger = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0IPC14json15JsonDecodeErrorPB4Show6output(self, { self: logger, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  return _M0MPB13StringBuilder10to__string(logger);
}
function _M0IP016_24default__implPB4Show10to__stringGRPC14json10ParseErrorE(self) {
  const logger = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0IPC14json10ParseErrorPB4Show6output(self, { self: logger, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  return _M0MPB13StringBuilder10to__string(logger);
}
function _M0IP016_24default__implPB4Show10to__stringGRPB7FailureE(self) {
  const logger = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0IPB7FailurePB4Show6output(self, { self: logger, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  return _M0MPB13StringBuilder10to__string(logger);
}
function _M0MPB4Iter4nextGRPC16string10StringViewE(self) {
  const _func = self.f;
  const result = _func();
  const _bind$2 = self.size_hint;
  if (result === undefined) {
    self.size_hint = _M0MPB4Iter4nextN6constrS9856GRPC16string10StringViewE;
  } else {
    if (_bind$2 === undefined) {
    } else {
      const _Some = _bind$2;
      const _n = _Some;
      self.size_hint = _n > 0 ? _n - 1 | 0 : _M0MPB4Iter4nextN6constrS9855GRPC16string10StringViewE;
    }
  }
  return result;
}
function _M0MPB4Iter4nextGcE(self) {
  const _func = self.f;
  const result = _func();
  const _bind$2 = self.size_hint;
  if (result === -1) {
    self.size_hint = _M0MPB4Iter4nextN6constrS9856GcE;
  } else {
    if (_bind$2 === undefined) {
    } else {
      const _Some = _bind$2;
      const _n = _Some;
      self.size_hint = _n > 0 ? _n - 1 | 0 : _M0MPB4Iter4nextN6constrS9855GcE;
    }
  }
  return result;
}
function _M0MPB4Iter4nextGyE(self) {
  const _func = self.f;
  const result = _func();
  const _bind$2 = self.size_hint;
  if (result === -1) {
    self.size_hint = _M0MPB4Iter4nextN6constrS9856GyE;
  } else {
    if (_bind$2 === undefined) {
    } else {
      const _Some = _bind$2;
      const _n = _Some;
      self.size_hint = _n > 0 ? _n - 1 | 0 : _M0MPB4Iter4nextN6constrS9855GyE;
    }
  }
  return result;
}
function _M0MPC13int3Int18to__string_2einner(self, radix) {
  return _M0FPB19int__to__string__js(self, radix);
}
function _M0MPC14uint4UInt18to__string_2einner(self, radix) {
  return _M0FPB20uint__to__string__js(self, radix);
}
function _M0MPC15int645Int6418to__string_2einner(self, radix) {
  return _M0FPB21int64__to__string__js(self, radix);
}
function _M0MPC16uint646UInt6418to__string_2einner(self, radix) {
  return _M0FPB22uint64__to__string__js(self, radix);
}
function _M0FPB22index__out__of__boundsGkE(len, index) {
  const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(60);
  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "index out of bounds: the len is from 0 to ");
  _M0MPB13StringBuilder13write__objectGiE(_string_builder, len);
  _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, " but the index is ");
  _M0MPB13StringBuilder13write__objectGiE(_string_builder, index);
  return _M0FPC15abort5abortGkE(_M0MPB13StringBuilder10to__string(_string_builder));
}
function _M0MPC16string10StringView2at(self, index) {
  return index >= 0 && index < (self.end - self.start | 0) ? self.str.charCodeAt(self.start + index | 0) : _M0FPB22index__out__of__boundsGkE(self.end - self.start | 0, index);
}
function _M0MPB4Iter3newGcE(f, size_hint) {
  let size_hint$2;
  if (size_hint === undefined) {
    size_hint$2 = undefined;
  } else {
    const _Some = size_hint;
    const _n = _Some;
    size_hint$2 = _n > 0 ? _n : _M0MPB4Iter3newN6constrS9863GcE;
  }
  return new _M0TPB4IterGcE(f, size_hint$2);
}
function _M0MPB4Iter3newGyE(f, size_hint) {
  let size_hint$2;
  if (size_hint === undefined) {
    size_hint$2 = undefined;
  } else {
    const _Some = size_hint;
    const _n = _Some;
    size_hint$2 = _n > 0 ? _n : _M0MPB4Iter3newN6constrS9863GyE;
  }
  return new _M0TPB4IterGyE(f, size_hint$2);
}
function _M0MPB4Iter3newGUsRPB4JsonEE(f, size_hint) {
  let size_hint$2;
  if (size_hint === undefined) {
    size_hint$2 = undefined;
  } else {
    const _Some = size_hint;
    const _n = _Some;
    size_hint$2 = _n > 0 ? _n : _M0MPB4Iter3newN6constrS9863GUsRPB4JsonEE;
  }
  return new _M0TPB4IterGUsRPB4JsonEE(f, size_hint$2);
}
function _M0MPC15array10FixedArray5makeiGkE(length, value) {
  if (length <= 0) {
    return [];
  } else {
    const array = $make_array_len_and_init(length, value(0));
    let _tmp = 1;
    while (true) {
      const i = _tmp;
      if (i < length) {
        if (i >>> 0 < array.length) {
          array[i] = value(i);
        } else {
          $oob();
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return array;
  }
}
function _M0MPC16string10StringView11code__units(self) {
  const _bind$2 = _M0MPC15array10FixedArray5makeiGkE(self.str.length, (i) => self.str.charCodeAt(i));
  const _bind$3 = self.start;
  const _bind$4 = self.end;
  const _bind$5 = _bind$2.length;
  if (_bind$3 < 0 || (_bind$3 > _bind$4 || _bind$4 > _bind$5)) {
    $panic();
  }
  return new _M0TPB9ArrayViewGkE(_bind$2, _bind$3, _bind$4);
}
function _M0MPC16string10StringView9to__owned(self) {
  return self.str.substring(self.start, self.end);
}
function _M0IPC16string10StringViewPB4Show6output(self, logger) {
  logger.method_table.method_2(logger.self, self);
}
function _M0MPC16string10StringView4iter(self) {
  const start = self.start;
  const end = self.end;
  const index = new _M0TPB8MutLocalGiE(start);
  return _M0MPB4Iter3newGcE(() => {
    if (index.val < end) {
      const c1 = self.str.charCodeAt(index.val);
      if (_M0MPC16uint166UInt1622is__leading__surrogate(c1) && (index.val + 1 | 0) < self.end) {
        const c2 = self.str.charCodeAt(index.val + 1 | 0);
        if (_M0MPC16uint166UInt1623is__trailing__surrogate(c2)) {
          index.val = index.val + 2 | 0;
          return _M0FPB32code__point__of__surrogate__pair(c1, c2);
        }
      }
      index.val = index.val + 1 | 0;
      return _M0MPC16uint166UInt1616unsafe__to__char(c1);
    } else {
      return -1;
    }
  }, undefined);
}
function _M0MPC16string10StringView3all(self, f) {
  const _bind$2 = self.str;
  const _bind$3 = self.start;
  const _bind$4 = self.end;
  let _tmp = _bind$3;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind$4) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$5 = _bind$2.charCodeAt(_string_index);
        if (_bind$5 >= 55296 && _bind$5 <= 56319 && (_string_index + 1 | 0) < _bind$4) {
          const _bind$6 = _bind$2.charCodeAt(_string_index + 1 | 0);
          if (_bind$6 >= 56320 && _bind$6 <= 57343) {
            _decoded_next_string_index = _string_index + 2 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char((((Math.imul(_bind$5 - 55296 | 0, 1024) | 0) + _bind$6 | 0) - 56320 | 0) + 65536 | 0);
            break _L;
          } else {
            _decoded_next_string_index = _string_index + 1 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$5);
            break _L;
          }
        } else {
          _decoded_next_string_index = _string_index + 1 | 0;
          _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$5);
          break _L;
        }
      }
      if (!f(_decoded_char)) {
        return false;
      }
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0MPC16string6String20unsafe__range__equal(self, self_off, other, other_off, len) {
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < len) {
      if (_M0IPC16uint166UInt16PB2Eq5equal(self.charCodeAt(self_off + i | 0), other.charCodeAt(other_off + i | 0))) {
      } else {
        return false;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0IPC16string10StringViewPB2Eq5equal(self, other) {
  const len = self.end - self.start | 0;
  if (len === (other.end - other.start | 0)) {
    if (self.str === other.str && self.start === other.start) {
      return true;
    }
    return _M0MPC16string6String20unsafe__range__equal(self.str, self.start, other.str, other.start, len);
  } else {
    return false;
  }
}
function _M0MPC16string6String12view_2einner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= self.length) ? new _M0TPC16string10StringView(self, start_offset, end_offset$2) : _M0FPC15abort5abortGRPC16string10StringViewE("Invalid index for View");
}
function _M0MPC16string6String24char__length__eq_2einner(self, len, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  let _tmp = start_offset;
  let _tmp$2 = 0;
  while (true) {
    const index = _tmp;
    const count = _tmp$2;
    if (index < end_offset$2 && count < len) {
      const c1 = self.charCodeAt(index);
      if (_M0MPC16uint166UInt1622is__leading__surrogate(c1) && (index + 1 | 0) < end_offset$2) {
        const c2 = self.charCodeAt(index + 1 | 0);
        if (_M0MPC16uint166UInt1623is__trailing__surrogate(c2)) {
          _tmp = index + 2 | 0;
          _tmp$2 = count + 1 | 0;
          continue;
        } else {
          _M0FPC15abort5abortGuE("invalid surrogate pair");
        }
      }
      _tmp = index + 1 | 0;
      _tmp$2 = count + 1 | 0;
      continue;
    } else {
      return count === len && index === end_offset$2;
    }
  }
}
function _M0MPC16string6String24char__length__ge_2einner(self, len, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  let _tmp = start_offset;
  let _tmp$2 = 0;
  while (true) {
    const index = _tmp;
    const count = _tmp$2;
    if (index < end_offset$2 && count < len) {
      const c1 = self.charCodeAt(index);
      if (_M0MPC16uint166UInt1622is__leading__surrogate(c1) && (index + 1 | 0) < end_offset$2) {
        const c2 = self.charCodeAt(index + 1 | 0);
        if (_M0MPC16uint166UInt1623is__trailing__surrogate(c2)) {
          _tmp = index + 2 | 0;
          _tmp$2 = count + 1 | 0;
          continue;
        } else {
          _M0FPC15abort5abortGuE("invalid surrogate pair");
        }
      }
      _tmp = index + 1 | 0;
      _tmp$2 = count + 1 | 0;
      continue;
    } else {
      return count >= len;
    }
  }
}
function _M0MPC16string6String31offset__of__nth__char__backward(self, n, start_offset, end_offset) {
  let _tmp = end_offset;
  let _tmp$2 = 0;
  while (true) {
    const utf16_offset = _tmp;
    const char_count = _tmp$2;
    if ((utf16_offset - 1 | 0) >= start_offset && char_count < n) {
      const c = self.charCodeAt(utf16_offset - 1 | 0);
      if (_M0MPC16uint166UInt1623is__trailing__surrogate(c)) {
        _tmp = utf16_offset - 2 | 0;
        _tmp$2 = char_count + 1 | 0;
        continue;
      } else {
        _tmp = utf16_offset - 1 | 0;
        _tmp$2 = char_count + 1 | 0;
        continue;
      }
    } else {
      return char_count < n || utf16_offset < start_offset ? undefined : utf16_offset;
    }
  }
}
function _M0MPC16string6String30offset__of__nth__char__forward(self, n, start_offset, end_offset) {
  if (start_offset >= 0 && start_offset <= end_offset) {
    let _tmp = start_offset;
    let _tmp$2 = 0;
    while (true) {
      const utf16_offset = _tmp;
      const char_count = _tmp$2;
      if (utf16_offset < end_offset && char_count < n) {
        const c = self.charCodeAt(utf16_offset);
        if (_M0MPC16uint166UInt1622is__leading__surrogate(c)) {
          _tmp = utf16_offset + 2 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        } else {
          _tmp = utf16_offset + 1 | 0;
          _tmp$2 = char_count + 1 | 0;
          continue;
        }
      } else {
        return char_count < n || utf16_offset >= end_offset ? undefined : utf16_offset;
      }
    }
  } else {
    return _M0FPC15abort5abortGOiE("Invalid start index");
  }
}
function _M0MPC16string6String29offset__of__nth__char_2einner(self, i, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.length;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return i >= 0 ? _M0MPC16string6String30offset__of__nth__char__forward(self, i, start_offset, end_offset$2) : _M0MPC16string6String31offset__of__nth__char__backward(self, -i | 0, start_offset, end_offset$2);
}
function _M0IPB13StringBuilderPB6Logger11write__view(self, str) {
  self.val = `${self.val}${_M0MPC16string10StringView9to__owned(str)}`;
}
function _M0FPB19kmp__failure__table(pattern) {
  const m = pattern.end - pattern.start | 0;
  const table = $make_array_len_and_init(m, 0);
  let k = 0;
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < m) {
      const c = pattern.str.charCodeAt(pattern.start + i | 0);
      while (true) {
        if (k > 0 && _M0IPC16uint166UInt16PB2Eq10not__equal(c, pattern.str.charCodeAt(pattern.start + k | 0))) {
          const _tmp$2 = k - 1 | 0;
          k = _tmp$2 >>> 0 < table.length ? table[_tmp$2] : $oob();
          continue;
        } else {
          break;
        }
      }
      if (_M0IPC16uint166UInt16PB2Eq5equal(c, pattern.str.charCodeAt(pattern.start + k | 0))) {
        k = k + 1 | 0;
      }
      if (i >>> 0 < table.length) {
        table[i] = k;
      } else {
        $oob();
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return table;
}
function _M0FPB24find__pattern__kmp__from(target, pattern, start) {
  const n = target.end - target.start | 0;
  const m = pattern.end - pattern.start | 0;
  const table = _M0FPB19kmp__failure__table(pattern);
  let k = 0;
  let _tmp = start;
  while (true) {
    const i = _tmp;
    if (i < n) {
      const c = target.str.charCodeAt(target.start + i | 0);
      while (true) {
        if (k > 0 && _M0IPC16uint166UInt16PB2Eq10not__equal(c, pattern.str.charCodeAt(pattern.start + k | 0))) {
          const _tmp$2 = k - 1 | 0;
          k = _tmp$2 >>> 0 < table.length ? table[_tmp$2] : $oob();
          continue;
        } else {
          break;
        }
      }
      if (_M0IPC16uint166UInt16PB2Eq5equal(c, pattern.str.charCodeAt(pattern.start + k | 0))) {
        k = k + 1 | 0;
      }
      if (k === m) {
        return (i - m | 0) + 1 | 0;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return undefined;
}
function _M0FPB36find__two__anchor__candidate__scalar(data, start, candidate_end, first, last_offset, last) {
  let _tmp = start;
  while (true) {
    const pos = _tmp;
    if (pos < candidate_end) {
      if (_M0IPC16uint166UInt16PB2Eq5equal(data.charCodeAt(pos), first) && _M0IPC16uint166UInt16PB2Eq5equal(data.charCodeAt(pos + last_offset | 0), last)) {
        return pos;
      }
      _tmp = pos + 1 | 0;
      continue;
    } else {
      return -1;
    }
  }
}
function _M0FPB42find__two__anchor__candidate__from__string(data, start, candidate_end, first, last_offset, last) {
  return _M0FPB36find__two__anchor__candidate__scalar(data, start, candidate_end, first, last_offset, last);
}
function _M0FPB21string__ranges__equal(left, left_start, right, right_start, length) {
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < length) {
      if (_M0IPC16uint166UInt16PB2Eq10not__equal(left.charCodeAt(left_start + i | 0), right.charCodeAt(right_start + i | 0))) {
        return false;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0FPB29two__anchor__should__fallback(failures, scanned) {
  if (failures > 64) {
    return true;
  } else {
    if (8 === 0) {
      $panic();
    }
    return failures > (4 + (scanned / 8 | 0) | 0);
  }
}
function _M0FPB22find__by__two__anchors(target, pattern) {
  const target_len = target.end - target.start | 0;
  const pattern_len = pattern.end - pattern.start | 0;
  const target_start = _M0MPC16string10StringView13start__offset(target);
  const pattern_start = _M0MPC16string10StringView13start__offset(pattern);
  const last_offset = pattern_len - 1 | 0;
  const candidate_end = ((target_start + target_len | 0) - pattern_len | 0) + 1 | 0;
  const first = pattern.str.charCodeAt(pattern.start);
  const last = pattern.str.charCodeAt(pattern.start + last_offset | 0);
  const middle_len = last_offset - 1 | 0;
  let _tmp = target_start;
  let _tmp$2 = 0;
  while (true) {
    const pos = _tmp;
    const failures = _tmp$2;
    if (pos < candidate_end) {
      const found = _M0FPB42find__two__anchor__candidate__from__string(_M0MPC16string10StringView4data(target), pos, candidate_end, first, last_offset, last);
      if (found < 0) {
        return undefined;
      }
      if (_M0FPB21string__ranges__equal(_M0MPC16string10StringView4data(target), found + 1 | 0, _M0MPC16string10StringView4data(pattern), pattern_start + 1 | 0, middle_len)) {
        return found - target_start | 0;
      }
      const failures$2 = failures + 1 | 0;
      const scanned = found - target_start | 0;
      if (_M0FPB29two__anchor__should__fallback(failures$2, scanned)) {
        return _M0FPB24find__pattern__kmp__from(target, pattern, scanned + 1 | 0);
      }
      _tmp = found + 1 | 0;
      _tmp$2 = failures$2;
      continue;
    } else {
      return undefined;
    }
  }
}
function _M0FPB24find__code__unit__scalar(data, start, end, code) {
  let _tmp = start;
  while (true) {
    const pos = _tmp;
    if (pos < end) {
      if (_M0IPC16uint166UInt16PB2Eq5equal(data.charCodeAt(pos), code)) {
        return pos;
      }
      _tmp = pos + 1 | 0;
      continue;
    } else {
      return -1;
    }
  }
}
function _M0FPB30find__code__unit__from__string(data, start, end, code) {
  return _M0FPB24find__code__unit__scalar(data, start, end, code);
}
function _M0FPB28find__code__unit__from__view(target, start, end, code) {
  const target_start = _M0MPC16string10StringView13start__offset(target);
  const found = _M0FPB30find__code__unit__from__string(_M0MPC16string10StringView4data(target), target_start + start | 0, target_start + end | 0, code);
  return found < 0 ? -1 : found - target_start | 0;
}
function _M0MPC16string10StringView4find(self, str) {
  const pattern_len = str.end - str.start | 0;
  switch (pattern_len) {
    case 0: {
      return _M0MPC16string10StringView4findN6constrS9865;
    }
    case 1: {
      const found = _M0FPB28find__code__unit__from__view(self, 0, self.end - self.start | 0, str.str.charCodeAt(str.start));
      return found < 0 ? undefined : found;
    }
    default: {
      return pattern_len > (self.end - self.start | 0) ? undefined : _M0FPB22find__by__two__anchors(self, str);
    }
  }
}
function _M0MPC16string6String4find(self, str) {
  return _M0MPC16string10StringView4find(new _M0TPC16string10StringView(self, 0, self.length), str);
}
function _M0IPC16string6StringPB4Show10to__string(self) {
  return self;
}
function _M0MPC16string6String6repeat(self, n) {
  if (n < 0) {
    return _M0FPC15abort5abortGRPC16string10StringViewE("negative repeat count");
  } else {
    if (n === 0) {
      return "";
    } else {
      if (n === 1) {
        return self;
      } else {
        const len = self.length;
        const total = Math.imul(len, n) | 0;
        let _tmp;
        if (len === 0) {
          _tmp = true;
        } else {
          if (n === 0) {
            $panic();
          }
          _tmp = (total / n | 0) === len;
        }
        if (_tmp) {
          const buf = _M0MPB13StringBuilder21StringBuilder_2einner(total);
          const str = _M0IPC16string6StringPB4Show10to__string(self);
          let _tmp$2 = 0;
          while (true) {
            const _ = _tmp$2;
            if (_ < n) {
              _M0IPB13StringBuilderPB6Logger13write__string(buf, str);
              _tmp$2 = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          return _M0MPB13StringBuilder10to__string(buf);
        } else {
          return _M0FPC15abort5abortGRPC16string10StringViewE("repeat result too large");
        }
      }
    }
  }
}
function _M0MPC14char4Char10utf16__len(self) {
  const code = self;
  return code <= 65535 ? 1 : 2;
}
function _M0MPC16string10StringView8find__by(self, pred) {
  const _bind$2 = self.str;
  const _bind$3 = self.start;
  const _bind$4 = self.end;
  let _tmp = _bind$3;
  let _tmp$2 = 0;
  while (true) {
    const _string_index = _tmp;
    const offset = _tmp$2;
    if (_string_index < _bind$4) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$5 = _bind$2.charCodeAt(_string_index);
        if (_bind$5 >= 55296 && _bind$5 <= 56319 && (_string_index + 1 | 0) < _bind$4) {
          const _bind$6 = _bind$2.charCodeAt(_string_index + 1 | 0);
          if (_bind$6 >= 56320 && _bind$6 <= 57343) {
            _decoded_next_string_index = _string_index + 2 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char((((Math.imul(_bind$5 - 55296 | 0, 1024) | 0) + _bind$6 | 0) - 56320 | 0) + 65536 | 0);
            break _L;
          } else {
            _decoded_next_string_index = _string_index + 1 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$5);
            break _L;
          }
        } else {
          _decoded_next_string_index = _string_index + 1 | 0;
          _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$5);
          break _L;
        }
      }
      if (pred(_decoded_char)) {
        return offset;
      }
      _tmp = _decoded_next_string_index;
      _tmp$2 = offset + _M0MPC14char4Char10utf16__len(_decoded_char) | 0;
      continue;
    } else {
      return undefined;
    }
  }
}
function _M0FPB31rev__find__pattern__kmp__before(target, pattern, candidate_end) {
  if (candidate_end > 0) {
    const m = pattern.end - pattern.start | 0;
    const table = _M0FPB19kmp__failure__table(pattern);
    const scan_end = (candidate_end + m | 0) - 1 | 0;
    let k = 0;
    let best = -1;
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < scan_end) {
        const c = target.str.charCodeAt(target.start + i | 0);
        while (true) {
          if (k > 0 && _M0IPC16uint166UInt16PB2Eq10not__equal(c, pattern.str.charCodeAt(pattern.start + k | 0))) {
            const _tmp$2 = k - 1 | 0;
            k = _tmp$2 >>> 0 < table.length ? table[_tmp$2] : $oob();
            continue;
          } else {
            break;
          }
        }
        if (_M0IPC16uint166UInt16PB2Eq5equal(c, pattern.str.charCodeAt(pattern.start + k | 0))) {
          k = k + 1 | 0;
        }
        if (k === m) {
          best = (i - m | 0) + 1 | 0;
          const _tmp$2 = k - 1 | 0;
          k = _tmp$2 >>> 0 < table.length ? table[_tmp$2] : $oob();
        }
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return best >= 0 ? best : undefined;
  } else {
    return undefined;
  }
}
function _M0FPB41rev__find__two__anchor__candidate__scalar(data, start, candidate_end, first, last_offset, last) {
  let _tmp = candidate_end - 1 | 0;
  while (true) {
    const pos = _tmp;
    if (pos >= start) {
      if (_M0IPC16uint166UInt16PB2Eq5equal(data.charCodeAt(pos), first) && _M0IPC16uint166UInt16PB2Eq5equal(data.charCodeAt(pos + last_offset | 0), last)) {
        return pos;
      }
      _tmp = pos - 1 | 0;
      continue;
    } else {
      return -1;
    }
  }
}
function _M0FPB47rev__find__two__anchor__candidate__from__string(data, start, candidate_end, first, last_offset, last) {
  return _M0FPB41rev__find__two__anchor__candidate__scalar(data, start, candidate_end, first, last_offset, last);
}
function _M0FPB27rev__find__by__two__anchors(target, pattern) {
  const target_len = target.end - target.start | 0;
  const pattern_len = pattern.end - pattern.start | 0;
  const target_start = _M0MPC16string10StringView13start__offset(target);
  const pattern_start = _M0MPC16string10StringView13start__offset(pattern);
  const last_offset = pattern_len - 1 | 0;
  const first = pattern.str.charCodeAt(pattern.start);
  const last = pattern.str.charCodeAt(pattern.start + last_offset | 0);
  const middle_len = last_offset - 1 | 0;
  const last_candidate = target_len - pattern_len | 0;
  let _tmp = (target_start + last_candidate | 0) + 1 | 0;
  let _tmp$2 = 0;
  while (true) {
    const candidate_end = _tmp;
    const failures = _tmp$2;
    if (candidate_end > target_start) {
      const found = _M0FPB47rev__find__two__anchor__candidate__from__string(_M0MPC16string10StringView4data(target), target_start, candidate_end, first, last_offset, last);
      if (found < 0) {
        return undefined;
      }
      if (_M0FPB21string__ranges__equal(_M0MPC16string10StringView4data(target), found + 1 | 0, _M0MPC16string10StringView4data(pattern), pattern_start + 1 | 0, middle_len)) {
        return found - target_start | 0;
      }
      const candidate = found - target_start | 0;
      const failures$2 = failures + 1 | 0;
      const scanned = last_candidate - candidate | 0;
      if (_M0FPB29two__anchor__should__fallback(failures$2, scanned)) {
        return _M0FPB31rev__find__pattern__kmp__before(target, pattern, candidate);
      }
      _tmp = found;
      _tmp$2 = failures$2;
      continue;
    } else {
      return undefined;
    }
  }
}
function _M0FPB29rev__find__code__unit__scalar(data, start, end, code) {
  let _tmp = end - 1 | 0;
  while (true) {
    const pos = _tmp;
    if (pos >= start) {
      if (_M0IPC16uint166UInt16PB2Eq5equal(data.charCodeAt(pos), code)) {
        return pos;
      }
      _tmp = pos - 1 | 0;
      continue;
    } else {
      return -1;
    }
  }
}
function _M0FPB35rev__find__code__unit__from__string(data, start, end, code) {
  return _M0FPB29rev__find__code__unit__scalar(data, start, end, code);
}
function _M0FPB33rev__find__code__unit__from__view(target, start, end, code) {
  const target_start = _M0MPC16string10StringView13start__offset(target);
  const found = _M0FPB35rev__find__code__unit__from__string(_M0MPC16string10StringView4data(target), target_start + start | 0, target_start + end | 0, code);
  return found < 0 ? -1 : found - target_start | 0;
}
function _M0MPC16string10StringView9rev__find(self, str) {
  const pattern_len = str.end - str.start | 0;
  switch (pattern_len) {
    case 0: {
      return self.end - self.start | 0;
    }
    case 1: {
      const found = _M0FPB33rev__find__code__unit__from__view(self, 0, self.end - self.start | 0, str.str.charCodeAt(str.start));
      return found < 0 ? undefined : found;
    }
    default: {
      return pattern_len > (self.end - self.start | 0) ? undefined : _M0FPB27rev__find__by__two__anchors(self, str);
    }
  }
}
function _M0MPC16string6String9rev__find(self, str) {
  return _M0MPC16string10StringView9rev__find(new _M0TPC16string10StringView(self, 0, self.length), str);
}
function _M0MPC16string10StringView11has__suffix(self, str) {
  const self_len = self.end - self.start | 0;
  const str_len = str.end - str.start | 0;
  if (str_len <= self_len) {
    const start = self_len - str_len | 0;
    return str_len === 0 || _M0IPC16uint166UInt16PB2Eq5equal(self.str.charCodeAt(self.start + start | 0), str.str.charCodeAt(str.start)) ? _M0MPC16string6String20unsafe__range__equal(self.str, self.start + start | 0, str.str, str.start, str_len) : false;
  } else {
    return false;
  }
}
function _M0MPC16string6String11has__suffix(self, str) {
  return _M0MPC16string10StringView11has__suffix(new _M0TPC16string10StringView(self, 0, self.length), str);
}
function _M0MPC16string10StringView11has__prefix(self, str) {
  const str_len = str.end - str.start | 0;
  return str_len <= (self.end - self.start | 0) ? (str_len === 0 || _M0IPC16uint166UInt16PB2Eq5equal(self.str.charCodeAt(self.start), str.str.charCodeAt(str.start)) ? _M0MPC16string6String20unsafe__range__equal(self.str, self.start, str.str, str.start, str_len) : false) : false;
}
function _M0MPC16string6String11has__prefix(self, str) {
  return _M0MPC16string10StringView11has__prefix(new _M0TPC16string10StringView(self, 0, self.length), str);
}
function _M0MPC16string10StringView13strip__suffix(self, suffix) {
  const self_len = self.end - self.start | 0;
  const suffix_len = suffix.end - suffix.start | 0;
  return self_len >= suffix_len && _M0IPC16string10StringViewPB2Eq5equal(_M0MPC16string10StringView12view_2einner(self, self_len - suffix_len | 0, undefined), suffix) ? _M0MPC16string10StringView12view_2einner(self, 0, self_len - suffix_len | 0) : undefined;
}
function _M0MPC16string6String13strip__suffix(self, suffix) {
  return _M0MPC16string10StringView13strip__suffix(new _M0TPC16string10StringView(self, 0, self.length), suffix);
}
function _M0MPC16string10StringView13strip__prefix(self, prefix) {
  const prefix_len = prefix.end - prefix.start | 0;
  return (self.end - self.start | 0) >= prefix_len && _M0IPC16string10StringViewPB2Eq5equal(_M0MPC16string10StringView12view_2einner(self, 0, prefix_len), prefix) ? _M0MPC16string10StringView12view_2einner(self, prefix_len, undefined) : undefined;
}
function _M0MPC15array5Array13Array_2einnerGsE(capacity) {
  return [];
}
function _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0MPC15array5Array4pushGyE(self, value) {
  _M0MPB7JSArray4push(self, value);
}
function _M0FPB36string__contains__code__unit__scalar(str, start, end, code) {
  let _tmp = start;
  while (true) {
    const i = _tmp;
    if (i < end) {
      if (_M0IPC16uint166UInt16PB2Eq5equal(str.charCodeAt(i), code)) {
        return true;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0FPB28string__contains__code__unit(str, start, end, code) {
  return _M0FPB36string__contains__code__unit__scalar(str, start, end, code);
}
function _M0MPC16string10StringView20contains__code__unit(self, code) {
  return _M0FPB28string__contains__code__unit(self.str, self.start, self.end, code);
}
function _M0MPC16string10StringView8contains(self, str) {
  const _bind$2 = str.end - str.start | 0;
  switch (_bind$2) {
    case 0: {
      return true;
    }
    case 1: {
      return _M0MPC16string10StringView20contains__code__unit(self, str.str.charCodeAt(str.start));
    }
    default: {
      const _bind$3 = _M0MPC16string10StringView4find(self, str);
      return !(_bind$3 === undefined);
    }
  }
}
function _M0MPC16string6String8contains(self, str) {
  return _M0MPC16string10StringView8contains(new _M0TPC16string10StringView(self, 0, self.length), str);
}
function _M0MPC14char4Char8to__uint(self) {
  return self;
}
function _M0FPB23build__ascii__char__set(chars) {
  let bits0 = 0;
  let bits1 = 0;
  let bits2 = 0;
  let bits3 = 0;
  const _bind$2 = chars.str;
  const _bind$3 = chars.start;
  const _bind$4 = chars.end;
  let _tmp = _bind$3;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind$4) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$5 = _bind$2.charCodeAt(_string_index);
        if (_bind$5 >= 55296 && _bind$5 <= 56319 && (_string_index + 1 | 0) < _bind$4) {
          const _bind$6 = _bind$2.charCodeAt(_string_index + 1 | 0);
          if (_bind$6 >= 56320 && _bind$6 <= 57343) {
            _decoded_next_string_index = _string_index + 2 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char((((Math.imul(_bind$5 - 55296 | 0, 1024) | 0) + _bind$6 | 0) - 56320 | 0) + 65536 | 0);
            break _L;
          } else {
            _decoded_next_string_index = _string_index + 1 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$5);
            break _L;
          }
        } else {
          _decoded_next_string_index = _string_index + 1 | 0;
          _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$5);
          break _L;
        }
      }
      const code = _M0MPC14char4Char8to__uint(_decoded_char);
      if (code >>> 0 < 128 >>> 0) {
        const bit = 1 << (code & 31);
        const _bind$5 = code >>> 5 | 0;
        switch (_bind$5) {
          case 0: {
            bits0 = bits0 | bit;
            break;
          }
          case 1: {
            bits1 = bits1 | bit;
            break;
          }
          case 2: {
            bits2 = bits2 | bit;
            break;
          }
          default: {
            bits3 = bits3 | bit;
          }
        }
      } else {
        return undefined;
      }
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return { _0: bits0, _1: bits1, _2: bits2, _3: bits3 };
}
function _M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, code) {
  if (code >>> 0 < 128 >>> 0) {
    const bit = 1 << (code & 31);
    const _bind$2 = code >>> 5 | 0;
    switch (_bind$2) {
      case 0: {
        return (bits0 & bit) !== 0;
      }
      case 1: {
        return (bits1 & bit) !== 0;
      }
      case 2: {
        return (bits2 & bit) !== 0;
      }
      default: {
        return (bits3 & bit) !== 0;
      }
    }
  } else {
    return false;
  }
}
function _M0FPB34string__trim__start__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3) {
  let _tmp = start;
  while (true) {
    const pos = _tmp;
    if (pos < end && _M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, _M0MPC16uint166UInt168to__uint(str.charCodeAt(pos)))) {
      _tmp = pos + 1 | 0;
      continue;
    } else {
      return pos;
    }
  }
}
function _M0FPB32string__trim__end__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3) {
  let _tmp = end;
  while (true) {
    const pos = _tmp;
    if (pos > start && _M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, _M0MPC16uint166UInt168to__uint(str.charCodeAt(pos - 1 | 0)))) {
      _tmp = pos - 1 | 0;
      continue;
    } else {
      return pos;
    }
  }
}
function _M0MPC16string10StringView27contains__any__ascii__chars(self, bits0, bits1, bits2, bits3) {
  const _bind$2 = self.str;
  const _bind$3 = self.start;
  const _bind$4 = self.end;
  let _tmp = _bind$3;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind$4) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$5 = _bind$2.charCodeAt(_string_index);
        if (_bind$5 >= 55296 && _bind$5 <= 56319 && (_string_index + 1 | 0) < _bind$4) {
          const _bind$6 = _bind$2.charCodeAt(_string_index + 1 | 0);
          if (_bind$6 >= 56320 && _bind$6 <= 57343) {
            _decoded_next_string_index = _string_index + 2 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char((((Math.imul(_bind$5 - 55296 | 0, 1024) | 0) + _bind$6 | 0) - 56320 | 0) + 65536 | 0);
            break _L;
          } else {
            _decoded_next_string_index = _string_index + 1 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$5);
            break _L;
          }
        } else {
          _decoded_next_string_index = _string_index + 1 | 0;
          _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$5);
          break _L;
        }
      }
      if (_M0FPB26ascii__char__set__contains(bits0, bits1, bits2, bits3, _M0MPC14char4Char8to__uint(_decoded_char))) {
        return true;
      }
      _tmp = _decoded_next_string_index;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0FPB28string__contains__any__ascii(str, start, end, _chars, bits0, bits1, bits2, bits3) {
  return _M0MPC16string10StringView27contains__any__ascii__chars(new _M0TPC16string10StringView(str, start, end), bits0, bits1, bits2, bits3);
}
function _M0FPB26string__trim__start__ascii(str, start, end, _chars, bits0, bits1, bits2, bits3) {
  return _M0FPB34string__trim__start__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3);
}
function _M0FPB24string__trim__end__ascii(str, start, end, _chars, bits0, bits1, bits2, bits3) {
  return _M0FPB32string__trim__end__ascii__scalar(str, start, end, bits0, bits1, bits2, bits3);
}
function _M0MPC16string10StringView14contains__char(self, c) {
  const len = self.end - self.start | 0;
  if (len > 0) {
    const c$2 = c;
    if (c$2 >= 0 && c$2 <= 65535) {
      return _M0MPC16string10StringView20contains__code__unit(self, c$2 & 65535);
    } else {
      if (c$2 < 0) {
        return false;
      } else {
        if (len >= 2) {
          const adj = c$2 - 65536 | 0;
          const high = 55296 + (adj >> 10) | 0;
          if (high <= 65535) {
            const high$2 = high & 65535;
            const low = (56320 + (adj & 1023) | 0) & 65535;
            let _tmp = 0;
            while (true) {
              const i = _tmp;
              if (i < (len - 1 | 0)) {
                if (_M0IPC16uint166UInt16PB2Eq5equal(self.str.charCodeAt(self.start + i | 0), high$2)) {
                  if (_M0IPC16uint166UInt16PB2Eq5equal(self.str.charCodeAt(self.start + (i + 1 | 0) | 0), low)) {
                    return true;
                  }
                  _tmp = i + 2 | 0;
                  continue;
                }
                _tmp = i + 1 | 0;
                continue;
              } else {
                break;
              }
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    return false;
  } else {
    return false;
  }
}
function _M0MPC16string10StringView24trim__start__with__chars(self, chars) {
  let _tmp = self;
  while (true) {
    const x = _tmp;
    if ((x.end - x.start | 0) === 0) {
      return x;
    } else {
      const _c = _M0MPC16string6String16unsafe__char__at(x.str, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, 0, x.start, x.end));
      const _tmp$2 = x.str;
      const _bind$2 = _M0MPC16string6String29offset__of__nth__char_2einner(x.str, 1, x.start, x.end);
      let _tmp$3;
      if (_bind$2 === undefined) {
        _tmp$3 = x.end;
      } else {
        const _Some = _bind$2;
        _tmp$3 = _Some;
      }
      const _x = new _M0TPC16string10StringView(_tmp$2, _tmp$3, x.end);
      if (_M0MPC16string10StringView14contains__char(chars, _c)) {
        _tmp = _x;
        continue;
      } else {
        return x;
      }
    }
  }
}
function _M0MPC16string10StringView22trim__end__with__chars(self, chars) {
  let _tmp = self;
  while (true) {
    const x = _tmp;
    if ((x.end - x.start | 0) === 0) {
      return x;
    } else {
      const _c = _M0MPC16string6String16unsafe__char__at(x.str, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, -1, x.start, x.end));
      const _x = new _M0TPC16string10StringView(x.str, x.start, _M0MPC16string6String29offset__of__nth__char_2einner(x.str, -1, x.start, x.end));
      if (_M0MPC16string10StringView14contains__char(chars, _c)) {
        _tmp = _x;
        continue;
      } else {
        return x;
      }
    }
  }
}
function _M0MPC16string10StringView13contains__any(self, chars) {
  if ((chars.end - chars.start | 0) === 0) {
    return false;
  } else {
    if (_M0MPC16string6String24char__length__eq_2einner(chars.str, 1, chars.start, chars.end)) {
      const _c = _M0MPC16string6String16unsafe__char__at(chars.str, _M0MPC16string6String29offset__of__nth__char_2einner(chars.str, 0, chars.start, chars.end));
      return _M0MPC16string10StringView14contains__char(self, _c);
    } else {
      const _bind$2 = _M0FPB23build__ascii__char__set(chars);
      if (_bind$2 === undefined) {
        const _bind$3 = self.str;
        const _bind$4 = self.start;
        const _bind$5 = self.end;
        let _tmp = _bind$4;
        while (true) {
          const _string_index = _tmp;
          if (_string_index < _bind$5) {
            let _decoded_next_string_index;
            let _decoded_char;
            _L: {
              const _bind$6 = _bind$3.charCodeAt(_string_index);
              if (_bind$6 >= 55296 && _bind$6 <= 56319 && (_string_index + 1 | 0) < _bind$5) {
                const _bind$7 = _bind$3.charCodeAt(_string_index + 1 | 0);
                if (_bind$7 >= 56320 && _bind$7 <= 57343) {
                  _decoded_next_string_index = _string_index + 2 | 0;
                  _decoded_char = _M0MPC13int3Int16unsafe__to__char((((Math.imul(_bind$6 - 55296 | 0, 1024) | 0) + _bind$7 | 0) - 56320 | 0) + 65536 | 0);
                  break _L;
                } else {
                  _decoded_next_string_index = _string_index + 1 | 0;
                  _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$6);
                  break _L;
                }
              } else {
                _decoded_next_string_index = _string_index + 1 | 0;
                _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$6);
                break _L;
              }
            }
            if (_M0MPC16string10StringView14contains__char(chars, _decoded_char)) {
              return true;
            }
            _tmp = _decoded_next_string_index;
            continue;
          } else {
            return false;
          }
        }
      } else {
        const _Some = _bind$2;
        const _x = _Some;
        const _bits0 = _x._0;
        const _bits1 = _x._1;
        const _bits2 = _x._2;
        const _bits3 = _x._3;
        return _M0FPB28string__contains__any__ascii(self.str, self.start, self.end, chars, _bits0, _bits1, _bits2, _bits3);
      }
    }
  }
}
function _M0MPC16string6String13contains__any(self, chars) {
  return _M0MPC16string10StringView13contains__any(new _M0TPC16string10StringView(self, 0, self.length), chars);
}
function _M0MPC16string10StringView12trim_2einner(self, chars) {
  const _bind$2 = _M0FPB23build__ascii__char__set(chars);
  if (_bind$2 === undefined) {
    return _M0MPC16string10StringView22trim__end__with__chars(_M0MPC16string10StringView24trim__start__with__chars(self, chars), chars);
  } else {
    const _Some = _bind$2;
    const _x = _Some;
    const _bits0 = _x._0;
    const _bits1 = _x._1;
    const _bits2 = _x._2;
    const _bits3 = _x._3;
    const start = _M0FPB26string__trim__start__ascii(self.str, self.start, self.end, chars, _bits0, _bits1, _bits2, _bits3);
    const end = _M0FPB24string__trim__end__ascii(self.str, start, self.end, chars, _bits0, _bits1, _bits2, _bits3);
    return new _M0TPC16string10StringView(self.str, start, end);
  }
}
function _M0MPC16string6String12trim_2einner(self, chars) {
  return _M0MPC16string10StringView12trim_2einner(new _M0TPC16string10StringView(self, 0, self.length), chars);
}
function _M0MPC16string6String4trim(self, chars$46$opt) {
  let chars;
  if (chars$46$opt === undefined) {
    chars = new _M0TPC16string10StringView(_M0MPC16string6String4trimN7_2abindS6861, 0, _M0MPC16string6String4trimN7_2abindS6861.length);
  } else {
    const _Some = chars$46$opt;
    chars = _Some;
  }
  return _M0MPC16string6String12trim_2einner(self, chars);
}
function _M0MPC16string10StringView9is__empty(self) {
  return (self.end - self.start | 0) === 0;
}
function _M0MPC16string6String9is__empty(self) {
  return self === "";
}
function _M0MPC16string6String4iter(self) {
  const len = self.length;
  const index = new _M0TPB8MutLocalGiE(0);
  return _M0MPB4Iter3newGcE(() => {
    if (index.val < len) {
      const c1 = self.charCodeAt(index.val);
      if (_M0MPC16uint166UInt1622is__leading__surrogate(c1) && (index.val + 1 | 0) < len) {
        const c2 = self.charCodeAt(index.val + 1 | 0);
        if (_M0MPC16uint166UInt1623is__trailing__surrogate(c2)) {
          const c = _M0FPB32code__point__of__surrogate__pair(c1, c2);
          index.val = index.val + 2 | 0;
          return c;
        }
      }
      index.val = index.val + 1 | 0;
      return _M0MPC16uint166UInt1616unsafe__to__char(c1);
    } else {
      return -1;
    }
  }, undefined);
}
function _M0MPB4Iter3mapGRPC16string10StringViewsE(self, f) {
  return new _M0TPB4IterGsE(() => {
    const _bind$2 = _M0MPB4Iter4nextGRPC16string10StringViewE(self);
    if (_bind$2 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      return f(_x);
    }
  }, self.size_hint);
}
function _M0MPB4Iter3mapGcRPC16string10StringViewE(self, f) {
  return new _M0TPB4IterGRPC16string10StringViewE(() => {
    const _bind$2 = _M0MPB4Iter4nextGcE(self);
    if (_bind$2 === -1) {
      return undefined;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      return f(_x);
    }
  }, self.size_hint);
}
function _M0IPC14char4CharPB4Show10to__string(self) {
  return String.fromCodePoint(self);
}
function _M0MPC16string10StringView5split(self, sep) {
  const sep_len = sep.end - sep.start | 0;
  if (sep_len === 0) {
    return _M0MPB4Iter3mapGcRPC16string10StringViewE(_M0MPC16string10StringView4iter(self), (c) => _M0MPC16string6String12view_2einner(_M0IPC14char4CharPB4Show10to__string(c), 0, undefined));
  }
  const remaining = new _M0TPB8MutLocalGORPC16string10StringViewE(self);
  return _M0MPB4Iter3newGUsRPB4JsonEE(() => {
    const _bind$2 = remaining.val;
    if (_bind$2 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$2;
      const _view = _Some;
      const _bind$3 = _M0MPC16string10StringView4find(_view, sep);
      if (_bind$3 === undefined) {
        remaining.val = undefined;
        return _view;
      } else {
        const _Some$2 = _bind$3;
        const _end = _Some$2;
        remaining.val = _M0MPC16string10StringView12view_2einner(_view, _end + sep_len | 0, undefined);
        return _M0MPC16string10StringView12view_2einner(_view, 0, _end);
      }
    }
  }, undefined);
}
function _M0MPC16string6String5split(self, sep) {
  return _M0MPC16string10StringView5split(new _M0TPC16string10StringView(self, 0, self.length), sep);
}
function _M0MPC16string10StringView11split__once(self, needle) {
  const _bind$2 = _M0MPC16string10StringView4find(self, needle);
  if (_bind$2 === undefined) {
    return undefined;
  } else {
    const _Some = _bind$2;
    const _index = _Some;
    return { _0: _M0MPC16string10StringView12view_2einner(self, 0, _index), _1: _M0MPC16string10StringView12view_2einner(self, _index + (needle.end - needle.start | 0) | 0, undefined) };
  }
}
function _M0MPC16string6String11split__once(self, needle) {
  return _M0MPC16string10StringView11split__once(new _M0TPC16string10StringView(self, 0, self.length), needle);
}
function _M0MPB4Iter9to__arrayGsE(self) {
  const _bind$2 = self.size_hint;
  let result;
  if (_bind$2 === undefined) {
    result = [];
  } else {
    const _Some = _bind$2;
    const _n = _Some;
    result = _M0MPC15array5Array13Array_2einnerGsE(_n);
  }
  while (true) {
    const _bind$3 = _M0MPB4Iter4nextGRPC16string10StringViewE(self);
    if (_bind$3 === undefined) {
      break;
    } else {
      const _Some = _bind$3;
      const _x = _Some;
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(result, _x);
      continue;
    }
  }
  return result;
}
function _M0MPC14char4Char20is__ascii__uppercase(self) {
  return self >= 65 && self <= 90;
}
function _M0MPC16string10StringView9to__lower(self) {
  const _bind$2 = _M0MPC16string10StringView8find__by(self, (c) => _M0MPC14char4Char20is__ascii__uppercase(c));
  if (_bind$2 === undefined) {
    return self;
  } else {
    const _Some = _bind$2;
    const _idx = _Some;
    const buf = _M0MPB13StringBuilder21StringBuilder_2einner(self.end - self.start | 0);
    const head = _M0MPC16string10StringView12view_2einner(self, 0, _idx);
    _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE(buf, _M0MPC16string10StringView4data(head), _M0MPC16string10StringView13start__offset(head), head.end - head.start | 0);
    const _bind$3 = _M0MPC16string10StringView12view_2einner(self, _idx, undefined);
    const _bind$4 = _bind$3.str;
    const _bind$5 = _bind$3.start;
    const _bind$6 = _bind$3.end;
    let _tmp = _bind$5;
    while (true) {
      const _string_index = _tmp;
      if (_string_index < _bind$6) {
        let _decoded_next_string_index;
        let _decoded_char;
        _L: {
          const _bind$7 = _bind$4.charCodeAt(_string_index);
          if (_bind$7 >= 55296 && _bind$7 <= 56319 && (_string_index + 1 | 0) < _bind$6) {
            const _bind$8 = _bind$4.charCodeAt(_string_index + 1 | 0);
            if (_bind$8 >= 56320 && _bind$8 <= 57343) {
              _decoded_next_string_index = _string_index + 2 | 0;
              _decoded_char = _M0MPC13int3Int16unsafe__to__char((((Math.imul(_bind$7 - 55296 | 0, 1024) | 0) + _bind$8 | 0) - 56320 | 0) + 65536 | 0);
              break _L;
            } else {
              _decoded_next_string_index = _string_index + 1 | 0;
              _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$7);
              break _L;
            }
          } else {
            _decoded_next_string_index = _string_index + 1 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$7);
            break _L;
          }
        }
        if (_M0MPC14char4Char20is__ascii__uppercase(_decoded_char)) {
          _M0IPB13StringBuilderPB6Logger11write__char(buf, _decoded_char + 32 | 0);
        } else {
          _M0IPB13StringBuilderPB6Logger11write__char(buf, _decoded_char);
        }
        _tmp = _decoded_next_string_index;
        continue;
      } else {
        break;
      }
    }
    const _bind$7 = _M0MPB13StringBuilder10to__string(buf);
    return new _M0TPC16string10StringView(_bind$7, 0, _bind$7.length);
  }
}
function _M0MPC16string10StringView9get__char(self, idx) {
  if (idx >= 0 && idx < (self.end - self.start | 0)) {
    const c = self.str.charCodeAt(self.start + idx | 0);
    if (_M0MPC16uint166UInt1622is__leading__surrogate(c)) {
      if ((idx + 1 | 0) < (self.end - self.start | 0)) {
        const next = self.str.charCodeAt(self.start + (idx + 1 | 0) | 0);
        return _M0MPC16uint166UInt1623is__trailing__surrogate(next) ? _M0FPB32code__point__of__surrogate__pair(c, next) : -1;
      } else {
        return -1;
      }
    } else {
      return _M0MPC16uint166UInt1623is__trailing__surrogate(c) ? -1 : _M0MPC16uint166UInt1616unsafe__to__char(c);
    }
  } else {
    return -1;
  }
}
function _M0IPC16string6StringPB12ToStringView16to__string__view(self) {
  return new _M0TPC16string10StringView(self, 0, self.length);
}
function _M0IPC16string10StringViewPB12ToStringView16to__string__view(self) {
  return self;
}
function _M0MPC14byte4Byte8to__uint(self) {
  return self;
}
function _M0MPC14uint4UInt10to__uint64(self) {
  return BigInt.asUintN(64, BigInt(self >>> 0));
}
function _M0MPC14byte4Byte10to__uint64(self) {
  return _M0MPC14uint4UInt10to__uint64(_M0MPC14byte4Byte8to__uint(self));
}
function _M0IPC14bool4BoolPB4Show10to__string(self) {
  return self ? "true" : "false";
}
function _M0IPC13int3IntPB4Show10to__string(self) {
  return _M0MPC13int3Int18to__string_2einner(self, 10);
}
function _M0MPC15array9ArrayView4iterGUsRP211localreview4amqp12ArgumentKindEE(self) {
  const i = new _M0TPB8MutLocalGiE(0);
  const len = self.end - self.start | 0;
  return _M0MPB4Iter3newGUsRPB4JsonEE(() => {
    if (i.val < len) {
      const elem = self.buf[self.start + i.val | 0];
      i.val = i.val + 1 | 0;
      return elem;
    } else {
      return undefined;
    }
  }, len);
}
function _M0MPC15array5Array4iterGUsRP211localreview4amqp12ArgumentKindEE(self) {
  return _M0MPC15array9ArrayView4iterGUsRP211localreview4amqp12ArgumentKindEE(new _M0TPB9ArrayViewGUsRP211localreview4amqp12ArgumentKindEE(self, 0, self.length));
}
function _M0MPC15array13ReadOnlyArray2atGmE(self, index) {
  return index >>> 0 < self.length ? self[index] : $oob();
}
function _M0MPC15array13ReadOnlyArray2atGdE(self, index) {
  return index >>> 0 < self.length ? self[index] : $oob();
}
function _M0MPC15array13ReadOnlyArray2atGiE(self, index) {
  return index >>> 0 < self.length ? self[index] : $oob();
}
function _M0MPC15array13ReadOnlyArray6lengthGiE(self) {
  return self.length;
}
function _M0MPC15array9ArrayView4joinGsE(self, separator) {
  if ((self.end - self.start | 0) === 0) {
    return "";
  } else {
    const _hd = self.buf[self.start];
    const _x_buf = self.buf;
    const _x_start = 1 + self.start | 0;
    const _x_end = self.end;
    const hd = _M0IPC16string6StringPB12ToStringView16to__string__view(_hd);
    const _bind$2 = _x_end - _x_start | 0;
    let size_hint;
    let _tmp = 0;
    let _tmp$2 = hd.end - hd.start | 0;
    while (true) {
      const _ = _tmp;
      const size_hint$2 = _tmp$2;
      if (_ < _bind$2) {
        const s = _x_buf[_x_start + _ | 0];
        _tmp = _ + 1 | 0;
        const _bind$3 = _M0IPC16string6StringPB12ToStringView16to__string__view(s);
        _tmp$2 = (size_hint$2 + (_bind$3.end - _bind$3.start | 0) | 0) + (separator.end - separator.start | 0) | 0;
        continue;
      } else {
        size_hint = size_hint$2;
        break;
      }
    }
    const size_hint$2 = size_hint << 1;
    const buf = _M0MPB13StringBuilder21StringBuilder_2einner(size_hint$2);
    _M0IPB13StringBuilderPB6Logger11write__view(buf, hd);
    if ((separator.end - separator.start | 0) === 0) {
      const _bind$3 = _x_end - _x_start | 0;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$3) {
          const s = _x_buf[_x_start + _ | 0];
          const s$2 = _M0IPC16string6StringPB12ToStringView16to__string__view(s);
          _M0IPB13StringBuilderPB6Logger11write__view(buf, s$2);
          _tmp$3 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    } else {
      const _bind$3 = _x_end - _x_start | 0;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$3) {
          const s = _x_buf[_x_start + _ | 0];
          const s$2 = _M0IPC16string6StringPB12ToStringView16to__string__view(s);
          _M0IPB13StringBuilderPB6Logger11write__view(buf, separator);
          _M0IPB13StringBuilderPB6Logger11write__view(buf, s$2);
          _tmp$3 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    }
    return _M0MPB13StringBuilder10to__string(buf);
  }
}
function _M0MPC15array9ArrayView4joinGRPC16string10StringViewE(self, separator) {
  if ((self.end - self.start | 0) === 0) {
    return "";
  } else {
    const _hd = self.buf[self.start];
    const _x_buf = self.buf;
    const _x_start = 1 + self.start | 0;
    const _x_end = self.end;
    const hd = _M0IPC16string10StringViewPB12ToStringView16to__string__view(_hd);
    const _bind$2 = _x_end - _x_start | 0;
    let size_hint;
    let _tmp = 0;
    let _tmp$2 = hd.end - hd.start | 0;
    while (true) {
      const _ = _tmp;
      const size_hint$2 = _tmp$2;
      if (_ < _bind$2) {
        const s = _x_buf[_x_start + _ | 0];
        _tmp = _ + 1 | 0;
        const _bind$3 = _M0IPC16string10StringViewPB12ToStringView16to__string__view(s);
        _tmp$2 = (size_hint$2 + (_bind$3.end - _bind$3.start | 0) | 0) + (separator.end - separator.start | 0) | 0;
        continue;
      } else {
        size_hint = size_hint$2;
        break;
      }
    }
    const size_hint$2 = size_hint << 1;
    const buf = _M0MPB13StringBuilder21StringBuilder_2einner(size_hint$2);
    _M0IPB13StringBuilderPB6Logger11write__view(buf, hd);
    if ((separator.end - separator.start | 0) === 0) {
      const _bind$3 = _x_end - _x_start | 0;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$3) {
          const s = _x_buf[_x_start + _ | 0];
          const s$2 = _M0IPC16string10StringViewPB12ToStringView16to__string__view(s);
          _M0IPB13StringBuilderPB6Logger11write__view(buf, s$2);
          _tmp$3 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    } else {
      const _bind$3 = _x_end - _x_start | 0;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$3) {
          const s = _x_buf[_x_start + _ | 0];
          const s$2 = _M0IPC16string10StringViewPB12ToStringView16to__string__view(s);
          _M0IPB13StringBuilderPB6Logger11write__view(buf, separator);
          _M0IPB13StringBuilderPB6Logger11write__view(buf, s$2);
          _tmp$3 = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    }
    return _M0MPB13StringBuilder10to__string(buf);
  }
}
function _M0IPC16option6OptionPB2Eq5equalGsE(self, other) {
  if (self === undefined) {
    return other === undefined;
  } else {
    const _Some = self;
    const _x = _Some;
    if (other === undefined) {
      return false;
    } else {
      const _Some$2 = other;
      const _y = _Some$2;
      return _x === _y;
    }
  }
}
function _M0IPC16option6OptionPB2Eq5equalGbE(self, other) {
  if (self === -1) {
    return other === -1;
  } else {
    const _Some = self;
    const _x = _Some;
    if (other === -1) {
      return false;
    } else {
      const _Some$2 = other;
      const _y = _Some$2;
      return _x === _y;
    }
  }
}
function _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(self) {
  if (self === undefined) {
    return $panic();
  } else {
    const _Some = self;
    return _Some;
  }
}
function _M0MPC16option6Option10unwrap__orGRPB5ArrayGsEE(self, default_) {
  if (self.$tag === 1) {
    const _Some = self;
    const _t = _Some._0;
    return _t;
  } else {
    return default_;
  }
}
function _M0MPC16option6Option10unwrap__orGcE(self, default_) {
  if (self === -1) {
    return default_;
  } else {
    const _Some = self;
    const _t = _Some;
    return _t;
  }
}
function _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(self, default_) {
  if (self === undefined) {
    return default_;
  } else {
    const _Some = self;
    const _t = _Some;
    return _t;
  }
}
function _M0MPC16option6Option16unwrap__or__elseGRP211localreview4amqp10MethodSpecEHRPB7Failure(self, default_) {
  if (self === undefined) {
    return default_();
  } else {
    const _Some = self;
    const _t = _Some;
    return new _M0DTPC16result6ResultGRP211localreview4amqp10MethodSpecRPB7FailureE2Ok(_t);
  }
}
function _M0MPC16option6Option16unwrap__or__elseGUsRP211localreview4amqp12ArgumentKindEEHRPB7Failure(self, default_) {
  if (self === undefined) {
    return default_();
  } else {
    const _Some = self;
    const _t = _Some;
    return new _M0DTPC16result6ResultGUsRP211localreview4amqp12ArgumentKindERPB7FailureE2Ok(_t);
  }
}
function _M0MPC16option6Option16unwrap__or__elseGRP211localreview4amqp7SessionEHRPB7Failure(self, default_) {
  if (self === undefined) {
    return default_();
  } else {
    const _Some = self;
    const _t = _Some;
    return new _M0DTPC16result6ResultGRP211localreview4amqp7SessionRPB7FailureE2Ok(_t);
  }
}
function _M0MPC16option6Option16unwrap__or__elseGUiRP211localreview4amqp14AuthenticationEEHRP211localreview4amqp10FrameError(self, default_) {
  if (self === undefined) {
    return default_();
  } else {
    const _Some = self;
    const _t = _Some;
    return new _M0DTPC16result6ResultGUiRP211localreview4amqp14AuthenticationERP211localreview4amqp10FrameErrorE2Ok(_t);
  }
}
function _M0MPC16option6Option16unwrap__or__elseGmEHRP211localreview4amqp10FrameError(self, default_) {
  if (self === undefined) {
    return default_();
  } else {
    const _Some = self;
    const _t = _Some;
    return new _M0DTPC16result6ResultGmRP211localreview4amqp10FrameErrorE2Ok(_t);
  }
}
function _M0MPC16option6Option16unwrap__or__elseGRPB4JsonEHRPB7Failure(self, default_) {
  if (self === undefined) {
    return default_();
  } else {
    const _Some = self;
    const _t = _Some;
    return new _M0DTPC16result6ResultGRPB4JsonRPB7FailureE2Ok(_t);
  }
}
function _M0MPC16option6Option16unwrap__or__elseGRP211localreview4amqp13StreamPendingEHRP211localreview4amqp10FrameError(self, default_) {
  if (self === undefined) {
    return default_();
  } else {
    const _Some = self;
    const _t = _Some;
    return new _M0DTPC16result6ResultGRP211localreview4amqp13StreamPendingRP211localreview4amqp10FrameErrorE2Ok(_t);
  }
}
function _M0MPC16option6Option3mapGRPC16string10StringViewsE(self, f) {
  if (self === undefined) {
    return undefined;
  } else {
    const _Some = self;
    const _t = _Some;
    return f(_t);
  }
}
function _M0MPC15array5Array31unsafe__make__and__blit_2einnerGsE(src, allocate_len, len, src_offset, dst_offset) {
  const dst = new Array(allocate_len);
  _M0MPB18UninitializedArray12unsafe__blitGsE(dst, dst_offset, src, src_offset, len);
  return dst;
}
function _M0FPB21calc__grow__threshold(capacity) {
  if (16 === 0) {
    $panic();
  }
  return (Math.imul(capacity, 13) | 0) / 16 | 0;
}
function _M0MPC13int3Int20next__power__of__two(self) {
  if (self >= 0) {
    if (self <= 1) {
      return 1;
    }
    if (self > 1073741824) {
      return 1073741824;
    }
    return (2147483647 >> (Math.clz32(self - 1 | 0) - 1 | 0)) + 1 | 0;
  } else {
    return $panic();
  }
}
function _M0FPB8new__mapGsRPB4JsonE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind$2 = capacity$2 - 1 | 0;
  const _bind$3 = _M0FPB21calc__grow__threshold(capacity$2);
  const _bind$4 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$5 = undefined;
  return new _M0TPB3MapGsRPB4JsonE(_bind$4, 0, capacity$2, _bind$2, _bind$3, _bind$5, -1);
}
function _M0FPB8new__mapGsRPB5ArrayGsEE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind$2 = capacity$2 - 1 | 0;
  const _bind$3 = _M0FPB21calc__grow__threshold(capacity$2);
  const _bind$4 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$5 = undefined;
  return new _M0TPB3MapGsRPB5ArrayGsEE(_bind$4, 0, capacity$2, _bind$2, _bind$3, _bind$5, -1);
}
function _M0FPB8new__mapGiRP211localreview4amqp7PendingE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind$2 = capacity$2 - 1 | 0;
  const _bind$3 = _M0FPB21calc__grow__threshold(capacity$2);
  const _bind$4 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$5 = undefined;
  return new _M0TPB3MapGiRP211localreview4amqp7PendingE(_bind$4, 0, capacity$2, _bind$2, _bind$3, _bind$5, -1);
}
function _M0FPB8new__mapGisE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind$2 = capacity$2 - 1 | 0;
  const _bind$3 = _M0FPB21calc__grow__threshold(capacity$2);
  const _bind$4 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$5 = undefined;
  return new _M0TPB3MapGisE(_bind$4, 0, capacity$2, _bind$2, _bind$3, _bind$5, -1);
}
function _M0FPB8new__mapGibE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind$2 = capacity$2 - 1 | 0;
  const _bind$3 = _M0FPB21calc__grow__threshold(capacity$2);
  const _bind$4 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$5 = undefined;
  return new _M0TPB3MapGibE(_bind$4, 0, capacity$2, _bind$2, _bind$3, _bind$5, -1);
}
function _M0FPB8new__mapGimE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind$2 = capacity$2 - 1 | 0;
  const _bind$3 = _M0FPB21calc__grow__threshold(capacity$2);
  const _bind$4 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$5 = undefined;
  return new _M0TPB3MapGimE(_bind$4, 0, capacity$2, _bind$2, _bind$3, _bind$5, -1);
}
function _M0FPB8new__mapGiRP211localreview4amqp13StreamPendingE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind$2 = capacity$2 - 1 | 0;
  const _bind$3 = _M0FPB21calc__grow__threshold(capacity$2);
  const _bind$4 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$5 = undefined;
  return new _M0TPB3MapGiRP211localreview4amqp13StreamPendingE(_bind$4, 0, capacity$2, _bind$2, _bind$3, _bind$5, -1);
}
function _M0FPB21capacity__for__length(length) {
  let capacity = _M0MPC13int3Int20next__power__of__two(length);
  if (length > _M0FPB21calc__grow__threshold(capacity)) {
    capacity = Math.imul(capacity, 2) | 0;
  }
  return capacity;
}
function _M0MPC13int3Int3max(self, other) {
  return self > other ? self : other;
}
function _M0MPB3Map20add__entry__to__tailGsRP211localreview4amqp7SessionE(self, idx, entry) {
  const _bind$2 = self.tail;
  if (_bind$2 === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind$2 >>> 0 < _tmp.length ? _tmp[_bind$2] : $oob()).next = entry;
  }
  self.tail = idx;
  self.entries[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map20add__entry__to__tailGsRPB5ArrayGsEE(self, idx, entry) {
  const _bind$2 = self.tail;
  if (_bind$2 === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind$2 >>> 0 < _tmp.length ? _tmp[_bind$2] : $oob()).next = entry;
  }
  self.tail = idx;
  self.entries[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map20add__entry__to__tailGisE(self, idx, entry) {
  const _bind$2 = self.tail;
  if (_bind$2 === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind$2 >>> 0 < _tmp.length ? _tmp[_bind$2] : $oob()).next = entry;
  }
  self.tail = idx;
  self.entries[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map20add__entry__to__tailGibE(self, idx, entry) {
  const _bind$2 = self.tail;
  if (_bind$2 === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind$2 >>> 0 < _tmp.length ? _tmp[_bind$2] : $oob()).next = entry;
  }
  self.tail = idx;
  self.entries[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map20add__entry__to__tailGimE(self, idx, entry) {
  const _bind$2 = self.tail;
  if (_bind$2 === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind$2 >>> 0 < _tmp.length ? _tmp[_bind$2] : $oob()).next = entry;
  }
  self.tail = idx;
  self.entries[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map20add__entry__to__tailGiRP211localreview4amqp7PendingE(self, idx, entry) {
  const _bind$2 = self.tail;
  if (_bind$2 === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind$2 >>> 0 < _tmp.length ? _tmp[_bind$2] : $oob()).next = entry;
  }
  self.tail = idx;
  self.entries[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map20add__entry__to__tailGiRP211localreview4amqp13StreamPendingE(self, idx, entry) {
  const _bind$2 = self.tail;
  if (_bind$2 === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind$2 >>> 0 < _tmp.length ? _tmp[_bind$2] : $oob()).next = entry;
  }
  self.tail = idx;
  self.entries[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map10set__entryGsRP211localreview4amqp7SessionE(self, entry, new_idx) {
  const _bind$2 = entry.next;
  if (_bind$2 === undefined) {
    self.tail = new_idx;
  } else {
    const _Some = _bind$2;
    const _next = _Some;
    _next.prev = new_idx;
  }
  self.entries[new_idx] = entry;
}
function _M0MPB3Map10set__entryGsRPB5ArrayGsEE(self, entry, new_idx) {
  const _bind$2 = entry.next;
  if (_bind$2 === undefined) {
    self.tail = new_idx;
  } else {
    const _Some = _bind$2;
    const _next = _Some;
    _next.prev = new_idx;
  }
  self.entries[new_idx] = entry;
}
function _M0MPB3Map10set__entryGisE(self, entry, new_idx) {
  const _bind$2 = entry.next;
  if (_bind$2 === undefined) {
    self.tail = new_idx;
  } else {
    const _Some = _bind$2;
    const _next = _Some;
    _next.prev = new_idx;
  }
  self.entries[new_idx] = entry;
}
function _M0MPB3Map10set__entryGimE(self, entry, new_idx) {
  const _bind$2 = entry.next;
  if (_bind$2 === undefined) {
    self.tail = new_idx;
  } else {
    const _Some = _bind$2;
    const _next = _Some;
    _next.prev = new_idx;
  }
  self.entries[new_idx] = entry;
}
function _M0MPB3Map10set__entryGibE(self, entry, new_idx) {
  const _bind$2 = entry.next;
  if (_bind$2 === undefined) {
    self.tail = new_idx;
  } else {
    const _Some = _bind$2;
    const _next = _Some;
    _next.prev = new_idx;
  }
  self.entries[new_idx] = entry;
}
function _M0MPB3Map10set__entryGiRP211localreview4amqp7PendingE(self, entry, new_idx) {
  const _bind$2 = entry.next;
  if (_bind$2 === undefined) {
    self.tail = new_idx;
  } else {
    const _Some = _bind$2;
    const _next = _Some;
    _next.prev = new_idx;
  }
  self.entries[new_idx] = entry;
}
function _M0MPB3Map10set__entryGiRP211localreview4amqp13StreamPendingE(self, entry, new_idx) {
  const _bind$2 = entry.next;
  if (_bind$2 === undefined) {
    self.tail = new_idx;
  } else {
    const _Some = _bind$2;
    const _next = _Some;
    _next.prev = new_idx;
  }
  self.entries[new_idx] = entry;
}
function _M0MPB3Map10push__awayGsRP211localreview4amqp7SessionE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _bind$2 = self.entries[idx$2];
    if (_bind$2 === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGsRP211localreview4amqp7SessionE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGsRP211localreview4amqp7SessionE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = (idx$2 + 1 | 0) & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = (idx$2 + 1 | 0) & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map10push__awayGsRPB5ArrayGsEE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _bind$2 = self.entries[idx$2];
    if (_bind$2 === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGsRPB5ArrayGsEE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGsRPB5ArrayGsEE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = (idx$2 + 1 | 0) & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = (idx$2 + 1 | 0) & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map10push__awayGisE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _bind$2 = self.entries[idx$2];
    if (_bind$2 === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGisE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGisE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = (idx$2 + 1 | 0) & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = (idx$2 + 1 | 0) & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map10push__awayGibE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _bind$2 = self.entries[idx$2];
    if (_bind$2 === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGibE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGibE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = (idx$2 + 1 | 0) & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = (idx$2 + 1 | 0) & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map10push__awayGimE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _bind$2 = self.entries[idx$2];
    if (_bind$2 === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGimE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGimE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = (idx$2 + 1 | 0) & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = (idx$2 + 1 | 0) & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map10push__awayGiRP211localreview4amqp7PendingE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _bind$2 = self.entries[idx$2];
    if (_bind$2 === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGiRP211localreview4amqp7PendingE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGiRP211localreview4amqp7PendingE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = (idx$2 + 1 | 0) & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = (idx$2 + 1 | 0) & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map10push__awayGiRP211localreview4amqp13StreamPendingE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _bind$2 = self.entries[idx$2];
    if (_bind$2 === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGiRP211localreview4amqp13StreamPendingE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGiRP211localreview4amqp13StreamPendingE(self, entry$2, idx$2);
        _tmp = _curr_entry.psl + 1 | 0;
        _tmp$2 = (idx$2 + 1 | 0) & self.capacity_mask;
        _tmp$3 = _curr_entry;
        continue;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = (idx$2 + 1 | 0) & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map20rehash__place__entryGsRP211localreview4amqp7SessionE(self, outer) {
  const hash = outer.hash;
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      outer.psl = psl;
      outer.prev = self.tail;
      _M0MPB3Map20add__entry__to__tailGsRP211localreview4amqp7SessionE(self, idx, outer);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr = _Some;
      if (psl > _curr.psl) {
        _M0MPB3Map10push__awayGsRP211localreview4amqp7SessionE(self, idx, _curr);
        outer.psl = psl;
        outer.prev = self.tail;
        _M0MPB3Map20add__entry__to__tailGsRP211localreview4amqp7SessionE(self, idx, outer);
        return undefined;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map20rehash__place__entryGsRPB5ArrayGsEE(self, outer) {
  const hash = outer.hash;
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      outer.psl = psl;
      outer.prev = self.tail;
      _M0MPB3Map20add__entry__to__tailGsRPB5ArrayGsEE(self, idx, outer);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr = _Some;
      if (psl > _curr.psl) {
        _M0MPB3Map10push__awayGsRPB5ArrayGsEE(self, idx, _curr);
        outer.psl = psl;
        outer.prev = self.tail;
        _M0MPB3Map20add__entry__to__tailGsRPB5ArrayGsEE(self, idx, outer);
        return undefined;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map20rehash__place__entryGisE(self, outer) {
  const hash = outer.hash;
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      outer.psl = psl;
      outer.prev = self.tail;
      _M0MPB3Map20add__entry__to__tailGisE(self, idx, outer);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr = _Some;
      if (psl > _curr.psl) {
        _M0MPB3Map10push__awayGisE(self, idx, _curr);
        outer.psl = psl;
        outer.prev = self.tail;
        _M0MPB3Map20add__entry__to__tailGisE(self, idx, outer);
        return undefined;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map20rehash__place__entryGibE(self, outer) {
  const hash = outer.hash;
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      outer.psl = psl;
      outer.prev = self.tail;
      _M0MPB3Map20add__entry__to__tailGibE(self, idx, outer);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr = _Some;
      if (psl > _curr.psl) {
        _M0MPB3Map10push__awayGibE(self, idx, _curr);
        outer.psl = psl;
        outer.prev = self.tail;
        _M0MPB3Map20add__entry__to__tailGibE(self, idx, outer);
        return undefined;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map20rehash__place__entryGimE(self, outer) {
  const hash = outer.hash;
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      outer.psl = psl;
      outer.prev = self.tail;
      _M0MPB3Map20add__entry__to__tailGimE(self, idx, outer);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr = _Some;
      if (psl > _curr.psl) {
        _M0MPB3Map10push__awayGimE(self, idx, _curr);
        outer.psl = psl;
        outer.prev = self.tail;
        _M0MPB3Map20add__entry__to__tailGimE(self, idx, outer);
        return undefined;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map20rehash__place__entryGiRP211localreview4amqp7PendingE(self, outer) {
  const hash = outer.hash;
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      outer.psl = psl;
      outer.prev = self.tail;
      _M0MPB3Map20add__entry__to__tailGiRP211localreview4amqp7PendingE(self, idx, outer);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr = _Some;
      if (psl > _curr.psl) {
        _M0MPB3Map10push__awayGiRP211localreview4amqp7PendingE(self, idx, _curr);
        outer.psl = psl;
        outer.prev = self.tail;
        _M0MPB3Map20add__entry__to__tailGiRP211localreview4amqp7PendingE(self, idx, outer);
        return undefined;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map20rehash__place__entryGiRP211localreview4amqp13StreamPendingE(self, outer) {
  const hash = outer.hash;
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      outer.psl = psl;
      outer.prev = self.tail;
      _M0MPB3Map20add__entry__to__tailGiRP211localreview4amqp13StreamPendingE(self, idx, outer);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr = _Some;
      if (psl > _curr.psl) {
        _M0MPB3Map10push__awayGiRP211localreview4amqp13StreamPendingE(self, idx, _curr);
        outer.psl = psl;
        outer.prev = self.tail;
        _M0MPB3Map20add__entry__to__tailGiRP211localreview4amqp13StreamPendingE(self, idx, outer);
        return undefined;
      } else {
        _tmp = psl + 1 | 0;
        _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
        continue;
      }
    }
  }
}
function _M0MPB3Map4growGsRP211localreview4amqp7SessionE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  self.grow_at = _M0FPB21calc__grow__threshold(self.capacity);
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _e = _Some;
      const next_in_chain = _e.next;
      _e.next = undefined;
      _M0MPB3Map20rehash__place__entryGsRP211localreview4amqp7SessionE(self, _e);
      _tmp = next_in_chain;
      continue;
    }
  }
}
function _M0MPB3Map4growGsRPB5ArrayGsEE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  self.grow_at = _M0FPB21calc__grow__threshold(self.capacity);
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _e = _Some;
      const next_in_chain = _e.next;
      _e.next = undefined;
      _M0MPB3Map20rehash__place__entryGsRPB5ArrayGsEE(self, _e);
      _tmp = next_in_chain;
      continue;
    }
  }
}
function _M0MPB3Map4growGisE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  self.grow_at = _M0FPB21calc__grow__threshold(self.capacity);
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _e = _Some;
      const next_in_chain = _e.next;
      _e.next = undefined;
      _M0MPB3Map20rehash__place__entryGisE(self, _e);
      _tmp = next_in_chain;
      continue;
    }
  }
}
function _M0MPB3Map4growGibE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  self.grow_at = _M0FPB21calc__grow__threshold(self.capacity);
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _e = _Some;
      const next_in_chain = _e.next;
      _e.next = undefined;
      _M0MPB3Map20rehash__place__entryGibE(self, _e);
      _tmp = next_in_chain;
      continue;
    }
  }
}
function _M0MPB3Map4growGimE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  self.grow_at = _M0FPB21calc__grow__threshold(self.capacity);
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _e = _Some;
      const next_in_chain = _e.next;
      _e.next = undefined;
      _M0MPB3Map20rehash__place__entryGimE(self, _e);
      _tmp = next_in_chain;
      continue;
    }
  }
}
function _M0MPB3Map4growGiRP211localreview4amqp7PendingE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  self.grow_at = _M0FPB21calc__grow__threshold(self.capacity);
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _e = _Some;
      const next_in_chain = _e.next;
      _e.next = undefined;
      _M0MPB3Map20rehash__place__entryGiRP211localreview4amqp7PendingE(self, _e);
      _tmp = next_in_chain;
      continue;
    }
  }
}
function _M0MPB3Map4growGiRP211localreview4amqp13StreamPendingE(self) {
  const old_head = self.head;
  const new_capacity = self.capacity << 1;
  self.entries = $make_array_len_and_init(new_capacity, undefined);
  self.capacity = new_capacity;
  self.capacity_mask = new_capacity - 1 | 0;
  self.grow_at = _M0FPB21calc__grow__threshold(self.capacity);
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
  let _tmp = old_head;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      return;
    } else {
      const _Some = x;
      const _e = _Some;
      const next_in_chain = _e.next;
      _e.next = undefined;
      _M0MPB3Map20rehash__place__entryGiRP211localreview4amqp13StreamPendingE(self, _e);
      _tmp = next_in_chain;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGsRP211localreview4amqp7SessionE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsRP211localreview4amqp7SessionE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$3 = self.tail;
      const _bind$4 = undefined;
      const entry = new _M0TPB5EntryGsRP211localreview4amqp7SessionE(_bind$3, _bind$4, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRP211localreview4amqp7SessionE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsRP211localreview4amqp7SessionE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRP211localreview4amqp7SessionE(self, idx, _curr_entry);
        const _bind$3 = self.tail;
        const _bind$4 = undefined;
        const entry = new _M0TPB5EntryGsRP211localreview4amqp7SessionE(_bind$3, _bind$4, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRP211localreview4amqp7SessionE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGsRPB5ArrayGsEE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsRPB5ArrayGsEE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$3 = self.tail;
      const _bind$4 = undefined;
      const entry = new _M0TPB5EntryGsRPB5ArrayGsEE(_bind$3, _bind$4, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRPB5ArrayGsEE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsRPB5ArrayGsEE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRPB5ArrayGsEE(self, idx, _curr_entry);
        const _bind$3 = self.tail;
        const _bind$4 = undefined;
        const entry = new _M0TPB5EntryGsRPB5ArrayGsEE(_bind$3, _bind$4, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRPB5ArrayGsEE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGsRPB4JsonE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsRP211localreview4amqp7SessionE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$3 = self.tail;
      const _bind$4 = undefined;
      const entry = new _M0TPB5EntryGsRPB4JsonE(_bind$3, _bind$4, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRP211localreview4amqp7SessionE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsRP211localreview4amqp7SessionE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRP211localreview4amqp7SessionE(self, idx, _curr_entry);
        const _bind$3 = self.tail;
        const _bind$4 = undefined;
        const entry = new _M0TPB5EntryGsRPB4JsonE(_bind$3, _bind$4, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRP211localreview4amqp7SessionE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGisE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGisE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$3 = self.tail;
      const _bind$4 = undefined;
      const entry = new _M0TPB5EntryGisE(_bind$3, _bind$4, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGisE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGisE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGisE(self, idx, _curr_entry);
        const _bind$3 = self.tail;
        const _bind$4 = undefined;
        const entry = new _M0TPB5EntryGisE(_bind$3, _bind$4, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGisE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGibE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGibE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$3 = self.tail;
      const _bind$4 = undefined;
      const entry = new _M0TPB5EntryGibE(_bind$3, _bind$4, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGibE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGibE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGibE(self, idx, _curr_entry);
        const _bind$3 = self.tail;
        const _bind$4 = undefined;
        const entry = new _M0TPB5EntryGibE(_bind$3, _bind$4, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGibE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGimE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGimE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$3 = self.tail;
      const _bind$4 = undefined;
      const entry = new _M0TPB5EntryGimE(_bind$3, _bind$4, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGimE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGimE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGimE(self, idx, _curr_entry);
        const _bind$3 = self.tail;
        const _bind$4 = undefined;
        const entry = new _M0TPB5EntryGimE(_bind$3, _bind$4, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGimE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGiRP211localreview4amqp7PendingE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGiRP211localreview4amqp7PendingE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$3 = self.tail;
      const _bind$4 = undefined;
      const entry = new _M0TPB5EntryGiRP211localreview4amqp7PendingE(_bind$3, _bind$4, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGiRP211localreview4amqp7PendingE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGiRP211localreview4amqp7PendingE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGiRP211localreview4amqp7PendingE(self, idx, _curr_entry);
        const _bind$3 = self.tail;
        const _bind$4 = undefined;
        const entry = new _M0TPB5EntryGiRP211localreview4amqp7PendingE(_bind$3, _bind$4, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGiRP211localreview4amqp7PendingE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGsRP211localreview4amqp8ArgumentE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsRP211localreview4amqp7SessionE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$3 = self.tail;
      const _bind$4 = undefined;
      const entry = new _M0TPB5EntryGsRP211localreview4amqp8ArgumentE(_bind$3, _bind$4, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRP211localreview4amqp7SessionE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsRP211localreview4amqp7SessionE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRP211localreview4amqp7SessionE(self, idx, _curr_entry);
        const _bind$3 = self.tail;
        const _bind$4 = undefined;
        const entry = new _M0TPB5EntryGsRP211localreview4amqp8ArgumentE(_bind$3, _bind$4, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRP211localreview4amqp7SessionE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGiRP211localreview4amqp13StreamPendingE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGiRP211localreview4amqp13StreamPendingE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$3 = self.tail;
      const _bind$4 = undefined;
      const entry = new _M0TPB5EntryGiRP211localreview4amqp13StreamPendingE(_bind$3, _bind$4, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGiRP211localreview4amqp13StreamPendingE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGiRP211localreview4amqp13StreamPendingE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGiRP211localreview4amqp13StreamPendingE(self, idx, _curr_entry);
        const _bind$3 = self.tail;
        const _bind$4 = undefined;
        const entry = new _M0TPB5EntryGiRP211localreview4amqp13StreamPendingE(_bind$3, _bind$4, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGiRP211localreview4amqp13StreamPendingE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map15set__with__hashGsRPC15debug4ReprE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsRP211localreview4amqp7SessionE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$3 = self.tail;
      const _bind$4 = undefined;
      const entry = new _M0TPB5EntryGsRPC15debug4ReprE(_bind$3, _bind$4, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRP211localreview4amqp7SessionE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind$2;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsRP211localreview4amqp7SessionE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRP211localreview4amqp7SessionE(self, idx, _curr_entry);
        const _bind$3 = self.tail;
        const _bind$4 = undefined;
        const entry = new _M0TPB5EntryGsRPC15debug4ReprE(_bind$3, _bind$4, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRP211localreview4amqp7SessionE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3setGsRP211localreview4amqp7SessionE(self, key, value) {
  _M0MPB3Map15set__with__hashGsRP211localreview4amqp7SessionE(self, key, value, _M0IPC16string6StringPB4Hash4hash(key));
}
function _M0MPB3Map3setGsRPB5ArrayGsEE(self, key, value) {
  _M0MPB3Map15set__with__hashGsRPB5ArrayGsEE(self, key, value, _M0IPC16string6StringPB4Hash4hash(key));
}
function _M0MPB3Map3setGsRPB4JsonE(self, key, value) {
  _M0MPB3Map15set__with__hashGsRPB4JsonE(self, key, value, _M0IPC16string6StringPB4Hash4hash(key));
}
function _M0MPB3Map3setGisE(self, key, value) {
  _M0MPB3Map15set__with__hashGisE(self, key, value, _M0IPC13int3IntPB4Hash4hash(key));
}
function _M0MPB3Map3setGibE(self, key, value) {
  _M0MPB3Map15set__with__hashGibE(self, key, value, _M0IPC13int3IntPB4Hash4hash(key));
}
function _M0MPB3Map3setGimE(self, key, value) {
  _M0MPB3Map15set__with__hashGimE(self, key, value, _M0IPC13int3IntPB4Hash4hash(key));
}
function _M0MPB3Map3setGiRP211localreview4amqp7PendingE(self, key, value) {
  _M0MPB3Map15set__with__hashGiRP211localreview4amqp7PendingE(self, key, value, _M0IPC13int3IntPB4Hash4hash(key));
}
function _M0MPB3Map3setGsRP211localreview4amqp8ArgumentE(self, key, value) {
  _M0MPB3Map15set__with__hashGsRP211localreview4amqp8ArgumentE(self, key, value, _M0IPC16string6StringPB4Hash4hash(key));
}
function _M0MPB3Map3setGiRP211localreview4amqp13StreamPendingE(self, key, value) {
  _M0MPB3Map15set__with__hashGiRP211localreview4amqp13StreamPendingE(self, key, value, _M0IPC13int3IntPB4Hash4hash(key));
}
function _M0MPB3Map3setGsRPC15debug4ReprE(self, key, value) {
  _M0MPB3Map15set__with__hashGsRPC15debug4ReprE(self, key, value, _M0IPC16string6StringPB4Hash4hash(key));
}
function _M0MPB3Map3MapGsRPB4JsonE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    capacity$2 = _M0MPC13int3Int3max(_capacity, _M0FPB21capacity__for__length(length));
  }
  const m = _M0FPB8new__mapGsRPB4JsonE(capacity$2);
  const _bind$2 = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGsRPB4JsonE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGsRPB5ArrayGsEE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    capacity$2 = _M0MPC13int3Int3max(_capacity, _M0FPB21capacity__for__length(length));
  }
  const m = _M0FPB8new__mapGsRPB5ArrayGsEE(capacity$2);
  const _bind$2 = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGsRPB5ArrayGsEE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGsRP211localreview4amqp7SessionE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    capacity$2 = _M0MPC13int3Int3max(_capacity, _M0FPB21capacity__for__length(length));
  }
  const m = _M0FPB8new__mapGsRPB4JsonE(capacity$2);
  const _bind$2 = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGsRP211localreview4amqp7SessionE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGiRP211localreview4amqp7PendingE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    capacity$2 = _M0MPC13int3Int3max(_capacity, _M0FPB21capacity__for__length(length));
  }
  const m = _M0FPB8new__mapGiRP211localreview4amqp7PendingE(capacity$2);
  const _bind$2 = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGiRP211localreview4amqp7PendingE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGsRP211localreview4amqp8ArgumentE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    capacity$2 = _M0MPC13int3Int3max(_capacity, _M0FPB21capacity__for__length(length));
  }
  const m = _M0FPB8new__mapGsRPB4JsonE(capacity$2);
  const _bind$2 = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGsRP211localreview4amqp8ArgumentE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGsRPC15debug4ReprE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    capacity$2 = _M0MPC13int3Int3max(_capacity, _M0FPB21capacity__for__length(length));
  }
  const m = _M0FPB8new__mapGsRPB4JsonE(capacity$2);
  const _bind$2 = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGsRPC15debug4ReprE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGisE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    capacity$2 = _M0MPC13int3Int3max(_capacity, _M0FPB21capacity__for__length(length));
  }
  const m = _M0FPB8new__mapGisE(capacity$2);
  const _bind$2 = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGisE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGibE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    capacity$2 = _M0MPC13int3Int3max(_capacity, _M0FPB21capacity__for__length(length));
  }
  const m = _M0FPB8new__mapGibE(capacity$2);
  const _bind$2 = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGibE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGimE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    capacity$2 = _M0MPC13int3Int3max(_capacity, _M0FPB21capacity__for__length(length));
  }
  const m = _M0FPB8new__mapGimE(capacity$2);
  const _bind$2 = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGimE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3MapGiRP211localreview4amqp13StreamPendingE(arr, capacity) {
  const length = arr.end - arr.start | 0;
  let capacity$2;
  if (capacity === undefined) {
    capacity$2 = length === 0 ? 8 : _M0FPB21capacity__for__length(length);
  } else {
    const _Some = capacity;
    const _capacity = _Some;
    capacity$2 = _M0MPC13int3Int3max(_capacity, _M0FPB21capacity__for__length(length));
  }
  const m = _M0FPB8new__mapGiRP211localreview4amqp13StreamPendingE(capacity$2);
  const _bind$2 = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const e = arr.buf[arr.start + _ | 0];
      _M0MPB3Map3setGiRP211localreview4amqp13StreamPendingE(m, e._0, e._1);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return m;
}
function _M0MPB3Map3getGsRPB5ArrayGsEE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return _M0DTPC16option6OptionGRPB5ArrayGsEE4None__;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return new _M0DTPC16option6OptionGRPB5ArrayGsEE4Some(_entry.value);
      }
      if (i > _entry.psl) {
        return _M0DTPC16option6OptionGRPB5ArrayGsEE4None__;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGsRP211localreview4amqp7SessionE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGisE(self, key) {
  const hash = _M0IPC13int3IntPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGibE(self, key) {
  const hash = _M0IPC13int3IntPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return -1;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return -1;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGimE(self, key) {
  const hash = _M0IPC13int3IntPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGiRP211localreview4amqp7PendingE(self, key) {
  const hash = _M0IPC13int3IntPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGiRP211localreview4amqp13StreamPendingE(self, key) {
  const hash = _M0IPC13int3IntPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGsRP211localreview4amqp8ArgumentE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3getGsRPB4JsonE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return _entry.value;
      }
      if (i > _entry.psl) {
        return undefined;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map8containsGsRP211localreview4amqp7SessionE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return false;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map8containsGsRPB5ArrayGsEE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return false;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map8containsGisE(self, key) {
  const hash = _M0IPC13int3IntPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return false;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map8containsGimE(self, key) {
  const hash = _M0IPC13int3IntPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return false;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map8containsGiRP211localreview4amqp7PendingE(self, key) {
  const hash = _M0IPC13int3IntPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return false;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map8containsGsRPB4JsonE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return false;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map8containsGsRP211localreview4amqp8ArgumentE(self, key) {
  const hash = _M0IPC16string6StringPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return false;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map8containsGiRP211localreview4amqp13StreamPendingE(self, key) {
  const hash = _M0IPC13int3IntPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return false;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        return true;
      }
      if (i > _entry.psl) {
        return false;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map13remove__entryGsRP211localreview4amqp7SessionE(self, entry) {
  const _bind$2 = entry.prev;
  if (_bind$2 === -1) {
    self.head = entry.next;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind$2 >>> 0 < _tmp.length ? _tmp[_bind$2] : $oob()).next = entry.next;
  }
  const _bind$3 = entry.next;
  if (_bind$3 === undefined) {
    self.tail = entry.prev;
    return;
  } else {
    const _Some = _bind$3;
    const _next = _Some;
    _next.prev = entry.prev;
    return;
  }
}
function _M0MPB3Map13remove__entryGisE(self, entry) {
  const _bind$2 = entry.prev;
  if (_bind$2 === -1) {
    self.head = entry.next;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind$2 >>> 0 < _tmp.length ? _tmp[_bind$2] : $oob()).next = entry.next;
  }
  const _bind$3 = entry.next;
  if (_bind$3 === undefined) {
    self.tail = entry.prev;
    return;
  } else {
    const _Some = _bind$3;
    const _next = _Some;
    _next.prev = entry.prev;
    return;
  }
}
function _M0MPB3Map13remove__entryGimE(self, entry) {
  const _bind$2 = entry.prev;
  if (_bind$2 === -1) {
    self.head = entry.next;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind$2 >>> 0 < _tmp.length ? _tmp[_bind$2] : $oob()).next = entry.next;
  }
  const _bind$3 = entry.next;
  if (_bind$3 === undefined) {
    self.tail = entry.prev;
    return;
  } else {
    const _Some = _bind$3;
    const _next = _Some;
    _next.prev = entry.prev;
    return;
  }
}
function _M0MPB3Map13remove__entryGibE(self, entry) {
  const _bind$2 = entry.prev;
  if (_bind$2 === -1) {
    self.head = entry.next;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind$2 >>> 0 < _tmp.length ? _tmp[_bind$2] : $oob()).next = entry.next;
  }
  const _bind$3 = entry.next;
  if (_bind$3 === undefined) {
    self.tail = entry.prev;
    return;
  } else {
    const _Some = _bind$3;
    const _next = _Some;
    _next.prev = entry.prev;
    return;
  }
}
function _M0MPB3Map13remove__entryGiRP211localreview4amqp7PendingE(self, entry) {
  const _bind$2 = entry.prev;
  if (_bind$2 === -1) {
    self.head = entry.next;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind$2 >>> 0 < _tmp.length ? _tmp[_bind$2] : $oob()).next = entry.next;
  }
  const _bind$3 = entry.next;
  if (_bind$3 === undefined) {
    self.tail = entry.prev;
    return;
  } else {
    const _Some = _bind$3;
    const _next = _Some;
    _next.prev = entry.prev;
    return;
  }
}
function _M0MPB3Map13remove__entryGiRP211localreview4amqp13StreamPendingE(self, entry) {
  const _bind$2 = entry.prev;
  if (_bind$2 === -1) {
    self.head = entry.next;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind$2 >>> 0 < _tmp.length ? _tmp[_bind$2] : $oob()).next = entry.next;
  }
  const _bind$3 = entry.next;
  if (_bind$3 === undefined) {
    self.tail = entry.prev;
    return;
  } else {
    const _Some = _bind$3;
    const _next = _Some;
    _next.prev = entry.prev;
    return;
  }
}
function _M0MPB3Map11shift__backGsRP211localreview4amqp7SessionE(self, idx) {
  let _tmp = idx;
  while (true) {
    const cur = _tmp;
    const next = (cur + 1 | 0) & self.capacity_mask;
    _L: {
      const _bind$2 = self.entries[next];
      if (_bind$2 === undefined) {
        break _L;
      } else {
        const _Some = _bind$2;
        const _x = _Some;
        const _x$2 = _x.psl;
        if (_x$2 === 0) {
          break _L;
        } else {
          _x.psl = _x.psl - 1 | 0;
          _M0MPB3Map10set__entryGsRP211localreview4amqp7SessionE(self, _x, cur);
          _tmp = next;
          continue;
        }
      }
    }
    self.entries[cur] = undefined;
    return;
  }
}
function _M0MPB3Map11shift__backGisE(self, idx) {
  let _tmp = idx;
  while (true) {
    const cur = _tmp;
    const next = (cur + 1 | 0) & self.capacity_mask;
    _L: {
      const _bind$2 = self.entries[next];
      if (_bind$2 === undefined) {
        break _L;
      } else {
        const _Some = _bind$2;
        const _x = _Some;
        const _x$2 = _x.psl;
        if (_x$2 === 0) {
          break _L;
        } else {
          _x.psl = _x.psl - 1 | 0;
          _M0MPB3Map10set__entryGisE(self, _x, cur);
          _tmp = next;
          continue;
        }
      }
    }
    self.entries[cur] = undefined;
    return;
  }
}
function _M0MPB3Map11shift__backGimE(self, idx) {
  let _tmp = idx;
  while (true) {
    const cur = _tmp;
    const next = (cur + 1 | 0) & self.capacity_mask;
    _L: {
      const _bind$2 = self.entries[next];
      if (_bind$2 === undefined) {
        break _L;
      } else {
        const _Some = _bind$2;
        const _x = _Some;
        const _x$2 = _x.psl;
        if (_x$2 === 0) {
          break _L;
        } else {
          _x.psl = _x.psl - 1 | 0;
          _M0MPB3Map10set__entryGimE(self, _x, cur);
          _tmp = next;
          continue;
        }
      }
    }
    self.entries[cur] = undefined;
    return;
  }
}
function _M0MPB3Map11shift__backGibE(self, idx) {
  let _tmp = idx;
  while (true) {
    const cur = _tmp;
    const next = (cur + 1 | 0) & self.capacity_mask;
    _L: {
      const _bind$2 = self.entries[next];
      if (_bind$2 === undefined) {
        break _L;
      } else {
        const _Some = _bind$2;
        const _x = _Some;
        const _x$2 = _x.psl;
        if (_x$2 === 0) {
          break _L;
        } else {
          _x.psl = _x.psl - 1 | 0;
          _M0MPB3Map10set__entryGibE(self, _x, cur);
          _tmp = next;
          continue;
        }
      }
    }
    self.entries[cur] = undefined;
    return;
  }
}
function _M0MPB3Map11shift__backGiRP211localreview4amqp7PendingE(self, idx) {
  let _tmp = idx;
  while (true) {
    const cur = _tmp;
    const next = (cur + 1 | 0) & self.capacity_mask;
    _L: {
      const _bind$2 = self.entries[next];
      if (_bind$2 === undefined) {
        break _L;
      } else {
        const _Some = _bind$2;
        const _x = _Some;
        const _x$2 = _x.psl;
        if (_x$2 === 0) {
          break _L;
        } else {
          _x.psl = _x.psl - 1 | 0;
          _M0MPB3Map10set__entryGiRP211localreview4amqp7PendingE(self, _x, cur);
          _tmp = next;
          continue;
        }
      }
    }
    self.entries[cur] = undefined;
    return;
  }
}
function _M0MPB3Map11shift__backGiRP211localreview4amqp13StreamPendingE(self, idx) {
  let _tmp = idx;
  while (true) {
    const cur = _tmp;
    const next = (cur + 1 | 0) & self.capacity_mask;
    _L: {
      const _bind$2 = self.entries[next];
      if (_bind$2 === undefined) {
        break _L;
      } else {
        const _Some = _bind$2;
        const _x = _Some;
        const _x$2 = _x.psl;
        if (_x$2 === 0) {
          break _L;
        } else {
          _x.psl = _x.psl - 1 | 0;
          _M0MPB3Map10set__entryGiRP211localreview4amqp13StreamPendingE(self, _x, cur);
          _tmp = next;
          continue;
        }
      }
    }
    self.entries[cur] = undefined;
    return;
  }
}
function _M0MPB3Map18remove__with__hashGsRP211localreview4amqp7SessionE(self, key, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        _M0MPB3Map13remove__entryGsRP211localreview4amqp7SessionE(self, _entry);
        _M0MPB3Map11shift__backGsRP211localreview4amqp7SessionE(self, idx);
        self.size = self.size - 1 | 0;
        return;
      }
      if (i > _entry.psl) {
        return;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map18remove__with__hashGisE(self, key, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        _M0MPB3Map13remove__entryGisE(self, _entry);
        _M0MPB3Map11shift__backGisE(self, idx);
        self.size = self.size - 1 | 0;
        return;
      }
      if (i > _entry.psl) {
        return;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map18remove__with__hashGimE(self, key, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        _M0MPB3Map13remove__entryGimE(self, _entry);
        _M0MPB3Map11shift__backGimE(self, idx);
        self.size = self.size - 1 | 0;
        return;
      }
      if (i > _entry.psl) {
        return;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map18remove__with__hashGibE(self, key, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        _M0MPB3Map13remove__entryGibE(self, _entry);
        _M0MPB3Map11shift__backGibE(self, idx);
        self.size = self.size - 1 | 0;
        return;
      }
      if (i > _entry.psl) {
        return;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map18remove__with__hashGiRP211localreview4amqp7PendingE(self, key, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        _M0MPB3Map13remove__entryGiRP211localreview4amqp7PendingE(self, _entry);
        _M0MPB3Map11shift__backGiRP211localreview4amqp7PendingE(self, idx);
        self.size = self.size - 1 | 0;
        return;
      }
      if (i > _entry.psl) {
        return;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map18remove__with__hashGiRP211localreview4amqp13StreamPendingE(self, key, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind$2 = self.entries[idx];
    if (_bind$2 === undefined) {
      return;
    } else {
      const _Some = _bind$2;
      const _entry = _Some;
      if (_entry.hash === hash && _entry.key === key) {
        _M0MPB3Map13remove__entryGiRP211localreview4amqp13StreamPendingE(self, _entry);
        _M0MPB3Map11shift__backGiRP211localreview4amqp13StreamPendingE(self, idx);
        self.size = self.size - 1 | 0;
        return;
      }
      if (i > _entry.psl) {
        return;
      }
      _tmp = i + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map6removeGsRP211localreview4amqp7SessionE(self, key) {
  _M0MPB3Map18remove__with__hashGsRP211localreview4amqp7SessionE(self, key, _M0IPC16string6StringPB4Hash4hash(key));
}
function _M0MPB3Map6removeGisE(self, key) {
  _M0MPB3Map18remove__with__hashGisE(self, key, _M0IPC13int3IntPB4Hash4hash(key));
}
function _M0MPB3Map6removeGimE(self, key) {
  _M0MPB3Map18remove__with__hashGimE(self, key, _M0IPC13int3IntPB4Hash4hash(key));
}
function _M0MPB3Map6removeGibE(self, key) {
  _M0MPB3Map18remove__with__hashGibE(self, key, _M0IPC13int3IntPB4Hash4hash(key));
}
function _M0MPB3Map6removeGiRP211localreview4amqp7PendingE(self, key) {
  _M0MPB3Map18remove__with__hashGiRP211localreview4amqp7PendingE(self, key, _M0IPC13int3IntPB4Hash4hash(key));
}
function _M0MPB3Map6removeGiRP211localreview4amqp13StreamPendingE(self, key) {
  _M0MPB3Map18remove__with__hashGiRP211localreview4amqp13StreamPendingE(self, key, _M0IPC13int3IntPB4Hash4hash(key));
}
function _M0MPB3Map6lengthGsRP211localreview4amqp7SessionE(self) {
  return self.size;
}
function _M0MPB3Map6lengthGiRP211localreview4amqp7PendingE(self) {
  return self.size;
}
function _M0MPB3Map6lengthGiRP211localreview4amqp13StreamPendingE(self) {
  return self.size;
}
function _M0MPB3Map9is__emptyGsRPB4JsonE(self) {
  return self.size === 0;
}
function _M0MPB3Map9is__emptyGiRP211localreview4amqp7PendingE(self) {
  return self.size === 0;
}
function _M0MPB3Map9is__emptyGiRP211localreview4amqp13StreamPendingE(self) {
  return self.size === 0;
}
function _M0MPC15array10FixedArray12fill_2einnerGORPB5EntryGisEE(self, value, start, end) {
  const array_length = self.length;
  if (array_length > 0) {
    if (start >= 0 && start < array_length) {
      let length;
      if (end === undefined) {
        length = array_length - start | 0;
      } else {
        const _Some = end;
        const _e = _Some;
        length = _e >= start && _e <= array_length ? _e - start | 0 : $panic();
      }
      self.fill(value, start, start + length);
      return;
    } else {
      $panic();
      return;
    }
  } else {
    return;
  }
}
function _M0MPB3Map5clearGisE(self) {
  _M0MPC15array10FixedArray12fill_2einnerGORPB5EntryGisEE(self.entries, undefined, 0, undefined);
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
}
function _M0MPB3Map5clearGibE(self) {
  _M0MPC15array10FixedArray12fill_2einnerGORPB5EntryGisEE(self.entries, undefined, 0, undefined);
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
}
function _M0MPB3Map5clearGimE(self) {
  _M0MPC15array10FixedArray12fill_2einnerGORPB5EntryGisEE(self.entries, undefined, 0, undefined);
  self.size = 0;
  self.head = undefined;
  self.tail = -1;
}
function _M0MPB3Map4iterGsRPB4JsonE(self) {
  const curr_entry = new _M0TPB8MutLocalGORPB5EntryGsRPB4JsonEE(self.head);
  const len = self.size;
  const remaining = new _M0TPB8MutLocalGiE(len);
  return _M0MPB4Iter3newGUsRPB4JsonEE(() => {
    _L: {
      if (remaining.val > 0) {
        const _bind$2 = curr_entry.val;
        if (_bind$2 === undefined) {
          break _L;
        } else {
          const _Some = _bind$2;
          const _x = _Some;
          const _key = _x.key;
          const _value = _x.value;
          const _next = _x.next;
          curr_entry.val = _next;
          remaining.val = remaining.val - 1 | 0;
          return { _0: _key, _1: _value };
        }
      } else {
        break _L;
      }
    }
    return undefined;
  }, len);
}
function _M0MPB3Map4iterGisE(self) {
  const curr_entry = new _M0TPB8MutLocalGORPB5EntryGisEE(self.head);
  const len = self.size;
  const remaining = new _M0TPB8MutLocalGiE(len);
  return _M0MPB4Iter3newGUsRPB4JsonEE(() => {
    _L: {
      if (remaining.val > 0) {
        const _bind$2 = curr_entry.val;
        if (_bind$2 === undefined) {
          break _L;
        } else {
          const _Some = _bind$2;
          const _x = _Some;
          const _key = _x.key;
          const _value = _x.value;
          const _next = _x.next;
          curr_entry.val = _next;
          remaining.val = remaining.val - 1 | 0;
          return { _0: _key, _1: _value };
        }
      } else {
        break _L;
      }
    }
    return undefined;
  }, len);
}
function _M0MPB3Map5iter2GsRPB4JsonE(self) {
  return _M0MPB3Map4iterGsRPB4JsonE(self);
}
function _M0MPB3Map5iter2GisE(self) {
  return _M0MPB3Map4iterGisE(self);
}
function _M0IPC14byte4BytePB2Eq5equal(self, that) {
  return self === that;
}
function _M0MPC14json4Json4null() {
  return _M0DTPB4Json4Null__;
}
function _M0MPC14json4Json6string(string) {
  return new _M0DTPB4Json6String(string);
}
function _M0MPC14json4Json7boolean(boolean) {
  return boolean ? _M0DTPB4Json4True__ : _M0DTPB4Json5False__;
}
function _M0MPC14json4Json6object(object) {
  return new _M0DTPB4Json6Object(object);
}
function _M0IPC14bool4BoolPB6ToJson8to__json(self) {
  return self ? _M0MPC14json4Json7boolean(true) : _M0MPC14json4Json7boolean(false);
}
function _M0IPC13int3IntPB6ToJson8to__json(self) {
  return _M0MPC14json4Json6number(self + 0, undefined);
}
function _M0IPC16double6DoublePB6ToJson8to__json(self) {
  return self !== self ? _M0MPC14json4Json6string("NaN") : self > $i64_reinterpret_f64(9218868437227405311n) ? _M0MPC14json4Json6string("Infinity") : self < $i64_reinterpret_f64(18442240474082181119n) ? _M0MPC14json4Json6string("-Infinity") : _M0MPC14json4Json6number(self, undefined);
}
function _M0MPC15array5Array3mapGUsRP211localreview4amqp12ArgumentKindERPB4JsonE(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGsRPB4JsonE(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGzsE(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGRP211localreview4amqp12SessionEventRPB4JsonEHRPC15error5Error(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      const _bind$3 = f(v);
      let _tmp$2;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        _tmp$2 = _ok._0;
      } else {
        return _bind$3;
      }
      arr[i] = _tmp$2;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGRPB5ArrayGRPB4JsonERPC15error5ErrorE2Ok(arr);
}
function _M0MPC15array5Array3mapGRP211localreview4amqp5FramezEHRP211localreview4amqp10FrameError(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      const _bind$3 = f(v);
      let _tmp$2;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        _tmp$2 = _ok._0;
      } else {
        return _bind$3;
      }
      arr[i] = _tmp$2;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGRPB5ArrayGzERP211localreview4amqp10FrameErrorE2Ok(arr);
}
function _M0MPC15array5Array3mapGRPB4JsonRPB4JsonE(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGRPB4JsonRP211localreview4amqp14AuthenticationEHRPC15error5Error(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      const _bind$3 = f(v);
      let _tmp$2;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        _tmp$2 = _ok._0;
      } else {
        return _bind$3;
      }
      arr[i] = _tmp$2;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp14AuthenticationERPC15error5ErrorE2Ok(arr);
}
function _M0MPC15array5Array3mapGUsRP211localreview4amqp8ArgumentERPC15debug4ReprE(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGRP211localreview4amqp10FieldValueRPB4JsonE(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGRPB4JsonRP211localreview4amqp10FieldValueEHRPC15error5Error(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      const _bind$3 = f(v);
      let _tmp$2;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        _tmp$2 = _ok._0;
      } else {
        return _bind$3;
      }
      arr[i] = _tmp$2;
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp10FieldValueERPC15error5ErrorE2Ok(arr);
}
function _M0MPC15array5Array3mapGyRPC15debug4ReprE(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGUOsRPC15debug4ReprERPC15debug4ReprE(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGRPC15debug4ReprRPC15debug7ContentE(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGUsRP211localreview4amqp10FieldValueERPC15debug4ReprE(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGRPC15debug4ReprRPC15debug4ReprE(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGRPC15debug13ContentParensRPB5ArrayGsEE(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGssE(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array3mapGRP211localreview4amqp10FieldValueRPC15debug4ReprE(self, f) {
  const arr = new Array(self.length);
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const v = self[i];
      arr[i] = f(v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0IPC15array5ArrayPB6ToJson8to__jsonGsE(self) {
  return new _M0DTPB4Json5Array(_M0MPC15array5Array3mapGsRPB4JsonE(self, (x) => _M0IPC16string6StringPB6ToJson8to__json(x)));
}
function _M0IPC15array5ArrayPB6ToJson8to__jsonGRPB4JsonE(self) {
  return new _M0DTPB4Json5Array(_M0MPC15array5Array3mapGRPB4JsonRPB4JsonE(self, (x) => _M0IPC14json4JsonPB6ToJson8to__json(x)));
}
function _M0MPB4Iter10size__hintGsE(self) {
  return self.size_hint;
}
function _M0MPB4Iter3anyGcE(self, f) {
  while (true) {
    const _bind$2 = _M0MPB4Iter4nextGcE(self);
    if (_bind$2 === -1) {
      return false;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      if (f(_x)) {
        return true;
      }
      continue;
    }
  }
}
function _M0MPB4Iter3anyGyE(self, f) {
  while (true) {
    const _bind$2 = _M0MPB4Iter4nextGyE(self);
    if (_bind$2 === -1) {
      return false;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      if (f(_x)) {
        return true;
      }
      continue;
    }
  }
}
function _M0MPB4Iter3anyGRPC16string10StringViewE(self, f) {
  while (true) {
    const _bind$2 = _M0MPB4Iter4nextGRPC16string10StringViewE(self);
    if (_bind$2 === undefined) {
      return false;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      if (f(_x)) {
        return true;
      }
      continue;
    }
  }
}
function _M0MPB4Iter11find__firstGUsRP211localreview4amqp12ArgumentKindEE(self, f) {
  while (true) {
    const _bind$2 = _M0MPB4Iter4nextGRPC16string10StringViewE(self);
    if (_bind$2 === undefined) {
      return undefined;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      if (f(_x)) {
        return _x;
      }
      continue;
    }
  }
}
function _M0MPB4Iter4iterGsE(self) {
  return self;
}
function _M0MPB5Iter24nextGsRPB4JsonE(self) {
  return _M0MPB4Iter4nextGRPC16string10StringViewE(self);
}
function _M0MPB5Iter24nextGisE(self) {
  return _M0MPB4Iter4nextGRPC16string10StringViewE(self);
}
function _M0MPC14byte4Byte9to__int64(self) {
  return BigInt.asUintN(64, BigInt(self));
}
function _M0MPC13int3Int13is__surrogate(self) {
  return 55296 <= self && self <= 57343;
}
function _M0MPC15bytes5Bytes12view_2einner(self, start, end) {
  const len = self.length;
  let end$2;
  if (end === undefined) {
    end$2 = len;
  } else {
    const _Some = end;
    const _end = _Some;
    end$2 = _end;
  }
  if (start >= 0 && (start <= end$2 && end$2 <= len)) {
    const _bind$2 = end$2 - start | 0;
    return new _M0TPC15bytes9BytesView(self, start, start + _bind$2 | 0);
  } else {
    return _M0FPC15abort5abortGRPC16string10StringViewE("Invalid index for View");
  }
}
function _M0IPC16string6StringPB4Hash4hash(self) {
  let acc = (_M0FPB4seed >>> 0) + (374761393 >>> 0) | 0;
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      acc = (acc >>> 0) + (4 >>> 0) | 0;
      const v = self.charCodeAt(i);
      acc = _M0FPB13consume4__acc(acc, v);
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0FPB13finalize__acc(acc);
}
function _M0IPC13int3IntPB4Hash4hash(self) {
  const acc = (((_M0FPB4seed >>> 0) + (374761393 >>> 0) | 0) >>> 0) + (4 >>> 0) | 0;
  return _M0FPB13finalize__acc(_M0FPB13consume4__acc(acc, self));
}
function _M0MPB18UninitializedArray19unsafe__blit__fixedGyE(dst, dst_offset, src, src_offset, len) {
  let _tmp = len - 1 | 0;
  while (true) {
    const i = _tmp;
    if (i >= 0) {
      const _tmp$2 = dst_offset + i | 0;
      const _tmp$3 = src_offset + i | 0;
      if (_tmp$2 >>> 0 < dst.length) {
        dst[_tmp$2] = _tmp$3 >>> 0 < src.length ? src[_tmp$3] : $oob();
      } else {
        $oob();
      }
      _tmp = i - 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0MPC16double6Double8to__uint(self) {
  return self !== self ? 0 : self >= 4294967295 ? -1 : self <= 0 ? 0 : self | 0;
}
function _M0MPC16double6Double7to__int(self) {
  return self !== self ? 0 : self >= 2147483647 ? 2147483647 : self <= -2147483648 ? -2147483648 : self | 0;
}
function _M0MPC16double6Double7is__nan(self) {
  return self !== self;
}
function _M0IPC16double6DoublePB4Show10to__string(self) {
  return String(self);
}
function _M0MPC15bytes5Bytes5makei(length, value) {
  if (length <= 0) {
    return $bytes_literal$0;
  }
  const arr = $makebytes(length, value(0));
  let _tmp = 1;
  while (true) {
    const i = _tmp;
    if (i < length) {
      if (i >>> 0 < arr.length) {
        arr[i] = value(i);
      } else {
        $oob();
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC14char4Char7to__hex(char) {
  const code = char;
  return code >= 0 && code <= 255 ? _M0MPC14byte4Byte7to__hex(code & 255) : code <= 65535 ? `${_M0MPC14byte4Byte7to__hex(code >> 8 & 255)}${_M0MPC14byte4Byte7to__hex(code & 255)}` : `${_M0MPC14byte4Byte7to__hex(code >> 16 & 255)}${_M0MPC14byte4Byte7to__hex(code >> 8 & 255)}${_M0MPC14byte4Byte7to__hex(code & 255)}`;
}
function _M0MPC14char4Char11is__control(self) {
  return self >= 0 && self <= 31 ? true : self >= 127 && self <= 159;
}
function _M0MPC14char4Char13is__printable(self) {
  if (_M0MPC14char4Char11is__control(self)) {
    return false;
  }
  const self$2 = self;
  _L: {
    _L$2: {
      if (self$2 >= 57344 && self$2 <= 63743) {
        break _L$2;
      } else {
        if (self$2 >= 983040 && self$2 <= 1048573) {
          break _L$2;
        } else {
          if (self$2 >= 1048576 && self$2 <= 1114109) {
            break _L$2;
          }
        }
      }
      break _L;
    }
    return false;
  }
  _L$2: {
    _L$3: {
      if (self$2 === 173) {
        break _L$3;
      } else {
        if (self$2 >= 1536 && self$2 <= 1541) {
          break _L$3;
        } else {
          if (self$2 === 1564) {
            break _L$3;
          } else {
            if (self$2 === 1757) {
              break _L$3;
            } else {
              if (self$2 === 1807) {
                break _L$3;
              } else {
                if (self$2 >= 2192 && self$2 <= 2193) {
                  break _L$3;
                } else {
                  if (self$2 === 2274) {
                    break _L$3;
                  } else {
                    if (self$2 === 6158) {
                      break _L$3;
                    } else {
                      if (self$2 >= 8203 && self$2 <= 8207) {
                        break _L$3;
                      } else {
                        if (self$2 >= 8234 && self$2 <= 8238) {
                          break _L$3;
                        } else {
                          if (self$2 >= 8288 && self$2 <= 8292) {
                            break _L$3;
                          } else {
                            if (self$2 >= 8294 && self$2 <= 8303) {
                              break _L$3;
                            } else {
                              if (self$2 === 65279) {
                                break _L$3;
                              } else {
                                if (self$2 >= 65529 && self$2 <= 65531) {
                                  break _L$3;
                                } else {
                                  if (self$2 === 69821) {
                                    break _L$3;
                                  } else {
                                    if (self$2 === 69837) {
                                      break _L$3;
                                    } else {
                                      if (self$2 >= 78896 && self$2 <= 78911) {
                                        break _L$3;
                                      } else {
                                        if (self$2 >= 113824 && self$2 <= 113827) {
                                          break _L$3;
                                        } else {
                                          if (self$2 >= 119155 && self$2 <= 119162) {
                                            break _L$3;
                                          } else {
                                            if (self$2 === 917505) {
                                              break _L$3;
                                            } else {
                                              if (self$2 >= 917536 && self$2 <= 917631) {
                                                break _L$3;
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      break _L$2;
    }
    return false;
  }
  if (_M0MPC13int3Int13is__surrogate(self$2)) {
    return false;
  }
  if (self$2 === 8232 || self$2 === 8233) {
    return false;
  }
  _L$3: {
    _L$4: {
      if (self$2 >= 64976 && self$2 <= 65007) {
        break _L$4;
      } else {
        if (self$2 >= 65534 && self$2 <= 65535) {
          break _L$4;
        } else {
          if (self$2 >= 131070 && self$2 <= 131071) {
            break _L$4;
          } else {
            if (self$2 >= 196606 && self$2 <= 196607) {
              break _L$4;
            } else {
              if (self$2 >= 262142 && self$2 <= 262143) {
                break _L$4;
              } else {
                if (self$2 >= 327678 && self$2 <= 327679) {
                  break _L$4;
                } else {
                  if (self$2 >= 393214 && self$2 <= 393215) {
                    break _L$4;
                  } else {
                    if (self$2 >= 458750 && self$2 <= 458751) {
                      break _L$4;
                    } else {
                      if (self$2 >= 524286 && self$2 <= 524287) {
                        break _L$4;
                      } else {
                        if (self$2 >= 589822 && self$2 <= 589823) {
                          break _L$4;
                        } else {
                          if (self$2 >= 655358 && self$2 <= 655359) {
                            break _L$4;
                          } else {
                            if (self$2 >= 720894 && self$2 <= 720895) {
                              break _L$4;
                            } else {
                              if (self$2 >= 786430 && self$2 <= 786431) {
                                break _L$4;
                              } else {
                                if (self$2 >= 851966 && self$2 <= 851967) {
                                  break _L$4;
                                } else {
                                  if (self$2 >= 917502 && self$2 <= 917503) {
                                    break _L$4;
                                  } else {
                                    if (self$2 >= 983038 && self$2 <= 983039) {
                                      break _L$4;
                                    } else {
                                      if (self$2 >= 1048574 && self$2 <= 1048575) {
                                        break _L$4;
                                      } else {
                                        if (self$2 >= 1114110 && self$2 <= 1114111) {
                                          break _L$4;
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      break _L$3;
    }
    return false;
  }
  return true;
}
function _M0MPC14char4Char18escape__to_2einner(self, logger, quote) {
  if (quote) {
    logger.method_table.method_3(logger.self, 39);
  }
  _L: {
    _L$2: {
      if (self === 39) {
        break _L$2;
      } else {
        if (self === 92) {
          break _L$2;
        } else {
          if (self === 10) {
            logger.method_table.method_0(logger.self, "\\n");
          } else {
            if (self === 13) {
              logger.method_table.method_0(logger.self, "\\r");
            } else {
              if (self === 8) {
                logger.method_table.method_0(logger.self, "\\b");
              } else {
                if (self === 9) {
                  logger.method_table.method_0(logger.self, "\\t");
                } else {
                  if (self >= 32 && self <= 126) {
                    logger.method_table.method_3(logger.self, self);
                  } else {
                    if (!_M0MPC14char4Char13is__printable(self)) {
                      logger.method_table.method_0(logger.self, "\\u{");
                      logger.method_table.method_0(logger.self, _M0MPC14char4Char7to__hex(self));
                      logger.method_table.method_3(logger.self, 125);
                    } else {
                      logger.method_table.method_3(logger.self, self);
                    }
                  }
                }
              }
            }
          }
        }
      }
      break _L;
    }
    logger.method_table.method_3(logger.self, 92);
    logger.method_table.method_3(logger.self, self);
  }
  if (quote) {
    logger.method_table.method_3(logger.self, 39);
    return;
  } else {
    return;
  }
}
function _M0MPC14char4Char14escape_2einner(self, quote) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0MPC14char4Char18escape__to_2einner(self, { self: buf, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger }, quote);
  return _M0MPB13StringBuilder10to__string(buf);
}
function _M0MPC15bytes9BytesView4data(self) {
  return self.buf;
}
function _M0MPC15bytes9BytesView13start__offset(self) {
  return self.start;
}
function _M0MPC15array10FixedArray17blit__from__bytes(self, bytes_offset, src, src_offset, length) {
  const e1 = (bytes_offset + length | 0) - 1 | 0;
  const e2 = (src_offset + length | 0) - 1 | 0;
  const len1 = self.length;
  const len2 = src.length;
  if (length >= 0 && (bytes_offset >= 0 && (e1 < len1 && (src_offset >= 0 && e2 < len2)))) {
    _M0MPC15array10FixedArray12unsafe__blitGyE(self, bytes_offset, src, src_offset, length);
    return;
  } else {
    $panic();
    return;
  }
}
function _M0MPC15bytes9BytesView9to__owned(self) {
  if ((self.end - self.start | 0) === self.buf.length) {
    return self.buf;
  }
  const bytes = $makebytes(self.end - self.start | 0, 0);
  _M0MPC15array10FixedArray17blit__from__bytes(bytes, 0, self.buf, _M0MPC15bytes9BytesView13start__offset(self), self.end - self.start | 0);
  return bytes;
}
function _M0MPC15bytes5Bytes11from__array(arr) {
  const len = arr.end - arr.start | 0;
  if (len === 0) {
    return $bytes_literal$0;
  }
  const result = _M0MPB18UninitializedArray23unsafe__make__and__blitGyE(arr.buf, len, arr.start, 0, len);
  return result;
}
function _M0MPC15array5Array44unsafe__make__and__blit__from__fixed_2einnerGyE(src, allocate_len, len, src_offset, dst_offset) {
  const dst = new Array(allocate_len);
  _M0MPB18UninitializedArray19unsafe__blit__fixedGyE(dst, dst_offset, src, src_offset, len);
  return dst;
}
function _M0MPC15bytes5Bytes9to__array(self) {
  const len = self.length;
  return _M0MPC15array5Array44unsafe__make__and__blit__from__fixed_2einnerGyE(self, len, len, 0, 0);
}
function _M0MPC15bytes9BytesView9to__array(self) {
  const len = self.end - self.start | 0;
  return _M0MPC15array5Array44unsafe__make__and__blit__from__fixed_2einnerGyE(_M0MPC15bytes9BytesView4data(self), len, len, _M0MPC15bytes9BytesView13start__offset(self), 0);
}
function _M0MPC15bytes5Bytes4iter(self) {
  const i = new _M0TPB8MutLocalGiE(0);
  const len = self.length;
  return _M0MPB4Iter3newGyE(() => {
    if (i.val < len) {
      const c = self[i.val];
      i.val = i.val + 1 | 0;
      return c;
    } else {
      return -1;
    }
  }, len);
}
function _M0MPC15array5Array28unsafe__truncate__to__lengthGRP211localreview4amqp14AuthenticationE(self, new_len) {
  _M0MPB7JSArray11set__length(self, new_len);
}
function _M0MPC15array5Array28unsafe__truncate__to__lengthGyE(self, new_len) {
  _M0MPB7JSArray11set__length(self, new_len);
}
function _M0MPC15array5Array17reserve__capacityGsE(self, capacity) {}
function _M0MPC15array5Array6appendGsE(self, other) {
  const old_len = self.length;
  const append_len = other.end - other.start | 0;
  if ((old_len + append_len | 0) >= old_len) {
    _M0MPB7JSArray12append__view(self, other.buf, other.start, append_len);
    return;
  } else {
    $panic();
    return;
  }
}
function _M0MPC15array5Array9is__emptyGRPB4JsonE(self) {
  return self.length === 0;
}
function _M0MPC15array5Array9is__emptyGyE(self) {
  return self.length === 0;
}
function _M0MPC15array5Array11unsafe__popGRPC14json10WriteFrameE(self) {
  return _M0MPB7JSArray3pop(self);
}
function _M0MPC15array5Array3popGRPC14json10WriteFrameE(self) {
  if (_M0MPC15array5Array9is__emptyGRPB4JsonE(self)) {
    return undefined;
  } else {
    const v = _M0MPC15array5Array11unsafe__popGRPC14json10WriteFrameE(self);
    return v;
  }
}
function _M0MPC15array5Array4copyGsE(self) {
  return _M0MPB7JSArray4copy(self);
}
function _M0MPC15array5Array2atGRPB4JsonE(self, index) {
  const len = self.length;
  return index >= 0 && index < len ? self[index] : $panic();
}
function _M0MPC15array5Array2atGyE(self, index) {
  const len = self.length;
  return index >= 0 && index < len ? self[index] : $panic();
}
function _M0MPC15array5Array3setGyE(self, index, value) {
  const len = self.length;
  if (index >= 0 && index < len) {
    self[index] = value;
    return;
  } else {
    $panic();
    return;
  }
}
function _M0MPC15array5Array3setGsE(self, index, value) {
  const len = self.length;
  if (index >= 0 && index < len) {
    self[index] = value;
    return;
  } else {
    $panic();
    return;
  }
}
function _M0IPC15array5ArrayPB3Add3addGsE(self, other) {
  const len_self = self.length;
  const len_other = other.length;
  if (len_self === 0) {
    return _M0MPC15array5Array31unsafe__make__and__blit_2einnerGsE(other, len_other, len_other, 0, 0);
  } else {
    const result = _M0MPC15array5Array31unsafe__make__and__blit_2einnerGsE(self, len_self + len_other | 0, len_self, 0, 0);
    _M0MPB18UninitializedArray12unsafe__blitGsE(result, len_self, other, 0, len_other);
    return result;
  }
}
function _M0MPC15array5Array3allGsE(self, f) {
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const v = self[_];
      if (!f(v)) {
        return false;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return true;
}
function _M0MPC15array5Array3anyGUsRP211localreview4amqp12ArgumentKindEE(self, f) {
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const v = self[_];
      if (f(v)) {
        return true;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0MPC15array5Array5clearGRP211localreview4amqp14AuthenticationE(self) {
  _M0MPC15array5Array28unsafe__truncate__to__lengthGRP211localreview4amqp14AuthenticationE(self, 0);
}
function _M0MPC15array5Array5clearGyE(self) {
  _M0MPC15array5Array28unsafe__truncate__to__lengthGyE(self, 0);
}
function _M0MPC15array5Array6filterGUsRP211localreview4amqp10FieldValueEE(self, f) {
  const arr = [];
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const v = self[_];
      if (f(v)) {
        _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(arr, v);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array6filterGsE(self, f) {
  const arr = [];
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const v = self[_];
      if (f(v)) {
        _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(arr, v);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array8containsGRPC16string10StringViewE(self, value) {
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const v = self[_];
      if (_M0IPC16string10StringViewPB2Eq5equal(v, value)) {
        return true;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return false;
    }
  }
}
function _M0MPC15array5Array8containsGsE(self, value) {
  const _bind$2 = self.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const v = self[_];
      if (v === value) {
        return true;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return false;
    }
  }
}
function _M0MPC15array5Array10push__iterGsE(self, iter) {
  const _bind$2 = _M0MPB4Iter10size__hintGsE(iter);
  if (_bind$2 === undefined) {
  } else {
    const _Some = _bind$2;
    const _n = _Some;
    _M0MPC15array5Array17reserve__capacityGsE(self, self.length + _n | 0);
  }
  while (true) {
    const _bind$3 = _M0MPB4Iter4nextGRPC16string10StringViewE(iter);
    if (_bind$3 === undefined) {
      return;
    } else {
      const _Some = _bind$3;
      const _x = _Some;
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(self, _x);
      continue;
    }
  }
}
function _M0MPC15array5Array4joinGsE(self, separator) {
  return _M0MPC15array9ArrayView4joinGsE(new _M0TPB9ArrayViewGsE(self, 0, self.length), separator);
}
function _M0MPC15array5Array4joinGRPC16string10StringViewE(self, separator) {
  return _M0MPC15array9ArrayView4joinGRPC16string10StringViewE(new _M0TPB9ArrayViewGRPC16string10StringViewE(self, 0, self.length), separator);
}
function _M0IPC15float5FloatPB4Show10to__string(self) {
  return String(self);
}
function _M0MPC15debug4Repr4ReprGRPC15error5ErrorE(value) {
  return _M0IPC15error5ErrorPC15debug5Debug8to__repr(value);
}
function _M0MPC15debug4Repr4ReprGRPB5ArrayGUsRP211localreview4amqp8ArgumentEEE(value) {
  return _M0IPC15array5ArrayPC15debug5Debug8to__reprGUsRP211localreview4amqp8ArgumentEE(value);
}
function _M0MPC15debug4Repr4ReprGRP211localreview4amqp7ContentE(value) {
  return _M0IP211localreview4amqp7ContentPC15debug5Debug8to__repr(value);
}
function _M0MPC15debug4Repr4ReprGRP211localreview4amqp5FrameE(value) {
  return _M0IP211localreview4amqp5FramePC15debug5Debug8to__repr(value);
}
function _M0MPC15debug4Repr4ReprGRP211localreview4amqp12ArgumentKindE(value) {
  return _M0IP211localreview4amqp12ArgumentKindPC15debug5Debug8to__repr(value);
}
function _M0MPC15debug4Repr4ReprGRP211localreview4amqp8ArgumentE(value) {
  return _M0IP211localreview4amqp8ArgumentPC15debug5Debug8to__repr(value);
}
function _M0MPC15debug4Repr4ReprGUsRP211localreview4amqp8ArgumentEE(value) {
  return _M0IPC15tuple6Tuple2PC15debug5Debug8to__reprGsRP211localreview4amqp8ArgumentE(value);
}
function _M0MPC15debug4Repr4ReprGyE(value) {
  return _M0IPC14byte4BytePC15debug5Debug8to__repr(value);
}
function _M0MPC15debug4Repr4ReprGsE(value) {
  return _M0IPC16string6StringPC15debug5Debug8to__repr(value);
}
function _M0MPC15debug4Repr4ReprGUsRP211localreview4amqp10FieldValueEE(value) {
  return _M0IPC15tuple6Tuple2PC15debug5Debug8to__reprGsRP211localreview4amqp10FieldValueE(value);
}
function _M0MPC15debug4Repr4ReprGRP211localreview4amqp10FieldValueE(value) {
  return _M0IP211localreview4amqp10FieldValuePC15debug5Debug8to__repr(value);
}
function _M0MPC15debug4Repr4ReprGRPC14json8JsonPathE(value) {
  return _M0IPC14json8JsonPathPC15debug5Debug8to__repr(value);
}
function _M0MPC15debug4Repr5tuple(children) {
  return new _M0DTPC15debug4Repr5Tuple(children);
}
function _M0IPC15tuple6Tuple2PC15debug5Debug8to__reprGsRP211localreview4amqp8ArgumentE(self) {
  const _a = self._0;
  const _b = self._1;
  return _M0MPC15debug4Repr5tuple([_M0MPC15debug4Repr4ReprGsE(_a), _M0MPC15debug4Repr4ReprGRP211localreview4amqp8ArgumentE(_b)]);
}
function _M0IPC15tuple6Tuple2PC15debug5Debug8to__reprGsRP211localreview4amqp10FieldValueE(self) {
  const _a = self._0;
  const _b = self._1;
  return _M0MPC15debug4Repr5tuple([_M0MPC15debug4Repr4ReprGsE(_a), _M0MPC15debug4Repr4ReprGRP211localreview4amqp10FieldValueE(_b)]);
}
function _M0IPC15tuple6Tuple2PC15debug5Debug8to__reprGRPC14json8JsonPathsE(self) {
  const _a = self._0;
  const _b = self._1;
  return _M0MPC15debug4Repr5tuple([_M0MPC15debug4Repr4ReprGRPC14json8JsonPathE(_a), _M0MPC15debug4Repr4ReprGsE(_b)]);
}
function _M0MPC15debug4Repr8children(self) {
  let value;
  _L: {
    _L$2: {
      switch (self.$tag) {
        case 0: {
          break _L$2;
        }
        case 1: {
          break _L$2;
        }
        case 2: {
          break _L$2;
        }
        case 3: {
          break _L$2;
        }
        case 4: {
          break _L$2;
        }
        case 5: {
          break _L$2;
        }
        case 6: {
          break _L$2;
        }
        case 15: {
          break _L$2;
        }
        case 17: {
          break _L$2;
        }
        case 7: {
          const _Tuple = self;
          const _xs = _Tuple._0;
          return _xs;
        }
        case 8: {
          const _Array = self;
          const _xs$2 = _Array._0;
          return _xs$2;
        }
        case 9: {
          const _Record = self;
          const _xs$3 = _Record._0;
          return _xs$3;
        }
        case 10: {
          const _Enum = self;
          const _xs$4 = _Enum._1;
          return _xs$4;
        }
        case 11: {
          const _Map = self;
          const _xs$5 = _Map._0;
          return _xs$5;
        }
        case 14: {
          const _Opaque = self;
          const _value = _Opaque._1;
          value = _value;
          break _L;
        }
        case 12: {
          const _RecordField = self;
          const _value$2 = _RecordField._1;
          value = _value$2;
          break _L;
        }
        case 13: {
          const _EnumLabeledArg = self;
          const _value$3 = _EnumLabeledArg._1;
          value = _value$3;
          break _L;
        }
        default: {
          const _MapEntry = self;
          const _key = _MapEntry._0;
          const _value$4 = _MapEntry._1;
          return [_key, _value$4];
        }
      }
    }
    return [];
  }
  return [value];
}
function _M0MPC15debug4Repr14with__children(self, children) {
  _L: {
    switch (self.$tag) {
      case 0: {
        break _L;
      }
      case 1: {
        break _L;
      }
      case 2: {
        break _L;
      }
      case 3: {
        break _L;
      }
      case 4: {
        break _L;
      }
      case 5: {
        break _L;
      }
      case 6: {
        break _L;
      }
      case 15: {
        break _L;
      }
      case 17: {
        break _L;
      }
      case 7: {
        return new _M0DTPC15debug4Repr5Tuple(children);
      }
      case 8: {
        return new _M0DTPC15debug4Repr5Array(children);
      }
      case 9: {
        return new _M0DTPC15debug4Repr6Record(children);
      }
      case 10: {
        const _Enum = self;
        const _name = _Enum._0;
        return new _M0DTPC15debug4Repr4Enum(_name, children);
      }
      case 11: {
        return new _M0DTPC15debug4Repr3Map(children);
      }
      case 12: {
        const _RecordField = self;
        const _name$2 = _RecordField._0;
        if (children.length === 1) {
          const _value = children[0];
          return new _M0DTPC15debug4Repr11RecordField(_name$2, _value);
        } else {
          return new _M0DTPC15debug4Repr11RecordField(_name$2, _M0DTPC15debug4Repr7Omitted__);
        }
      }
      case 13: {
        const _EnumLabeledArg = self;
        const _label = _EnumLabeledArg._0;
        if (children.length === 1) {
          const _value = children[0];
          return new _M0DTPC15debug4Repr14EnumLabeledArg(_label, _value);
        } else {
          return new _M0DTPC15debug4Repr14EnumLabeledArg(_label, _M0DTPC15debug4Repr7Omitted__);
        }
      }
      case 16: {
        if (children.length === 2) {
          const _key = children[0];
          const _value = children[1];
          return new _M0DTPC15debug4Repr8MapEntry(_key, _value);
        } else {
          return new _M0DTPC15debug4Repr8MapEntry(_M0DTPC15debug4Repr7Omitted__, _M0DTPC15debug4Repr7Omitted__);
        }
      }
      default: {
        const _Opaque = self;
        const _name$3 = _Opaque._0;
        if (children.length === 1) {
          const _value = children[0];
          return new _M0DTPC15debug4Repr6Opaque(_name$3, _value);
        } else {
          return new _M0DTPC15debug4Repr6Opaque(_name$3, _M0DTPC15debug4Repr7Omitted__);
        }
      }
    }
  }
  return self;
}
function _M0MPC15debug4Repr7integer(x) {
  return new _M0DTPC15debug4Repr7Integer(x);
}
function _M0MPC15debug4Repr4bool(x) {
  return new _M0DTPC15debug4Repr7BoolLit(x);
}
function _M0MPC15debug4Repr4char(x) {
  return new _M0DTPC15debug4Repr7CharLit(x);
}
function _M0MPC15debug4Repr6string(x) {
  return new _M0DTPC15debug4Repr9StringLit(x);
}
function _M0MPC15debug4Repr5array(children) {
  return new _M0DTPC15debug4Repr5Array(children);
}
function _M0MPC15debug4Repr6record(fields) {
  const _acc = [];
  const _it = _M0MPB3Map5iter2GsRPB4JsonE(fields);
  let _tmp;
  while (true) {
    const _bind$2 = _M0MPB5Iter24nextGsRPB4JsonE(_it);
    if (_bind$2 === undefined) {
      _tmp = _acc;
      break;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      const _name = _x._0;
      const _value = _x._1;
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(_acc, new _M0DTPC15debug4Repr11RecordField(_name, _value));
      continue;
    }
  }
  return new _M0DTPC15debug4Repr6Record(_tmp);
}
function _M0MPC15debug4Repr8opaque__(name, children) {
  return new _M0DTPC15debug4Repr6Opaque(name, children);
}
function _M0MPC15debug4Repr7literal(value) {
  return new _M0DTPC15debug4Repr7Literal(value);
}
function _M0MPC15debug4Repr7omitted() {
  return _M0DTPC15debug4Repr7Omitted__;
}
function _M0MPC15debug4Repr4ctor(name, args) {
  return new _M0DTPC15debug4Repr4Enum(name, _M0MPC15array5Array3mapGUOsRPC15debug4ReprERPC15debug4ReprE(args, (arg) => {
    const _label = arg._0;
    const _value = arg._1;
    if (_label === undefined) {
      return _value;
    } else {
      const _Some = _label;
      const _label$2 = _Some;
      return new _M0DTPC15debug4Repr14EnumLabeledArg(_label$2, _value);
    }
  }));
}
function _M0MPC15debug4Repr7shallow(self) {
  return _M0MPC15debug4Repr14with__children(self, []);
}
function _M0IPC15debug13ContentParensPB3Add3add(self, other) {
  return new _M0TPC15debug13ContentParens(self.size + other.size | 0, _M0IPC15array5ArrayPB3Add3addGsE(self.lines, other.lines));
}
function _M0FPC15debug14empty__content() {
  return new _M0TPC15debug7Content(0, [], false);
}
function _M0FPC15debug8verbatim(x) {
  return new _M0TPC15debug13ContentParens(1, [x]);
}
function _M0FPC15debug15content__parens(size, lines) {
  return new _M0TPC15debug13ContentParens(size, lines);
}
function _M0FPC15debug12leaf_2einner(x, needs_parens) {
  return new _M0TPC15debug7Content(1, [x], needs_parens);
}
function _M0FPC15debug11with__lines(r, f) {
  return new _M0TPC15debug13ContentParens(r.size, f(r.lines));
}
function _M0MPC15debug7Content20with__lines__content(r, f) {
  return new _M0TPC15debug7Content(r.size, f(r.lines), r.needs_parens);
}
function _M0FPC15debug15surround__lines(start, finish, lines) {
  if (lines.length === 0) {
    return [`${start}${finish}`];
  } else {
    if (lines.length === 1) {
      const _item = lines[0];
      return [`${start}${_item}${finish}`];
    } else {
      const _first = lines[0];
      const _last = lines[lines.length - 1 | 0];
      const _x = new _M0TPB9ArrayViewGsE(lines, 1, lines.length - 1 | 0);
      const _self = [];
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(_self, `${start}${_first}`);
      _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGUsRP211localreview4amqp12ArgumentKindEE(_x));
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(_self, `${_last}${finish}`);
      return _self;
    }
  }
}
function _M0FPC15debug8surround(start, finish, r) {
  return _M0FPC15debug11with__lines(r, (lines) => _M0FPC15debug15surround__lines(start, finish, lines));
}
function _M0MPC15debug7Content8no__wrap(c) {
  return new _M0TPC15debug13ContentParens(c.size, c.lines);
}
function _M0FPC15debug6parens(r) {
  return new _M0TPC15debug7Content(r.size, r.lines, true);
}
function _M0FPC15debug10no__parens(r) {
  return new _M0TPC15debug7Content(r.size, r.lines, false);
}
function _M0FPC15debug14compact__lines(lines) {
  if (lines.length === 0) {
    return [];
  } else {
    if (lines.length === 1) {
      const _x = lines[0];
      return [_x];
    } else {
      const _first = lines[0];
      const _last = lines[lines.length - 1 | 0];
      const _x_end = lines.length - 1 | 0;
      if (_first === "[" && _last === "]" || _first === "{" && _last === "}") {
        const parts = [];
        const _bind$2 = _x_end - 1 | 0;
        let _tmp = 0;
        while (true) {
          const _ = _tmp;
          if (_ < _bind$2) {
            const m = lines[1 + _ | 0];
            const t = _M0MPC16string6String4trim(m, undefined);
            if (_M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(t, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1134, 0, _M0FPC15debug14compact__linesN7_2abindS1134.length))) {
              _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(parts, t);
            }
            _tmp = _ + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        const joined0 = _M0MPC15array5Array4joinGRPC16string10StringViewE(parts, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1147, 0, _M0FPC15debug14compact__linesN7_2abindS1147.length));
        const _bind$3 = _M0MPC16string6String13strip__suffix(joined0, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1141, 0, _M0FPC15debug14compact__linesN7_2abindS1141.length));
        let joined;
        if (_bind$3 === undefined) {
          joined = new _M0TPC16string10StringView(joined0, 0, joined0.length);
        } else {
          const _Some = _bind$3;
          joined = _Some;
        }
        if (_first === "{") {
          const s1 = _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MPC16string10StringView13strip__prefix(joined, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1139, 0, _M0FPC15debug14compact__linesN7_2abindS1139.length)), joined);
          const inner = _M0MPC16option6Option10unwrap__orGRPC16string10StringViewE(_M0MPC16string10StringView13strip__suffix(s1, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1138, 0, _M0FPC15debug14compact__linesN7_2abindS1138.length)), s1);
          if (_M0IPC16string10StringViewPB2Eq5equal(inner, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1136, 0, _M0FPC15debug14compact__linesN7_2abindS1136.length))) {
            return ["{}"];
          } else {
            const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(4);
            _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "{ ");
            _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(_string_builder, inner);
            _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, " }");
            return [_M0MPB13StringBuilder10to__string(_string_builder)];
          }
        } else {
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(2);
          _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "[");
          _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(_string_builder, joined);
          _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "]");
          return [_M0MPB13StringBuilder10to__string(_string_builder)];
        }
      } else {
        if (_M0MPC16string6String11has__suffix(_first, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1148, 0, _M0FPC15debug14compact__linesN7_2abindS1148.length)) && _last === ")") {
          const parts = [];
          const _bind$2 = _x_end - 1 | 0;
          let _tmp = 0;
          while (true) {
            const _ = _tmp;
            if (_ < _bind$2) {
              const m = lines[1 + _ | 0];
              const t = _M0MPC16string6String4trim(m, undefined);
              if (_M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(t, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1152, 0, _M0FPC15debug14compact__linesN7_2abindS1152.length))) {
                _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(parts, t);
              }
              _tmp = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          const joined0 = _M0MPC15array5Array4joinGRPC16string10StringViewE(parts, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1161, 0, _M0FPC15debug14compact__linesN7_2abindS1161.length));
          const _bind$3 = _M0MPC16string6String13strip__suffix(joined0, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1155, 0, _M0FPC15debug14compact__linesN7_2abindS1155.length));
          let joined;
          if (_bind$3 === undefined) {
            joined = new _M0TPC16string10StringView(joined0, 0, joined0.length);
          } else {
            const _Some = _bind$3;
            joined = _Some;
          }
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(0);
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _first);
          _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(_string_builder, joined);
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _last);
          return [_M0MPB13StringBuilder10to__string(_string_builder)];
        } else {
          const parts = [new _M0TPC16string10StringView(_first, 0, _first.length)];
          const _bind$2 = _x_end - 1 | 0;
          let _tmp = 0;
          while (true) {
            const _ = _tmp;
            if (_ < _bind$2) {
              const m = lines[1 + _ | 0];
              _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(parts, _M0MPC16string6String4trim(m, undefined));
              _tmp = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(parts, _M0MPC16string6String4trim(_last, undefined));
          return [_M0MPC15array5Array4joinGRPC16string10StringViewE(parts, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1166, 0, _M0FPC15debug14compact__linesN7_2abindS1166.length))];
        }
      }
    }
  }
}
function _M0MPC15debug7Content7compact(r) {
  return _M0MPC15debug7Content20with__lines__content(r, _M0FPC15debug14compact__lines);
}
function _M0FPC15debug6indent(prefix, r) {
  return _M0FPC15debug11with__lines(r, (lines) => _M0MPC15array5Array3mapGssE(lines, (line) => `${prefix}${line}`));
}
function _M0FPC15debug14indent__spaces(n, r) {
  return _M0FPC15debug6indent(_M0MPC16string6String6repeat(" ", n), r);
}
function _M0FPC15debug19bracket__seq__lines(open, close, indent_by, contents) {
  if (contents.length === 0) {
    return [`${open}${close}`];
  } else {
    if (contents.length === 1) {
      const _item = contents[0];
      if (_item.length > 1) {
        const lines = _M0FPC15debug14indent__spaces(indent_by, new _M0TPC15debug13ContentParens(0, _item)).lines;
        if (!_M0MPC15array5Array9is__emptyGRPB4JsonE(lines)) {
          const last_i = lines.length - 1 | 0;
          _M0MPC15array5Array3setGsE(lines, last_i, `${_M0MPC15array5Array2atGRPB4JsonE(lines, last_i)},`);
        }
        const _self = [];
        _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(_self, open);
        _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGUsRP211localreview4amqp12ArgumentKindEE(lines));
        _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(_self, close);
        return _self;
      } else {
        const inner = _M0FPC15debug14compact__lines(_item);
        if (inner.length === 0) {
          return [`${open}${close}`];
        } else {
          if (inner.length === 1) {
            const _x = inner[0];
            if (open === "{" && close === "}") {
              const inner$2 = _M0MPC16string6String4trim(_x, undefined);
              if (_M0IPC16string10StringViewPB2Eq5equal(inner$2, new _M0TPC16string10StringView(_M0FPC15debug19bracket__seq__linesN7_2abindS1175, 0, _M0FPC15debug19bracket__seq__linesN7_2abindS1175.length))) {
                return ["{}"];
              } else {
                const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(4);
                _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "{ ");
                _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(_string_builder, inner$2);
                _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, " }");
                return [_M0MPB13StringBuilder10to__string(_string_builder)];
              }
            } else {
              return [`${open}${_x}${close}`];
            }
          } else {
            const _self = [];
            _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(_self, open);
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGUsRP211localreview4amqp12ArgumentKindEE(_M0FPC15debug14indent__spaces(indent_by, new _M0TPC15debug13ContentParens(0, _item)).lines));
            _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(_self, close);
            return _self;
          }
        }
      }
    } else {
      const out = [open];
      const _bind$2 = contents.length;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind$2) {
          const item = contents[_];
          const item_lines = _M0MPC15array5Array6filterGsE(item, (line) => _M0IP016_24default__implPB2Eq10not__equalGsE(line, ""));
          if (item_lines.length === 0) {
          } else {
            if (item_lines.length === 1) {
              const _x = item_lines[0];
              _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${_x},`);
            } else {
              const _first = item_lines[0];
              const _last = item_lines[item_lines.length - 1 | 0];
              const _x_end = item_lines.length - 1 | 0;
              _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${_first}`);
              const _bind$3 = _x_end - 1 | 0;
              let _tmp$2 = 0;
              while (true) {
                const _$2 = _tmp$2;
                if (_$2 < _bind$3) {
                  const mid = item_lines[1 + _$2 | 0];
                  _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${mid}`);
                  _tmp$2 = _$2 + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${_last},`);
            }
          }
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(out, close);
      return out;
    }
  }
}
function _M0FPC15debug17comma__seq__lines(begin, end, contents) {
  if (begin === "[" && end === "]") {
    return _M0FPC15debug19bracket__seq__lines("[", "]", 2, contents);
  } else {
    if (begin === "{" && end === "}") {
      return _M0FPC15debug19bracket__seq__lines("{", "}", 2, contents);
    } else {
      if (begin === "" && end === "") {
        let lines;
        if (contents.length === 0) {
          lines = [`${begin}${end}`];
        } else {
          if (contents.length === 1) {
            const _item = contents[0];
            lines = _M0FPC15debug15surround__lines(begin, end, _item);
          } else {
            const _first = contents[0];
            const _last = contents[contents.length - 1 | 0];
            const _x_end = contents.length - 1 | 0;
            const space = _M0MPC16string6String6repeat(" ", begin.length);
            const middle_lines = [];
            const _bind$2 = _x_end - 1 | 0;
            let _tmp = 0;
            while (true) {
              const _ = _tmp;
              if (_ < _bind$2) {
                const item = contents[1 + _ | 0];
                const _bind$3 = _M0FPC15debug15surround__lines(space, ",", item);
                _M0MPC15array5Array6appendGsE(middle_lines, new _M0TPB9ArrayViewGsE(_bind$3, 0, _bind$3.length));
                _tmp = _ + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            const _self = [];
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGUsRP211localreview4amqp12ArgumentKindEE(_M0FPC15debug15surround__lines(begin, ",", _first)));
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGUsRP211localreview4amqp12ArgumentKindEE(middle_lines));
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGUsRP211localreview4amqp12ArgumentKindEE(_M0FPC15debug15surround__lines(space, end, _last)));
            lines = _self;
          }
        }
        return _M0MPC15array5Array6filterGsE(lines, (line) => _M0IP016_24default__implPB2Eq10not__equalGsE(line, ""));
      } else {
        if (contents.length === 0) {
          return [`${begin}${end}`];
        } else {
          if (contents.length === 1) {
            const _item = contents[0];
            const item_lines = _M0MPC15array5Array6filterGsE(_item, (line) => _M0IP016_24default__implPB2Eq10not__equalGsE(line, ""));
            if (item_lines.length === 0) {
              return [`${begin}${end}`];
            } else {
              if (item_lines.length === 1) {
                const _x = item_lines[0];
                return [`${begin}${_x}${end}`];
              } else {
                const _last_line = item_lines[item_lines.length - 1 | 0];
                const _x = new _M0TPB9ArrayViewGsE(item_lines, 0, item_lines.length - 1 | 0);
                const _self = [];
                _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(_self, begin);
                _M0MPC15array5Array10push__iterGsE(_self, _M0MPB4Iter4iterGsE(_M0MPB4Iter3mapGRPC16string10StringViewsE(_M0MPC15array9ArrayView4iterGUsRP211localreview4amqp12ArgumentKindEE(_x), (line) => `${_M0MPC16string6String6repeat(" ", 2)}${line}`)));
                _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(_self, `${_M0MPC16string6String6repeat(" ", 2)}${_last_line},`);
                _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(_self, end);
                return _self;
              }
            }
          } else {
            const out = [begin];
            const _bind$2 = contents.length;
            let _tmp = 0;
            while (true) {
              const _ = _tmp;
              if (_ < _bind$2) {
                const item = contents[_];
                const item_lines = _M0MPC15array5Array6filterGsE(item, (line) => _M0IP016_24default__implPB2Eq10not__equalGsE(line, ""));
                if (item_lines.length === 0) {
                } else {
                  if (item_lines.length === 1) {
                    const _x = item_lines[0];
                    _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(out, `${_M0MPC16string6String6repeat(" ", 2)}${_x},`);
                  } else {
                    const _first = item_lines[0];
                    const _last = item_lines[item_lines.length - 1 | 0];
                    const _x_end = item_lines.length - 1 | 0;
                    _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(out, `${_M0MPC16string6String6repeat(" ", 2)}${_first}`);
                    const _bind$3 = _x_end - 1 | 0;
                    let _tmp$2 = 0;
                    while (true) {
                      const _$2 = _tmp$2;
                      if (_$2 < _bind$3) {
                        const mid = item_lines[1 + _$2 | 0];
                        _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(out, `${_M0MPC16string6String6repeat(" ", 2)}${mid}`);
                        _tmp$2 = _$2 + 1 | 0;
                        continue;
                      } else {
                        break;
                      }
                    }
                    _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(out, `${_M0MPC16string6String6repeat(" ", 2)}${_last},`);
                  }
                }
                _tmp = _ + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(out, end);
            return out;
          }
        }
      }
    }
  }
}
function _M0FPC15debug10comma__seq(begin, end, contents) {
  const _bind$2 = contents.length;
  let _tmp = 0;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp;
    const size = _tmp$2;
    if (_ < _bind$2) {
      const c = contents[_];
      _tmp = _ + 1 | 0;
      _tmp$2 = size + c.size | 0;
      continue;
    } else {
      return new _M0TPC15debug7Content(size, _M0FPC15debug17comma__seq__lines(begin, end, _M0MPC15array5Array3mapGRPC15debug13ContentParensRPB5ArrayGsEE(contents, (c) => c.lines)), false);
    }
  }
}
function _M0FPC15debug14print__content(r) {
  return _M0MPC15array5Array4joinGsE(r.lines, new _M0TPC16string10StringView(_M0FPC15debug14print__contentN7_2abindS1244, 0, _M0FPC15debug14print__contentN7_2abindS1244.length));
}
function _M0FPC15debug14with__resizing(_root_size, threshold, rendered_children) {
  if (threshold <= 0) {
    return rendered_children;
  } else {
    const compacted = _M0MPC15debug7Content7compact(rendered_children);
    return _M0MPC15array5Array3allGsE(compacted.lines, (line) => line.length <= threshold) ? compacted : rendered_children;
  }
}
function _M0MPC15debug4Repr17info__adds__depth(info) {
  let _tmp;
  switch (info.$tag) {
    case 12: {
      _tmp = true;
      break;
    }
    case 13: {
      _tmp = true;
      break;
    }
    case 16: {
      _tmp = true;
      break;
    }
    default: {
      _tmp = false;
    }
  }
  return !_tmp;
}
function _M0MPC15debug4Repr19prune__info_2einnerN2goS259(replacement, d, node) {
  const children = _M0MPC15debug4Repr8children(node);
  if (d <= 0) {
    return _M0MPC15array5Array9is__emptyGRPB4JsonE(children) ? node : !_M0MPC15debug4Repr17info__adds__depth(node) ? _M0MPC15debug4Repr14with__children(node, _M0MPC15array5Array3mapGRPC15debug4ReprRPC15debug4ReprE(children, (child) => _M0MPC15debug4Repr19prune__info_2einnerN2goS259(replacement, d, child))) : replacement;
  } else {
    if (_M0MPC15array5Array9is__emptyGRPB4JsonE(children)) {
      return node;
    } else {
      const next_depth = _M0MPC15debug4Repr17info__adds__depth(node) ? d - 1 | 0 : d;
      return _M0MPC15debug4Repr14with__children(node, _M0MPC15array5Array3mapGRPC15debug4ReprRPC15debug4ReprE(children, (child) => _M0MPC15debug4Repr19prune__info_2einnerN2goS259(replacement, next_depth, child)));
    }
  }
}
function _M0MPC15debug4Repr19prune__info_2einner(self, replacement, max_depth) {
  if (max_depth === undefined) {
    return self;
  } else {
    const _Some = max_depth;
    const _depth = _Some;
    return _M0MPC15debug4Repr19prune__info_2einnerN2goS259(replacement, _M0MPC13int3Int3max(1, _depth), self);
  }
}
function _M0MPC15debug4Repr11prune__info(self, replacement$46$opt, max_depth) {
  let replacement;
  if (replacement$46$opt === undefined) {
    replacement = _M0MPC15debug4Repr7omitted();
  } else {
    const _Some = replacement$46$opt;
    replacement = _Some;
  }
  return _M0MPC15debug4Repr19prune__info_2einner(self, replacement, max_depth);
}
function _M0FPC15debug10info__size(info) {
  switch (info.$tag) {
    case 0: {
      return 1;
    }
    case 1: {
      return 1;
    }
    case 2: {
      return 1;
    }
    case 3: {
      return 1;
    }
    case 4: {
      return 1;
    }
    case 5: {
      return 1;
    }
    case 6: {
      const _StringLit = info;
      const _s = _StringLit._0;
      return _s.length <= 15 ? 1 : 2;
    }
    case 7: {
      return 1;
    }
    case 8: {
      return 1;
    }
    case 9: {
      return 2;
    }
    case 12: {
      const _RecordField = info;
      const _name = _RecordField._0;
      return _name.length <= 15 ? 0 : 1;
    }
    case 13: {
      const _EnumLabeledArg = info;
      const _name$2 = _EnumLabeledArg._0;
      return _name$2.length <= 15 ? 0 : 1;
    }
    case 10: {
      const _Enum = info;
      const _name$3 = _Enum._0;
      return _name$3.length <= 15 ? 1 : 2;
    }
    case 14: {
      const _Opaque = info;
      const _name$4 = _Opaque._0;
      return _name$4.length <= 15 ? 1 : 2;
    }
    case 15: {
      const _Literal = info;
      const _s$2 = _Literal._0;
      return _s$2.length <= 15 ? 1 : 2;
    }
    case 11: {
      return 2;
    }
    case 16: {
      return 0;
    }
    default: {
      return 0;
    }
  }
}
function _M0FPC15debug17is__unquoted__key(key) {
  let rest;
  _L: {
    if (key.length >= 1) {
      const _x = key.charCodeAt(0);
      if (_x >= 97 && _x <= 122) {
        const _x$2 = new _M0TPC16string10StringView(key, 1, key.length);
        rest = _x$2;
        break _L;
      } else {
        if (_x === 95) {
          const _x$2 = new _M0TPC16string10StringView(key, 1, key.length);
          rest = _x$2;
          break _L;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }
  return _M0MPC16string10StringView3all(rest, (c) => c >= 97 && c <= 122 ? true : c >= 65 && c <= 90 ? true : c >= 48 && c <= 57 ? true : c === 95);
}
function _M0FPC15debug20pretty__print__label(name) {
  return _M0FPC15debug17is__unquoted__key(name) ? name : _M0MPC16string6String14escape_2einner(name, true);
}
function _M0MPC15debug4Repr13pretty__print(self, children) {
  switch (self.$tag) {
    case 0: {
      return _M0FPC15debug10comma__seq("(", ")", []);
    }
    case 1: {
      const _Integer = self;
      const _s = _Integer._0;
      let _tmp;
      if (_s.length >= 1) {
        const _x = _s.charCodeAt(0);
        if (_x === 45) {
          _tmp = 1;
        } else {
          _tmp = 0;
        }
      } else {
        _tmp = 0;
      }
      return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(_tmp, [_s]));
    }
    case 2: {
      const _DoubleLit = self;
      const _x = _DoubleLit._0;
      const needs_parens = 1 / _x < 0;
      return _M0FPC15debug12leaf_2einner(String(_x), needs_parens);
    }
    case 3: {
      const _FloatLit = self;
      const _x$2 = _FloatLit._0;
      const needs_parens$2 = Math.fround(Math.fround(1) / _x$2) < Math.fround(0);
      return _M0FPC15debug12leaf_2einner(_M0IPC15float5FloatPB4Show10to__string(_x$2), needs_parens$2);
    }
    case 4: {
      const _BoolLit = self;
      const _x$3 = _BoolLit._0;
      return _M0FPC15debug12leaf_2einner(_M0IPC14bool4BoolPB4Show10to__string(_x$3), false);
    }
    case 5: {
      const _CharLit = self;
      const _x$4 = _CharLit._0;
      return _M0FPC15debug12leaf_2einner(_M0MPC14char4Char14escape_2einner(_x$4, true), false);
    }
    case 6: {
      const _StringLit = self;
      const _x$5 = _StringLit._0;
      return _M0FPC15debug10no__parens(_M0FPC15debug8verbatim(_M0MPC16string6String14escape_2einner(_x$5, true)));
    }
    case 7: {
      return _M0FPC15debug10comma__seq("(", ")", _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(children, (x) => _M0MPC15debug7Content8no__wrap(x)));
    }
    case 10: {
      const _Enum = self;
      const _name = _Enum._0;
      return children.length === 0 ? _M0FPC15debug10no__parens(_M0FPC15debug8verbatim(_name)) : _name === "Tuple" ? _M0FPC15debug10comma__seq("(", ")", _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(children, (x) => _M0MPC15debug7Content8no__wrap(x))) : _M0FPC15debug10comma__seq(`${_name}(`, ")", _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(children, (x) => _M0MPC15debug7Content8no__wrap(x)));
    }
    case 8: {
      return _M0FPC15debug10comma__seq("[", "]", _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(children, (x) => _M0MPC15debug7Content8no__wrap(x)));
    }
    case 9: {
      return _M0FPC15debug10comma__seq("{", "}", _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(children, (x) => _M0MPC15debug7Content8no__wrap(x)));
    }
    case 14: {
      const _Opaque = self;
      const _name$2 = _Opaque._0;
      if (_M0MPC15array5Array9is__emptyGRPB4JsonE(children)) {
        return _M0FPC15debug10no__parens(_M0FPC15debug8surround("<", ">", _M0FPC15debug8verbatim(_name$2)));
      } else {
        const body = _M0IPC15debug13ContentParensPB3Add3add(_M0FPC15debug8verbatim(`${_name$2}:`), _M0FPC15debug6indent("  ", _M0MPC15debug7Content8no__wrap(_M0FPC15debug10comma__seq("", "", _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(children, (x) => _M0MPC15debug7Content8no__wrap(x))))));
        return _M0FPC15debug10no__parens(_M0FPC15debug8surround("<", ">", body));
      }
    }
    case 15: {
      const _Literal = self;
      const _str = _Literal._0;
      return _M0FPC15debug10no__parens(_M0FPC15debug8verbatim(_str));
    }
    case 11: {
      return _M0FPC15debug10comma__seq("{", "}", _M0MPC15array5Array3mapGRPC15debug7ContentRPC15debug13ContentParensE(children, (x) => _M0MPC15debug7Content8no__wrap(x)));
    }
    case 16: {
      if (children.length === 2) {
        const _key = children[0];
        const _val = children[1];
        const k = _M0MPC15debug7Content8no__wrap(_key);
        const v = _M0MPC15debug7Content8no__wrap(_val);
        const _bind$2 = v.lines;
        if (_bind$2.length === 0) {
          return _M0FPC15debug14empty__content();
        } else {
          if (_bind$2.length === 1) {
            const _one = _bind$2[0];
            return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens((1 + k.size | 0) + v.size | 0, [`${_M0FPC15debug14print__content(_M0FPC15debug8surround("", ": ", k))}${_one}`]));
          } else {
            const _first = _bind$2[0];
            const _x$6 = new _M0TPB9ArrayViewGsE(_bind$2, 1, _bind$2.length);
            const head = `${_M0FPC15debug14print__content(_M0FPC15debug8surround("", ": ", k))}${_first}`;
            const _tmp$2 = (1 + k.size | 0) + v.size | 0;
            const _self = [];
            _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(_self, head);
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGUsRP211localreview4amqp12ArgumentKindEE(_x$6));
            return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(_tmp$2, _self));
          }
        }
      } else {
        return _M0FPC15debug14empty__content();
      }
    }
    case 13: {
      const _EnumLabeledArg = self;
      const _name$3 = _EnumLabeledArg._0;
      if (children.length === 1) {
        const _val = children[0];
        const _bind$2 = _val.lines;
        if (_bind$2.length === 0) {
          return _M0FPC15debug14empty__content();
        } else {
          if (_bind$2.length === 1) {
            const _first = _bind$2[0];
            return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(1 + _val.size | 0, [`${_name$3}=${_first}`]));
          } else {
            const _first = _bind$2[0];
            const _x$6 = new _M0TPB9ArrayViewGsE(_bind$2, 1, _bind$2.length);
            const _tmp$2 = 1 + _val.size | 0;
            const _self = [];
            _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(_self, `${_name$3}=${_first}`);
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGUsRP211localreview4amqp12ArgumentKindEE(_x$6));
            return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(_tmp$2, _self));
          }
        }
      } else {
        return _M0FPC15debug14empty__content();
      }
    }
    case 12: {
      const _RecordField = self;
      const _name$4 = _RecordField._0;
      if (children.length === 1) {
        const _val = children[0];
        const label = _M0FPC15debug20pretty__print__label(_name$4);
        const v = _M0MPC15debug7Content8no__wrap(_val);
        const _bind$2 = v.lines;
        if (_bind$2.length === 0) {
          return _M0FPC15debug14empty__content();
        } else {
          if (_bind$2.length === 1) {
            const _one = _bind$2[0];
            return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(1 + v.size | 0, [`${label}: ${_one}`]));
          } else {
            const _first = _bind$2[0];
            const _x$6 = new _M0TPB9ArrayViewGsE(_bind$2, 1, _bind$2.length);
            const _tmp$2 = 1 + v.size | 0;
            const _self = [];
            _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(_self, `${label}: ${_first}`);
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGUsRP211localreview4amqp12ArgumentKindEE(_x$6));
            return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(_tmp$2, _self));
          }
        }
      } else {
        return _M0FPC15debug14empty__content();
      }
    }
    default: {
      return _M0FPC15debug6parens(_M0FPC15debug8verbatim("..."));
    }
  }
}
function _M0MPC15debug4Repr12render__repr(self, threshold) {
  const label = _M0MPC15debug4Repr7shallow(self);
  const children = _M0MPC15array5Array3mapGRPC15debug4ReprRPC15debug7ContentE(_M0MPC15debug4Repr8children(self), (child) => _M0MPC15debug4Repr12render__repr(child, threshold));
  return _M0FPC15debug14with__resizing(_M0FPC15debug10info__size(label), threshold, _M0MPC15debug4Repr13pretty__print(label, children));
}
function _M0FPC15debug6render(r, max_depth) {
  const max_depth$2 = max_depth === undefined ? _M0FPC15debug6renderN6constrS1705 : max_depth;
  const info = _M0MPC15debug4Repr11prune__info(r, undefined, max_depth$2);
  return _M0FPC15debug14print__content(_M0MPC15debug7Content8no__wrap(_M0MPC15debug4Repr12render__repr(info, 70)));
}
function _M0IPC15debug4ReprPB4Show6output(self, logger) {
  logger.method_table.method_0(logger.self, _M0FPC15debug6render(self, undefined));
}
function _M0IPC13int3IntPC15debug5Debug8to__repr(self) {
  return _M0MPC15debug4Repr7integer(_M0MPC13int3Int18to__string_2einner(self, 10));
}
function _M0IPC15int645Int64PC15debug5Debug8to__repr(self) {
  return _M0MPC15debug4Repr7integer(_M0MPC15int645Int6418to__string_2einner(self, 10));
}
function _M0IPC14uint4UIntPC15debug5Debug8to__repr(self) {
  return _M0MPC15debug4Repr7integer(_M0MPC14uint4UInt18to__string_2einner(self, 10));
}
function _M0IPC16uint646UInt64PC15debug5Debug8to__repr(self) {
  return _M0MPC15debug4Repr7integer(_M0MPC16uint646UInt6418to__string_2einner(self, 10));
}
function _M0IPC14bool4BoolPC15debug5Debug8to__repr(self) {
  return _M0MPC15debug4Repr4bool(self);
}
function _M0IPC14byte4BytePC15debug5Debug8to__repr(self) {
  return _M0MPC15debug4Repr7literal(`0x${_M0MPC14byte4Byte7to__hex(self)}`);
}
function _M0IPC14char4CharPC15debug5Debug8to__repr(self) {
  return _M0MPC15debug4Repr4char(self);
}
function _M0IPC16string6StringPC15debug5Debug8to__repr(self) {
  return _M0MPC15debug4Repr6string(self);
}
function _M0IPC15bytes5BytesPC15debug5Debug8to__repr(self) {
  return _M0MPC15debug4Repr8opaque__("Bytes", _M0MPC15debug4Repr5array(_M0MPC15array5Array3mapGyRPC15debug4ReprE(_M0MPC15bytes5Bytes9to__array(self), (x) => _M0MPC15debug4Repr4ReprGyE(x))));
}
function _M0IPC15bytes9BytesViewPC15debug5Debug8to__repr(self) {
  return _M0MPC15debug4Repr8opaque__("BytesView", _M0MPC15debug4Repr5array(_M0MPC15array5Array3mapGyRPC15debug4ReprE(_M0MPC15bytes9BytesView9to__array(self), (x) => _M0MPC15debug4Repr4ReprGyE(x))));
}
function _M0IPC15array5ArrayPC15debug5Debug8to__reprGUsRP211localreview4amqp8ArgumentEE(self) {
  return _M0MPC15debug4Repr5array(_M0MPC15array5Array3mapGUsRP211localreview4amqp8ArgumentERPC15debug4ReprE(self, (x) => _M0MPC15debug4Repr4ReprGUsRP211localreview4amqp8ArgumentEE(x)));
}
function _M0IPC15array5ArrayPC15debug5Debug8to__reprGUsRP211localreview4amqp10FieldValueEE(self) {
  return _M0MPC15debug4Repr5array(_M0MPC15array5Array3mapGUsRP211localreview4amqp10FieldValueERPC15debug4ReprE(self, (x) => _M0MPC15debug4Repr4ReprGUsRP211localreview4amqp10FieldValueEE(x)));
}
function _M0IPC15array5ArrayPC15debug5Debug8to__reprGRP211localreview4amqp10FieldValueE(self) {
  return _M0MPC15debug4Repr5array(_M0MPC15array5Array3mapGRP211localreview4amqp10FieldValueRPC15debug4ReprE(self, (x) => _M0MPC15debug4Repr4ReprGRP211localreview4amqp10FieldValueE(x)));
}
function _M0IPB7FailurePC15debug5Debug8to__reprGRPB7FailureE(self) {
  const _Failure = self;
  const _msg = _Failure._0;
  return _M0MPC15debug4Repr4ctor("Failure", [{ _0: undefined, _1: _M0MPC15debug4Repr6string(_msg) }]);
}
function _M0IPC28encoding4utf89MalformedPC15debug5Debug8to__reprGRPC28encoding4utf89MalformedE(_x_46) {
  const _Malformed = _x_46;
  const _$42$arg_47 = _Malformed._0;
  return _M0MPC15debug4Repr4ctor("Malformed", [{ _0: undefined, _1: _M0IPC15bytes9BytesViewPC15debug5Debug8to__repr(_$42$arg_47) }]);
}
function _M0FPC28encoding4utf814encode_2einner(str, bom) {
  return _M0FPC28encoding4utf816encode__utf8__js(_M0MPC16string10StringView4data(str), _M0MPC16string10StringView13start__offset(str), str.end - str.start | 0, bom);
}
function _M0FPC28encoding4utf821utf8__find__malformed(src, src_offset, src_length) {
  const _bind$2 = src_offset + src_length | 0;
  const _bind$3 = src.length;
  if (src_offset < 0 || (src_offset > _bind$2 || _bind$2 > _bind$3)) {
    $panic();
  }
  const view = new _M0TPC15bytes9BytesView(src, src_offset, _bind$2);
  let _tmp = view;
  while (true) {
    const bytes = _tmp;
    let malformed;
    _L: {
      let rest;
      _L$2: {
        let rest$2;
        _L$3: {
          let rest$3;
          _L$4: {
            let rest$4;
            _L$5: {
              if ((bytes.end - bytes.start | 0) === 0) {
                return -1;
              } else {
                if ((bytes.end - bytes.start | 0) >= 8) {
                  const _x = bytes.buf[bytes.start];
                  if (_x <= 127) {
                    const _x$2 = bytes.buf[bytes.start + 1 | 0];
                    if (_x$2 <= 127) {
                      const _x$3 = bytes.buf[bytes.start + 2 | 0];
                      if (_x$3 <= 127) {
                        const _x$4 = bytes.buf[bytes.start + 3 | 0];
                        if (_x$4 <= 127) {
                          const _x$5 = bytes.buf[bytes.start + 4 | 0];
                          if (_x$5 <= 127) {
                            const _x$6 = bytes.buf[bytes.start + 5 | 0];
                            if (_x$6 <= 127) {
                              const _x$7 = bytes.buf[bytes.start + 6 | 0];
                              if (_x$7 <= 127) {
                                const _x$8 = bytes.buf[bytes.start + 7 | 0];
                                if (_x$8 <= 127) {
                                  const _x$9 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 8 | 0, bytes.end);
                                  _tmp = _x$9;
                                  continue;
                                } else {
                                  const _x$9 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                                  rest$4 = _x$9;
                                  break _L$5;
                                }
                              } else {
                                const _x$8 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                                rest$4 = _x$8;
                                break _L$5;
                              }
                            } else {
                              const _x$7 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                              rest$4 = _x$7;
                              break _L$5;
                            }
                          } else {
                            const _x$6 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                            rest$4 = _x$6;
                            break _L$5;
                          }
                        } else {
                          const _x$5 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                          rest$4 = _x$5;
                          break _L$5;
                        }
                      } else {
                        const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                        rest$4 = _x$4;
                        break _L$5;
                      }
                    } else {
                      const _x$3 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                      rest$4 = _x$3;
                      break _L$5;
                    }
                  } else {
                    if (_x >= 194 && _x <= 223) {
                      const _x$2 = bytes.buf[bytes.start + 1 | 0];
                      if (_x$2 >= 128 && _x$2 <= 191) {
                        const _x$3 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 2 | 0, bytes.end);
                        rest$3 = _x$3;
                        break _L$4;
                      } else {
                        malformed = bytes;
                        break _L;
                      }
                    } else {
                      if (_x === 224) {
                        const _x$2 = bytes.buf[bytes.start + 1 | 0];
                        if (_x$2 >= 160 && _x$2 <= 191) {
                          const _x$3 = bytes.buf[bytes.start + 2 | 0];
                          if (_x$3 >= 128 && _x$3 <= 191) {
                            const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                            rest$2 = _x$4;
                            break _L$3;
                          } else {
                            malformed = bytes;
                            break _L;
                          }
                        } else {
                          malformed = bytes;
                          break _L;
                        }
                      } else {
                        if (_x >= 225 && _x <= 236) {
                          const _x$2 = bytes.buf[bytes.start + 1 | 0];
                          if (_x$2 >= 128 && _x$2 <= 191) {
                            const _x$3 = bytes.buf[bytes.start + 2 | 0];
                            if (_x$3 >= 128 && _x$3 <= 191) {
                              const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                              rest$2 = _x$4;
                              break _L$3;
                            } else {
                              malformed = bytes;
                              break _L;
                            }
                          } else {
                            malformed = bytes;
                            break _L;
                          }
                        } else {
                          if (_x === 237) {
                            const _x$2 = bytes.buf[bytes.start + 1 | 0];
                            if (_x$2 >= 128 && _x$2 <= 159) {
                              const _x$3 = bytes.buf[bytes.start + 2 | 0];
                              if (_x$3 >= 128 && _x$3 <= 191) {
                                const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                                rest$2 = _x$4;
                                break _L$3;
                              } else {
                                malformed = bytes;
                                break _L;
                              }
                            } else {
                              malformed = bytes;
                              break _L;
                            }
                          } else {
                            if (_x >= 238 && _x <= 239) {
                              const _x$2 = bytes.buf[bytes.start + 1 | 0];
                              if (_x$2 >= 128 && _x$2 <= 191) {
                                const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                if (_x$3 >= 128 && _x$3 <= 191) {
                                  const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                                  rest$2 = _x$4;
                                  break _L$3;
                                } else {
                                  malformed = bytes;
                                  break _L;
                                }
                              } else {
                                malformed = bytes;
                                break _L;
                              }
                            } else {
                              if (_x === 240) {
                                const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                if (_x$2 >= 144 && _x$2 <= 191) {
                                  const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                  if (_x$3 >= 128 && _x$3 <= 191) {
                                    const _x$4 = bytes.buf[bytes.start + 3 | 0];
                                    if (_x$4 >= 128 && _x$4 <= 191) {
                                      const _x$5 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 4 | 0, bytes.end);
                                      rest = _x$5;
                                      break _L$2;
                                    } else {
                                      malformed = bytes;
                                      break _L;
                                    }
                                  } else {
                                    malformed = bytes;
                                    break _L;
                                  }
                                } else {
                                  malformed = bytes;
                                  break _L;
                                }
                              } else {
                                if (_x >= 241 && _x <= 243) {
                                  const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                  if (_x$2 >= 128 && _x$2 <= 191) {
                                    const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                    if (_x$3 >= 128 && _x$3 <= 191) {
                                      const _x$4 = bytes.buf[bytes.start + 3 | 0];
                                      if (_x$4 >= 128 && _x$4 <= 191) {
                                        const _x$5 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 4 | 0, bytes.end);
                                        rest = _x$5;
                                        break _L$2;
                                      } else {
                                        malformed = bytes;
                                        break _L;
                                      }
                                    } else {
                                      malformed = bytes;
                                      break _L;
                                    }
                                  } else {
                                    malformed = bytes;
                                    break _L;
                                  }
                                } else {
                                  if (_x === 244) {
                                    const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                    if (_x$2 >= 128 && _x$2 <= 143) {
                                      const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                      if (_x$3 >= 128 && _x$3 <= 191) {
                                        const _x$4 = bytes.buf[bytes.start + 3 | 0];
                                        if (_x$4 >= 128 && _x$4 <= 191) {
                                          const _x$5 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 4 | 0, bytes.end);
                                          rest = _x$5;
                                          break _L$2;
                                        } else {
                                          malformed = bytes;
                                          break _L;
                                        }
                                      } else {
                                        malformed = bytes;
                                        break _L;
                                      }
                                    } else {
                                      malformed = bytes;
                                      break _L;
                                    }
                                  } else {
                                    malformed = bytes;
                                    break _L;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  const _x = bytes.buf[bytes.start];
                  if (_x >= 0 && _x <= 127) {
                    const _x$2 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 1 | 0, bytes.end);
                    rest$4 = _x$2;
                    break _L$5;
                  } else {
                    if ((bytes.end - bytes.start | 0) >= 2) {
                      if (_x >= 194 && _x <= 223) {
                        const _x$2 = bytes.buf[bytes.start + 1 | 0];
                        if (_x$2 >= 128 && _x$2 <= 191) {
                          const _x$3 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 2 | 0, bytes.end);
                          rest$3 = _x$3;
                          break _L$4;
                        } else {
                          (bytes.end - bytes.start | 0) >= 3;
                          malformed = bytes;
                          break _L;
                        }
                      } else {
                        if ((bytes.end - bytes.start | 0) >= 3) {
                          if (_x === 224) {
                            const _x$2 = bytes.buf[bytes.start + 1 | 0];
                            if (_x$2 >= 160 && _x$2 <= 191) {
                              const _x$3 = bytes.buf[bytes.start + 2 | 0];
                              if (_x$3 >= 128 && _x$3 <= 191) {
                                const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                                rest$2 = _x$4;
                                break _L$3;
                              } else {
                                malformed = bytes;
                                break _L;
                              }
                            } else {
                              malformed = bytes;
                              break _L;
                            }
                          } else {
                            if (_x >= 225 && _x <= 236) {
                              const _x$2 = bytes.buf[bytes.start + 1 | 0];
                              if (_x$2 >= 128 && _x$2 <= 191) {
                                const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                if (_x$3 >= 128 && _x$3 <= 191) {
                                  const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                                  rest$2 = _x$4;
                                  break _L$3;
                                } else {
                                  malformed = bytes;
                                  break _L;
                                }
                              } else {
                                malformed = bytes;
                                break _L;
                              }
                            } else {
                              if (_x === 237) {
                                const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                if (_x$2 >= 128 && _x$2 <= 159) {
                                  const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                  if (_x$3 >= 128 && _x$3 <= 191) {
                                    const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                                    rest$2 = _x$4;
                                    break _L$3;
                                  } else {
                                    malformed = bytes;
                                    break _L;
                                  }
                                } else {
                                  malformed = bytes;
                                  break _L;
                                }
                              } else {
                                if (_x >= 238 && _x <= 239) {
                                  const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                  if (_x$2 >= 128 && _x$2 <= 191) {
                                    const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                    if (_x$3 >= 128 && _x$3 <= 191) {
                                      const _x$4 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
                                      rest$2 = _x$4;
                                      break _L$3;
                                    } else {
                                      malformed = bytes;
                                      break _L;
                                    }
                                  } else {
                                    malformed = bytes;
                                    break _L;
                                  }
                                } else {
                                  if ((bytes.end - bytes.start | 0) >= 4) {
                                    if (_x === 240) {
                                      const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                      if (_x$2 >= 144 && _x$2 <= 191) {
                                        const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                        if (_x$3 >= 128 && _x$3 <= 191) {
                                          const _x$4 = bytes.buf[bytes.start + 3 | 0];
                                          if (_x$4 >= 128 && _x$4 <= 191) {
                                            const _x$5 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 4 | 0, bytes.end);
                                            rest = _x$5;
                                            break _L$2;
                                          } else {
                                            malformed = bytes;
                                            break _L;
                                          }
                                        } else {
                                          malformed = bytes;
                                          break _L;
                                        }
                                      } else {
                                        malformed = bytes;
                                        break _L;
                                      }
                                    } else {
                                      if (_x >= 241 && _x <= 243) {
                                        const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                        if (_x$2 >= 128 && _x$2 <= 191) {
                                          const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                          if (_x$3 >= 128 && _x$3 <= 191) {
                                            const _x$4 = bytes.buf[bytes.start + 3 | 0];
                                            if (_x$4 >= 128 && _x$4 <= 191) {
                                              const _x$5 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 4 | 0, bytes.end);
                                              rest = _x$5;
                                              break _L$2;
                                            } else {
                                              malformed = bytes;
                                              break _L;
                                            }
                                          } else {
                                            malformed = bytes;
                                            break _L;
                                          }
                                        } else {
                                          malformed = bytes;
                                          break _L;
                                        }
                                      } else {
                                        if (_x === 244) {
                                          const _x$2 = bytes.buf[bytes.start + 1 | 0];
                                          if (_x$2 >= 128 && _x$2 <= 143) {
                                            const _x$3 = bytes.buf[bytes.start + 2 | 0];
                                            if (_x$3 >= 128 && _x$3 <= 191) {
                                              const _x$4 = bytes.buf[bytes.start + 3 | 0];
                                              if (_x$4 >= 128 && _x$4 <= 191) {
                                                const _x$5 = new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 4 | 0, bytes.end);
                                                rest = _x$5;
                                                break _L$2;
                                              } else {
                                                malformed = bytes;
                                                break _L;
                                              }
                                            } else {
                                              malformed = bytes;
                                              break _L;
                                            }
                                          } else {
                                            malformed = bytes;
                                            break _L;
                                          }
                                        } else {
                                          malformed = bytes;
                                          break _L;
                                        }
                                      }
                                    }
                                  } else {
                                    malformed = bytes;
                                    break _L;
                                  }
                                }
                              }
                            }
                          }
                        } else {
                          malformed = bytes;
                          break _L;
                        }
                      }
                    } else {
                      malformed = bytes;
                      break _L;
                    }
                  }
                }
              }
            }
            _tmp = rest$4;
            continue;
          }
          _tmp = rest$3;
          continue;
        }
        _tmp = rest$2;
        continue;
      }
      _tmp = rest;
      continue;
    }
    return _M0MPC15bytes9BytesView13start__offset(malformed) - src_offset | 0;
  }
}
function _M0FPC28encoding4utf825strict__malformed__suffix(bytes) {
  const input = _M0MPC15bytes9BytesView4data(bytes);
  const src_offset = _M0MPC15bytes9BytesView13start__offset(bytes);
  const src_length = bytes.end - bytes.start | 0;
  const malformed_offset = _M0FPC28encoding4utf821utf8__find__malformed(input, src_offset, src_length);
  const _bind$2 = bytes.end - bytes.start | 0;
  if (malformed_offset < 0 || malformed_offset > _bind$2) {
    $panic();
  }
  return new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + malformed_offset | 0, bytes.start + _bind$2 | 0);
}
function _M0FPC28encoding4utf815drop__utf8__bom(bytes, ignore_bom) {
  _L: {
    if (ignore_bom) {
      _L$2: {
        if ((bytes.end - bytes.start | 0) >= 3) {
          const _x = bytes.buf[bytes.start];
          if (_x === 239) {
            const _x$2 = bytes.buf[bytes.start + 1 | 0];
            if (_x$2 === 187) {
              const _x$3 = bytes.buf[bytes.start + 2 | 0];
              if (_x$3 === 191) {
                return new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + 3 | 0, bytes.end);
              } else {
                break _L$2;
              }
            } else {
              break _L$2;
            }
          } else {
            break _L$2;
          }
        } else {
          break _L$2;
        }
      }
      break _L;
    } else {
      break _L;
    }
  }
  return bytes;
}
function _M0FPC28encoding4utf814decode_2einner(bytes, ignore_bom) {
  const result = _M0FPC28encoding4utf816decode__utf8__js(_M0MPC15bytes9BytesView4data(bytes), _M0MPC15bytes9BytesView13start__offset(bytes), bytes.end - bytes.start | 0, !ignore_bom);
  if (result.length === 1) {
    return new _M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE2Ok(0 >>> 0 < result.length ? result[0] : $oob());
  } else {
    const bytes$2 = _M0FPC28encoding4utf815drop__utf8__bom(bytes, ignore_bom);
    return new _M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE3Err(new _M0DTPC15error5Error60moonbitlang_2fcore_2fencoding_2futf8_2eMalformed_2eMalformed(_M0FPC28encoding4utf825strict__malformed__suffix(bytes$2)));
  }
}
function _M0FPC28encoding4utf821decode__lossy_2einner(bytes, ignore_bom) {
  return _M0FPC28encoding4utf823decode__utf8__lossy__js(_M0MPC15bytes9BytesView4data(bytes), _M0MPC15bytes9BytesView13start__offset(bytes), bytes.end - bytes.start | 0, !ignore_bom);
}
function _M0IPC15error5ErrorPB4Show10to__string(self) {
  return _M0FP15Error10to__string(self);
}
function _M0IPC15error5ErrorPC15debug5Debug8to__repr(self) {
  return _M0FP15Error8to__repr(self);
}
function _M0FPC28internal7strconv9base__errGUiRPC16string10StringViewbEE() {
  return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv14base__err__str));
}
function _M0FPC28internal7strconv25check__and__consume__base(view, base) {
  if (base === 0) {
    _L: {
      let rest;
      _L$2: {
        let rest$2;
        _L$3: {
          let rest$3;
          _L$4: {
            if ((view.end - view.start | 0) >= 2) {
              const _x = view.str.charCodeAt(view.start);
              if (_x === 48) {
                const _x$2 = view.str.charCodeAt(view.start + 1 | 0);
                switch (_x$2) {
                  case 120: {
                    const _x$3 = new _M0TPC16string10StringView(view.str, view.start + 2 | 0, view.end);
                    rest$3 = _x$3;
                    break _L$4;
                  }
                  case 88: {
                    const _x$4 = new _M0TPC16string10StringView(view.str, view.start + 2 | 0, view.end);
                    rest$3 = _x$4;
                    break _L$4;
                  }
                  case 111: {
                    const _x$5 = new _M0TPC16string10StringView(view.str, view.start + 2 | 0, view.end);
                    rest$2 = _x$5;
                    break _L$3;
                  }
                  case 79: {
                    const _x$6 = new _M0TPC16string10StringView(view.str, view.start + 2 | 0, view.end);
                    rest$2 = _x$6;
                    break _L$3;
                  }
                  case 98: {
                    const _x$7 = new _M0TPC16string10StringView(view.str, view.start + 2 | 0, view.end);
                    rest = _x$7;
                    break _L$2;
                  }
                  case 66: {
                    const _x$8 = new _M0TPC16string10StringView(view.str, view.start + 2 | 0, view.end);
                    rest = _x$8;
                    break _L$2;
                  }
                  default: {
                    break _L;
                  }
                }
              } else {
                break _L;
              }
            } else {
              break _L;
            }
          }
          return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC15error5ErrorE2Ok({ _0: 16, _1: rest$3, _2: true });
        }
        return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC15error5ErrorE2Ok({ _0: 8, _1: rest$2, _2: true });
      }
      return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC15error5ErrorE2Ok({ _0: 2, _1: rest, _2: true });
    }
    return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC15error5ErrorE2Ok({ _0: 10, _1: view, _2: false });
  } else {
    _L: {
      let rest;
      _L$2: {
        let rest$2;
        _L$3: {
          let rest$3;
          _L$4: {
            if ((view.end - view.start | 0) >= 2) {
              const _x = view.str.charCodeAt(view.start);
              if (_x === 48) {
                const _x$2 = view.str.charCodeAt(view.start + 1 | 0);
                switch (_x$2) {
                  case 120: {
                    const _x$3 = new _M0TPC16string10StringView(view.str, view.start + 2 | 0, view.end);
                    if (base === 16) {
                      rest$3 = _x$3;
                      break _L$4;
                    } else {
                      break _L;
                    }
                  }
                  case 88: {
                    const _x$4 = new _M0TPC16string10StringView(view.str, view.start + 2 | 0, view.end);
                    if (base === 16) {
                      rest$3 = _x$4;
                      break _L$4;
                    } else {
                      break _L;
                    }
                  }
                  case 111: {
                    const _x$5 = new _M0TPC16string10StringView(view.str, view.start + 2 | 0, view.end);
                    if (base === 8) {
                      rest$2 = _x$5;
                      break _L$3;
                    } else {
                      break _L;
                    }
                  }
                  case 79: {
                    const _x$6 = new _M0TPC16string10StringView(view.str, view.start + 2 | 0, view.end);
                    if (base === 8) {
                      rest$2 = _x$6;
                      break _L$3;
                    } else {
                      break _L;
                    }
                  }
                  case 98: {
                    const _x$7 = new _M0TPC16string10StringView(view.str, view.start + 2 | 0, view.end);
                    if (base === 2) {
                      rest = _x$7;
                      break _L$2;
                    } else {
                      break _L;
                    }
                  }
                  case 66: {
                    const _x$8 = new _M0TPC16string10StringView(view.str, view.start + 2 | 0, view.end);
                    if (base === 2) {
                      rest = _x$8;
                      break _L$2;
                    } else {
                      break _L;
                    }
                  }
                  default: {
                    break _L;
                  }
                }
              } else {
                break _L;
              }
            } else {
              break _L;
            }
          }
          return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC15error5ErrorE2Ok({ _0: 16, _1: rest$3, _2: true });
        }
        return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC15error5ErrorE2Ok({ _0: 8, _1: rest$2, _2: true });
      }
      return new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC15error5ErrorE2Ok({ _0: 2, _1: rest, _2: true });
    }
    return base >= 2 && base <= 36 ? new _M0DTPC16result6ResultGUiRPC16string10StringViewbERPC15error5ErrorE2Ok({ _0: base, _1: view, _2: false }) : _M0FPC28internal7strconv9base__errGUiRPC16string10StringViewbEE();
  }
}
function _M0FPC28internal7strconv10range__errGuE() {
  return new _M0DTPC16result6ResultGuRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv15range__err__str));
}
function _M0FPC28internal7strconv11syntax__errGiE() {
  return new _M0DTPC16result6ResultGiRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv16syntax__err__str));
}
function _M0FPC28internal7strconv11syntax__errGuE() {
  return new _M0DTPC16result6ResultGuRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv16syntax__err__str));
}
function _M0FPC28internal7strconv11syntax__errGlE() {
  return new _M0DTPC16result6ResultGlRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv16syntax__err__str));
}
function _M0FPC28internal7strconv11syntax__errGdE() {
  return new _M0DTPC16result6ResultGdRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv16syntax__err__str));
}
function _M0FPC28internal7strconv11syntax__errGORPC28internal7strconv6NumberE() {
  return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(_M0FPC28internal7strconv16syntax__err__str));
}
function _M0FPC28internal7strconv21parse__uint64_2einner(str, base) {
  if (_M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(str, new _M0TPC16string10StringView(_M0FPC28internal7strconv21parse__uint64_2einnerN7_2abindS486, 0, _M0FPC28internal7strconv21parse__uint64_2einnerN7_2abindS486.length))) {
    _L: {
      _L$2: {
        if ((str.end - str.start | 0) >= 1) {
          const _x = str.str.charCodeAt(str.start);
          switch (_x) {
            case 43: {
              break _L$2;
            }
            case 45: {
              break _L$2;
            }
          }
        }
        break _L;
      }
      const _bind$2 = _M0FPC28internal7strconv11syntax__errGuE();
      if (_bind$2.$tag === 1) {
        const _ok = _bind$2;
        _ok._0;
      } else {
        return _bind$2;
      }
    }
    const _bind$2 = _M0FPC28internal7strconv25check__and__consume__base(str, base);
    let _bind$3;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _bind$3 = _ok._0;
    } else {
      return _bind$2;
    }
    const _num_base = _bind$3._0;
    const _rest = _bind$3._1;
    const _allow_underscore = _bind$3._2;
    let overflow_threshold;
    switch (_num_base) {
      case 10: {
        overflow_threshold = 1844674407370955162n;
        break;
      }
      case 16: {
        overflow_threshold = 1152921504606846976n;
        break;
      }
      default: {
        const _tmp = _M0MPC13int3Int10to__uint64(_num_base);
        if (_tmp === 0n) {
          $panic();
        }
        overflow_threshold = BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, 18446744073709551615n) / BigInt.asUintN(64, _tmp)) + 1n);
      }
    }
    let has_digit;
    if ((_rest.end - _rest.start | 0) >= 1) {
      const _x = _rest.str.charCodeAt(_rest.start);
      if (_x >= 48 && _x <= 57) {
        has_digit = true;
      } else {
        if (_x >= 97 && _x <= 122) {
          has_digit = true;
        } else {
          if (_x >= 65 && _x <= 90) {
            has_digit = true;
          } else {
            if ((_rest.end - _rest.start | 0) >= 2) {
              if (_x === 95) {
                const _x$2 = _rest.str.charCodeAt(_rest.start + 1 | 0);
                has_digit = _x$2 >= 48 && _x$2 <= 57 ? true : _x$2 >= 97 && _x$2 <= 122 ? true : _x$2 >= 65 && _x$2 <= 90;
              } else {
                has_digit = false;
              }
            } else {
              has_digit = false;
            }
          }
        }
      }
    } else {
      has_digit = false;
    }
    if (has_digit) {
      let _tmp$2;
      let _tmp$3 = _rest;
      let _tmp$4 = 0n;
      let _tmp$5 = _allow_underscore;
      while (true) {
        const rest = _tmp$3;
        const acc = _tmp$4;
        const allow_underscore = _tmp$5;
        let acc$2;
        let rest$2;
        let c;
        _L$2: {
          _L$3: {
            if ((rest.end - rest.start | 0) === 1) {
              const _x = rest.str.charCodeAt(rest.start);
              if (_x === 95) {
                const _bind$4 = _M0FPC28internal7strconv11syntax__errGuE();
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  _ok._0;
                } else {
                  return _bind$4;
                }
              } else {
                const _c = _M0MPC16string6String16unsafe__char__at(rest.str, _M0MPC16string6String29offset__of__nth__char_2einner(rest.str, 0, rest.start, rest.end));
                const _tmp$6 = rest.str;
                const _bind$4 = _M0MPC16string6String29offset__of__nth__char_2einner(rest.str, 1, rest.start, rest.end);
                let _tmp$7;
                if (_bind$4 === undefined) {
                  _tmp$7 = rest.end;
                } else {
                  const _Some = _bind$4;
                  _tmp$7 = _Some;
                }
                const _x$2 = new _M0TPC16string10StringView(_tmp$6, _tmp$7, rest.end);
                acc$2 = acc;
                rest$2 = _x$2;
                c = _c;
                break _L$3;
              }
            } else {
              if ((rest.end - rest.start | 0) >= 1) {
                const _x = rest.str.charCodeAt(rest.start);
                if (_x === 95) {
                  if (allow_underscore === false) {
                    const _bind$4 = _M0FPC28internal7strconv11syntax__errGuE();
                    if (_bind$4.$tag === 1) {
                      const _ok = _bind$4;
                      _ok._0;
                    } else {
                      return _bind$4;
                    }
                  } else {
                    const _x$2 = new _M0TPC16string10StringView(rest.str, rest.start + 1 | 0, rest.end);
                    _tmp$3 = _x$2;
                    _tmp$5 = false;
                    continue;
                  }
                } else {
                  const _c = _M0MPC16string6String16unsafe__char__at(rest.str, _M0MPC16string6String29offset__of__nth__char_2einner(rest.str, 0, rest.start, rest.end));
                  const _tmp$6 = rest.str;
                  const _bind$4 = _M0MPC16string6String29offset__of__nth__char_2einner(rest.str, 1, rest.start, rest.end);
                  let _tmp$7;
                  if (_bind$4 === undefined) {
                    _tmp$7 = rest.end;
                  } else {
                    const _Some = _bind$4;
                    _tmp$7 = _Some;
                  }
                  const _x$2 = new _M0TPC16string10StringView(_tmp$6, _tmp$7, rest.end);
                  acc$2 = acc;
                  rest$2 = _x$2;
                  c = _c;
                  break _L$3;
                }
              } else {
                _tmp$2 = acc;
                break;
              }
            }
            break _L$2;
          }
          const c$2 = c;
          let d;
          if (c$2 >= 48 && c$2 <= 57) {
            d = c$2 - 48 | 0;
          } else {
            if (c$2 >= 97 && c$2 <= 122) {
              d = c$2 + -87 | 0;
            } else {
              if (c$2 >= 65 && c$2 <= 90) {
                d = c$2 + -55 | 0;
              } else {
                const _bind$4 = _M0FPC28internal7strconv11syntax__errGiE();
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  d = _ok._0;
                } else {
                  return _bind$4;
                }
              }
            }
          }
          if (d < _num_base) {
            if (BigInt.asUintN(64, acc$2) < BigInt.asUintN(64, overflow_threshold)) {
              const next_acc = BigInt.asUintN(64, BigInt.asUintN(64, acc$2 * _M0MPC13int3Int10to__uint64(_num_base)) + _M0MPC13int3Int10to__uint64(d));
              if (BigInt.asUintN(64, next_acc) >= BigInt.asUintN(64, acc$2) && BigInt.asUintN(64, next_acc) <= BigInt.asUintN(64, 18446744073709551615n)) {
                _tmp$3 = rest$2;
                _tmp$4 = next_acc;
                _tmp$5 = true;
                continue;
              } else {
                const _bind$4 = _M0FPC28internal7strconv10range__errGuE();
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  _ok._0;
                } else {
                  return _bind$4;
                }
              }
            } else {
              const _bind$4 = _M0FPC28internal7strconv10range__errGuE();
              if (_bind$4.$tag === 1) {
                const _ok = _bind$4;
                _ok._0;
              } else {
                return _bind$4;
              }
            }
          } else {
            const _bind$4 = _M0FPC28internal7strconv11syntax__errGuE();
            if (_bind$4.$tag === 1) {
              const _ok = _bind$4;
              _ok._0;
            } else {
              return _bind$4;
            }
          }
        }
        continue;
      }
      return new _M0DTPC16result6ResultGmRPC15error5ErrorE2Ok(_tmp$2);
    } else {
      return _M0FPC28internal7strconv11syntax__errGlE();
    }
  } else {
    return _M0FPC28internal7strconv11syntax__errGlE();
  }
}
function _M0EPC16string10StringViewPC28internal7strconv12fold__digitsGmE(self, init, f) {
  let _tmp = self;
  let _tmp$2 = init;
  let _tmp$3 = 0;
  while (true) {
    const str = _tmp;
    const ret = _tmp$2;
    const len = _tmp$3;
    _L: {
      if ((str.end - str.start | 0) >= 1) {
        const _x = str.str.charCodeAt(str.start);
        if (_x >= 48 && _x <= 57) {
          const _x$2 = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
          _tmp = _x$2;
          _tmp$2 = f(_x - 48 | 0, ret);
          _tmp$3 = len + 1 | 0;
          continue;
        } else {
          if (_x === 95) {
            const _x$2 = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
            _tmp = _x$2;
            continue;
          } else {
            break _L;
          }
        }
      } else {
        break _L;
      }
    }
    return { _0: str, _1: ret, _2: len };
  }
}
function _M0FPC28internal7strconv13parse__digits(s, x) {
  return _M0EPC16string10StringViewPC28internal7strconv12fold__digitsGmE(s, x, (digit, acc) => BigInt.asUintN(64, BigInt.asUintN(64, acc * 10n) + BigInt.asUintN(64, BigInt(digit >>> 0))));
}
function _M0FPC28internal7strconv20try__parse__19digits(s, x) {
  let x$2 = x;
  let len = 0;
  let _tmp = s;
  while (true) {
    const s$2 = _tmp;
    let s$3;
    _L: {
      if ((s$2.end - s$2.start | 0) >= 1) {
        const _x = s$2.str.charCodeAt(s$2.start);
        if (_x >= 48 && _x <= 57) {
          const _x$2 = new _M0TPC16string10StringView(s$2.str, s$2.start + 1 | 0, s$2.end);
          if (BigInt.asUintN(64, x$2) < BigInt.asUintN(64, _M0FPC28internal7strconv17min__19digit__int)) {
            len = len + 1 | 0;
            x$2 = BigInt.asUintN(64, BigInt.asUintN(64, x$2 * 10n) + BigInt.asUintN(64, BigInt((_x - 48 | 0) >>> 0)));
            _tmp = _x$2;
            continue;
          } else {
            s$3 = s$2;
            break _L;
          }
        } else {
          if (_x === 95) {
            const _x$2 = new _M0TPC16string10StringView(s$2.str, s$2.start + 1 | 0, s$2.end);
            _tmp = _x$2;
            continue;
          } else {
            s$3 = s$2;
            break _L;
          }
        }
      } else {
        s$3 = s$2;
        break _L;
      }
    }
    return { _0: s$3, _1: x$2, _2: len };
  }
}
function _M0FPC28internal7strconv17parse__scientific(s) {
  let s$2 = s;
  let neg_exp = false;
  let rest;
  let ch;
  _L: {
    _L$2: {
      const _bind$2 = s$2;
      if ((_bind$2.end - _bind$2.start | 0) >= 1) {
        const _x = _bind$2.str.charCodeAt(_bind$2.start);
        switch (_x) {
          case 43: {
            const _x$2 = new _M0TPC16string10StringView(_bind$2.str, _bind$2.start + 1 | 0, _bind$2.end);
            rest = _x$2;
            ch = _x;
            break _L$2;
          }
          case 45: {
            const _x$3 = new _M0TPC16string10StringView(_bind$2.str, _bind$2.start + 1 | 0, _bind$2.end);
            rest = _x$3;
            ch = _x;
            break _L$2;
          }
        }
      }
      break _L;
    }
    neg_exp = ch === 45;
    s$2 = rest;
  }
  _L$2: {
    const _bind$2 = s$2;
    if ((_bind$2.end - _bind$2.start | 0) >= 1) {
      const _x = _bind$2.str.charCodeAt(_bind$2.start);
      if (_x >= 48 && _x <= 57) {
        const _bind$3 = _M0EPC16string10StringViewPC28internal7strconv12fold__digitsGmE(s$2, _M0FPC28internal7strconv17parse__scientificN8exp__numS354, (digit, exp_num) => BigInt.asIntN(64, exp_num) < BigInt.asIntN(64, 65536n) ? BigInt.asUintN(64, BigInt.asUintN(64, 10n * exp_num) + BigInt.asUintN(64, BigInt(digit))) : exp_num);
        const _s = _bind$3._0;
        const _exp_num = _bind$3._1;
        return neg_exp ? { _0: _s, _1: BigInt.asUintN(64, -_exp_num) } : { _0: _s, _1: _exp_num };
      } else {
        break _L$2;
      }
    } else {
      break _L$2;
    }
  }
  return undefined;
}
function _M0FPC28internal7strconv13parse__number(s) {
  let s$2;
  let negative;
  _L: {
    let rest;
    _L$2: {
      if ((s.end - s.start | 0) >= 1) {
        const _x = s.str.charCodeAt(s.start);
        switch (_x) {
          case 45: {
            const _x$2 = new _M0TPC16string10StringView(s.str, s.start + 1 | 0, s.end);
            s$2 = _x$2;
            negative = true;
            break _L;
          }
          case 43: {
            const _x$3 = new _M0TPC16string10StringView(s.str, s.start + 1 | 0, s.end);
            rest = _x$3;
            break _L$2;
          }
          default: {
            rest = s;
            break _L$2;
          }
        }
      } else {
        rest = s;
        break _L$2;
      }
    }
    s$2 = rest;
    negative = false;
    break _L;
  }
  if (_M0MPC16string10StringView9is__empty(s$2)) {
    return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(undefined);
  }
  const _bind$2 = _M0FPC28internal7strconv13parse__digits(s$2, 0n);
  const _s = _bind$2._0;
  const _mantissa = _bind$2._1;
  const _consumed = _bind$2._2;
  let mantissa = _mantissa;
  let s$3 = _s;
  let n_digits = _consumed;
  let n_after_dot = 0;
  let exponent = 0n;
  const _bind$3 = s$3;
  if ((_bind$3.end - _bind$3.start | 0) >= 1) {
    const _x = _bind$3.str.charCodeAt(_bind$3.start);
    if (_x === 46) {
      const _x$2 = new _M0TPC16string10StringView(_bind$3.str, _bind$3.start + 1 | 0, _bind$3.end);
      s$3 = _x$2;
      const _bind$4 = _M0FPC28internal7strconv13parse__digits(s$3, mantissa);
      const _new_s = _bind$4._0;
      const _new_mantissa = _bind$4._1;
      const _consumed_digit = _bind$4._2;
      s$3 = _new_s;
      mantissa = _new_mantissa;
      n_after_dot = _consumed_digit;
      exponent = BigInt.asUintN(64, -BigInt.asUintN(64, BigInt(n_after_dot)));
    }
  }
  n_digits = n_digits + n_after_dot | 0;
  if (n_digits === 0) {
    return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(undefined);
  }
  let exp_number = 0n;
  let rest;
  _L$2: {
    _L$3: {
      const _bind$4 = s$3;
      if ((_bind$4.end - _bind$4.start | 0) >= 1) {
        const _x = _bind$4.str.charCodeAt(_bind$4.start);
        switch (_x) {
          case 101: {
            const _x$2 = new _M0TPC16string10StringView(_bind$4.str, _bind$4.start + 1 | 0, _bind$4.end);
            rest = _x$2;
            break _L$3;
          }
          case 69: {
            const _x$3 = new _M0TPC16string10StringView(_bind$4.str, _bind$4.start + 1 | 0, _bind$4.end);
            rest = _x$3;
            break _L$3;
          }
        }
      }
      break _L$2;
    }
    const _bind$4 = _M0FPC28internal7strconv17parse__scientific(rest);
    let _bind$5;
    if (_bind$4 === undefined) {
      return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(undefined);
    } else {
      const _Some = _bind$4;
      _bind$5 = _Some;
    }
    const _new_s = _bind$5._0;
    const _exp_number_val = _bind$5._1;
    s$3 = _new_s;
    exp_number = _exp_number_val;
    exponent = BigInt.asUintN(64, exponent + exp_number);
  }
  const _bind$4 = s$3;
  if ((_bind$4.end - _bind$4.start | 0) === 0) {
    if (n_digits <= 19) {
      return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(new _M0TPC28internal7strconv6Number(exponent, mantissa, negative, false));
    }
    n_digits = n_digits - 19 | 0;
    let many_digits = false;
    let _tmp = s.str;
    let _tmp$2 = s.start;
    let _tmp$3 = s.end;
    _L$3: while (true) {
      const s_str = _tmp;
      const s_start = _tmp$2;
      const s_end = _tmp$3;
      _L$4: {
        let rest$2;
        let ch;
        _L$5: {
          if ((s_end - s_start | 0) >= 1) {
            const _x = s_str.charCodeAt(s_start);
            switch (_x) {
              case 48: {
                const _x$2 = new _M0TPC16string10StringView(s_str, s_start + 1 | 0, s_end);
                rest$2 = _x$2;
                ch = _x;
                break _L$5;
              }
              case 46: {
                const _x$3 = new _M0TPC16string10StringView(s_str, s_start + 1 | 0, s_end);
                rest$2 = _x$3;
                ch = _x;
                break _L$5;
              }
              default: {
                break _L$4;
              }
            }
          } else {
            break _L$4;
          }
        }
        const _tmp$4 = n_digits;
        if (2 === 0) {
          $panic();
        }
        n_digits = _tmp$4 - ((ch - 46 | 0) / 2 | 0) | 0;
        _tmp = rest$2.str;
        _tmp$2 = rest$2.start;
        _tmp$3 = rest$2.end;
        continue;
      }
      break;
    }
    let mantissa$2 = mantissa;
    if (n_digits > 0) {
      many_digits = true;
      mantissa$2 = 0n;
      const _bind$5 = _M0FPC28internal7strconv20try__parse__19digits(s, mantissa$2);
      const _s$2 = _bind$5._0;
      const _new_mantissa = _bind$5._1;
      const _consumed_digit = _bind$5._2;
      mantissa$2 = _new_mantissa;
      let _tmp$4;
      if (BigInt.asUintN(64, mantissa$2) >= BigInt.asUintN(64, _M0FPC28internal7strconv17min__19digit__int)) {
        _tmp$4 = _consumed_digit;
      } else {
        if (_M0MPC16string6String24char__length__ge_2einner(_s$2.str, 1, _s$2.start, _s$2.end)) {
          const _tmp$5 = _s$2.str;
          const _bind$6 = _M0MPC16string6String29offset__of__nth__char_2einner(_s$2.str, 1, _s$2.start, _s$2.end);
          let _tmp$6;
          if (_bind$6 === undefined) {
            _tmp$6 = _s$2.end;
          } else {
            const _Some = _bind$6;
            _tmp$6 = _Some;
          }
          const _x = new _M0TPC16string10StringView(_tmp$5, _tmp$6, _s$2.end);
          const _bind$7 = _M0FPC28internal7strconv20try__parse__19digits(_x, mantissa$2);
          const _new_mantissa$2 = _bind$7._1;
          const _consumed_digit$2 = _bind$7._2;
          mantissa$2 = _new_mantissa$2;
          _tmp$4 = _consumed_digit$2;
        } else {
          return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(undefined);
        }
      }
      exponent = BigInt.asUintN(64, BigInt(_tmp$4));
      exponent = BigInt.asUintN(64, exponent + exp_number);
    }
    return new _M0DTPC16result6ResultGORPC28internal7strconv6NumberRPC15error5ErrorE2Ok(new _M0TPC28internal7strconv6Number(exponent, mantissa$2, negative, many_digits));
  } else {
    return _M0FPC28internal7strconv11syntax__errGORPC28internal7strconv6NumberE();
  }
}
function _M0FPC28internal7strconv15parse__inf__nan(rest) {
  let pos;
  let rest$2;
  _L: {
    let rest$3;
    _L$2: {
      if ((rest.end - rest.start | 0) >= 1) {
        const _x = rest.str.charCodeAt(rest.start);
        switch (_x) {
          case 45: {
            const _x$2 = new _M0TPC16string10StringView(rest.str, rest.start + 1 | 0, rest.end);
            pos = false;
            rest$2 = _x$2;
            break _L;
          }
          case 43: {
            const _x$3 = new _M0TPC16string10StringView(rest.str, rest.start + 1 | 0, rest.end);
            rest$3 = _x$3;
            break _L$2;
          }
          default: {
            rest$3 = rest;
            break _L$2;
          }
        }
      } else {
        rest$3 = rest;
        break _L$2;
      }
    }
    pos = true;
    rest$2 = rest$3;
    break _L;
  }
  let _cursor_295 = 0;
  const _input_end_297 = rest$2.end - rest$2.start | 0;
  const _start_296 = _cursor_295;
  let _accept_state_298 = -1;
  let _match_end_299 = -1;
  let _state_300 = 2;
  while (true) {
    if (_state_300 !== 14) {
      if (_state_300 < 2) {
        _accept_state_298 = _state_300;
        _match_end_299 = _cursor_295;
      }
      const _tmp = Math.imul(_state_300, 8) | 0;
      let _next_char_303;
      if (_cursor_295 < _input_end_297) {
        const _char_302 = rest$2.str.charCodeAt(rest$2.start + _cursor_295 | 0);
        _cursor_295 = _cursor_295 + 1 | 0;
        _next_char_303 = _char_302;
      } else {
        _next_char_303 = -1;
      }
      _state_300 = _M0MPC15array13ReadOnlyArray11unsafe__getGiE(_M0FPC28internal7strconv15parse__inf__nanN25_2atransition__table__304S312, _tmp + (_next_char_303 < 90 ? (_next_char_303 < 73 ? (_next_char_303 < 66 ? (_next_char_303 < 0 ? 0 : _next_char_303 > 64 ? 1 : 7) : _next_char_303 > 69 ? (_next_char_303 < 71 ? 2 : 7) : 7) : _next_char_303 > 73 ? (_next_char_303 < 84 ? (_next_char_303 < 78 ? 7 : _next_char_303 > 78 ? 7 : 4) : _next_char_303 > 84 ? (_next_char_303 < 89 ? 7 : 6) : 5) : 3) : _next_char_303 > 96 ? (_next_char_303 < 110 ? (_next_char_303 < 103 ? (_next_char_303 < 98 ? 1 : _next_char_303 > 101 ? 2 : 7) : _next_char_303 > 104 ? (_next_char_303 < 106 ? 3 : 7) : 7) : _next_char_303 > 110 ? (_next_char_303 < 117 ? (_next_char_303 < 116 ? 7 : 5) : _next_char_303 > 120 ? (_next_char_303 < 122 ? 6 : 7) : 7) : 4) : 7) | 0);
      continue;
    } else {
      break;
    }
  }
  const _bind$2 = _accept_state_298;
  switch (_bind$2) {
    case 0: {
      _cursor_295 = _match_end_299;
      return new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(_M0FPC16double14not__a__number);
    }
    case 1: {
      _cursor_295 = _match_end_299;
      return pos ? new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(_M0FPC16double8infinity) : new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(_M0FPC16double13neg__infinity);
    }
    default: {
      _cursor_295 = _start_296;
      return _M0FPC28internal7strconv11syntax__errGdE();
    }
  }
}
function _M0FPC28internal7strconv12checked__mul(a, b) {
  if (BigInt.asUintN(64, a) === BigInt.asUintN(64, 0n) || BigInt.asUintN(64, b) === BigInt.asUintN(64, 0n)) {
    return _M0FPC28internal7strconv12checked__mulN6constrS1164;
  }
  if (BigInt.asUintN(64, a) === BigInt.asUintN(64, 1n)) {
    return b;
  }
  if (BigInt.asUintN(64, b) === BigInt.asUintN(64, 1n)) {
    return a;
  }
  if ($i64_clz(b) === 0 || $i64_clz(a) === 0) {
    return undefined;
  }
  if (b === 0n) {
    $panic();
  }
  const quotient = BigInt.asUintN(64, BigInt.asUintN(64, 18446744073709551615n) / BigInt.asUintN(64, b));
  if (BigInt.asUintN(64, a) > BigInt.asUintN(64, quotient)) {
    return undefined;
  }
  return BigInt.asUintN(64, a * b);
}
function _M0FPC28internal7strconv19overflow__threshold(base, neg) {
  if (!neg) {
    if (base === 10) {
      return 922337203685477581n;
    } else {
      if (base === 16) {
        return 576460752303423488n;
      } else {
        const _tmp = BigInt.asUintN(64, BigInt(base));
        if (_tmp === 0n) {
          $panic();
        }
        return BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asIntN(64, 9223372036854775807n) / BigInt.asIntN(64, _tmp)) + 1n);
      }
    }
  } else {
    if (base === 10) {
      return 17524406870024074036n;
    } else {
      if (base === 16) {
        return 17870283321406128128n;
      } else {
        const _tmp = BigInt.asUintN(64, BigInt(base));
        if (_tmp === 0n) {
          $panic();
        }
        return BigInt.asUintN(64, BigInt.asIntN(64, 9223372036854775808n) / BigInt.asIntN(64, _tmp));
      }
    }
  }
}
function _M0FPC28internal7strconv20parse__int64_2einner(str, base) {
  if (_M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(str, new _M0TPC16string10StringView(_M0FPC28internal7strconv20parse__int64_2einnerN7_2abindS682, 0, _M0FPC28internal7strconv20parse__int64_2einnerN7_2abindS682.length))) {
    let neg;
    let rest;
    _L: {
      let rest$2;
      _L$2: {
        const _bind$2 = _M0MPC16string10StringView12view_2einner(str, 0, undefined);
        if ((_bind$2.end - _bind$2.start | 0) >= 1) {
          const _x = _bind$2.str.charCodeAt(_bind$2.start);
          switch (_x) {
            case 43: {
              const _x$2 = new _M0TPC16string10StringView(_bind$2.str, _bind$2.start + 1 | 0, _bind$2.end);
              neg = false;
              rest = _x$2;
              break _L;
            }
            case 45: {
              const _x$3 = new _M0TPC16string10StringView(_bind$2.str, _bind$2.start + 1 | 0, _bind$2.end);
              neg = true;
              rest = _x$3;
              break _L;
            }
            default: {
              rest$2 = _bind$2;
              break _L$2;
            }
          }
        } else {
          rest$2 = _bind$2;
          break _L$2;
        }
      }
      neg = false;
      rest = rest$2;
      break _L;
    }
    const _bind$2 = _M0FPC28internal7strconv25check__and__consume__base(rest, base);
    let _bind$3;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _bind$3 = _ok._0;
    } else {
      return _bind$2;
    }
    const _num_base = _bind$3._0;
    const _rest = _bind$3._1;
    const _allow_underscore = _bind$3._2;
    const overflow_threshold = _M0FPC28internal7strconv19overflow__threshold(_num_base, neg);
    let has_digit;
    if ((_rest.end - _rest.start | 0) >= 1) {
      const _x = _rest.str.charCodeAt(_rest.start);
      if (_x >= 48 && _x <= 57) {
        has_digit = true;
      } else {
        if (_x >= 97 && _x <= 122) {
          has_digit = true;
        } else {
          if (_x >= 65 && _x <= 90) {
            has_digit = true;
          } else {
            if ((_rest.end - _rest.start | 0) >= 2) {
              if (_x === 95) {
                const _x$2 = _rest.str.charCodeAt(_rest.start + 1 | 0);
                has_digit = _x$2 >= 48 && _x$2 <= 57 ? true : _x$2 >= 97 && _x$2 <= 122 ? true : _x$2 >= 65 && _x$2 <= 90;
              } else {
                has_digit = false;
              }
            } else {
              has_digit = false;
            }
          }
        }
      }
    } else {
      has_digit = false;
    }
    if (has_digit) {
      let _tmp;
      let _tmp$2 = _rest;
      let _tmp$3 = 0n;
      let _tmp$4 = _allow_underscore;
      while (true) {
        const rest$2 = _tmp$2;
        const acc = _tmp$3;
        const allow_underscore = _tmp$4;
        let acc$2;
        let rest$3;
        let c;
        _L$2: {
          _L$3: {
            if ((rest$2.end - rest$2.start | 0) === 1) {
              const _x = rest$2.str.charCodeAt(rest$2.start);
              if (_x === 95) {
                const _bind$4 = _M0FPC28internal7strconv11syntax__errGuE();
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  _ok._0;
                } else {
                  return _bind$4;
                }
              } else {
                const _c = _M0MPC16string6String16unsafe__char__at(rest$2.str, _M0MPC16string6String29offset__of__nth__char_2einner(rest$2.str, 0, rest$2.start, rest$2.end));
                const _tmp$5 = rest$2.str;
                const _bind$4 = _M0MPC16string6String29offset__of__nth__char_2einner(rest$2.str, 1, rest$2.start, rest$2.end);
                let _tmp$6;
                if (_bind$4 === undefined) {
                  _tmp$6 = rest$2.end;
                } else {
                  const _Some = _bind$4;
                  _tmp$6 = _Some;
                }
                const _x$2 = new _M0TPC16string10StringView(_tmp$5, _tmp$6, rest$2.end);
                acc$2 = acc;
                rest$3 = _x$2;
                c = _c;
                break _L$3;
              }
            } else {
              if ((rest$2.end - rest$2.start | 0) >= 1) {
                const _x = rest$2.str.charCodeAt(rest$2.start);
                if (_x === 95) {
                  if (allow_underscore === false) {
                    const _bind$4 = _M0FPC28internal7strconv11syntax__errGuE();
                    if (_bind$4.$tag === 1) {
                      const _ok = _bind$4;
                      _ok._0;
                    } else {
                      return _bind$4;
                    }
                  } else {
                    const _x$2 = new _M0TPC16string10StringView(rest$2.str, rest$2.start + 1 | 0, rest$2.end);
                    _tmp$2 = _x$2;
                    _tmp$4 = false;
                    continue;
                  }
                } else {
                  const _c = _M0MPC16string6String16unsafe__char__at(rest$2.str, _M0MPC16string6String29offset__of__nth__char_2einner(rest$2.str, 0, rest$2.start, rest$2.end));
                  const _tmp$5 = rest$2.str;
                  const _bind$4 = _M0MPC16string6String29offset__of__nth__char_2einner(rest$2.str, 1, rest$2.start, rest$2.end);
                  let _tmp$6;
                  if (_bind$4 === undefined) {
                    _tmp$6 = rest$2.end;
                  } else {
                    const _Some = _bind$4;
                    _tmp$6 = _Some;
                  }
                  const _x$2 = new _M0TPC16string10StringView(_tmp$5, _tmp$6, rest$2.end);
                  acc$2 = acc;
                  rest$3 = _x$2;
                  c = _c;
                  break _L$3;
                }
              } else {
                _tmp = acc;
                break;
              }
            }
            break _L$2;
          }
          const c$2 = c;
          let d;
          if (c$2 >= 48 && c$2 <= 57) {
            d = c$2 - 48 | 0;
          } else {
            if (c$2 >= 97 && c$2 <= 122) {
              d = c$2 + -87 | 0;
            } else {
              if (c$2 >= 65 && c$2 <= 90) {
                d = c$2 + -55 | 0;
              } else {
                const _bind$4 = _M0FPC28internal7strconv11syntax__errGiE();
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  d = _ok._0;
                } else {
                  return _bind$4;
                }
              }
            }
          }
          if (d < _num_base) {
            if (neg) {
              if (BigInt.asIntN(64, acc$2) >= BigInt.asIntN(64, overflow_threshold)) {
                const next_acc = BigInt.asUintN(64, BigInt.asUintN(64, acc$2 * BigInt.asUintN(64, BigInt(_num_base))) - BigInt.asUintN(64, BigInt(d)));
                if (BigInt.asIntN(64, next_acc) <= BigInt.asIntN(64, acc$2)) {
                  _tmp$2 = rest$3;
                  _tmp$3 = next_acc;
                  _tmp$4 = true;
                  continue;
                } else {
                  const _bind$4 = _M0FPC28internal7strconv10range__errGuE();
                  if (_bind$4.$tag === 1) {
                    const _ok = _bind$4;
                    _ok._0;
                  } else {
                    return _bind$4;
                  }
                }
              } else {
                const _bind$4 = _M0FPC28internal7strconv10range__errGuE();
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  _ok._0;
                } else {
                  return _bind$4;
                }
              }
            } else {
              if (BigInt.asIntN(64, acc$2) < BigInt.asIntN(64, overflow_threshold)) {
                const next_acc = BigInt.asUintN(64, BigInt.asUintN(64, acc$2 * BigInt.asUintN(64, BigInt(_num_base))) + BigInt.asUintN(64, BigInt(d)));
                if (BigInt.asIntN(64, next_acc) >= BigInt.asIntN(64, acc$2)) {
                  _tmp$2 = rest$3;
                  _tmp$3 = next_acc;
                  _tmp$4 = true;
                  continue;
                } else {
                  const _bind$4 = _M0FPC28internal7strconv10range__errGuE();
                  if (_bind$4.$tag === 1) {
                    const _ok = _bind$4;
                    _ok._0;
                  } else {
                    return _bind$4;
                  }
                }
              } else {
                const _bind$4 = _M0FPC28internal7strconv10range__errGuE();
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  _ok._0;
                } else {
                  return _bind$4;
                }
              }
            }
          } else {
            const _bind$4 = _M0FPC28internal7strconv11syntax__errGuE();
            if (_bind$4.$tag === 1) {
              const _ok = _bind$4;
              _ok._0;
            } else {
              return _bind$4;
            }
          }
        }
        continue;
      }
      return new _M0DTPC16result6ResultGlRPC15error5ErrorE2Ok(_tmp);
    } else {
      return _M0FPC28internal7strconv11syntax__errGlE();
    }
  } else {
    return _M0FPC28internal7strconv11syntax__errGlE();
  }
}
function _M0FPC28internal7strconv17check__underscore(str) {
  if (_M0MPC16string10StringView20contains__code__unit(str, 95)) {
    let rest;
    if ((str.end - str.start | 0) >= 1) {
      const _x = str.str.charCodeAt(str.start);
      switch (_x) {
        case 43: {
          const _x$2 = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
          rest = _x$2;
          break;
        }
        case 45: {
          const _x$3 = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
          rest = _x$3;
          break;
        }
        default: {
          rest = str;
        }
      }
    } else {
      rest = str;
    }
    let rest$2;
    let allow_underscore;
    let hex;
    _L: {
      let _cursor_213 = 0;
      const _input_end_215 = rest.end - rest.start | 0;
      const _start_214 = _cursor_213;
      let _accept_state_216 = -1;
      let _match_end_217 = -1;
      let _state_218 = 3;
      while (true) {
        if (_state_218 !== 5) {
          if (_state_218 < 3) {
            _accept_state_216 = _state_218;
            _match_end_217 = _cursor_213;
          }
          const _tmp = Math.imul(_state_218, 5) | 0;
          let _next_char_221;
          if (_cursor_213 < _input_end_215) {
            const _char_220 = rest.str.charCodeAt(rest.start + _cursor_213 | 0);
            _cursor_213 = _cursor_213 + 1 | 0;
            _next_char_221 = _char_220;
          } else {
            _next_char_221 = -1;
          }
          _state_218 = _M0MPC15array13ReadOnlyArray11unsafe__getGiE(_M0FPC28internal7strconv17check__underscoreN25_2atransition__table__222S230, _tmp + (_next_char_221 < 88 ? (_next_char_221 < 66 ? (_next_char_221 < 48 ? 4 : _next_char_221 > 48 ? 4 : 0) : _next_char_221 > 66 ? (_next_char_221 < 79 ? 4 : _next_char_221 > 79 ? 4 : 2) : 1) : _next_char_221 > 88 ? (_next_char_221 < 111 ? (_next_char_221 < 98 ? 4 : _next_char_221 > 98 ? 4 : 1) : _next_char_221 > 111 ? (_next_char_221 < 120 ? 4 : _next_char_221 > 120 ? 4 : 3) : 2) : 3) | 0);
          continue;
        } else {
          break;
        }
      }
      const _bind$2 = _accept_state_216;
      switch (_bind$2) {
        case 0: {
          _cursor_213 = _match_end_217;
          const rest$3 = _M0MPC16string10StringView12view_2einner(rest, _match_end_217, _input_end_215);
          rest$2 = rest$3;
          allow_underscore = true;
          hex = false;
          break _L;
        }
        case 1: {
          _cursor_213 = _match_end_217;
          const rest$4 = _M0MPC16string10StringView12view_2einner(rest, _match_end_217, _input_end_215);
          rest$2 = rest$4;
          allow_underscore = true;
          hex = false;
          break _L;
        }
        case 2: {
          _cursor_213 = _match_end_217;
          const rest$5 = _M0MPC16string10StringView12view_2einner(rest, _match_end_217, _input_end_215);
          rest$2 = rest$5;
          allow_underscore = true;
          hex = true;
          break _L;
        }
        default: {
          _cursor_213 = _start_214;
          rest$2 = rest;
          allow_underscore = false;
          hex = false;
          break _L;
        }
      }
    }
    let _tmp = rest$2.str;
    let _tmp$2 = rest$2.start;
    let _tmp$3 = rest$2.end;
    let _tmp$4 = allow_underscore;
    let _tmp$5 = false;
    while (true) {
      const rest_str = _tmp;
      const rest_start = _tmp$2;
      const rest_end = _tmp$3;
      const allow_underscore$2 = _tmp$4;
      const follow_underscore = _tmp$5;
      let rest$3;
      _L$2: {
        _L$3: {
          let rest$4;
          _L$4: {
            _L$5: {
              let rest$5;
              _L$6: {
                let rest$6;
                _L$7: {
                  if ((rest_end - rest_start | 0) === 0) {
                    return true;
                  } else {
                    if ((rest_end - rest_start | 0) === 1) {
                      const _x = rest_str.charCodeAt(rest_start);
                      if (_x === 95) {
                        return false;
                      } else {
                        if (_x >= 48 && _x <= 57) {
                          const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                          rest$6 = _x$2;
                          break _L$7;
                        } else {
                          if (_x >= 97 && _x <= 102) {
                            const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                            if (hex) {
                              rest$5 = _x$2;
                              break _L$6;
                            } else {
                              if (_x === 101) {
                                if (follow_underscore === true) {
                                  break _L$5;
                                } else {
                                  rest$4 = _x$2;
                                  break _L$4;
                                }
                              } else {
                                if (follow_underscore === true) {
                                  break _L$3;
                                } else {
                                  rest$3 = _x$2;
                                  break _L$2;
                                }
                              }
                            }
                          } else {
                            if (_x >= 65 && _x <= 70) {
                              const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                              if (hex) {
                                rest$5 = _x$2;
                                break _L$6;
                              } else {
                                if (_x === 69) {
                                  if (follow_underscore === true) {
                                    break _L$5;
                                  } else {
                                    rest$4 = _x$2;
                                    break _L$4;
                                  }
                                } else {
                                  if (follow_underscore === true) {
                                    break _L$3;
                                  } else {
                                    rest$3 = _x$2;
                                    break _L$2;
                                  }
                                }
                              }
                            } else {
                              if (_x === 46) {
                                if (follow_underscore === true) {
                                  break _L$5;
                                } else {
                                  const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                                  rest$4 = _x$2;
                                  break _L$4;
                                }
                              } else {
                                if (_x === 43) {
                                  if (follow_underscore === true) {
                                    break _L$5;
                                  } else {
                                    const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                                    rest$4 = _x$2;
                                    break _L$4;
                                  }
                                } else {
                                  if (_x === 45) {
                                    if (follow_underscore === true) {
                                      break _L$5;
                                    } else {
                                      const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                                      rest$4 = _x$2;
                                      break _L$4;
                                    }
                                  } else {
                                    if (follow_underscore === true) {
                                      break _L$3;
                                    } else {
                                      const _bind$2 = _M0MPC16string6String29offset__of__nth__char_2einner(rest_str, 1, rest_start, rest_end);
                                      let _tmp$6;
                                      if (_bind$2 === undefined) {
                                        _tmp$6 = rest_end;
                                      } else {
                                        const _Some = _bind$2;
                                        _tmp$6 = _Some;
                                      }
                                      const _x$2 = new _M0TPC16string10StringView(rest_str, _tmp$6, rest_end);
                                      rest$3 = _x$2;
                                      break _L$2;
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    } else {
                      const _x = rest_str.charCodeAt(rest_start);
                      if (_x === 95) {
                        if (allow_underscore$2 === false) {
                          return false;
                        } else {
                          const _bind$2 = rest_start + 1 | 0;
                          _tmp$2 = _bind$2;
                          _tmp$4 = false;
                          _tmp$5 = true;
                          continue;
                        }
                      } else {
                        if (_x >= 48 && _x <= 57) {
                          const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                          rest$6 = _x$2;
                          break _L$7;
                        } else {
                          if (_x >= 97 && _x <= 102) {
                            const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                            if (hex) {
                              rest$5 = _x$2;
                              break _L$6;
                            } else {
                              if (_x === 101) {
                                if (follow_underscore === true) {
                                  break _L$5;
                                } else {
                                  rest$4 = _x$2;
                                  break _L$4;
                                }
                              } else {
                                if (follow_underscore === true) {
                                  break _L$3;
                                } else {
                                  rest$3 = _x$2;
                                  break _L$2;
                                }
                              }
                            }
                          } else {
                            if (_x >= 65 && _x <= 70) {
                              const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                              if (hex) {
                                rest$5 = _x$2;
                                break _L$6;
                              } else {
                                if (_x === 69) {
                                  if (follow_underscore === true) {
                                    break _L$5;
                                  } else {
                                    rest$4 = _x$2;
                                    break _L$4;
                                  }
                                } else {
                                  if (follow_underscore === true) {
                                    break _L$3;
                                  } else {
                                    rest$3 = _x$2;
                                    break _L$2;
                                  }
                                }
                              }
                            } else {
                              if (_x === 46) {
                                if (follow_underscore === true) {
                                  break _L$5;
                                } else {
                                  const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                                  rest$4 = _x$2;
                                  break _L$4;
                                }
                              } else {
                                if (_x === 43) {
                                  if (follow_underscore === true) {
                                    break _L$5;
                                  } else {
                                    const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                                    rest$4 = _x$2;
                                    break _L$4;
                                  }
                                } else {
                                  if (_x === 45) {
                                    if (follow_underscore === true) {
                                      break _L$5;
                                    } else {
                                      const _x$2 = new _M0TPC16string10StringView(rest_str, rest_start + 1 | 0, rest_end);
                                      rest$4 = _x$2;
                                      break _L$4;
                                    }
                                  } else {
                                    if (follow_underscore === true) {
                                      break _L$3;
                                    } else {
                                      const _bind$2 = _M0MPC16string6String29offset__of__nth__char_2einner(rest_str, 1, rest_start, rest_end);
                                      let _tmp$6;
                                      if (_bind$2 === undefined) {
                                        _tmp$6 = rest_end;
                                      } else {
                                        const _Some = _bind$2;
                                        _tmp$6 = _Some;
                                      }
                                      const _x$2 = new _M0TPC16string10StringView(rest_str, _tmp$6, rest_end);
                                      rest$3 = _x$2;
                                      break _L$2;
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                _tmp = rest$6.str;
                _tmp$2 = rest$6.start;
                _tmp$3 = rest$6.end;
                _tmp$4 = true;
                _tmp$5 = false;
                continue;
              }
              _tmp = rest$5.str;
              _tmp$2 = rest$5.start;
              _tmp$3 = rest$5.end;
              _tmp$4 = true;
              _tmp$5 = false;
              continue;
            }
            return false;
          }
          _tmp = rest$4.str;
          _tmp$2 = rest$4.start;
          _tmp$3 = rest$4.end;
          _tmp$4 = false;
          _tmp$5 = false;
          continue;
        }
        return false;
      }
      _tmp = rest$3.str;
      _tmp$2 = rest$3.start;
      _tmp$3 = rest$3.end;
      _tmp$4 = false;
      _tmp$5 = false;
      continue;
    }
  } else {
    return true;
  }
}
function _M0FPC28internal7strconv14eisel__umul128(a, b) {
  const a_lo = BigInt.asUintN(64, a & 4294967295n);
  const a_hi = BigInt.asUintN(64, BigInt.asUintN(64, a) >> BigInt(32 & 63));
  const b_lo = BigInt.asUintN(64, b & 4294967295n);
  const b_hi = BigInt.asUintN(64, BigInt.asUintN(64, b) >> BigInt(32 & 63));
  const x = BigInt.asUintN(64, a_lo * b_lo);
  const y = BigInt.asUintN(64, BigInt.asUintN(64, a_hi * b_lo) + BigInt.asUintN(64, BigInt.asUintN(64, x) >> BigInt(32 & 63)));
  const z = BigInt.asUintN(64, BigInt.asUintN(64, a_lo * b_hi) + BigInt.asUintN(64, y & 4294967295n));
  const hi = BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, a_hi * b_hi) + BigInt.asUintN(64, BigInt.asUintN(64, y) >> BigInt(32 & 63))) + BigInt.asUintN(64, BigInt.asUintN(64, z) >> BigInt(32 & 63)));
  return new _M0TPC28internal7strconv12EiselProduct(BigInt.asUintN(64, a * b), hi);
}
function _M0FPC28internal7strconv20eisel__mul__log2__10(exponent) {
  return (Math.imul(exponent, 108853) | 0) >> 15;
}
function _M0FPC28internal7strconv20try__eisel__lemire64(mantissa, exponent, negative) {
  if (BigInt.asUintN(64, mantissa) === BigInt.asUintN(64, 0n)) {
    return negative ? $i64_reinterpret_f64(9223372036854775808n) : 0;
  }
  if (BigInt.asIntN(64, exponent) < BigInt.asIntN(64, 18446744073709551268n) || BigInt.asIntN(64, exponent) > BigInt.asIntN(64, 347n)) {
    return _M0FPC16double14not__a__number;
  }
  const exponent$2 = Number(BigInt.asIntN(32, exponent)) | 0;
  const table_index = Math.imul(exponent$2 - -348 | 0, 2) | 0;
  const pow_hi = _M0MPC15array13ReadOnlyArray2atGmE(_M0FPC28internal7strconv27eisel__lemire__pow10__table, table_index);
  const pow_lo = _M0MPC15array13ReadOnlyArray2atGmE(_M0FPC28internal7strconv27eisel__lemire__pow10__table, table_index + 1 | 0);
  const pow_exp2 = 1 + _M0FPC28internal7strconv20eisel__mul__log2__10(exponent$2) | 0;
  const leading_zeros = $i64_clz(mantissa);
  const normalized = BigInt.asUintN(64, mantissa << BigInt(leading_zeros & 63));
  let result_exp2 = ((pow_exp2 + 63 | 0) + 1023 | 0) - leading_zeros | 0;
  const product = _M0FPC28internal7strconv14eisel__umul128(normalized, pow_hi);
  let product_hi = product.hi;
  let product_lo = product.lo;
  if (BigInt.asUintN(64, BigInt.asUintN(64, product_hi & 511n)) === BigInt.asUintN(64, 511n) && BigInt.asUintN(64, BigInt.asUintN(64, product_lo + normalized)) < BigInt.asUintN(64, normalized)) {
    const wider = _M0FPC28internal7strconv14eisel__umul128(normalized, pow_lo);
    let merged_hi = product_hi;
    const merged_lo = BigInt.asUintN(64, product_lo + wider.hi);
    if (BigInt.asUintN(64, merged_lo) < BigInt.asUintN(64, product_lo)) {
      merged_hi = BigInt.asUintN(64, merged_hi + 1n);
    }
    if (BigInt.asUintN(64, BigInt.asUintN(64, merged_hi & 511n)) === BigInt.asUintN(64, 511n) && (BigInt.asUintN(64, BigInt.asUintN(64, merged_lo + 1n)) === BigInt.asUintN(64, 0n) && BigInt.asUintN(64, BigInt.asUintN(64, wider.lo + normalized)) < BigInt.asUintN(64, normalized))) {
      return _M0FPC16double14not__a__number;
    }
    product_hi = merged_hi;
    product_lo = merged_lo;
  }
  const top_bit = Number(BigInt.asIntN(32, BigInt.asUintN(64, BigInt.asUintN(64, product_hi) >> BigInt(63 & 63)))) | 0;
  let result_mantissa = BigInt.asUintN(64, BigInt.asUintN(64, product_hi) >> BigInt((top_bit + 9 | 0) & 63));
  result_exp2 = result_exp2 - (1 - top_bit | 0) | 0;
  if (BigInt.asUintN(64, product_lo) === BigInt.asUintN(64, 0n) && (BigInt.asUintN(64, BigInt.asUintN(64, product_hi & 511n)) === BigInt.asUintN(64, 0n) && BigInt.asUintN(64, BigInt.asUintN(64, result_mantissa & 3n)) === BigInt.asUintN(64, 1n))) {
    return _M0FPC16double14not__a__number;
  }
  result_mantissa = BigInt.asUintN(64, result_mantissa + BigInt.asUintN(64, result_mantissa & 1n));
  result_mantissa = BigInt.asUintN(64, BigInt.asUintN(64, result_mantissa) >> BigInt(1 & 63));
  if (BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, result_mantissa) >> BigInt(53 & 63))) > BigInt.asUintN(64, 0n)) {
    result_mantissa = BigInt.asUintN(64, BigInt.asUintN(64, result_mantissa) >> BigInt(1 & 63));
    result_exp2 = result_exp2 + 1 | 0;
  }
  if (result_exp2 <= 0 || result_exp2 >= 2047) {
    return _M0FPC16double14not__a__number;
  }
  const exponent_bits = BigInt.asUintN(64, BigInt.asUintN(64, BigInt(result_exp2 >>> 0)) << BigInt(52 & 63));
  let result_bits = BigInt.asUintN(64, exponent_bits | BigInt.asUintN(64, result_mantissa & 4503599627370495n));
  if (negative) {
    result_bits = BigInt.asUintN(64, result_bits | 9223372036854775808n);
  }
  return $i64_reinterpret_f64(result_bits);
}
function _M0MPC28internal7strconv7Decimal9new__priv() {
  return new _M0TPC28internal7strconv7Decimal($makebytes(800, 0), 0, 0, false, false, 0);
}
function _M0MPC28internal7strconv7Decimal4trim(self) {
  while (true) {
    let _tmp;
    if (self.digits_num > 0) {
      const _tmp$2 = self.digits;
      const _tmp$3 = self.digits_num - 1 | 0;
      _tmp = _M0IPC14byte4BytePB2Eq5equal(_tmp$3 >>> 0 < _tmp$2.length ? _tmp$2[_tmp$3] : $oob(), 0);
    } else {
      _tmp = false;
    }
    if (_tmp) {
      self.digits_num = self.digits_num - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (self.digits_num === 0) {
    self.decimal_point = 0;
    return;
  } else {
    return;
  }
}
function _M0FPC28internal7strconv26parse__decimal__from__view(str) {
  const d = _M0MPC28internal7strconv7Decimal9new__priv();
  let has_dp = false;
  let has_digits = false;
  let rest;
  _L: {
    _L$2: {
      if ((str.end - str.start | 0) >= 1) {
        const _x = str.str.charCodeAt(str.start);
        switch (_x) {
          case 45: {
            const _x$2 = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
            d.negative = true;
            rest = _x$2;
            break;
          }
          case 43: {
            rest = new _M0TPC16string10StringView(str.str, str.start + 1 | 0, str.end);
            break;
          }
          default: {
            break _L$2;
          }
        }
      } else {
        break _L$2;
      }
      break _L;
    }
    rest = str;
  }
  let rest$2;
  let _tmp = rest;
  while (true) {
    const rest$3 = _tmp;
    let rest$4;
    _L$2: {
      _L$3: {
        if ((rest$3.end - rest$3.start | 0) >= 1) {
          const _x = rest$3.str.charCodeAt(rest$3.start);
          if (_x === 95) {
            const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
            _tmp = _x$2;
            continue;
          } else {
            if (_x === 46) {
              const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
              if (!has_dp) {
                has_dp = true;
                d.decimal_point = d.digits_num;
                _tmp = _x$2;
                continue;
              } else {
                const _bind$2 = _M0FPC28internal7strconv11syntax__errGuE();
                if (_bind$2.$tag === 1) {
                  const _ok = _bind$2;
                  _ok._0;
                } else {
                  return _bind$2;
                }
              }
            } else {
              if (_x >= 48 && _x <= 57) {
                const _x$2 = new _M0TPC16string10StringView(rest$3.str, rest$3.start + 1 | 0, rest$3.end);
                has_digits = true;
                if (_x === 48 && d.digits_num === 0) {
                  d.decimal_point = d.decimal_point - 1 | 0;
                  _tmp = _x$2;
                  continue;
                }
                if (d.digits_num < d.digits.length) {
                  const _tmp$2 = d.digits;
                  const _tmp$3 = d.digits_num;
                  if (_tmp$3 >>> 0 < _tmp$2.length) {
                    _tmp$2[_tmp$3] = (_x - 48 | 0) & 255;
                  } else {
                    $oob();
                  }
                  d.digits_num = d.digits_num + 1 | 0;
                } else {
                  if (!has_dp) {
                    d.overflowed = d.overflowed + 1 | 0;
                  }
                  if (_x !== 48) {
                    d.truncated = true;
                  }
                }
                _tmp = _x$2;
                continue;
              } else {
                rest$4 = rest$3;
                break _L$3;
              }
            }
          }
        } else {
          rest$4 = rest$3;
          break _L$3;
        }
        break _L$2;
      }
      rest$2 = rest$4;
      break;
    }
    continue;
  }
  if (has_digits) {
    if (!has_dp) {
      d.decimal_point = d.digits_num;
    }
    let rest$3;
    let rest$4;
    _L$2: {
      _L$3: {
        if ((rest$2.end - rest$2.start | 0) >= 1) {
          const _x = rest$2.str.charCodeAt(rest$2.start);
          switch (_x) {
            case 101: {
              const _x$2 = new _M0TPC16string10StringView(rest$2.str, rest$2.start + 1 | 0, rest$2.end);
              rest$4 = _x$2;
              break _L$3;
            }
            case 69: {
              const _x$3 = new _M0TPC16string10StringView(rest$2.str, rest$2.start + 1 | 0, rest$2.end);
              rest$4 = _x$3;
              break _L$3;
            }
            default: {
              rest$3 = rest$2;
            }
          }
        } else {
          rest$3 = rest$2;
        }
        break _L$2;
      }
      let exp_sign = 1;
      let rest$5;
      if ((rest$4.end - rest$4.start | 0) >= 1) {
        const _x = rest$4.str.charCodeAt(rest$4.start);
        switch (_x) {
          case 43: {
            rest$5 = new _M0TPC16string10StringView(rest$4.str, rest$4.start + 1 | 0, rest$4.end);
            break;
          }
          case 45: {
            const _x$2 = new _M0TPC16string10StringView(rest$4.str, rest$4.start + 1 | 0, rest$4.end);
            exp_sign = -1;
            rest$5 = _x$2;
            break;
          }
          default: {
            rest$5 = rest$4;
          }
        }
      } else {
        rest$5 = rest$4;
      }
      _L$4: {
        _L$5: {
          if ((rest$5.end - rest$5.start | 0) >= 1) {
            const _x = rest$5.str.charCodeAt(rest$5.start);
            if (_x >= 48 && _x <= 57) {
              const effective_dp = d.decimal_point + d.overflowed | 0;
              const exp_limit = exp_sign > 0 ? (effective_dp < 311 ? 311 - effective_dp | 0 : 0) : effective_dp > -331 ? effective_dp + 331 | 0 : 0;
              let exp = 0;
              let rest$6;
              let _tmp$2 = rest$5;
              while (true) {
                const rest$7 = _tmp$2;
                let rest$8;
                _L$6: {
                  if ((rest$7.end - rest$7.start | 0) >= 1) {
                    const _x$2 = rest$7.str.charCodeAt(rest$7.start);
                    if (_x$2 === 95) {
                      const _x$3 = new _M0TPC16string10StringView(rest$7.str, rest$7.start + 1 | 0, rest$7.end);
                      _tmp$2 = _x$3;
                      continue;
                    } else {
                      if (_x$2 >= 48 && _x$2 <= 57) {
                        const _x$3 = new _M0TPC16string10StringView(rest$7.str, rest$7.start + 1 | 0, rest$7.end);
                        if (exp < exp_limit) {
                          exp = (Math.imul(exp, 10) | 0) + (_x$2 - 48 | 0) | 0;
                          if (exp > exp_limit) {
                            exp = exp_limit;
                          }
                        }
                        _tmp$2 = _x$3;
                        continue;
                      } else {
                        rest$8 = rest$7;
                        break _L$6;
                      }
                    }
                  } else {
                    rest$8 = rest$7;
                    break _L$6;
                  }
                }
                rest$6 = rest$8;
                break;
              }
              d.decimal_point = d.decimal_point + (Math.imul(exp_sign, exp) | 0) | 0;
              rest$3 = rest$6;
            } else {
              break _L$5;
            }
          } else {
            break _L$5;
          }
          break _L$4;
        }
        const _bind$2 = _M0FPC28internal7strconv11syntax__errGlE();
        if (_bind$2.$tag === 1) {
          const _ok = _bind$2;
          rest$3 = _ok._0;
        } else {
          return _bind$2;
        }
      }
    }
    if ((rest$3.end - rest$3.start | 0) === 0) {
      _M0MPC28internal7strconv7Decimal4trim(d);
      return new _M0DTPC16result6ResultGRPC28internal7strconv7DecimalRPC15error5ErrorE2Ok(d);
    } else {
      return _M0FPC28internal7strconv11syntax__errGlE();
    }
  } else {
    return _M0FPC28internal7strconv11syntax__errGlE();
  }
}
function _M0FPC28internal7strconv20parse__decimal__priv(str) {
  return _M0FPC28internal7strconv26parse__decimal__from__view(str);
}
function _M0FPC28internal7strconv14assemble__bits(mantissa, exponent, negative) {
  const biased_exp = exponent - _M0FPC28internal7strconv12double__info.bias | 0;
  let bits = BigInt.asUintN(64, mantissa & BigInt.asUintN(64, BigInt.asUintN(64, 1n << BigInt(_M0FPC28internal7strconv12double__info.mantissa_bits & 63)) - 1n));
  const exp_bits = BigInt.asUintN(64, BigInt(biased_exp & ((1 << _M0FPC28internal7strconv12double__info.exponent_bits) - 1 | 0)));
  bits = BigInt.asUintN(64, bits | BigInt.asUintN(64, exp_bits << BigInt(_M0FPC28internal7strconv12double__info.mantissa_bits & 63)));
  if (negative) {
    bits = BigInt.asUintN(64, bits | BigInt.asUintN(64, BigInt.asUintN(64, 1n << BigInt(_M0FPC28internal7strconv12double__info.mantissa_bits & 63)) << BigInt(_M0FPC28internal7strconv12double__info.exponent_bits & 63)));
  }
  return bits;
}
function _M0MPC28internal7strconv7Decimal17should__round__up(self, d) {
  if (d < 0 || d >= self.digits_num) {
    return false;
  }
  let _tmp;
  const _tmp$2 = self.digits;
  if ((d >>> 0 < _tmp$2.length ? _tmp$2[d] : $oob()) === 5) {
    _tmp = (d + 1 | 0) === self.digits_num;
  } else {
    _tmp = false;
  }
  if (_tmp) {
    if (self.truncated) {
      return true;
    }
    let _tmp$3;
    if (d > 0) {
      const _tmp$4 = self.digits;
      const _tmp$5 = d - 1 | 0;
      if (2 === 0) {
        $panic();
      }
      _tmp$3 = ((_tmp$5 >>> 0 < _tmp$4.length ? _tmp$4[_tmp$5] : $oob()) % 2 | 0) !== 0;
    } else {
      _tmp$3 = false;
    }
    return _tmp$3;
  }
  const _tmp$3 = self.digits;
  return (d >>> 0 < _tmp$3.length ? _tmp$3[d] : $oob()) >= 5;
}
function _M0MPC28internal7strconv7Decimal16rounded__integer(self) {
  if (self.decimal_point > 20) {
    return 18446744073709551615n;
  }
  let _tmp = 0n;
  let _tmp$2 = 0;
  while (true) {
    const n = _tmp;
    const i = _tmp$2;
    if (i < self.decimal_point && i < self.digits_num) {
      const _tmp$3 = BigInt.asUintN(64, n * 10n);
      const _tmp$4 = self.digits;
      _tmp = BigInt.asUintN(64, _tmp$3 + _M0MPC14byte4Byte9to__int64(i >>> 0 < _tmp$4.length ? _tmp$4[i] : $oob()));
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      let n$2;
      let _tmp$3 = n;
      let _tmp$4 = i;
      while (true) {
        const n$3 = _tmp$3;
        const i$2 = _tmp$4;
        if (i$2 < self.decimal_point) {
          _tmp$3 = BigInt.asUintN(64, n$3 * 10n);
          _tmp$4 = i$2 + 1 | 0;
          continue;
        } else {
          n$2 = n$3;
          break;
        }
      }
      return _M0MPC28internal7strconv7Decimal17should__round__up(self, self.decimal_point) ? BigInt.asUintN(64, n$2 + 1n) : n$2;
    }
  }
}
function _M0MPC28internal7strconv7Decimal11new__digits(self, s) {
  const new_digits = _M0MPC15array13ReadOnlyArray2atGmE(_M0FPC28internal7strconv19left__shift__cheats, s)._0;
  const cheat_num = _M0MPC15array13ReadOnlyArray2atGmE(_M0FPC28internal7strconv19left__shift__cheats, s)._1;
  const _bind$2 = cheat_num.length;
  let less;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const code_unit = cheat_num.charCodeAt(i);
      if (i >= self.digits_num) {
        less = true;
        break;
      }
      const d = code_unit - 48 | 0;
      const _tmp$2 = self.digits;
      if ((i >>> 0 < _tmp$2.length ? _tmp$2[i] : $oob()) !== d) {
        const _tmp$3 = self.digits;
        less = (i >>> 0 < _tmp$3.length ? _tmp$3[i] : $oob()) < d;
        break;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      less = false;
      break;
    }
  }
  return less ? new_digits - 1 | 0 : new_digits;
}
function _M0MPC28internal7strconv7Decimal11left__shift(self, s) {
  const new_digits = _M0MPC28internal7strconv7Decimal11new__digits(self, s);
  let read_index = self.digits_num;
  let write_index = self.digits_num + new_digits | 0;
  let acc = 0n;
  read_index = read_index - 1 | 0;
  while (true) {
    if (read_index >= 0) {
      const _tmp = self.digits;
      const _tmp$2 = read_index;
      const d = _M0MPC14byte4Byte9to__int64(_tmp$2 >>> 0 < _tmp.length ? _tmp[_tmp$2] : $oob());
      acc = BigInt.asUintN(64, acc + BigInt.asUintN(64, d << BigInt(s & 63)));
      if (10n === 0n) {
        $panic();
      }
      const quo = BigInt.asUintN(64, BigInt.asIntN(64, acc) / BigInt.asIntN(64, 10n));
      const rem = Number(BigInt.asIntN(32, BigInt.asUintN(64, acc - BigInt.asUintN(64, quo * 10n)))) | 0;
      write_index = write_index - 1 | 0;
      if (write_index < self.digits.length) {
        const _tmp$3 = self.digits;
        const _tmp$4 = write_index;
        if (_tmp$4 >>> 0 < _tmp$3.length) {
          _tmp$3[_tmp$4] = rem & 255;
        } else {
          $oob();
        }
      } else {
        if (rem !== 0) {
          self.truncated = true;
        }
      }
      acc = quo;
      read_index = read_index - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (BigInt.asIntN(64, acc) > BigInt.asIntN(64, 0n)) {
      if (10n === 0n) {
        $panic();
      }
      const quo = BigInt.asUintN(64, BigInt.asIntN(64, acc) / BigInt.asIntN(64, 10n));
      const rem = Number(BigInt.asIntN(32, BigInt.asUintN(64, acc - BigInt.asUintN(64, 10n * quo)))) | 0;
      write_index = write_index - 1 | 0;
      if (write_index < self.digits.length) {
        const _tmp = self.digits;
        const _tmp$2 = write_index;
        if (_tmp$2 >>> 0 < _tmp.length) {
          _tmp[_tmp$2] = rem & 255;
        } else {
          $oob();
        }
      } else {
        if (rem !== 0) {
          self.truncated = true;
        }
      }
      acc = quo;
      continue;
    } else {
      break;
    }
  }
  self.digits_num = self.digits_num + new_digits | 0;
  if (self.digits_num > self.digits.length) {
    self.digits_num = self.digits.length;
  }
  self.decimal_point = self.decimal_point + new_digits | 0;
  _M0MPC28internal7strconv7Decimal4trim(self);
}
function _M0MPC28internal7strconv7Decimal12right__shift(self, s) {
  let read_index = 0;
  let write_index = 0;
  let acc = 0n;
  while (true) {
    if (BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, acc) >> BigInt(s & 63))) === BigInt.asUintN(64, 0n)) {
      if (read_index >= self.digits_num) {
        while (true) {
          if (BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, acc) >> BigInt(s & 63))) === BigInt.asUintN(64, 0n)) {
            acc = BigInt.asUintN(64, acc * 10n);
            read_index = read_index + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        break;
      }
      const _tmp = self.digits;
      const _tmp$2 = read_index;
      const d = _tmp$2 >>> 0 < _tmp.length ? _tmp[_tmp$2] : $oob();
      acc = BigInt.asUintN(64, BigInt.asUintN(64, acc * 10n) + _M0MPC14byte4Byte9to__int64(d));
      read_index = read_index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  self.decimal_point = self.decimal_point - (read_index - 1 | 0) | 0;
  const mask = BigInt.asUintN(64, BigInt.asUintN(64, 1n << BigInt(s & 63)) - 1n);
  while (true) {
    if (read_index < self.digits_num) {
      const out = BigInt.asUintN(64, BigInt.asUintN(64, acc) >> BigInt(s & 63));
      const _tmp = self.digits;
      const _tmp$2 = write_index;
      if (_tmp$2 >>> 0 < _tmp.length) {
        _tmp[_tmp$2] = _M0MPC16uint646UInt648to__byte(out);
      } else {
        $oob();
      }
      write_index = write_index + 1 | 0;
      acc = BigInt.asUintN(64, acc & mask);
      const _tmp$3 = self.digits;
      const _tmp$4 = read_index;
      const d = _tmp$4 >>> 0 < _tmp$3.length ? _tmp$3[_tmp$4] : $oob();
      acc = BigInt.asUintN(64, BigInt.asUintN(64, acc * 10n) + _M0MPC14byte4Byte9to__int64(d));
      read_index = read_index + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    if (BigInt.asUintN(64, acc) > BigInt.asUintN(64, 0n)) {
      const out = BigInt.asUintN(64, BigInt.asUintN(64, acc) >> BigInt(s & 63));
      if (write_index < self.digits.length) {
        const _tmp = self.digits;
        const _tmp$2 = write_index;
        if (_tmp$2 >>> 0 < _tmp.length) {
          _tmp[_tmp$2] = _M0MPC16uint646UInt648to__byte(out);
        } else {
          $oob();
        }
        write_index = write_index + 1 | 0;
      } else {
        if (BigInt.asUintN(64, out) > BigInt.asUintN(64, 0n)) {
          self.truncated = true;
        }
      }
      acc = BigInt.asUintN(64, acc & mask);
      acc = BigInt.asUintN(64, acc * 10n);
      continue;
    } else {
      break;
    }
  }
  self.digits_num = write_index;
  _M0MPC28internal7strconv7Decimal4trim(self);
}
function _M0MPC28internal7strconv7Decimal11shift__priv(self, s) {
  if (self.digits_num === 0) {
    return undefined;
  }
  let s$2 = s;
  if (s$2 > 0) {
    while (true) {
      if (s$2 > 59) {
        _M0MPC28internal7strconv7Decimal11left__shift(self, 59);
        s$2 = s$2 - 59 | 0;
        continue;
      } else {
        break;
      }
    }
    _M0MPC28internal7strconv7Decimal11left__shift(self, s$2);
  }
  if (s$2 < 0) {
    while (true) {
      if (s$2 < -59) {
        _M0MPC28internal7strconv7Decimal12right__shift(self, 59);
        s$2 = s$2 + 59 | 0;
        continue;
      } else {
        break;
      }
    }
    _M0MPC28internal7strconv7Decimal12right__shift(self, -s$2 | 0);
    return;
  } else {
    return;
  }
}
function _M0MPC28internal7strconv7Decimal16to__double__priv(self) {
  let exponent = 0;
  let mantissa = 0n;
  const effective_dp = self.decimal_point + self.overflowed | 0;
  if (self.digits_num === 0 || effective_dp < -330) {
    mantissa = 0n;
    exponent = _M0FPC28internal7strconv12double__info.bias;
    const bits = _M0FPC28internal7strconv14assemble__bits(mantissa, exponent, self.negative);
    return new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok($i64_reinterpret_f64(bits));
  }
  if (self.decimal_point > 310) {
    const _bind$2 = _M0FPC28internal7strconv10range__errGuE();
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _ok._0;
    } else {
      return _bind$2;
    }
  }
  self.decimal_point = self.decimal_point + self.overflowed | 0;
  while (true) {
    if (self.decimal_point > 0) {
      let n = 0;
      if (self.decimal_point >= _M0MPC15array13ReadOnlyArray6lengthGiE(_M0FPC28internal7strconv6powtab)) {
        n = 60;
      } else {
        n = _M0MPC15array13ReadOnlyArray2atGiE(_M0FPC28internal7strconv6powtab, self.decimal_point);
      }
      _M0MPC28internal7strconv7Decimal11shift__priv(self, -n | 0);
      exponent = exponent + n | 0;
      continue;
    } else {
      break;
    }
  }
  while (true) {
    let _tmp;
    if (self.decimal_point < 0) {
      _tmp = true;
    } else {
      let _tmp$2;
      if (self.decimal_point === 0) {
        const _tmp$3 = self.digits;
        _tmp$2 = (0 >>> 0 < _tmp$3.length ? _tmp$3[0] : $oob()) < 5;
      } else {
        _tmp$2 = false;
      }
      _tmp = _tmp$2;
    }
    if (_tmp) {
      let n = 0;
      if ((-self.decimal_point | 0) >= _M0MPC15array13ReadOnlyArray6lengthGiE(_M0FPC28internal7strconv6powtab)) {
        n = 60;
      } else {
        n = _M0MPC15array13ReadOnlyArray2atGiE(_M0FPC28internal7strconv6powtab, -self.decimal_point | 0);
      }
      _M0MPC28internal7strconv7Decimal11shift__priv(self, n);
      exponent = exponent - n | 0;
      continue;
    } else {
      break;
    }
  }
  exponent = exponent - 1 | 0;
  if (exponent < (_M0FPC28internal7strconv12double__info.bias + 1 | 0)) {
    const n = (_M0FPC28internal7strconv12double__info.bias + 1 | 0) - exponent | 0;
    _M0MPC28internal7strconv7Decimal11shift__priv(self, -n | 0);
    exponent = exponent + n | 0;
  }
  if ((exponent - _M0FPC28internal7strconv12double__info.bias | 0) >= ((1 << _M0FPC28internal7strconv12double__info.exponent_bits) - 1 | 0)) {
    const _bind$2 = _M0FPC28internal7strconv10range__errGuE();
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _ok._0;
    } else {
      return _bind$2;
    }
  }
  _M0MPC28internal7strconv7Decimal11shift__priv(self, _M0FPC28internal7strconv12double__info.mantissa_bits + 1 | 0);
  mantissa = _M0MPC28internal7strconv7Decimal16rounded__integer(self);
  if (BigInt.asUintN(64, mantissa) === BigInt.asUintN(64, BigInt.asUintN(64, 2n << BigInt(_M0FPC28internal7strconv12double__info.mantissa_bits & 63)))) {
    mantissa = BigInt.asUintN(64, BigInt.asIntN(64, mantissa) >> BigInt(1 & 63));
    exponent = exponent + 1 | 0;
    if ((exponent - _M0FPC28internal7strconv12double__info.bias | 0) >= ((1 << _M0FPC28internal7strconv12double__info.exponent_bits) - 1 | 0)) {
      const _bind$2 = _M0FPC28internal7strconv10range__errGuE();
      if (_bind$2.$tag === 1) {
        const _ok = _bind$2;
        _ok._0;
      } else {
        return _bind$2;
      }
    }
  }
  if (BigInt.asUintN(64, BigInt.asUintN(64, mantissa & BigInt.asUintN(64, 1n << BigInt(_M0FPC28internal7strconv12double__info.mantissa_bits & 63)))) === BigInt.asUintN(64, 0n)) {
    exponent = _M0FPC28internal7strconv12double__info.bias;
  }
  const bits = _M0FPC28internal7strconv14assemble__bits(mantissa, exponent, self.negative);
  return new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok($i64_reinterpret_f64(bits));
}
function _M0FPC28internal7strconv17pow10__fast__path(exponent) {
  return _M0MPC15array13ReadOnlyArray2atGdE(_M0FPC28internal7strconv5table, exponent & 31);
}
function _M0MPC28internal7strconv6Number14is__fast__path(self) {
  return BigInt.asIntN(64, _M0FPC28internal7strconv25min__exponent__fast__path) <= BigInt.asIntN(64, self.exponent) && (BigInt.asIntN(64, self.exponent) <= BigInt.asIntN(64, _M0FPC28internal7strconv36max__exponent__disguised__fast__path) && (BigInt.asUintN(64, self.mantissa) <= BigInt.asUintN(64, _M0FPC28internal7strconv25max__mantissa__fast__path) && !self.many_digits));
}
function _M0MPC28internal7strconv6Number15try__fast__path(self) {
  if (_M0MPC28internal7strconv6Number14is__fast__path(self)) {
    let value;
    if (BigInt.asIntN(64, self.exponent) <= BigInt.asIntN(64, _M0FPC28internal7strconv25max__exponent__fast__path)) {
      const value$2 = $f64_convert_i64_u(BigInt.asUintN(64, self.mantissa));
      value = BigInt.asIntN(64, self.exponent) < BigInt.asIntN(64, 0n) ? value$2 / _M0FPC28internal7strconv17pow10__fast__path(-(Number(BigInt.asIntN(32, self.exponent)) | 0) | 0) : value$2 * _M0FPC28internal7strconv17pow10__fast__path(Number(BigInt.asIntN(32, self.exponent)) | 0);
    } else {
      const shift = BigInt.asUintN(64, self.exponent - _M0FPC28internal7strconv25max__exponent__fast__path);
      const _bind$2 = _M0FPC28internal7strconv12checked__mul(self.mantissa, _M0MPC15array13ReadOnlyArray2atGmE(_M0FPC28internal7strconv10int__pow10, Number(BigInt.asIntN(32, shift)) | 0));
      if (_bind$2 === undefined) {
        return _M0DTPC16option6OptionGdE4None__;
      } else {
        const _Some = _bind$2;
        const _mantissa = _Some;
        if (BigInt.asUintN(64, _mantissa) > BigInt.asUintN(64, _M0FPC28internal7strconv25max__mantissa__fast__path)) {
          return _M0DTPC16option6OptionGdE4None__;
        }
        value = $f64_convert_i64_u(BigInt.asUintN(64, _mantissa)) * _M0FPC28internal7strconv17pow10__fast__path(Number(BigInt.asIntN(32, _M0FPC28internal7strconv25max__exponent__fast__path)) | 0);
      }
    }
    if (self.negative) {
      value = -value;
    }
    return new _M0DTPC16option6OptionGdE4Some(value);
  } else {
    return _M0DTPC16option6OptionGdE4None__;
  }
}
function _M0FPC28internal7strconv13parse__double(str) {
  if (!_M0MPC16string10StringView9is__empty(str)) {
    if (_M0FPC28internal7strconv17check__underscore(str)) {
      const _bind$2 = _M0FPC28internal7strconv13parse__number(str);
      let _bind$3;
      if (_bind$2.$tag === 1) {
        const _ok = _bind$2;
        _bind$3 = _ok._0;
      } else {
        return _bind$2;
      }
      if (_bind$3 === undefined) {
        return _M0FPC28internal7strconv15parse__inf__nan(str);
      } else {
        const _Some = _bind$3;
        const _num = _Some;
        const _bind$4 = _M0MPC28internal7strconv6Number15try__fast__path(_num);
        if (_bind$4.$tag === 1) {
          const _Some$2 = _bind$4;
          const _value = _Some$2._0;
          return new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(_value);
        } else {
          const fast = _num.many_digits ? _M0FPC16double14not__a__number : _M0FPC28internal7strconv20try__eisel__lemire64(_num.mantissa, _num.exponent, _num.negative);
          if (_M0MPC16double6Double7is__nan(fast)) {
            const _bind$5 = _M0FPC28internal7strconv20parse__decimal__priv(str);
            let _tmp;
            if (_bind$5.$tag === 1) {
              const _ok = _bind$5;
              _tmp = _ok._0;
            } else {
              return _bind$5;
            }
            return _M0MPC28internal7strconv7Decimal16to__double__priv(_tmp);
          } else {
            return new _M0DTPC16result6ResultGdRPC15error5ErrorE2Ok(fast);
          }
        }
      }
    } else {
      return _M0FPC28internal7strconv11syntax__errGdE();
    }
  } else {
    return _M0FPC28internal7strconv11syntax__errGdE();
  }
}
function _M0IPC14json10ParseErrorPC15debug5Debug8to__reprGRPC14json10ParseErrorE(_x_813) {
  switch (_x_813.$tag) {
    case 6: {
      const _InvalidChar = _x_813;
      const _$42$arg_814 = _InvalidChar._0;
      const _$42$arg_815 = _InvalidChar._1;
      return _M0MPC15debug4Repr4ctor("InvalidChar", [{ _0: undefined, _1: _M0IPC14json8PositionPC15debug5Debug8to__repr(_$42$arg_814) }, { _0: undefined, _1: _M0IPC14char4CharPC15debug5Debug8to__repr(_$42$arg_815) }]);
    }
    case 5: {
      return _M0MPC15debug4Repr4ctor("InvalidEof", []);
    }
    case 4: {
      const _InvalidNumber = _x_813;
      const _$42$arg_816 = _InvalidNumber._0;
      const _$42$arg_817 = _InvalidNumber._1;
      return _M0MPC15debug4Repr4ctor("InvalidNumber", [{ _0: undefined, _1: _M0IPC14json8PositionPC15debug5Debug8to__repr(_$42$arg_816) }, { _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_817) }]);
    }
    case 3: {
      const _InvalidIdentEscape = _x_813;
      const _$42$arg_818 = _InvalidIdentEscape._0;
      return _M0MPC15debug4Repr4ctor("InvalidIdentEscape", [{ _0: undefined, _1: _M0IPC14json8PositionPC15debug5Debug8to__repr(_$42$arg_818) }]);
    }
    default: {
      return _M0MPC15debug4Repr4ctor("DepthLimitExceeded", []);
    }
  }
}
function _M0IPC14json8JsonPathPC15debug5Debug8to__repr(_x_783) {
  switch (_x_783.$tag) {
    case 0: {
      return _M0MPC15debug4Repr4ctor("Root", []);
    }
    case 1: {
      const _Key = _x_783;
      const _$42$arg_784 = _Key._0;
      const _$42$arg_785 = _Key._1;
      return _M0MPC15debug4Repr4ctor("Key", [{ _0: undefined, _1: _M0IPC14json8JsonPathPC15debug5Debug8to__repr(_$42$arg_784) }, { _0: _M0IPC14json8JsonPathPC15debug5Debug8to__reprN6constrS1889, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_$42$arg_785) }]);
    }
    default: {
      const _Index = _x_783;
      const _$42$arg_786 = _Index._0;
      const _$42$arg_787 = _Index._1;
      return _M0MPC15debug4Repr4ctor("Index", [{ _0: undefined, _1: _M0IPC14json8JsonPathPC15debug5Debug8to__repr(_$42$arg_786) }, { _0: _M0IPC14json8JsonPathPC15debug5Debug8to__reprN6constrS1890, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_$42$arg_787) }]);
    }
  }
}
function _M0IPC14json8PositionPC15debug5Debug8to__repr(_x_774) {
  const _bind$2 = [{ _0: "line", _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_x_774.line) }, { _0: "column", _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_x_774.column) }];
  return _M0MPC15debug4Repr6record(_M0MPB3Map3MapGsRPC15debug4ReprE(new _M0TPB9ArrayViewGUsRPC15debug4ReprEE(_bind$2, 0, 2), undefined));
}
function _M0IPC14json15JsonDecodeErrorPB4Show6output(_x_748, _x_749) {
  const _JsonDecodeError = _x_748;
  const _$42$arg_750 = _JsonDecodeError._0;
  _x_749.method_table.method_0(_x_749.self, "JsonDecodeError(");
  const _$42$x0_751 = _$42$arg_750._0;
  const _$42$x1_752 = _$42$arg_750._1;
  _x_749.method_table.method_0(_x_749.self, "(");
  _M0MPB6Logger13write__objectGRPC14json8JsonPathE(_x_749, _$42$x0_751);
  _x_749.method_table.method_0(_x_749.self, ", ");
  _M0MPB6Logger13write__objectGsE(_x_749, _$42$x1_752);
  _x_749.method_table.method_0(_x_749.self, ")");
  _x_749.method_table.method_0(_x_749.self, ")");
}
function _M0IPC14json15JsonDecodeErrorPC15debug5Debug8to__reprGRPC14json15JsonDecodeErrorE(_x_740) {
  const _JsonDecodeError = _x_740;
  const _$42$arg_741 = _JsonDecodeError._0;
  return _M0MPC15debug4Repr4ctor("JsonDecodeError", [{ _0: undefined, _1: _M0IPC15tuple6Tuple2PC15debug5Debug8to__reprGRPC14json8JsonPathsE(_$42$arg_741) }]);
}
function _M0FPC14json20offset__to__position(input, offset) {
  const _bind$2 = _M0MPC16string10StringView11code__units(input);
  const _bind$3 = _bind$2.end - _bind$2.start | 0;
  if (offset < 0 || offset > _bind$3) {
    $panic();
  }
  const _bind$4 = new _M0TPB9ArrayViewGkE(_bind$2.buf, _bind$2.start, offset + _bind$2.start | 0);
  const _bind$5 = _bind$4.end - _bind$4.start | 0;
  let _tmp = 0;
  let _tmp$2 = 1;
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp;
    const line = _tmp$2;
    const column = _tmp$3;
    if (_ < _bind$5) {
      const code_unit = _bind$4.buf[_bind$4.start + _ | 0];
      if (_M0IPC16uint166UInt16PB2Eq5equal(code_unit, 10)) {
        _tmp = _ + 1 | 0;
        _tmp$2 = line + 1 | 0;
        _tmp$3 = 0;
        continue;
      } else {
        _tmp = _ + 1 | 0;
        _tmp$3 = column + 1 | 0;
        continue;
      }
    } else {
      return new _M0TPC14json8Position(line, column);
    }
  }
}
function _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, shift) {
  const offset = ctx.offset + shift | 0;
  return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE3Err(new _M0DTPC15error5Error52moonbitlang_2fcore_2fjson_2eParseError_2eInvalidChar(_M0FPC14json20offset__to__position(ctx.input, offset), _M0MPC16option6Option10unwrap__orGcE(_M0MPC16string10StringView9get__char(ctx.input, offset), 65533)));
}
function _M0MPC14json12ParseContext21invalid__char_2einnerGuE(ctx, shift) {
  const offset = ctx.offset + shift | 0;
  return new _M0DTPC16result6ResultGuRPC14json10ParseErrorE3Err(new _M0DTPC15error5Error52moonbitlang_2fcore_2fjson_2eParseError_2eInvalidChar(_M0FPC14json20offset__to__position(ctx.input, offset), _M0MPC16option6Option10unwrap__orGcE(_M0MPC16string10StringView9get__char(ctx.input, offset), 65533)));
}
function _M0MPC14json12ParseContext21invalid__char_2einnerGiE(ctx, shift) {
  const offset = ctx.offset + shift | 0;
  return new _M0DTPC16result6ResultGiRPC14json10ParseErrorE3Err(new _M0DTPC15error5Error52moonbitlang_2fcore_2fjson_2eParseError_2eInvalidChar(_M0FPC14json20offset__to__position(ctx.input, offset), _M0MPC16option6Option10unwrap__orGcE(_M0MPC16string10StringView9get__char(ctx.input, offset), 65533)));
}
function _M0IPC14json10ParseErrorPB4Show6output(self, logger) {
  switch (self.$tag) {
    case 6: {
      const _InvalidChar = self;
      const _x = _InvalidChar._0;
      const _line = _x.line;
      const _column = _x.column;
      const _c = _InvalidChar._1;
      logger.method_table.method_0(logger.self, "Invalid character ");
      logger.method_table.method_4(logger.self, { self: _M0MPC14char4Char14escape_2einner(_c, true), method_table: _M0FP052String_24as_24_40moonbitlang_2fcore_2fbuiltin_2eShow });
      logger.method_table.method_0(logger.self, " at line ");
      logger.method_table.method_4(logger.self, { self: _line, method_table: _M0FP049Int_24as_24_40moonbitlang_2fcore_2fbuiltin_2eShow });
      logger.method_table.method_0(logger.self, ", column ");
      logger.method_table.method_4(logger.self, { self: _column, method_table: _M0FP049Int_24as_24_40moonbitlang_2fcore_2fbuiltin_2eShow });
      return;
    }
    case 5: {
      logger.method_table.method_0(logger.self, "Unexpected end of file");
      return;
    }
    case 4: {
      const _InvalidNumber = self;
      const _x$2 = _InvalidNumber._0;
      const _line$2 = _x$2.line;
      const _column$2 = _x$2.column;
      const _s = _InvalidNumber._1;
      logger.method_table.method_0(logger.self, "Invalid number ");
      logger.method_table.method_4(logger.self, { self: _s, method_table: _M0FP052String_24as_24_40moonbitlang_2fcore_2fbuiltin_2eShow });
      logger.method_table.method_0(logger.self, " at line ");
      logger.method_table.method_4(logger.self, { self: _line$2, method_table: _M0FP049Int_24as_24_40moonbitlang_2fcore_2fbuiltin_2eShow });
      logger.method_table.method_0(logger.self, ", column ");
      logger.method_table.method_4(logger.self, { self: _column$2, method_table: _M0FP049Int_24as_24_40moonbitlang_2fcore_2fbuiltin_2eShow });
      return;
    }
    case 3: {
      const _InvalidIdentEscape = self;
      const _x$3 = _InvalidIdentEscape._0;
      const _line$3 = _x$3.line;
      const _column$3 = _x$3.column;
      logger.method_table.method_0(logger.self, "Invalid escape sequence in identifier at line ");
      logger.method_table.method_4(logger.self, { self: _line$3, method_table: _M0FP049Int_24as_24_40moonbitlang_2fcore_2fbuiltin_2eShow });
      logger.method_table.method_0(logger.self, ", column ");
      logger.method_table.method_4(logger.self, { self: _column$3, method_table: _M0FP049Int_24as_24_40moonbitlang_2fcore_2fbuiltin_2eShow });
      return;
    }
    default: {
      logger.method_table.method_0(logger.self, "Depth limit exceeded, please increase the max_nesting_depth parameter");
      return;
    }
  }
}
function _M0FPC14json13decode__errorGmE(path, msg) {
  return new _M0DTPC16result6ResultGmRPC14json15JsonDecodeErrorE3Err(new _M0DTPC15error5Error61moonbitlang_2fcore_2fjson_2eJsonDecodeError_2eJsonDecodeError({ _0: path, _1: msg }));
}
function _M0MPC14json12ParseContext21lex__skip__whitespace(ctx) {
  const end = ctx.end_offset;
  let _tmp;
  let _tmp$2 = ctx.offset;
  _L: while (true) {
    const offset = _tmp$2;
    if (offset >= end) {
      _tmp = offset;
      break;
    }
    _L$2: {
      const _bind$2 = ctx.input;
      const _bind$3 = _bind$2.str.charCodeAt(_bind$2.start + offset | 0);
      switch (_bind$3) {
        case 32: {
          break _L$2;
        }
        case 9: {
          break _L$2;
        }
        case 13: {
          break _L$2;
        }
        case 10: {
          break _L$2;
        }
        default: {
          _tmp = offset;
          break _L;
        }
      }
    }
    _tmp$2 = offset + 1 | 0;
    continue;
  }
  ctx.offset = _tmp;
}
function _M0MPC14json12ParseContext4make(input) {
  return new _M0TPC14json12ParseContext(0, input, input.end - input.start | 0);
}
function _M0MPC14json12ParseContext19expect__ascii__char(ctx, c) {
  if (ctx.offset < ctx.end_offset) {
    const _bind$2 = ctx.input;
    const c1 = _bind$2.str.charCodeAt(_bind$2.start + ctx.offset | 0);
    ctx.offset = ctx.offset + 1 | 0;
    return c !== c1 ? _M0MPC14json12ParseContext21invalid__char_2einnerGuE(ctx, -1) : new _M0DTPC16result6ResultGuRPC14json10ParseErrorE2Ok(undefined);
  } else {
    return new _M0DTPC16result6ResultGuRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  }
}
function _M0FPC14json12checked__mul(a, b) {
  if (BigInt.asUintN(64, a) === BigInt.asUintN(64, 0n) || BigInt.asUintN(64, b) === BigInt.asUintN(64, 0n)) {
    return _M0FPC14json12checked__mulN6constrS1891;
  }
  if (BigInt.asUintN(64, a) === BigInt.asUintN(64, 1n)) {
    return b;
  }
  if (BigInt.asUintN(64, b) === BigInt.asUintN(64, 1n)) {
    return a;
  }
  if ($i64_clz(b) === 0 || $i64_clz(a) === 0) {
    return undefined;
  }
  if (b === 0n) {
    $panic();
  }
  const quotient = BigInt.asUintN(64, BigInt.asUintN(64, 18446744073709551615n) / BigInt.asUintN(64, b));
  return BigInt.asUintN(64, a) > BigInt.asUintN(64, quotient) ? undefined : BigInt.asUintN(64, a * b);
}
function _M0FPC14json23json__pow10__fast__path(exponent) {
  return _M0MPC15array13ReadOnlyArray2atGdE(_M0FPC14json12pow10__table, exponent & 31);
}
function _M0MPC14json14JsonNumberScan17try__fast__double(self) {
  if (BigInt.asUintN(64, self.mantissa) === BigInt.asUintN(64, 0n)) {
    return self.negative ? -0 : 0;
  }
  if (self.many_digits || (BigInt.asIntN(64, self.exponent) < BigInt.asIntN(64, 18446744073709551594n) || (BigInt.asIntN(64, self.exponent) > BigInt.asIntN(64, 37n) || BigInt.asUintN(64, self.mantissa) > BigInt.asUintN(64, 9007199254740992n)))) {
    return _M0FPC16double14not__a__number;
  }
  let value;
  if (BigInt.asIntN(64, self.exponent) <= BigInt.asIntN(64, 22n)) {
    const value$2 = $f64_convert_i64_u(BigInt.asUintN(64, self.mantissa));
    value = BigInt.asIntN(64, self.exponent) < BigInt.asIntN(64, 0n) ? value$2 / _M0FPC14json23json__pow10__fast__path(-(Number(BigInt.asIntN(32, self.exponent)) | 0) | 0) : value$2 * _M0FPC14json23json__pow10__fast__path(Number(BigInt.asIntN(32, self.exponent)) | 0);
  } else {
    const shift = BigInt.asUintN(64, self.exponent - 22n);
    const _bind$2 = _M0FPC14json12checked__mul(self.mantissa, _M0MPC15array13ReadOnlyArray2atGmE(_M0FPC14json17int__pow10__table, Number(BigInt.asIntN(32, shift)) | 0));
    if (_bind$2 === undefined) {
      return _M0FPC16double14not__a__number;
    } else {
      const _Some = _bind$2;
      const _mantissa = _Some;
      if (BigInt.asUintN(64, _mantissa) > BigInt.asUintN(64, 9007199254740992n)) {
        return _M0FPC16double14not__a__number;
      }
      value = $f64_convert_i64_u(BigInt.asUintN(64, _mantissa)) * _M0FPC14json23json__pow10__fast__path(22);
    }
  }
  return self.negative ? -value : value;
}
function _M0MPC14json12ParseContext17lex__integer__end(ctx, start, end) {
  const _bind$2 = ctx.input;
  const negative = _M0IPC16uint166UInt16PB2Eq5equal(_bind$2.str.charCodeAt(_bind$2.start + start | 0), 45);
  const number_start = negative ? start + 1 | 0 : start;
  let _tmp = number_start;
  let _tmp$2 = 0n;
  while (true) {
    const i = _tmp;
    const acc = _tmp$2;
    if (i >= end) {
      const value = negative ? BigInt.asUintN(64, -acc) : acc;
      const _bind$3 = $f64_convert_i64(BigInt.asIntN(64, value));
      const _bind$4 = undefined;
      return new _M0TPC14json11LexedNumber(_bind$4, _bind$3);
    }
    const _bind$3 = ctx.input;
    const digit = BigInt.asUintN(64, BigInt(_bind$3.str.charCodeAt(_bind$3.start + i | 0) - 48 | 0));
    if (10n === 0n) {
      $panic();
    }
    if (BigInt.asIntN(64, acc) > BigInt.asIntN(64, BigInt.asUintN(64, BigInt.asIntN(64, BigInt.asUintN(64, 9007199254740991n - digit)) / BigInt.asIntN(64, 10n)))) {
      const s = _M0MPC16string10StringView12view_2einner(ctx.input, start, end);
      let _try_err;
      _L: {
        const _bind$4 = _M0FPC28internal7strconv13parse__double(s);
        let value;
        if (_bind$4.$tag === 1) {
          const _ok = _bind$4;
          value = _ok._0;
        } else {
          const _err = _bind$4;
          _try_err = _err._0;
          break _L;
        }
        const _bind$5 = s;
        return new _M0TPC14json11LexedNumber(_bind$5, value);
      }
      let _tmp$3;
      if (negative) {
        const _bind$4 = s;
        _tmp$3 = new _M0TPC14json11LexedNumber(_bind$4, _M0FPC16double13neg__infinity);
      } else {
        const _bind$4 = s;
        _tmp$3 = new _M0TPC14json11LexedNumber(_bind$4, _M0FPC16double8infinity);
      }
      return _tmp$3;
    }
    _tmp = i + 1 | 0;
    _tmp$2 = BigInt.asUintN(64, BigInt.asUintN(64, acc * 10n) + digit);
    continue;
  }
}
function _M0MPC14json12ParseContext18scan__json__number(ctx, start, end) {
  const _bind$2 = ctx.input;
  const negative = _M0IPC16uint166UInt16PB2Eq5equal(_bind$2.str.charCodeAt(_bind$2.start + start | 0), 45);
  let has_decimal = false;
  let has_exponent = false;
  let exponent_negative = false;
  let exponent_part = 0n;
  let fractional_digits = 0;
  let mantissa = 0n;
  let significant_digits = 0;
  let seen_nonzero = false;
  const _bind$3 = negative ? start + 1 | 0 : start;
  let _tmp = _bind$3;
  while (true) {
    const i = _tmp;
    if (i < end) {
      _L: {
        _L$2: {
          const _bind$4 = ctx.input;
          const _bind$5 = _bind$4.str.charCodeAt(_bind$4.start + i | 0);
          if (_bind$5 >= 48 && _bind$5 <= 57) {
            const digit = _bind$5 - 48 | 0;
            if (has_exponent) {
              if (BigInt.asIntN(64, exponent_part) < BigInt.asIntN(64, 100000n)) {
                const next_exponent = BigInt.asUintN(64, BigInt.asUintN(64, exponent_part * 10n) + BigInt.asUintN(64, BigInt(digit)));
                exponent_part = BigInt.asIntN(64, next_exponent) > BigInt.asIntN(64, 100000n) ? 100000n : next_exponent;
              }
            } else {
              if (has_decimal) {
                fractional_digits = fractional_digits + 1 | 0;
              }
              if (digit !== 0 || seen_nonzero) {
                seen_nonzero = true;
                significant_digits = significant_digits + 1 | 0;
                if (significant_digits <= 19) {
                  mantissa = BigInt.asUintN(64, BigInt.asUintN(64, mantissa * 10n) + BigInt.asUintN(64, BigInt(digit >>> 0)));
                }
              }
            }
          } else {
            if (_bind$5 === 46) {
              has_decimal = true;
            } else {
              if (_bind$5 === 101) {
                break _L$2;
              } else {
                if (_bind$5 === 69) {
                  break _L$2;
                }
              }
            }
          }
          break _L;
        }
        has_exponent = true;
        if ((i + 1 | 0) < end) {
          const _bind$4 = ctx.input;
          const next = _bind$4.str.charCodeAt(_bind$4.start + (i + 1 | 0) | 0);
          if (_M0IPC16uint166UInt16PB2Eq5equal(next, 45)) {
            exponent_negative = true;
          }
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const exponent_part$2 = exponent_negative ? BigInt.asUintN(64, -exponent_part) : exponent_part;
  return new _M0TPC14json14JsonNumberScan(negative, !has_decimal && !has_exponent, mantissa, BigInt.asUintN(64, exponent_part$2 - BigInt.asUintN(64, BigInt(fractional_digits))), significant_digits > 19);
}
function _M0MPC14json12ParseContext16lex__number__end(ctx, start, end) {
  const scan = _M0MPC14json12ParseContext18scan__json__number(ctx, start, end);
  if (scan.is_integer) {
    if (!scan.many_digits && (BigInt.asUintN(64, scan.exponent) === BigInt.asUintN(64, 0n) && BigInt.asUintN(64, scan.mantissa) <= BigInt.asUintN(64, 9007199254740991n))) {
      const v = $f64_convert_i64(BigInt.asIntN(64, scan.mantissa));
      const value = scan.negative ? -v : v;
      const _bind$2 = undefined;
      return new _M0TPC14json11LexedNumber(_bind$2, value);
    }
    return _M0MPC14json12ParseContext17lex__integer__end(ctx, start, end);
  }
  const fast = _M0MPC14json14JsonNumberScan17try__fast__double(scan);
  if (!_M0MPC16double6Double7is__nan(fast)) {
    const _bind$2 = undefined;
    return new _M0TPC14json11LexedNumber(_bind$2, fast);
  }
  if (!scan.many_digits) {
    const fast$2 = _M0FPC28internal7strconv20try__eisel__lemire64(scan.mantissa, scan.exponent, scan.negative);
    if (!_M0MPC16double6Double7is__nan(fast$2)) {
      const _bind$2 = undefined;
      return new _M0TPC14json11LexedNumber(_bind$2, fast$2);
    }
  }
  const s = _M0MPC16string10StringView12view_2einner(ctx.input, start, end);
  let _try_err;
  _L: {
    const _bind$2 = _M0FPC28internal7strconv13parse__double(s);
    let d;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      d = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    const _bind$3 = undefined;
    return new _M0TPC14json11LexedNumber(_bind$3, d);
  }
  if (scan.negative) {
    const _bind$2 = s;
    return new _M0TPC14json11LexedNumber(_bind$2, _M0FPC16double13neg__infinity);
  } else {
    const _bind$2 = s;
    return new _M0TPC14json11LexedNumber(_bind$2, _M0FPC16double8infinity);
  }
}
function _M0MPC14json12ParseContext10read__char(ctx) {
  if (ctx.offset < ctx.end_offset) {
    const _bind$2 = ctx.input;
    const c1 = _bind$2.str.charCodeAt(_bind$2.start + ctx.offset | 0);
    ctx.offset = ctx.offset + 1 | 0;
    if (c1 >= 55296 && c1 <= 56319) {
      if (ctx.offset < ctx.end_offset) {
        const _bind$3 = ctx.input;
        const c2 = _bind$3.str.charCodeAt(_bind$3.start + ctx.offset | 0);
        if (c2 >= 56320 && c2 <= 57343) {
          ctx.offset = ctx.offset + 1 | 0;
          const c3 = ((c1 << 10) + c2 | 0) - 56613888 | 0;
          return c3;
        }
      }
    }
    return c1;
  } else {
    return -1;
  }
}
function _M0MPC14json12ParseContext31lex__decimal__exponent__integer(ctx, start) {
  while (true) {
    const _bind$2 = _M0MPC14json12ParseContext10read__char(ctx);
    if (_bind$2 === -1) {
      return _M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset);
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      if (_x >= 48 && _x <= 57) {
        continue;
      } else {
        ctx.offset = ctx.offset - 1 | 0;
        return _M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset);
      }
    }
  }
}
function _M0MPC14json12ParseContext28lex__decimal__exponent__sign(ctx, start) {
  const _bind$2 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$2 === -1) {
    return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$2;
    const _x = _Some;
    if (_x >= 48 && _x <= 57) {
      return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext31lex__decimal__exponent__integer(ctx, start));
    } else {
      ctx.offset = ctx.offset - 1 | 0;
      return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, 0);
    }
  }
}
function _M0MPC14json12ParseContext22lex__decimal__exponent(ctx, start) {
  _L: {
    const _bind$2 = _M0MPC14json12ParseContext10read__char(ctx);
    if (_bind$2 === -1) {
      return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      if (_x === 43) {
        break _L;
      } else {
        if (_x === 45) {
          break _L;
        } else {
          if (_x >= 48 && _x <= 57) {
            return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext31lex__decimal__exponent__integer(ctx, start));
          } else {
            ctx.offset = ctx.offset - 1 | 0;
            return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, 0);
          }
        }
      }
    }
  }
  const _bind$2 = _M0MPC14json12ParseContext28lex__decimal__exponent__sign(ctx, start);
  let _tmp;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _tmp = _ok._0;
  } else {
    return _bind$2;
  }
  return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_tmp);
}
function _M0MPC14json12ParseContext22lex__decimal__fraction(ctx, start) {
  while (true) {
    _L: {
      const _bind$2 = _M0MPC14json12ParseContext10read__char(ctx);
      if (_bind$2 === -1) {
        return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset));
      } else {
        const _Some = _bind$2;
        const _x = _Some;
        if (_x === 101) {
          break _L;
        } else {
          if (_x === 69) {
            break _L;
          } else {
            if (_x >= 48 && _x <= 57) {
              continue;
            } else {
              ctx.offset = ctx.offset - 1 | 0;
              return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset));
            }
          }
        }
      }
    }
    const _bind$2 = _M0MPC14json12ParseContext22lex__decimal__exponent(ctx, start);
    let _tmp;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _tmp = _ok._0;
    } else {
      return _bind$2;
    }
    return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_tmp);
  }
}
function _M0MPC14json12ParseContext19lex__decimal__point(ctx, start) {
  const _bind$2 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$2 === -1) {
    return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$2;
    const _x = _Some;
    return _x >= 48 && _x <= 57 ? _M0MPC14json12ParseContext22lex__decimal__fraction(ctx, start) : _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, -1);
  }
}
function _M0MPC14json12ParseContext21lex__decimal__integer(ctx, start) {
  while (true) {
    _L: {
      const _bind$2 = _M0MPC14json12ParseContext10read__char(ctx);
      if (_bind$2 === -1) {
        return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset));
      } else {
        const _Some = _bind$2;
        const _x = _Some;
        if (_x === 46) {
          const _bind$3 = _M0MPC14json12ParseContext19lex__decimal__point(ctx, start);
          let _tmp;
          if (_bind$3.$tag === 1) {
            const _ok = _bind$3;
            _tmp = _ok._0;
          } else {
            return _bind$3;
          }
          return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_tmp);
        } else {
          if (_x === 101) {
            break _L;
          } else {
            if (_x === 69) {
              break _L;
            } else {
              if (_x >= 48 && _x <= 57) {
                continue;
              } else {
                ctx.offset = ctx.offset - 1 | 0;
                return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset));
              }
            }
          }
        }
      }
    }
    const _bind$2 = _M0MPC14json12ParseContext22lex__decimal__exponent(ctx, start);
    let _tmp;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _tmp = _ok._0;
    } else {
      return _bind$2;
    }
    return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_tmp);
  }
}
function _M0MPC14json12ParseContext16lex__hex__digits(ctx, n) {
  let _tmp;
  let _tmp$2 = 0;
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp$2;
    const r = _tmp$3;
    if (_ < n) {
      const _bind$2 = _M0MPC14json12ParseContext10read__char(ctx);
      let d;
      if (_bind$2 === -1) {
        return new _M0DTPC16result6ResultGiRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
      } else {
        const _Some = _bind$2;
        const _x = _Some;
        if (_x >= 48 && _x <= 57) {
          d = _x - 48 | 0;
        } else {
          if (_x >= 65 && _x <= 70) {
            d = (_x - 65 | 0) + 10 | 0;
          } else {
            if (_x >= 97 && _x <= 102) {
              d = (_x - 97 | 0) + 10 | 0;
            } else {
              const _bind$3 = _M0MPC14json12ParseContext21invalid__char_2einnerGiE(ctx, -_M0MPC14char4Char10utf16__len(_x) | 0);
              if (_bind$3.$tag === 1) {
                const _ok = _bind$3;
                d = _ok._0;
              } else {
                return _bind$3;
              }
            }
          }
        }
      }
      _tmp$2 = _ + 1 | 0;
      _tmp$3 = r << 4 | d;
      continue;
    } else {
      _tmp = r;
      break;
    }
  }
  return new _M0DTPC16result6ResultGiRPC14json10ParseErrorE2Ok(_tmp);
}
function _M0MPC14json12ParseContext19unpaired__surrogateGuE(ctx, escape_start) {
  return _M0MPC14json12ParseContext21invalid__char_2einnerGuE(ctx, escape_start - ctx.offset | 0);
}
function _M0MPC14json12ParseContext17lex__string__slowN5flushS353(_env, end) {
  const ctx = _env._2;
  const start = _env._1;
  const buf = _env._0;
  if (start.val > 0 && end > start.val) {
    _M0IPB13StringBuilderPB6Logger11write__view(buf, _M0MPC16string10StringView11sub_2einner(ctx.input, start.val, end));
    return;
  } else {
    return;
  }
}
function _M0MPC14json12ParseContext17lex__string__slow(ctx) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const start = new _M0TPB8MutLocalGiE(ctx.offset);
  const _env = { _0: buf, _1: start, _2: ctx };
  _L: while (true) {
    const _bind$2 = _M0MPC14json12ParseContext10read__char(ctx);
    if (_bind$2 === -1) {
      return new _M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      switch (_x) {
        case 34: {
          _M0MPC14json12ParseContext17lex__string__slowN5flushS353(_env, ctx.offset - 1 | 0);
          break _L;
        }
        case 92: {
          _M0MPC14json12ParseContext17lex__string__slowN5flushS353(_env, ctx.offset - 1 | 0);
          const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
          if (_bind$3 === -1) {
            return new _M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
          } else {
            const _Some$2 = _bind$3;
            const _x$2 = _Some$2;
            switch (_x$2) {
              case 98: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 8);
                break;
              }
              case 102: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 12);
                break;
              }
              case 110: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 10);
                break;
              }
              case 114: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 13);
                break;
              }
              case 116: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 9);
                break;
              }
              case 34: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
                break;
              }
              case 92: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 92);
                break;
              }
              case 47: {
                _M0IPB13StringBuilderPB6Logger11write__char(buf, 47);
                break;
              }
              case 117: {
                const escape_start = ctx.offset - 2 | 0;
                const _bind$4 = _M0MPC14json12ParseContext16lex__hex__digits(ctx, 4);
                let c;
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  c = _ok._0;
                } else {
                  return _bind$4;
                }
                if (c >= 55296 && c <= 56319) {
                  const _bind$5 = _M0MPC14json12ParseContext10read__char(ctx);
                  if (_bind$5 === -1) {
                    return new _M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
                  } else {
                    const _Some$3 = _bind$5;
                    const _x$3 = _Some$3;
                    if (_x$3 === 92) {
                    } else {
                      const _bind$6 = _M0MPC14json12ParseContext19unpaired__surrogateGuE(ctx, escape_start);
                      if (_bind$6.$tag === 1) {
                        const _ok = _bind$6;
                        _ok._0;
                      } else {
                        return _bind$6;
                      }
                    }
                  }
                  const _bind$6 = _M0MPC14json12ParseContext10read__char(ctx);
                  if (_bind$6 === -1) {
                    return new _M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
                  } else {
                    const _Some$3 = _bind$6;
                    const _x$3 = _Some$3;
                    if (_x$3 === 117) {
                    } else {
                      const _bind$7 = _M0MPC14json12ParseContext19unpaired__surrogateGuE(ctx, escape_start);
                      if (_bind$7.$tag === 1) {
                        const _ok = _bind$7;
                        _ok._0;
                      } else {
                        return _bind$7;
                      }
                    }
                  }
                  const _bind$7 = _M0MPC14json12ParseContext16lex__hex__digits(ctx, 4);
                  let c2;
                  if (_bind$7.$tag === 1) {
                    const _ok = _bind$7;
                    c2 = _ok._0;
                  } else {
                    return _bind$7;
                  }
                  if (c2 >= 56320 && c2 <= 57343) {
                    const combined = ((c << 10) + c2 | 0) - 56613888 | 0;
                    _M0IPB13StringBuilderPB6Logger11write__char(buf, combined);
                  } else {
                    const _bind$8 = _M0MPC14json12ParseContext19unpaired__surrogateGuE(ctx, escape_start);
                    if (_bind$8.$tag === 1) {
                      const _ok = _bind$8;
                      _ok._0;
                    } else {
                      return _bind$8;
                    }
                  }
                } else {
                  if (c >= 56320 && c <= 57343) {
                    const _bind$5 = _M0MPC14json12ParseContext19unpaired__surrogateGuE(ctx, escape_start);
                    if (_bind$5.$tag === 1) {
                      const _ok = _bind$5;
                      _ok._0;
                    } else {
                      return _bind$5;
                    }
                  } else {
                    _M0IPB13StringBuilderPB6Logger11write__char(buf, c);
                  }
                }
                break;
              }
              default: {
                const _bind$5 = _M0MPC14json12ParseContext21invalid__char_2einnerGuE(ctx, -_M0MPC14char4Char10utf16__len(_x$2) | 0);
                if (_bind$5.$tag === 1) {
                  const _ok = _bind$5;
                  _ok._0;
                } else {
                  return _bind$5;
                }
              }
            }
          }
          start.val = ctx.offset;
          break;
        }
        default: {
          if (_x < 32) {
            const _bind$4 = _M0MPC14json12ParseContext21invalid__char_2einnerGuE(ctx, -1);
            if (_bind$4.$tag === 1) {
              const _ok = _bind$4;
              _ok._0;
            } else {
              return _bind$4;
            }
          } else {
            continue _L;
          }
        }
      }
    }
    continue;
  }
  return new _M0DTPC16result6ResultGsRPC14json10ParseErrorE2Ok(_M0MPB13StringBuilder10to__string(buf));
}
function _M0MPC14json12ParseContext11lex__string(ctx) {
  const string_start = ctx.offset;
  const _bind$2 = ctx.end_offset;
  let _tmp = string_start;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      const _bind$3 = ctx.input;
      const c = _bind$3.str.charCodeAt(_bind$3.start + i | 0);
      if (_M0IPC16uint166UInt16PB2Eq5equal(c, 34)) {
        ctx.offset = i + 1 | 0;
        return new _M0DTPC16result6ResultGsRPC14json10ParseErrorE2Ok(_M0MPC16string10StringView9to__owned(_M0MPC16string10StringView12view_2einner(ctx.input, string_start, i)));
      } else {
        if (_M0IPC16uint166UInt16PB2Eq5equal(c, 92)) {
          const _bind$4 = _M0MPC14json12ParseContext17lex__string__slow(ctx);
          let _tmp$2;
          if (_bind$4.$tag === 1) {
            const _ok = _bind$4;
            _tmp$2 = _ok._0;
          } else {
            return _bind$4;
          }
          return new _M0DTPC16result6ResultGsRPC14json10ParseErrorE2Ok(_tmp$2);
        } else {
          if (c < 32) {
            ctx.offset = i + 1 | 0;
            const _bind$4 = _M0MPC14json12ParseContext21invalid__char_2einnerGuE(ctx, -1);
            if (_bind$4.$tag === 1) {
              const _ok = _bind$4;
              _ok._0;
            } else {
              return _bind$4;
            }
          }
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGsRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
}
function _M0MPC14json12ParseContext9lex__zero(ctx, start) {
  _L: {
    const _bind$2 = _M0MPC14json12ParseContext10read__char(ctx);
    if (_bind$2 === -1) {
      return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset));
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      if (_x === 46) {
        return _M0MPC14json12ParseContext19lex__decimal__point(ctx, start);
      } else {
        if (_x === 101) {
          break _L;
        } else {
          if (_x === 69) {
            break _L;
          } else {
            if (_x >= 48 && _x <= 57) {
              ctx.offset = ctx.offset - 1 | 0;
              return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, 0);
            } else {
              ctx.offset = ctx.offset - 1 | 0;
              return new _M0DTPC16result6ResultGRPC14json11LexedNumberRPC14json10ParseErrorE2Ok(_M0MPC14json12ParseContext16lex__number__end(ctx, start, ctx.offset));
            }
          }
        }
      }
    }
  }
  return _M0MPC14json12ParseContext22lex__decimal__exponent(ctx, start);
}
function _M0MPC14json12ParseContext10lex__value(ctx, allow_rbracket) {
  _M0MPC14json12ParseContext21lex__skip__whitespace(ctx);
  const _bind$2 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$2 === -1) {
    return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$2;
    const _x = _Some;
    if (_x === 123) {
      return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token6LBrace__);
    } else {
      if (_x === 91) {
        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token8LBracket__);
      } else {
        if (_x === 93) {
          if (allow_rbracket) {
            return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token8RBracket__);
          } else {
            return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, -1);
          }
        } else {
          if (_x === 110) {
            const _bind$3 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 117);
            if (_bind$3.$tag === 1) {
              const _ok = _bind$3;
              _ok._0;
            } else {
              return _bind$3;
            }
            const _bind$4 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 108);
            if (_bind$4.$tag === 1) {
              const _ok = _bind$4;
              _ok._0;
            } else {
              return _bind$4;
            }
            const _bind$5 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 108);
            if (_bind$5.$tag === 1) {
              const _ok = _bind$5;
              _ok._0;
            } else {
              return _bind$5;
            }
            return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token4Null__);
          } else {
            if (_x === 116) {
              const _bind$3 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 114);
              if (_bind$3.$tag === 1) {
                const _ok = _bind$3;
                _ok._0;
              } else {
                return _bind$3;
              }
              const _bind$4 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 117);
              if (_bind$4.$tag === 1) {
                const _ok = _bind$4;
                _ok._0;
              } else {
                return _bind$4;
              }
              const _bind$5 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 101);
              if (_bind$5.$tag === 1) {
                const _ok = _bind$5;
                _ok._0;
              } else {
                return _bind$5;
              }
              return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token4True__);
            } else {
              if (_x === 102) {
                const _bind$3 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 97);
                if (_bind$3.$tag === 1) {
                  const _ok = _bind$3;
                  _ok._0;
                } else {
                  return _bind$3;
                }
                const _bind$4 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 108);
                if (_bind$4.$tag === 1) {
                  const _ok = _bind$4;
                  _ok._0;
                } else {
                  return _bind$4;
                }
                const _bind$5 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 115);
                if (_bind$5.$tag === 1) {
                  const _ok = _bind$5;
                  _ok._0;
                } else {
                  return _bind$5;
                }
                const _bind$6 = _M0MPC14json12ParseContext19expect__ascii__char(ctx, 101);
                if (_bind$6.$tag === 1) {
                  const _ok = _bind$6;
                  _ok._0;
                } else {
                  return _bind$6;
                }
                return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token5False__);
              } else {
                if (_x === 45) {
                  const _bind$3 = _M0MPC14json12ParseContext10read__char(ctx);
                  if (_bind$3 === -1) {
                    return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
                  } else {
                    const _Some$2 = _bind$3;
                    const _x$2 = _Some$2;
                    if (_x$2 === 48) {
                      const _bind$4 = _M0MPC14json12ParseContext9lex__zero(ctx, ctx.offset - 2 | 0);
                      let _bind$5;
                      if (_bind$4.$tag === 1) {
                        const _ok = _bind$4;
                        _bind$5 = _ok._0;
                      } else {
                        return _bind$4;
                      }
                      const _n = _bind$5.value;
                      const _repr = _bind$5.repr;
                      return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(new _M0DTPC14json5Token6Number(_n, _M0MPC16option6Option3mapGRPC16string10StringViewsE(_repr, (repr) => _M0MPC16string10StringView9to__owned(repr))));
                    } else {
                      if (_x$2 >= 49 && _x$2 <= 57) {
                        const _bind$4 = _M0MPC14json12ParseContext21lex__decimal__integer(ctx, ctx.offset - 2 | 0);
                        let _bind$5;
                        if (_bind$4.$tag === 1) {
                          const _ok = _bind$4;
                          _bind$5 = _ok._0;
                        } else {
                          return _bind$4;
                        }
                        const _n = _bind$5.value;
                        const _repr = _bind$5.repr;
                        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(new _M0DTPC14json5Token6Number(_n, _M0MPC16option6Option3mapGRPC16string10StringViewsE(_repr, (repr) => _M0MPC16string10StringView9to__owned(repr))));
                      } else {
                        return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, -1);
                      }
                    }
                  }
                } else {
                  if (_x === 48) {
                    const _bind$3 = _M0MPC14json12ParseContext9lex__zero(ctx, ctx.offset - 1 | 0);
                    let _bind$4;
                    if (_bind$3.$tag === 1) {
                      const _ok = _bind$3;
                      _bind$4 = _ok._0;
                    } else {
                      return _bind$3;
                    }
                    const _n = _bind$4.value;
                    const _repr = _bind$4.repr;
                    return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(new _M0DTPC14json5Token6Number(_n, _M0MPC16option6Option3mapGRPC16string10StringViewsE(_repr, (repr) => _M0MPC16string10StringView9to__owned(repr))));
                  } else {
                    if (_x >= 49 && _x <= 57) {
                      const _bind$3 = _M0MPC14json12ParseContext21lex__decimal__integer(ctx, ctx.offset - 1 | 0);
                      let _bind$4;
                      if (_bind$3.$tag === 1) {
                        const _ok = _bind$3;
                        _bind$4 = _ok._0;
                      } else {
                        return _bind$3;
                      }
                      const _n = _bind$4.value;
                      const _repr = _bind$4.repr;
                      return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(new _M0DTPC14json5Token6Number(_n, _M0MPC16option6Option3mapGRPC16string10StringViewsE(_repr, (repr) => _M0MPC16string10StringView9to__owned(repr))));
                    } else {
                      if (_x === 34) {
                        const _bind$3 = _M0MPC14json12ParseContext11lex__string(ctx);
                        let s;
                        if (_bind$3.$tag === 1) {
                          const _ok = _bind$3;
                          s = _ok._0;
                        } else {
                          return _bind$3;
                        }
                        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(new _M0DTPC14json5Token6String(s));
                      } else {
                        const shift = -_M0MPC14char4Char10utf16__len(_x) | 0;
                        return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, shift);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
function _M0MPC14json12ParseContext24lex__after__array__value(ctx) {
  _M0MPC14json12ParseContext21lex__skip__whitespace(ctx);
  const _bind$2 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$2 === -1) {
    return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$2;
    const _x = _Some;
    switch (_x) {
      case 93: {
        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token8RBracket__);
      }
      case 44: {
        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token5Comma__);
      }
      default: {
        return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, -1);
      }
    }
  }
}
function _M0MPC14json12ParseContext25lex__after__object__value(ctx) {
  _M0MPC14json12ParseContext21lex__skip__whitespace(ctx);
  const _bind$2 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$2 === -1) {
    return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$2;
    const _x = _Some;
    switch (_x) {
      case 125: {
        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token6RBrace__);
      }
      case 44: {
        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token5Comma__);
      }
      default: {
        return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, -1);
      }
    }
  }
}
function _M0MPC14json12ParseContext26lex__after__property__name(ctx) {
  _M0MPC14json12ParseContext21lex__skip__whitespace(ctx);
  const _bind$2 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$2 === -1) {
    return new _M0DTPC16result6ResultGuRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$2;
    const _x = _Some;
    if (_x === 58) {
      return new _M0DTPC16result6ResultGuRPC14json10ParseErrorE2Ok(undefined);
    } else {
      return _M0MPC14json12ParseContext21invalid__char_2einnerGuE(ctx, -1);
    }
  }
}
function _M0MPC14json12ParseContext19lex__property__name(ctx) {
  _M0MPC14json12ParseContext21lex__skip__whitespace(ctx);
  const _bind$2 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$2 === -1) {
    return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$2;
    const _x = _Some;
    switch (_x) {
      case 125: {
        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(_M0DTPC14json5Token6RBrace__);
      }
      case 34: {
        const _bind$3 = _M0MPC14json12ParseContext11lex__string(ctx);
        let s;
        if (_bind$3.$tag === 1) {
          const _ok = _bind$3;
          s = _ok._0;
        } else {
          return _bind$3;
        }
        return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(new _M0DTPC14json5Token6String(s));
      }
      default: {
        return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, -1);
      }
    }
  }
}
function _M0MPC14json12ParseContext20lex__property__name2(ctx) {
  _M0MPC14json12ParseContext21lex__skip__whitespace(ctx);
  const _bind$2 = _M0MPC14json12ParseContext10read__char(ctx);
  if (_bind$2 === -1) {
    return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE3Err(_M0DTPC15error5Error51moonbitlang_2fcore_2fjson_2eParseError_2eInvalidEof__);
  } else {
    const _Some = _bind$2;
    const _x = _Some;
    if (_x === 34) {
      const _bind$3 = _M0MPC14json12ParseContext11lex__string(ctx);
      let s;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        s = _ok._0;
      } else {
        return _bind$3;
      }
      return new _M0DTPC16result6ResultGRPC14json5TokenRPC14json10ParseErrorE2Ok(new _M0DTPC14json5Token6String(s));
    } else {
      return _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, -1);
    }
  }
}
function _M0MPC14json12ParseContext12parse__value(ctx, remaining_available_depth) {
  const _bind$2 = _M0MPC14json12ParseContext10lex__value(ctx, false);
  let tok;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    tok = _ok._0;
  } else {
    return _bind$2;
  }
  return _M0MPC14json12ParseContext13parse__value2(ctx, tok, remaining_available_depth);
}
function _M0MPC14json12ParseContext13parse__value2(ctx, tok, remaining_available_depth) {
  _L: {
    switch (tok.$tag) {
      case 0: {
        return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(_M0FPB4null);
      }
      case 1: {
        return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(_M0MPC14json4Json7boolean(true));
      }
      case 2: {
        return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(_M0MPC14json4Json7boolean(false));
      }
      case 3: {
        const _Number = tok;
        const _n = _Number._0;
        const _repr = _Number._1;
        return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(_M0MPC14json4Json6number(_n, _repr));
      }
      case 4: {
        const _String = tok;
        const _s = _String._0;
        return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(_M0MPC14json4Json6string(_s));
      }
      case 5: {
        return _M0MPC14json12ParseContext13parse__object(ctx, remaining_available_depth);
      }
      case 7: {
        return _M0MPC14json12ParseContext12parse__array(ctx, remaining_available_depth);
      }
      case 8: {
        break _L;
      }
      case 6: {
        break _L;
      }
      default: {
        break _L;
      }
    }
  }
  return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(_M0FPC15abort5abortGRPC16string10StringViewE("unreachable"));
}
function _M0MPC14json12ParseContext12parse__array(ctx, remaining_available_depth) {
  if (remaining_available_depth <= 0) {
    return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE3Err(_M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded__);
  }
  const child_remaining_available_depth = remaining_available_depth - 1 | 0;
  const vec = [];
  let _tmp;
  const _bind$2 = _M0MPC14json12ParseContext10lex__value(ctx, true);
  let _tmp$2;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _tmp$2 = _ok._0;
  } else {
    return _bind$2;
  }
  let _tmp$3 = _tmp$2;
  _L: while (true) {
    const x = _tmp$3;
    if (x.$tag === 8) {
      _tmp = _M0MPC14json4Json5array(vec);
      break;
    } else {
      const _bind$3 = _M0MPC14json12ParseContext13parse__value2(ctx, x, child_remaining_available_depth);
      let _tmp$4;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        _tmp$4 = _ok._0;
      } else {
        return _bind$3;
      }
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(vec, _tmp$4);
      const _bind$4 = _M0MPC14json12ParseContext24lex__after__array__value(ctx);
      let tok2;
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        tok2 = _ok._0;
      } else {
        return _bind$4;
      }
      switch (tok2.$tag) {
        case 9: {
          const _bind$5 = _M0MPC14json12ParseContext10lex__value(ctx, false);
          if (_bind$5.$tag === 1) {
            const _ok = _bind$5;
            _tmp$3 = _ok._0;
          } else {
            return _bind$5;
          }
          continue _L;
        }
        case 8: {
          _tmp = _M0MPC14json4Json5array(vec);
          break _L;
        }
        default: {
          _M0FPC15abort5abortGuE("unreachable");
        }
      }
    }
    continue;
  }
  return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(_tmp);
}
function _M0MPC14json12ParseContext13parse__object(ctx, remaining_available_depth) {
  if (remaining_available_depth <= 0) {
    return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE3Err(_M0DTPC15error5Error59moonbitlang_2fcore_2fjson_2eParseError_2eDepthLimitExceeded__);
  }
  const child_remaining_available_depth = remaining_available_depth - 1 | 0;
  const _bind$2 = [];
  const map = _M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 0), undefined);
  let _tmp;
  const _bind$3 = _M0MPC14json12ParseContext19lex__property__name(ctx);
  let _tmp$2;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _tmp$2 = _ok._0;
  } else {
    return _bind$3;
  }
  let _tmp$3 = _tmp$2;
  _L: while (true) {
    const x = _tmp$3;
    switch (x.$tag) {
      case 6: {
        _tmp = _M0MPC14json4Json6object(map);
        break _L;
      }
      case 4: {
        const _String = x;
        const _name = _String._0;
        const _bind$4 = _M0MPC14json12ParseContext26lex__after__property__name(ctx);
        if (_bind$4.$tag === 1) {
          const _ok = _bind$4;
          _ok._0;
        } else {
          return _bind$4;
        }
        const _bind$5 = _M0MPC14json12ParseContext12parse__value(ctx, child_remaining_available_depth);
        let _tmp$4;
        if (_bind$5.$tag === 1) {
          const _ok = _bind$5;
          _tmp$4 = _ok._0;
        } else {
          return _bind$5;
        }
        _M0MPB3Map3setGsRPB4JsonE(map, _name, _tmp$4);
        const _bind$6 = _M0MPC14json12ParseContext25lex__after__object__value(ctx);
        let _bind$7;
        if (_bind$6.$tag === 1) {
          const _ok = _bind$6;
          _bind$7 = _ok._0;
        } else {
          return _bind$6;
        }
        switch (_bind$7.$tag) {
          case 9: {
            const _bind$8 = _M0MPC14json12ParseContext20lex__property__name2(ctx);
            if (_bind$8.$tag === 1) {
              const _ok = _bind$8;
              _tmp$3 = _ok._0;
            } else {
              return _bind$8;
            }
            continue _L;
          }
          case 6: {
            _tmp = _M0MPC14json4Json6object(map);
            break _L;
          }
          default: {
            _M0FPC15abort5abortGuE("unreachable");
          }
        }
        break;
      }
      default: {
        _M0FPC15abort5abortGuE("unreachable");
      }
    }
    continue;
  }
  return new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(_tmp);
}
function _M0FPC14json13parse_2einner(input, max_nesting_depth) {
  const ctx = _M0MPC14json12ParseContext4make(input);
  const _bind$2 = _M0MPC14json12ParseContext12parse__value(ctx, max_nesting_depth);
  let val;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    val = _ok._0;
  } else {
    return _bind$2;
  }
  _M0MPC14json12ParseContext21lex__skip__whitespace(ctx);
  return ctx.offset >= ctx.end_offset ? new _M0DTPC16result6ResultGRPB4JsonRPC14json10ParseErrorE2Ok(val) : _M0MPC14json12ParseContext21invalid__char_2einnerGRPB4JsonE(ctx, 0);
}
function _M0FPC14json20need__escape__scalar(str, escape_slash, start, end) {
  let _tmp = start;
  while (true) {
    const i = _tmp;
    if (i < end) {
      const code = str.charCodeAt(i);
      if (_M0IPC16uint166UInt16PB2Eq5equal(code, 34) || (_M0IPC16uint166UInt16PB2Eq5equal(code, 92) || (code < 32 || escape_slash && _M0IPC16uint166UInt16PB2Eq5equal(code, 47)))) {
        return true;
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return false;
}
function _M0FPC14json12need__escape(str, escape_slash) {
  return _M0FPC14json20need__escape__scalar(str, escape_slash, 0, str.length);
}
function _M0FPC14json14write__escaped(buf, str, escape_slash) {
  if (!_M0FPC14json12need__escape(str, escape_slash)) {
    _M0IPB13StringBuilderPB6Logger13write__string(buf, str);
    return undefined;
  }
  const _bind$2 = str.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const code = str.charCodeAt(_);
      switch (code) {
        case 34: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\\"");
          break;
        }
        case 92: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\\\");
          break;
        }
        case 47: {
          if (escape_slash) {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\/");
          } else {
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 47);
          }
          break;
        }
        case 10: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\n");
          break;
        }
        case 13: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\r");
          break;
        }
        case 8: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\b");
          break;
        }
        case 9: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\t");
          break;
        }
        case 12: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\f");
          break;
        }
        default: {
          if (code < 32) {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "\\u00");
            _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0MPC14byte4Byte7to__hex(code & 255));
          } else {
            _M0IPB13StringBuilderPB6Logger11write__char(buf, _M0MPC16uint166UInt1616unsafe__to__char(code));
          }
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0FPC14json13write__indent(buf, cache, level, indent) {
  while (true) {
    if (cache.length <= level) {
      if (cache.length >= 1) {
        const _last = cache[cache.length - 1 | 0];
        _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(cache, `${_last}${_M0MPC16string6String6repeat(" ", indent)}`);
      } else {
        _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(cache, "\n");
      }
      continue;
    } else {
      break;
    }
  }
  _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0MPC15array5Array2atGRPB4JsonE(cache, level));
}
function _M0MPC14json4Json17stringify_2einner(self, escape_slash, indent, replacer) {
  const buf = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const indent_cache = [];
  const stack = [];
  let depth = 0;
  let _tmp = self;
  while (true) {
    const x = _tmp;
    if (x === undefined) {
      if (stack.length === 0) {
        break;
      } else {
        const _x = stack[stack.length - 1 | 0];
        if (_x.$tag === 0) {
          const _Array = _x;
          const _arr = _Array._0;
          const _i = _Array._1;
          if (_i < _arr.length) {
            const element = _M0MPC15array5Array2atGRPB4JsonE(_arr, _i);
            _Array._1 = _i + 1 | 0;
            if (_i > 0) {
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 44);
              if (indent > 0) {
                _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
              }
            }
            _tmp = element;
            continue;
          } else {
            depth = depth - 1 | 0;
            _M0MPC15array5Array3popGRPC14json10WriteFrameE(stack);
            if (indent > 0) {
              _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
            }
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 93);
            _tmp = undefined;
            continue;
          }
        } else {
          const _Object = _x;
          const _iterator = _Object._0;
          const _first = _Object._1;
          const _bind$2 = _M0MPB4Iter4nextGRPC16string10StringViewE(_iterator);
          if (_bind$2 === undefined) {
            depth = depth - 1 | 0;
            _M0MPC15array5Array3popGRPC14json10WriteFrameE(stack);
            if (indent > 0) {
              _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
            }
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 125);
            _tmp = undefined;
            continue;
          } else {
            const _Some = _bind$2;
            const _x$2 = _Some;
            const _k = _x$2._0;
            const _v = _x$2._1;
            let v2 = _v;
            if (replacer === undefined) {
            } else {
              const _Some$2 = replacer;
              const _replacer = _Some$2;
              const _func = _replacer.f;
              const _bind$3 = _func(_k, _v);
              if (_bind$3 === undefined) {
                _tmp = undefined;
                continue;
              } else {
                const _Some$3 = _bind$3;
                const _v$2 = _Some$3;
                v2 = _v$2;
              }
            }
            if (!_first) {
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 44);
              if (indent > 0) {
                _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
              }
            }
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
            _M0FPC14json14write__escaped(buf, _k, escape_slash);
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 58);
            if (indent > 0) {
              _M0IPB13StringBuilderPB6Logger11write__char(buf, 32);
            }
            _Object._1 = false;
            _tmp = v2;
            continue;
          }
        }
      }
    } else {
      const _Some = x;
      const _value = _Some;
      switch (_value.$tag) {
        case 6: {
          const _Object = _value;
          const _members = _Object._0;
          if (_M0MPB3Map9is__emptyGsRPB4JsonE(_members)) {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "{}");
          } else {
            depth = depth + 1 | 0;
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 123);
            if (indent > 0) {
              _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
            }
            _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(stack, new _M0DTPC14json10WriteFrame6Object(_M0MPB3Map4iterGsRPB4JsonE(_members), true));
          }
          break;
        }
        case 5: {
          const _Array = _value;
          const _arr = _Array._0;
          if (_M0MPC15array5Array9is__emptyGRPB4JsonE(_arr)) {
            _M0IPB13StringBuilderPB6Logger13write__string(buf, "[]");
          } else {
            depth = depth + 1 | 0;
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 91);
            if (indent > 0) {
              _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
            }
            _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(stack, new _M0DTPC14json10WriteFrame5Array(_arr, 0));
          }
          break;
        }
        case 4: {
          const _String = _value;
          const _s = _String._0;
          _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
          _M0FPC14json14write__escaped(buf, _s, escape_slash);
          _M0IPB13StringBuilderPB6Logger11write__char(buf, 34);
          break;
        }
        case 3: {
          const _Number = _value;
          const _n = _Number._0;
          const _repr = _Number._1;
          if (_repr === undefined) {
            _M0MPB13StringBuilder13write__objectGdE(buf, _n);
          } else {
            const _Some$2 = _repr;
            const _r = _Some$2;
            _M0IPB13StringBuilderPB6Logger13write__string(buf, _r);
          }
          break;
        }
        case 1: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "true");
          break;
        }
        case 2: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "false");
          break;
        }
        default: {
          _M0IPB13StringBuilderPB6Logger13write__string(buf, "null");
        }
      }
      _tmp = undefined;
      continue;
    }
  }
  return _M0MPB13StringBuilder10to__string(buf);
}
function _M0IPC14json8JsonPathPB4Show6outputN11build__pathS211(path, logger) {
  switch (path.$tag) {
    case 0: {
      return;
    }
    case 1: {
      const _Key = path;
      const _parent = _Key._0;
      const _key = _Key._1;
      _M0IPC14json8JsonPathPB4Show6outputN11build__pathS211(_parent, logger);
      logger.method_table.method_0(logger.self, "/");
      if (!_M0MPC16string6String13contains__any(_key, new _M0TPC16string10StringView(_M0IPC14json8JsonPathPB4Show6outputN7_2abindS1595, 0, _M0IPC14json8JsonPathPB4Show6outputN7_2abindS1595.length))) {
        logger.method_table.method_0(logger.self, _key);
        return;
      }
      const _it = _M0MPC16string6String4iter(_key);
      while (true) {
        const _bind$2 = _M0MPB4Iter4nextGcE(_it);
        if (_bind$2 === -1) {
          return;
        } else {
          const _Some = _bind$2;
          const _ch = _Some;
          switch (_ch) {
            case 126: {
              logger.method_table.method_0(logger.self, "~0");
              break;
            }
            case 47: {
              logger.method_table.method_0(logger.self, "~1");
              break;
            }
            default: {
              logger.method_table.method_3(logger.self, _ch);
            }
          }
          continue;
        }
      }
    }
    default: {
      const _Index = path;
      const _parent$2 = _Index._0;
      const _index = _Index._1;
      _M0IPC14json8JsonPathPB4Show6outputN11build__pathS211(_parent$2, logger);
      logger.method_table.method_0(logger.self, "/");
      _M0MPB6Logger13write__objectGiE(logger, _index);
      return;
    }
  }
}
function _M0IPC14json8JsonPathPB4Show6output(self, logger) {
  _M0IPC14json8JsonPathPB4Show6outputN11build__pathS211(self, logger);
}
function _M0IPC14json4JsonPB6ToJson8to__json(self) {
  return self;
}
function _M0FPC14json18from__json_2einnerGmE(json, path) {
  return _M0IPC16uint646UInt64PC14json8FromJson10from__json(json, path);
}
function _M0FPC14json18from__json_2einnerGlE(json, path) {
  return _M0IPC15int645Int64PC14json8FromJson10from__json(json, path);
}
function _M0FPC14json10from__jsonGmE(json, path$46$opt) {
  let path;
  if (path$46$opt === undefined) {
    path = _M0DTPC14json8JsonPath4Root__;
  } else {
    const _Some = path$46$opt;
    path = _Some;
  }
  return _M0FPC14json18from__json_2einnerGmE(json, path);
}
function _M0FPC14json10from__jsonGlE(json, path$46$opt) {
  let path;
  if (path$46$opt === undefined) {
    path = _M0DTPC14json8JsonPath4Root__;
  } else {
    const _Some = path$46$opt;
    path = _Some;
  }
  return _M0FPC14json18from__json_2einnerGlE(json, path);
}
function _M0IPC15int645Int64PC14json8FromJson10from__json(json, path) {
  if (json.$tag === 4) {
    const _String = json;
    const _str = _String._0;
    let _try_err;
    _L: {
      const _bind$2 = _M0FPC28internal7strconv20parse__int64_2einner(new _M0TPC16string10StringView(_str, 0, _str.length), 0);
      let _tmp;
      if (_bind$2.$tag === 1) {
        const _ok = _bind$2;
        _tmp = _ok._0;
      } else {
        const _err = _bind$2;
        _try_err = _err._0;
        break _L;
      }
      return new _M0DTPC16result6ResultGlRPC14json15JsonDecodeErrorE2Ok(_tmp);
    }
    if (_try_err.$tag === 0) {
      const _Failure = _try_err;
      const _error = _Failure._0;
      const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(34);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "Int64::from_json: parsing failure ");
      _M0MPB13StringBuilder13write__objectGsE(_string_builder, _error);
      return _M0FPC14json13decode__errorGmE(path, _M0MPB13StringBuilder10to__string(_string_builder));
    } else {
      const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(34);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "Int64::from_json: parsing failure ");
      _M0MPB13StringBuilder13write__objectGRPC15error5ErrorE(_string_builder, _try_err);
      return _M0FPC14json13decode__errorGmE(path, _M0MPB13StringBuilder10to__string(_string_builder));
    }
  } else {
    return _M0FPC14json13decode__errorGmE(path, "Int64::from_json: expected number in string representation");
  }
}
function _M0IPC16uint646UInt64PC14json8FromJson10from__json(json, path) {
  if (json.$tag === 4) {
    const _String = json;
    const _str = _String._0;
    let _try_err;
    _L: {
      const _bind$2 = _M0FPC28internal7strconv21parse__uint64_2einner(new _M0TPC16string10StringView(_str, 0, _str.length), 0);
      let _tmp;
      if (_bind$2.$tag === 1) {
        const _ok = _bind$2;
        _tmp = _ok._0;
      } else {
        const _err = _bind$2;
        _try_err = _err._0;
        break _L;
      }
      return new _M0DTPC16result6ResultGmRPC14json15JsonDecodeErrorE2Ok(_tmp);
    }
    if (_try_err.$tag === 0) {
      const _Failure = _try_err;
      const _error = _Failure._0;
      const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(35);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "UInt64::from_json: parsing failure ");
      _M0MPB13StringBuilder13write__objectGsE(_string_builder, _error);
      return _M0FPC14json13decode__errorGmE(path, _M0MPB13StringBuilder10to__string(_string_builder));
    } else {
      const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(35);
      _M0IPB13StringBuilderPB6Logger13write__string(_string_builder, "UInt64::from_json: parsing failure ");
      _M0MPB13StringBuilder13write__objectGRPC15error5ErrorE(_string_builder, _try_err);
      return _M0FPC14json13decode__errorGmE(path, _M0MPB13StringBuilder10to__string(_string_builder));
    }
  } else {
    return _M0FPC14json13decode__errorGmE(path, "UInt64::from_json: expected number in string representation");
  }
}
function _M0IP211localreview4amqp8ArgumentPC15debug5Debug8to__repr(_x_742) {
  let _arg_750;
  _L: {
    let _arg_749;
    _L$2: {
      let _arg_748;
      _L$3: {
        let _arg_747;
        _L$4: {
          let _arg_746;
          _L$5: {
            let _arg_745;
            _L$6: {
              let _arg_744;
              _L$7: {
                let _arg_743;
                _L$8: {
                  switch (_x_742.$tag) {
                    case 0: {
                      const _Bit = _x_742;
                      const _$42$arg_743 = _Bit._0;
                      _arg_743 = _$42$arg_743;
                      break _L$8;
                    }
                    case 1: {
                      const _Octet = _x_742;
                      const _$42$arg_744 = _Octet._0;
                      _arg_744 = _$42$arg_744;
                      break _L$7;
                    }
                    case 2: {
                      const _Short = _x_742;
                      const _$42$arg_745 = _Short._0;
                      _arg_745 = _$42$arg_745;
                      break _L$6;
                    }
                    case 3: {
                      const _Long = _x_742;
                      const _$42$arg_746 = _Long._0;
                      _arg_746 = _$42$arg_746;
                      break _L$5;
                    }
                    case 4: {
                      const _LongLong = _x_742;
                      const _$42$arg_747 = _LongLong._0;
                      _arg_747 = _$42$arg_747;
                      break _L$4;
                    }
                    case 5: {
                      const _ShortString = _x_742;
                      const _$42$arg_748 = _ShortString._0;
                      _arg_748 = _$42$arg_748;
                      break _L$3;
                    }
                    case 6: {
                      const _LongString = _x_742;
                      const _$42$arg_749 = _LongString._0;
                      _arg_749 = _$42$arg_749;
                      break _L$2;
                    }
                    default: {
                      const _Table = _x_742;
                      const _$42$arg_750 = _Table._0;
                      _arg_750 = _$42$arg_750;
                      break _L;
                    }
                  }
                }
                return _M0MPC15debug4Repr4ctor("Bit", [{ _0: undefined, _1: _M0IPC14bool4BoolPC15debug5Debug8to__repr(_arg_743) }]);
              }
              return _M0MPC15debug4Repr4ctor("Octet", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_744) }]);
            }
            return _M0MPC15debug4Repr4ctor("Short", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_745) }]);
          }
          return _M0MPC15debug4Repr4ctor("Long", [{ _0: undefined, _1: _M0IPC14uint4UIntPC15debug5Debug8to__repr(_arg_746) }]);
        }
        return _M0MPC15debug4Repr4ctor("LongLong", [{ _0: undefined, _1: _M0IPC16uint646UInt64PC15debug5Debug8to__repr(_arg_747) }]);
      }
      return _M0MPC15debug4Repr4ctor("ShortString", [{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_arg_748) }]);
    }
    return _M0MPC15debug4Repr4ctor("LongString", [{ _0: undefined, _1: _M0IPC15bytes5BytesPC15debug5Debug8to__repr(_arg_749) }]);
  }
  return _M0MPC15debug4Repr4ctor("Table", [{ _0: undefined, _1: _M0IPC15array5ArrayPC15debug5Debug8to__reprGUsRP211localreview4amqp10FieldValueEE(_arg_750) }]);
}
function _M0IP211localreview4amqp12ArgumentKindPC15debug5Debug8to__repr(_x_696) {
  switch (_x_696) {
    case 0: {
      return _M0MPC15debug4Repr4ctor("BitKind", []);
    }
    case 1: {
      return _M0MPC15debug4Repr4ctor("OctetKind", []);
    }
    case 2: {
      return _M0MPC15debug4Repr4ctor("ShortKind", []);
    }
    case 3: {
      return _M0MPC15debug4Repr4ctor("LongKind", []);
    }
    case 4: {
      return _M0MPC15debug4Repr4ctor("LongLongKind", []);
    }
    case 5: {
      return _M0MPC15debug4Repr4ctor("ShortStringKind", []);
    }
    case 6: {
      return _M0MPC15debug4Repr4ctor("LongStringKind", []);
    }
    default: {
      return _M0MPC15debug4Repr4ctor("TableKind", []);
    }
  }
}
function _M0IP211localreview4amqp12ArgumentKindPB2Eq5equal(_x_692, _x_693) {
  switch (_x_692) {
    case 0: {
      if (_x_693 === 0) {
        return true;
      } else {
        return false;
      }
    }
    case 1: {
      if (_x_693 === 1) {
        return true;
      } else {
        return false;
      }
    }
    case 2: {
      if (_x_693 === 2) {
        return true;
      } else {
        return false;
      }
    }
    case 3: {
      if (_x_693 === 3) {
        return true;
      } else {
        return false;
      }
    }
    case 4: {
      if (_x_693 === 4) {
        return true;
      } else {
        return false;
      }
    }
    case 5: {
      if (_x_693 === 5) {
        return true;
      } else {
        return false;
      }
    }
    case 6: {
      if (_x_693 === 6) {
        return true;
      } else {
        return false;
      }
    }
    default: {
      if (_x_693 === 7) {
        return true;
      } else {
        return false;
      }
    }
  }
}
function _M0IP211localreview4amqp10FrameErrorPC15debug5Debug8to__reprGRP211localreview4amqp10FrameErrorE(_x_682) {
  let _arg_683;
  _L: {
    const _Invalid = _x_682;
    const _$42$arg_683 = _Invalid._0;
    _arg_683 = _$42$arg_683;
    break _L;
  }
  return _M0MPC15debug4Repr4ctor("Invalid", [{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_arg_683) }]);
}
function _M0IP211localreview4amqp7ContentPC15debug5Debug8to__repr(_x_578) {
  const _bind$2 = [{ _0: "channel", _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_x_578.channel) }, { _0: "method_payload", _1: _M0IPC15bytes5BytesPC15debug5Debug8to__repr(_x_578.method_payload) }, { _0: "header", _1: _M0IPC15bytes5BytesPC15debug5Debug8to__repr(_x_578.header) }, { _0: "body", _1: _M0IPC15bytes5BytesPC15debug5Debug8to__repr(_x_578.body) }];
  return _M0MPC15debug4Repr6record(_M0MPB3Map3MapGsRPC15debug4ReprE(new _M0TPB9ArrayViewGUsRPC15debug4ReprEE(_bind$2, 0, 4), undefined));
}
function _M0IP211localreview4amqp10FieldValuePC15debug5Debug8to__repr(_x_538) {
  let _arg_555;
  _L: {
    let _arg_554;
    _L$2: {
      let _arg_553;
      _L$3: {
        let _arg_552;
        _L$4: {
          let _arg_551;
          _L$5: {
            let _arg_549;
            let _arg_550;
            _L$6: {
              let _arg_548;
              _L$7: {
                let _arg_547;
                _L$8: {
                  let _arg_546;
                  _L$9: {
                    let _arg_545;
                    _L$10: {
                      let _arg_544;
                      _L$11: {
                        let _arg_543;
                        _L$12: {
                          let _arg_542;
                          _L$13: {
                            let _arg_541;
                            _L$14: {
                              let _arg_540;
                              _L$15: {
                                let _arg_539;
                                _L$16: {
                                  switch (_x_538.$tag) {
                                    case 0: {
                                      const _Boolean = _x_538;
                                      const _$42$arg_539 = _Boolean._0;
                                      _arg_539 = _$42$arg_539;
                                      break _L$16;
                                    }
                                    case 1: {
                                      const _Signed8 = _x_538;
                                      const _$42$arg_540 = _Signed8._0;
                                      _arg_540 = _$42$arg_540;
                                      break _L$15;
                                    }
                                    case 2: {
                                      const _Unsigned8 = _x_538;
                                      const _$42$arg_541 = _Unsigned8._0;
                                      _arg_541 = _$42$arg_541;
                                      break _L$14;
                                    }
                                    case 3: {
                                      const _Signed16 = _x_538;
                                      const _$42$arg_542 = _Signed16._0;
                                      _arg_542 = _$42$arg_542;
                                      break _L$13;
                                    }
                                    case 4: {
                                      const _Unsigned16 = _x_538;
                                      const _$42$arg_543 = _Unsigned16._0;
                                      _arg_543 = _$42$arg_543;
                                      break _L$12;
                                    }
                                    case 5: {
                                      const _Signed32 = _x_538;
                                      const _$42$arg_544 = _Signed32._0;
                                      _arg_544 = _$42$arg_544;
                                      break _L$11;
                                    }
                                    case 6: {
                                      const _Unsigned32 = _x_538;
                                      const _$42$arg_545 = _Unsigned32._0;
                                      _arg_545 = _$42$arg_545;
                                      break _L$10;
                                    }
                                    case 7: {
                                      const _Signed64 = _x_538;
                                      const _$42$arg_546 = _Signed64._0;
                                      _arg_546 = _$42$arg_546;
                                      break _L$9;
                                    }
                                    case 8: {
                                      const _Float32Bits = _x_538;
                                      const _$42$arg_547 = _Float32Bits._0;
                                      _arg_547 = _$42$arg_547;
                                      break _L$8;
                                    }
                                    case 9: {
                                      const _Float64Bits = _x_538;
                                      const _$42$arg_548 = _Float64Bits._0;
                                      _arg_548 = _$42$arg_548;
                                      break _L$7;
                                    }
                                    case 10: {
                                      const _Decimal = _x_538;
                                      const _$42$arg_549 = _Decimal._0;
                                      const _$42$arg_550 = _Decimal._1;
                                      _arg_549 = _$42$arg_549;
                                      _arg_550 = _$42$arg_550;
                                      break _L$6;
                                    }
                                    case 11: {
                                      const _LongString = _x_538;
                                      const _$42$arg_551 = _LongString._0;
                                      _arg_551 = _$42$arg_551;
                                      break _L$5;
                                    }
                                    case 12: {
                                      const _ByteArray = _x_538;
                                      const _$42$arg_552 = _ByteArray._0;
                                      _arg_552 = _$42$arg_552;
                                      break _L$4;
                                    }
                                    case 13: {
                                      const _Timestamp = _x_538;
                                      const _$42$arg_553 = _Timestamp._0;
                                      _arg_553 = _$42$arg_553;
                                      break _L$3;
                                    }
                                    case 14: {
                                      const _ArrayValue = _x_538;
                                      const _$42$arg_554 = _ArrayValue._0;
                                      _arg_554 = _$42$arg_554;
                                      break _L$2;
                                    }
                                    case 15: {
                                      const _TableValue = _x_538;
                                      const _$42$arg_555 = _TableValue._0;
                                      _arg_555 = _$42$arg_555;
                                      break _L;
                                    }
                                    default: {
                                      return _M0MPC15debug4Repr4ctor("Void", []);
                                    }
                                  }
                                }
                                return _M0MPC15debug4Repr4ctor("Boolean", [{ _0: undefined, _1: _M0IPC14bool4BoolPC15debug5Debug8to__repr(_arg_539) }]);
                              }
                              return _M0MPC15debug4Repr4ctor("Signed8", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_540) }]);
                            }
                            return _M0MPC15debug4Repr4ctor("Unsigned8", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_541) }]);
                          }
                          return _M0MPC15debug4Repr4ctor("Signed16", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_542) }]);
                        }
                        return _M0MPC15debug4Repr4ctor("Unsigned16", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_543) }]);
                      }
                      return _M0MPC15debug4Repr4ctor("Signed32", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_544) }]);
                    }
                    return _M0MPC15debug4Repr4ctor("Unsigned32", [{ _0: undefined, _1: _M0IPC14uint4UIntPC15debug5Debug8to__repr(_arg_545) }]);
                  }
                  return _M0MPC15debug4Repr4ctor("Signed64", [{ _0: undefined, _1: _M0IPC15int645Int64PC15debug5Debug8to__repr(_arg_546) }]);
                }
                return _M0MPC15debug4Repr4ctor("Float32Bits", [{ _0: undefined, _1: _M0IPC14uint4UIntPC15debug5Debug8to__repr(_arg_547) }]);
              }
              return _M0MPC15debug4Repr4ctor("Float64Bits", [{ _0: undefined, _1: _M0IPC16uint646UInt64PC15debug5Debug8to__repr(_arg_548) }]);
            }
            return _M0MPC15debug4Repr4ctor("Decimal", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_549) }, { _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_550) }]);
          }
          return _M0MPC15debug4Repr4ctor("LongString", [{ _0: undefined, _1: _M0IPC15bytes5BytesPC15debug5Debug8to__repr(_arg_551) }]);
        }
        return _M0MPC15debug4Repr4ctor("ByteArray", [{ _0: undefined, _1: _M0IPC15bytes5BytesPC15debug5Debug8to__repr(_arg_552) }]);
      }
      return _M0MPC15debug4Repr4ctor("Timestamp", [{ _0: undefined, _1: _M0IPC16uint646UInt64PC15debug5Debug8to__repr(_arg_553) }]);
    }
    return _M0MPC15debug4Repr4ctor("ArrayValue", [{ _0: undefined, _1: _M0IPC15array5ArrayPC15debug5Debug8to__reprGRP211localreview4amqp10FieldValueE(_arg_554) }]);
  }
  return _M0MPC15debug4Repr4ctor("TableValue", [{ _0: undefined, _1: _M0IPC15array5ArrayPC15debug5Debug8to__reprGUsRP211localreview4amqp10FieldValueEE(_arg_555) }]);
}
function _M0IP211localreview4amqp5FramePC15debug5Debug8to__repr(_x_464) {
  const _bind$2 = [{ _0: "kind", _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_x_464.kind) }, { _0: "channel", _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_x_464.channel) }, { _0: "payload", _1: _M0IPC15bytes5BytesPC15debug5Debug8to__repr(_x_464.payload) }];
  return _M0MPC15debug4Repr6record(_M0MPB3Map3MapGsRPC15debug4ReprE(new _M0TPB9ArrayViewGUsRPC15debug4ReprEE(_bind$2, 0, 3), undefined));
}
function _M0MP211localreview4amqp10WireWriter3new() {
  return new _M0TP211localreview4amqp10WireWriter([], 0);
}
function _M0MP211localreview4amqp10WireWriter4uint(self, value, width) {
  if (self.bytes.length > (16777208 - width | 0)) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("payload byte limit"));
  }
  let _tmp = width - 1 | 0;
  while (true) {
    const i = _tmp;
    if (i >= 0) {
      _M0MPC15array5Array4pushGyE(self.bytes, _M0MPC16uint646UInt648to__byte(BigInt.asUintN(64, BigInt.asUintN(64, value) >> BigInt((Math.imul(i, 8) | 0) & 63))));
      _tmp = i - 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
}
function _M0MP211localreview4amqp10WireWriter3raw(self, data) {
  if (data.length > (16777208 - self.bytes.length | 0)) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("payload byte limit"));
  }
  const _bind$2 = data.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const byte = data[_];
      _M0MPC15array5Array4pushGyE(self.bytes, byte);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
}
function _M0MP211localreview4amqp10WireWriter8shortstr(self, text) {
  if (text.length > 255) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("shortstr exceeds 255 UTF-8 bytes"));
  }
  const bytes = _M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(text, 0, text.length), false);
  if (bytes.length > 255) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("shortstr exceeds 255 UTF-8 bytes"));
  }
  const _bind$2 = _M0MP211localreview4amqp10WireWriter4uint(self, _M0MPC13int3Int10to__uint64(bytes.length), 1);
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _ok._0;
  } else {
    return _bind$2;
  }
  return _M0MP211localreview4amqp10WireWriter3raw(self, bytes);
}
function _M0MP211localreview4amqp10WireWriter7longstr(self, bytes) {
  const _bind$2 = _M0MP211localreview4amqp10WireWriter4uint(self, _M0MPC13int3Int10to__uint64(bytes.length), 4);
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _ok._0;
  } else {
    return _bind$2;
  }
  return _M0MP211localreview4amqp10WireWriter3raw(self, bytes);
}
function _M0MP211localreview4amqp10WireWriter11patch__size(self, start) {
  const length = (self.bytes.length - start | 0) - 4 | 0;
  const _bind$2 = 0;
  const _bind$3 = 4;
  let _tmp = _bind$2;
  while (true) {
    const i = _tmp;
    if (i < _bind$3) {
      _M0MPC15array5Array3setGyE(self.bytes, start + i | 0, length >> (Math.imul(3 - i | 0, 8) | 0) & 255);
      _tmp = i + 1 | 0;
      continue;
    } else {
      return;
    }
  }
}
function _M0MP211localreview4amqp10WireWriter4node(self, depth) {
  self.nodes = self.nodes + 1 | 0;
  if (depth > 32 || self.nodes > 65536) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("field nesting or element limit"));
  } else {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
  }
}
function _M0MP211localreview4amqp10WireReader3new(bytes) {
  if (bytes.length > 16777208) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp10WireReaderRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("payload byte limit"));
  }
  return new _M0DTPC16result6ResultGRP211localreview4amqp10WireReaderRP211localreview4amqp10FrameErrorE2Ok(new _M0TP211localreview4amqp10WireReader(bytes, 0, bytes.length, 0));
}
function _M0MP211localreview4amqp10WireReader4uint(self, width) {
  if (width > (self.end - self.pos | 0)) {
    return new _M0DTPC16result6ResultGmRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("truncated field"));
  }
  const value = new _M0TPB8MutLocalGmE(0n);
  const _bind$2 = 0;
  let _tmp = _bind$2;
  while (true) {
    const _ = _tmp;
    if (_ < width) {
      const _tmp$2 = BigInt.asUintN(64, value.val << BigInt(8 & 63));
      const _tmp$3 = self.bytes;
      const _tmp$4 = self.pos;
      value.val = BigInt.asUintN(64, _tmp$2 | _M0MPC14byte4Byte10to__uint64(_tmp$4 >>> 0 < _tmp$3.length ? _tmp$3[_tmp$4] : $oob()));
      self.pos = self.pos + 1 | 0;
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGmRP211localreview4amqp10FrameErrorE2Ok(value.val);
}
function _M0MP211localreview4amqp10WireReader3raw(self, size) {
  if (BigInt.asUintN(64, size) > BigInt.asUintN(64, _M0MPC13int3Int10to__uint64(self.end - self.pos | 0))) {
    return new _M0DTPC16result6ResultGzRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("truncated string or container"));
  }
  const start = self.pos;
  self.pos = self.pos + (Number(BigInt.asIntN(32, size)) | 0) | 0;
  return new _M0DTPC16result6ResultGzRP211localreview4amqp10FrameErrorE2Ok(_M0MPC15bytes9BytesView9to__owned(_M0MPC15bytes5Bytes12view_2einner(self.bytes, start, self.pos)));
}
function _M0MP211localreview4amqp10WireReader8shortstr(self) {
  const _bind$2 = _M0MP211localreview4amqp10WireReader4uint(self, 1);
  let _tmp;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _tmp = _ok._0;
  } else {
    return _bind$2;
  }
  const _bind$3 = _M0MP211localreview4amqp10WireReader3raw(self, _tmp);
  let data;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    data = _ok._0;
  } else {
    return _bind$3;
  }
  let _try_err;
  _L: {
    const _bind$4 = _M0FPC28encoding4utf814decode_2einner(new _M0TPC15bytes9BytesView(data, 0, data.length), false);
    let _tmp$2;
    if (_bind$4.$tag === 1) {
      const _ok = _bind$4;
      _tmp$2 = _ok._0;
    } else {
      const _err = _bind$4;
      _try_err = _err._0;
      break _L;
    }
    return new _M0DTPC16result6ResultGsRP211localreview4amqp10FrameErrorE2Ok(_tmp$2);
  }
  return new _M0DTPC16result6ResultGsRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid UTF-8 shortstr"));
}
function _M0MP211localreview4amqp10WireReader7longstr(self) {
  const _bind$2 = _M0MP211localreview4amqp10WireReader4uint(self, 4);
  let _tmp;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _tmp = _ok._0;
  } else {
    return _bind$2;
  }
  return _M0MP211localreview4amqp10WireReader3raw(self, _tmp);
}
function _M0MP211localreview4amqp10WireReader14container__end(self) {
  const _bind$2 = _M0MP211localreview4amqp10WireReader4uint(self, 4);
  let size;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    size = _ok._0;
  } else {
    return _bind$2;
  }
  if (BigInt.asUintN(64, size) > BigInt.asUintN(64, _M0MPC13int3Int10to__uint64(self.end - self.pos | 0))) {
    return new _M0DTPC16result6ResultGiRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("container length exceeds parent"));
  }
  return new _M0DTPC16result6ResultGiRP211localreview4amqp10FrameErrorE2Ok(self.pos + (Number(BigInt.asIntN(32, size)) | 0) | 0);
}
function _M0MP211localreview4amqp10WireReader4node(self, depth) {
  self.nodes = self.nodes + 1 | 0;
  if (depth > 32 || self.nodes > 65536) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("field nesting or element limit"));
  } else {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
  }
}
function _M0MP211localreview4amqp10WireReader6finish(self) {
  if (self.pos !== self.end) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("trailing payload bytes"));
  } else {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
  }
}
function _M0FP211localreview4amqp12body__frames(channel, body, max_frame_size) {
  if (channel < 1 || (channel > 65535 || (max_frame_size < 9 || (max_frame_size > 1048584 || body.length > 1048576)))) {
    return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("body frame bounds"));
  }
  const capacity = max_frame_size - 8 | 0;
  const frames = [];
  const pos = new _M0TPB8MutLocalGiE(0);
  while (true) {
    if (pos.val < body.length) {
      const end = (pos.val + capacity | 0) < body.length ? pos.val + capacity | 0 : body.length;
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(frames, new _M0TP211localreview4amqp5Frame(3, channel, _M0MPC15bytes9BytesView9to__owned(_M0MPC15bytes5Bytes12view_2einner(body, pos.val, end))));
      pos.val = end;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE2Ok(frames);
}
function _M0FP211localreview4amqp8uri__hex(c) {
  const c$2 = c;
  return c$2 >= 48 && c$2 <= 57 ? c$2 - 48 | 0 : c$2 >= 65 && c$2 <= 70 ? c$2 - 55 | 0 : c$2 >= 97 && c$2 <= 102 ? c$2 - 87 | 0 : -1;
}
function _M0FP211localreview4amqp15uri__unreserved(c) {
  return c >= 65 && c <= 90 || (c >= 97 && c <= 122 || (c >= 48 && c <= 57 || (_M0IPC14byte4BytePB2Eq5equal(c, 45) || (_M0IPC14byte4BytePB2Eq5equal(c, 95) || (_M0IPC14byte4BytePB2Eq5equal(c, 46) || _M0IPC14byte4BytePB2Eq5equal(c, 126))))));
}
function _M0FP211localreview4amqp15uri__host__byte(c) {
  if (_M0FP211localreview4amqp15uri__unreserved(c)) {
    return true;
  } else {
    const _bind$2 = _M0IPC14char4CharPB4Show10to__string(c);
    return _M0MPC16string6String8contains("!$&'()*+,;=:[]<>\"", new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length));
  }
}
function _M0FP211localreview4amqp11uri__decode(text, mode) {
  const bytes = _M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(text, 0, text.length), false);
  const out = [];
  const i = new _M0TPB8MutLocalGiE(0);
  while (true) {
    if (i.val < bytes.length) {
      const _tmp = i.val;
      const c = _tmp >>> 0 < bytes.length ? bytes[_tmp] : $oob();
      if (_M0IPC14byte4BytePB2Eq5equal(c, 37)) {
        if ((i.val + 2 | 0) >= bytes.length) {
          return new _M0DTPC16result6ResultGsRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid URI escape"));
        }
        const _tmp$2 = i.val + 1 | 0;
        const a = _M0FP211localreview4amqp8uri__hex(_tmp$2 >>> 0 < bytes.length ? bytes[_tmp$2] : $oob());
        const _tmp$3 = i.val + 2 | 0;
        const b = _M0FP211localreview4amqp8uri__hex(_tmp$3 >>> 0 < bytes.length ? bytes[_tmp$3] : $oob());
        if (a < 0 || b < 0) {
          return new _M0DTPC16result6ResultGsRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid URI escape"));
        }
        const value = (a << 4 | b) & 255;
        if (mode === 2 && (value < 128 && value !== 37) || mode === 3 && (value !== 37 && (value !== 32 && !_M0FP211localreview4amqp15uri__host__byte(value)))) {
          return new _M0DTPC16result6ResultGsRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid URI host escape"));
        }
        _M0MPC15array5Array4pushGyE(out, value);
        i.val = i.val + 3 | 0;
      } else {
        if (mode >= 2 && (c < 128 && !_M0FP211localreview4amqp15uri__host__byte(c))) {
          return new _M0DTPC16result6ResultGsRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid URI host"));
        }
        _M0MPC15array5Array4pushGyE(out, mode === 1 && _M0IPC14byte4BytePB2Eq5equal(c, 43) ? 32 : c);
        i.val = i.val + 1 | 0;
      }
      continue;
    } else {
      break;
    }
  }
  let _try_err;
  _L: {
    const _bind$2 = _M0MPC15bytes5Bytes11from__array(new _M0TPB9ArrayViewGyE(out, 0, out.length));
    const _bind$3 = _M0FPC28encoding4utf814decode_2einner(new _M0TPC15bytes9BytesView(_bind$2, 0, _bind$2.length), false);
    let _tmp;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _tmp = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    return new _M0DTPC16result6ResultGsRP211localreview4amqp10FrameErrorE2Ok(_tmp);
  }
  return new _M0DTPC16result6ResultGsRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid URI UTF-8"));
}
function _M0FP211localreview4amqp11uri__number(text, signed) {
  const bytes = _M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(text, 0, text.length), false);
  const start = signed && (bytes.length > 0 && (_M0IPC14byte4BytePB2Eq5equal(0 >>> 0 < bytes.length ? bytes[0] : $oob(), 43) || _M0IPC14byte4BytePB2Eq5equal(0 >>> 0 < bytes.length ? bytes[0] : $oob(), 45))) ? 1 : 0;
  if (start === bytes.length) {
    return new _M0DTPC16result6ResultGlRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid URI integer"));
  }
  const _bind$2 = bytes.length;
  let _tmp = start;
  while (true) {
    const i = _tmp;
    if (i < _bind$2) {
      if ((i >>> 0 < bytes.length ? bytes[i] : $oob()) < 48 || (i >>> 0 < bytes.length ? bytes[i] : $oob()) > 57) {
        return new _M0DTPC16result6ResultGlRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid URI integer"));
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  let _try_err;
  _L: {
    const _bind$3 = _M0FPC28internal7strconv20parse__int64_2einner(new _M0TPC16string10StringView(text, 0, text.length), 10);
    let _tmp$2;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _tmp$2 = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    return new _M0DTPC16result6ResultGlRP211localreview4amqp10FrameErrorE2Ok(_tmp$2);
  }
  return new _M0DTPC16result6ResultGlRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("URI integer out of range"));
}
function _M0FP211localreview4amqp9uri__ipv6(text) {
  let address;
  let a;
  let zone;
  _L: {
    _L$2: {
      const _bind$2 = "%";
      const _bind$3 = _M0MPC16string6String11split__once(text, new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length));
      if (_bind$3 === undefined) {
        address = text;
      } else {
        const _Some = _bind$3;
        const _x = _Some;
        const _a = _x._0;
        const _zone = _x._1;
        a = _a;
        zone = _zone;
        break _L$2;
      }
      break _L;
    }
    if (_M0MPC16string10StringView9is__empty(zone)) {
      return false;
    } else {
      address = _M0MPC16string10StringView9to__owned(a);
    }
  }
  const _bind$2 = "::";
  const halves = _M0MPB4Iter9to__arrayGsE(_M0MPC16string6String5split(address, new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length)));
  if (halves.length > 2) {
    return false;
  }
  const groups = [];
  const _bind$3 = halves.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$3) {
      const half = halves[_];
      if (!_M0MPC16string10StringView9is__empty(half)) {
        const _tmp$2 = _M0MPC16string10StringView9to__owned(half);
        const _bind$4 = ":";
        const _it = _M0MPC16string6String5split(_tmp$2, new _M0TPC16string10StringView(_bind$4, 0, _bind$4.length));
        while (true) {
          let group;
          _L$2: {
            const _bind$5 = _M0MPB4Iter4nextGRPC16string10StringViewE(_it);
            if (_bind$5 === undefined) {
              break;
            } else {
              const _Some = _bind$5;
              const _group = _Some;
              group = _group;
              break _L$2;
            }
          }
          _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(groups, _M0MPC16string10StringView9to__owned(group));
          continue;
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const count = new _M0TPB8MutLocalGiE(0);
  const _bind$4 = 0;
  const _bind$5 = groups.length;
  let _tmp$2 = _bind$4;
  while (true) {
    const i = _tmp$2;
    if (i < _bind$5) {
      const group = _M0MPC15array5Array2atGRPB4JsonE(groups, i);
      const _bind$6 = ".";
      if (_M0MPC16string6String8contains(group, new _M0TPC16string10StringView(_bind$6, 0, _bind$6.length))) {
        if (i !== (groups.length - 1 | 0) || !_M0MPC16string6String11has__suffix(address, new _M0TPC16string10StringView(group, 0, group.length))) {
          return false;
        }
        const _bind$7 = ".";
        const parts = _M0MPB4Iter9to__arrayGsE(_M0MPC16string6String5split(group, new _M0TPC16string10StringView(_bind$7, 0, _bind$7.length)));
        if (parts.length !== 4) {
          return false;
        }
        const _bind$8 = parts.length;
        let _tmp$3 = 0;
        while (true) {
          const _ = _tmp$3;
          if (_ < _bind$8) {
            const part = parts[_];
            if (_M0MPC16string10StringView9is__empty(part) || (_M0MPC16string10StringView6length(part) > 3 || _M0MPC16string10StringView6length(part) > 1 && _M0IPC16uint166UInt16PB2Eq5equal(_M0MPC16string10StringView2at(part, 0), 48))) {
              return false;
            }
            let n;
            let _try_err;
            _L$2: {
              _L$3: {
                const _bind$9 = _M0FP211localreview4amqp11uri__number(_M0MPC16string10StringView9to__owned(part), false);
                if (_bind$9.$tag === 1) {
                  const _ok = _bind$9;
                  n = _ok._0;
                } else {
                  const _err = _bind$9;
                  _try_err = _err._0;
                  break _L$3;
                }
                break _L$2;
              }
              return false;
            }
            if (BigInt.asIntN(64, n) > BigInt.asIntN(64, 255n)) {
              return false;
            }
            _tmp$3 = _ + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        count.val = count.val + 2 | 0;
      } else {
        if (_M0MPC16string6String9is__empty(group) || (group.length > 4 || _M0MPB4Iter3anyGyE(_M0MPC15bytes5Bytes4iter(_M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(group, 0, group.length), false)), (c) => _M0FP211localreview4amqp8uri__hex(c) < 0))) {
          return false;
        }
        count.val = count.val + 1 | 0;
      }
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return halves.length === 2 ? count.val < 8 : count.val === 8;
}
function _M0FP211localreview4amqp10parse__uri(input) {
  if (input.length > 65536 || _M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(input, 0, input.length), false).length > 65536) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp3URIRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("URI exceeds 64 KiB"));
  }
  if (_M0MPB4Iter3anyGcE(_M0MPC16string6String4iter(input), (c) => c <= 32 || c === 127)) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp3URIRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid URI whitespace or control"));
  }
  let base;
  let fragment;
  _L: {
    let a;
    let b;
    _L$2: {
      const _bind$2 = "#";
      const _bind$3 = _M0MPC16string6String11split__once(input, new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length));
      if (_bind$3 === undefined) {
        base = input;
        fragment = "";
        break _L;
      } else {
        const _Some = _bind$3;
        const _x = _Some;
        const _a = _x._0;
        const _b = _x._1;
        a = _a;
        b = _b;
        break _L$2;
      }
    }
    base = _M0MPC16string10StringView9to__owned(a);
    fragment = _M0MPC16string10StringView9to__owned(b);
    break _L;
  }
  const _bind$2 = _M0FP211localreview4amqp11uri__decode(fragment, 0);
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _ok._0;
  } else {
    return _bind$2;
  }
  let address;
  let query;
  _L$2: {
    let a;
    let b;
    _L$3: {
      const _bind$3 = "?";
      const _bind$4 = _M0MPC16string6String11split__once(base, new _M0TPC16string10StringView(_bind$3, 0, _bind$3.length));
      if (_bind$4 === undefined) {
        address = base;
        query = "";
        break _L$2;
      } else {
        const _Some = _bind$4;
        const _x = _Some;
        const _a = _x._0;
        const _b = _x._1;
        a = _a;
        b = _b;
        break _L$3;
      }
    }
    address = _M0MPC16string10StringView9to__owned(a);
    query = _M0MPC16string10StringView9to__owned(b);
    break _L$2;
  }
  let scheme;
  let rest;
  _L$3: {
    let a;
    let b;
    _L$4: {
      const _bind$3 = ":";
      const _bind$4 = _M0MPC16string6String11split__once(address, new _M0TPC16string10StringView(_bind$3, 0, _bind$3.length));
      if (_bind$4 === undefined) {
        return new _M0DTPC16result6ResultGRP211localreview4amqp3URIRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("missing AMQP URI scheme"));
      } else {
        const _Some = _bind$4;
        const _x = _Some;
        const _a = _x._0;
        const _b = _x._1;
        a = _a;
        b = _b;
        break _L$4;
      }
    }
    scheme = _M0MPC16string10StringView9to__owned(_M0MPC16string10StringView9to__lower(a));
    rest = _M0MPC16string10StringView9to__owned(b);
    break _L$3;
  }
  if (_M0IP016_24default__implPB2Eq10not__equalGsE(scheme, "amqp") && _M0IP016_24default__implPB2Eq10not__equalGsE(scheme, "amqps")) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp3URIRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid AMQP URI scheme"));
  }
  const authority = new _M0TPB8MutLocalGsE("");
  const path = new _M0TPB8MutLocalGsE("");
  const _bind$3 = "//";
  if (_M0MPC16string6String11has__prefix(rest, new _M0TPC16string10StringView(_bind$3, 0, _bind$3.length))) {
    const tail = _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(rest, 2, undefined));
    let i;
    _L$4: {
      _L$5: {
        const _bind$4 = "/";
        const _bind$5 = _M0MPC16string6String4find(tail, new _M0TPC16string10StringView(_bind$4, 0, _bind$4.length));
        if (_bind$5 === undefined) {
          authority.val = tail;
        } else {
          const _Some = _bind$5;
          const _i = _Some;
          i = _i;
          break _L$5;
        }
        break _L$4;
      }
      authority.val = _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(tail, 0, i));
      path.val = _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(tail, i, undefined));
    }
  } else {
    const _bind$4 = "/";
    if (_M0MPC16string6String11has__prefix(rest, new _M0TPC16string10StringView(_bind$4, 0, _bind$4.length))) {
      path.val = rest;
    }
  }
  const host_port = new _M0TPB8MutLocalGsE(authority.val);
  const username = new _M0TPB8MutLocalGsE("guest");
  const password = new _M0TPB8MutLocalGsE("guest");
  let i;
  _L$4: {
    _L$5: {
      const _tmp = authority.val;
      const _bind$4 = "@";
      const _bind$5 = _M0MPC16string6String9rev__find(_tmp, new _M0TPC16string10StringView(_bind$4, 0, _bind$4.length));
      if (_bind$5 === undefined) {
      } else {
        const _Some = _bind$5;
        const _i = _Some;
        i = _i;
        break _L$5;
      }
      break _L$4;
    }
    const user = _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(authority.val, 0, i));
    if (_M0MPB4Iter3anyGyE(_M0MPC15bytes5Bytes4iter(_M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(user, 0, user.length), false)), (c) => {
      let _tmp;
      if (_M0FP211localreview4amqp15uri__unreserved(c)) {
        _tmp = true;
      } else {
        const _bind$4 = _M0IPC14char4CharPB4Show10to__string(c);
        _tmp = _M0MPC16string6String8contains("!$&'()*+,;=:%@", new _M0TPC16string10StringView(_bind$4, 0, _bind$4.length));
      }
      return !_tmp;
    })) {
      return new _M0DTPC16result6ResultGRP211localreview4amqp3URIRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid URI user information"));
    }
    host_port.val = _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(authority.val, i + 1 | 0, undefined));
    let a;
    let b;
    _L$6: {
      _L$7: {
        const _bind$4 = ":";
        const _bind$5 = _M0MPC16string6String11split__once(user, new _M0TPC16string10StringView(_bind$4, 0, _bind$4.length));
        if (_bind$5 === undefined) {
          const _bind$6 = _M0FP211localreview4amqp11uri__decode(user, 0);
          let _tmp;
          if (_bind$6.$tag === 1) {
            const _ok = _bind$6;
            _tmp = _ok._0;
          } else {
            return _bind$6;
          }
          username.val = _tmp;
        } else {
          const _Some = _bind$5;
          const _x = _Some;
          const _a = _x._0;
          const _b = _x._1;
          a = _a;
          b = _b;
          break _L$7;
        }
        break _L$6;
      }
      const _bind$4 = _M0FP211localreview4amqp11uri__decode(_M0MPC16string10StringView9to__owned(a), 0);
      let _tmp;
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        _tmp = _ok._0;
      } else {
        return _bind$4;
      }
      username.val = _tmp;
      const _bind$5 = _M0FP211localreview4amqp11uri__decode(_M0MPC16string10StringView9to__owned(b), 0);
      let _tmp$2;
      if (_bind$5.$tag === 1) {
        const _ok = _bind$5;
        _tmp$2 = _ok._0;
      } else {
        return _bind$5;
      }
      password.val = _tmp$2;
    }
  }
  const host = new _M0TPB8MutLocalGsE(host_port.val);
  const port_text = new _M0TPB8MutLocalGsE("");
  const _tmp = host_port.val;
  const _bind$4 = "[";
  if (_M0MPC16string6String11has__prefix(_tmp, new _M0TPC16string10StringView(_bind$4, 0, _bind$4.length))) {
    let end;
    const _tmp$2 = host_port.val;
    const _bind$5 = "]";
    const _bind$6 = _M0MPC16string6String9rev__find(_tmp$2, new _M0TPC16string10StringView(_bind$5, 0, _bind$5.length));
    if (_bind$6 === undefined) {
      return new _M0DTPC16result6ResultGRP211localreview4amqp3URIRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unclosed URI IP literal"));
    } else {
      const _Some = _bind$6;
      const _i = _Some;
      end = _i;
    }
    const suffix = _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(host_port.val, end + 1 | 0, undefined));
    if (!_M0MPC16string6String9is__empty(suffix)) {
      const _bind$7 = ":";
      if (!_M0MPC16string6String11has__prefix(suffix, new _M0TPC16string10StringView(_bind$7, 0, _bind$7.length))) {
        return new _M0DTPC16result6ResultGRP211localreview4amqp3URIRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid URI port"));
      }
      port_text.val = _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(suffix, 1, undefined));
    }
    const encoded = _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(host_port.val, 1, end));
    let _tmp$3;
    let i$2;
    _L$5: {
      _L$6: {
        const _bind$7 = "%25";
        const _bind$8 = _M0MPC16string6String4find(encoded, new _M0TPC16string10StringView(_bind$7, 0, _bind$7.length));
        if (_bind$8 === undefined) {
          const _bind$9 = _M0FP211localreview4amqp11uri__decode(encoded, 2);
          if (_bind$9.$tag === 1) {
            const _ok = _bind$9;
            _tmp$3 = _ok._0;
          } else {
            return _bind$9;
          }
        } else {
          const _Some = _bind$8;
          const _i = _Some;
          i$2 = _i;
          break _L$6;
        }
        break _L$5;
      }
      const _bind$7 = _M0FP211localreview4amqp11uri__decode(_M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(encoded, 0, i$2)), 2);
      let _tmp$4;
      if (_bind$7.$tag === 1) {
        const _ok = _bind$7;
        _tmp$4 = _ok._0;
      } else {
        return _bind$7;
      }
      const _tmp$5 = _tmp$4;
      const _bind$8 = _M0FP211localreview4amqp11uri__decode(_M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(encoded, i$2, undefined)), 3);
      let _tmp$6;
      if (_bind$8.$tag === 1) {
        const _ok = _bind$8;
        _tmp$6 = _ok._0;
      } else {
        return _bind$8;
      }
      _tmp$3 = `${_tmp$5}${_tmp$6}`;
    }
    host.val = _tmp$3;
    if (!_M0FP211localreview4amqp9uri__ipv6(host.val)) {
      return new _M0DTPC16result6ResultGRP211localreview4amqp3URIRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid URI IPv6 literal"));
    }
  } else {
    let i$2;
    _L$5: {
      _L$6: {
        const _tmp$2 = host_port.val;
        const _bind$5 = ":";
        const _bind$6 = _M0MPC16string6String9rev__find(_tmp$2, new _M0TPC16string10StringView(_bind$5, 0, _bind$5.length));
        if (_bind$6 === undefined) {
        } else {
          const _Some = _bind$6;
          const _i = _Some;
          i$2 = _i;
          break _L$6;
        }
        break _L$5;
      }
      host.val = _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(host_port.val, 0, i$2));
      port_text.val = _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(host_port.val, i$2 + 1 | 0, undefined));
    }
    const _bind$5 = _M0FP211localreview4amqp11uri__decode(host.val, 2);
    let _tmp$2;
    if (_bind$5.$tag === 1) {
      const _ok = _bind$5;
      _tmp$2 = _ok._0;
    } else {
      return _bind$5;
    }
    host.val = _tmp$2;
  }
  const port = new _M0TPB8MutLocalGiE(scheme === "amqps" ? 5671 : 5672);
  if (!_M0MPC16string6String9is__empty(port_text.val)) {
    const _bind$5 = _M0FP211localreview4amqp11uri__number(port_text.val, false);
    let number;
    if (_bind$5.$tag === 1) {
      const _ok = _bind$5;
      number = _ok._0;
    } else {
      return _bind$5;
    }
    if (BigInt.asIntN(64, number) > BigInt.asIntN(64, 2147483647n)) {
      return new _M0DTPC16result6ResultGRP211localreview4amqp3URIRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("URI port out of range"));
    }
    port.val = Number(BigInt.asIntN(32, number)) | 0;
  }
  if (_M0MPC16string6String9is__empty(host.val)) {
    host.val = "localhost";
  }
  const _bind$5 = _M0FP211localreview4amqp11uri__decode(path.val, 0);
  let decoded_path;
  if (_bind$5.$tag === 1) {
    const _ok = _bind$5;
    decoded_path = _ok._0;
  } else {
    return _bind$5;
  }
  const vhost = new _M0TPB8MutLocalGsE("/");
  const _bind$6 = "/";
  if (_M0MPC16string6String11has__prefix(decoded_path, new _M0TPC16string10StringView(_bind$6, 0, _bind$6.length))) {
    let offset;
    let _tmp$2;
    if (_M0MPC16string6String9is__empty(host_port.val)) {
      const _bind$7 = "///";
      _tmp$2 = _M0MPC16string6String11has__prefix(decoded_path, new _M0TPC16string10StringView(_bind$7, 0, _bind$7.length));
    } else {
      _tmp$2 = false;
    }
    if (_tmp$2) {
      offset = 3;
    } else {
      offset = 1;
    }
    if (decoded_path.length > offset) {
      vhost.val = _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(decoded_path, offset, undefined));
    }
  } else {
    if (!_M0MPC16string6String9is__empty(decoded_path)) {
      vhost.val = decoded_path;
    }
  }
  const _bind$7 = [];
  const values = _M0MPB3Map3MapGsRPB5ArrayGsEE(new _M0TPB9ArrayViewGUsRPB5ArrayGsEEE(_bind$7, 0, 0), undefined);
  const _bind$8 = "&";
  const _it = _M0MPC16string6String5split(query, new _M0TPC16string10StringView(_bind$8, 0, _bind$8.length));
  while (true) {
    let pair;
    _L$5: {
      const _bind$9 = _M0MPB4Iter4nextGRPC16string10StringViewE(_it);
      if (_bind$9 === undefined) {
        break;
      } else {
        const _Some = _bind$9;
        const _pair = _Some;
        pair = _pair;
        break _L$5;
      }
    }
    let _tmp$2;
    if (_M0MPC16string10StringView9is__empty(pair)) {
      _tmp$2 = true;
    } else {
      const _bind$9 = ";";
      _tmp$2 = _M0MPC16string10StringView8contains(pair, new _M0TPC16string10StringView(_bind$9, 0, _bind$9.length));
    }
    if (_tmp$2) {
      continue;
    }
    let key;
    let value;
    _L$6: {
      let a;
      let b;
      _L$7: {
        const _tmp$3 = _M0MPC16string10StringView9to__owned(pair);
        const _bind$9 = "=";
        const _bind$10 = _M0MPC16string6String11split__once(_tmp$3, new _M0TPC16string10StringView(_bind$9, 0, _bind$9.length));
        if (_bind$10 === undefined) {
          key = _M0MPC16string10StringView9to__owned(pair);
          value = "";
          break _L$6;
        } else {
          const _Some = _bind$10;
          const _x = _Some;
          const _a = _x._0;
          const _b = _x._1;
          a = _a;
          b = _b;
          break _L$7;
        }
      }
      key = _M0MPC16string10StringView9to__owned(a);
      value = _M0MPC16string10StringView9to__owned(b);
      break _L$6;
    }
    let _try_err;
    _L$7: {
      _L$8: {
        const _bind$9 = _M0FP211localreview4amqp11uri__decode(key, 1);
        let key$2;
        if (_bind$9.$tag === 1) {
          const _ok = _bind$9;
          key$2 = _ok._0;
        } else {
          const _err = _bind$9;
          _try_err = _err._0;
          break _L$8;
        }
        const _bind$10 = _M0FP211localreview4amqp11uri__decode(value, 1);
        let value$2;
        if (_bind$10.$tag === 1) {
          const _ok = _bind$10;
          value$2 = _ok._0;
        } else {
          const _err = _bind$10;
          _try_err = _err._0;
          break _L$8;
        }
        let previous;
        _L$9: {
          _L$10: {
            const _bind$11 = _M0MPB3Map3getGsRPB5ArrayGsEE(values, key$2);
            if (_bind$11.$tag === 1) {
              const _Some = _bind$11;
              const _previous = _Some._0;
              previous = _previous;
              break _L$10;
            } else {
              _M0MPB3Map3setGsRPB5ArrayGsEE(values, key$2, [value$2]);
            }
            break _L$9;
          }
          _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(previous, value$2);
        }
        break _L$7;
      }
    }
    continue;
  }
  const first = (key) => {
    let items;
    _L$5: {
      const _bind$9 = _M0MPB3Map3getGsRPB5ArrayGsEE(values, key);
      if (_bind$9.$tag === 1) {
        const _Some = _bind$9;
        const _items = _Some._0;
        items = _items;
        break _L$5;
      } else {
        return "";
      }
    }
    return _M0MPC15array5Array2atGRPB4JsonE(items, 0);
  };
  let heartbeat_seconds;
  if (_M0MPB3Map8containsGsRPB5ArrayGsEE(values, "heartbeat")) {
    const _bind$9 = _M0FP211localreview4amqp11uri__number(first("heartbeat"), true);
    if (_bind$9.$tag === 1) {
      const _ok = _bind$9;
      heartbeat_seconds = _ok._0;
    } else {
      return _bind$9;
    }
  } else {
    heartbeat_seconds = undefined;
  }
  let connection_timeout;
  if (_M0MPB3Map8containsGsRPB5ArrayGsEE(values, "connection_timeout")) {
    const _bind$9 = _M0FP211localreview4amqp11uri__number(first("connection_timeout"), true);
    if (_bind$9.$tag === 1) {
      const _ok = _bind$9;
      connection_timeout = _ok._0;
    } else {
      return _bind$9;
    }
  } else {
    connection_timeout = 0n;
  }
  let channel_max;
  if (_M0MPB3Map8containsGsRPB5ArrayGsEE(values, "channel_max")) {
    const _bind$9 = _M0FP211localreview4amqp11uri__number(first("channel_max"), false);
    if (_bind$9.$tag === 1) {
      const _ok = _bind$9;
      channel_max = _ok._0;
    } else {
      return _bind$9;
    }
  } else {
    channel_max = 0n;
  }
  if (BigInt.asIntN(64, channel_max) > BigInt.asIntN(64, 65535n)) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp3URIRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("URI channel_max out of range"));
  }
  return new _M0DTPC16result6ResultGRP211localreview4amqp3URIRP211localreview4amqp10FrameErrorE2Ok(new _M0TP211localreview4amqp3URI(scheme, host.val, port.val, username.val, password.val, vhost.val, first("certfile"), first("cacertfile"), first("keyfile"), first("server_name_indication"), _M0MPC16option6Option10unwrap__orGRPB5ArrayGsEE(_M0MPB3Map3getGsRPB5ArrayGsEE(values, "auth_mechanism"), []), heartbeat_seconds, connection_timeout, Number(BigInt.asIntN(32, channel_max)) | 0));
}
function _M0FP211localreview4amqp11uri__escape(text, mode) {
  const out = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  const hex = $bytes_literal$1;
  const _bind$2 = _M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(text, 0, text.length), false);
  const _bind$3 = _bind$2.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$3) {
      const c = _bind$2[_];
      let literal;
      if (_M0FP211localreview4amqp15uri__unreserved(c)) {
        literal = true;
      } else {
        let _tmp$2;
        let _tmp$3;
        if (mode === 1) {
          const _bind$4 = _M0IPC14char4CharPB4Show10to__string(c);
          _tmp$3 = _M0MPC16string6String8contains("$&+,;=", new _M0TPC16string10StringView(_bind$4, 0, _bind$4.length));
        } else {
          _tmp$3 = false;
        }
        if (_tmp$3) {
          _tmp$2 = true;
        } else {
          let _tmp$4;
          let _tmp$5;
          if (mode === 2) {
            const _bind$4 = _M0IPC14char4CharPB4Show10to__string(c);
            _tmp$5 = _M0MPC16string6String8contains("$&+,/:;=@", new _M0TPC16string10StringView(_bind$4, 0, _bind$4.length));
          } else {
            _tmp$5 = false;
          }
          if (_tmp$5) {
            _tmp$4 = true;
          } else {
            _tmp$4 = mode === 3 && _M0FP211localreview4amqp15uri__host__byte(c);
          }
          _tmp$2 = _tmp$4;
        }
        literal = _tmp$2;
      }
      if (literal) {
        _M0IPB13StringBuilderPB6Logger11write__char(out, c);
      } else {
        if (mode === 0 && _M0IPC14byte4BytePB2Eq5equal(c, 32)) {
          _M0IPB13StringBuilderPB6Logger11write__char(out, 43);
        } else {
          _M0IPB13StringBuilderPB6Logger11write__char(out, 37);
          const _tmp$2 = c >> 4;
          _M0IPB13StringBuilderPB6Logger11write__char(out, _tmp$2 >>> 0 < hex.length ? hex[_tmp$2] : $oob());
          const _tmp$3 = c & 15;
          _M0IPB13StringBuilderPB6Logger11write__char(out, _tmp$3 >>> 0 < hex.length ? hex[_tmp$3] : $oob());
        }
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPB13StringBuilder10to__string(out);
}
function _M0MP211localreview4amqp3URI6format(self, redact) {
  const out = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0IPB13StringBuilderPB6Logger13write__string(out, `${self.scheme}://`);
  if (_M0IP016_24default__implPB2Eq10not__equalGsE(self.username, "guest") || _M0IP016_24default__implPB2Eq10not__equalGsE(self.password, "guest")) {
    _M0IPB13StringBuilderPB6Logger13write__string(out, _M0FP211localreview4amqp11uri__escape(self.username, 1));
    if (_M0IP016_24default__implPB2Eq10not__equalGsE(self.password, "guest")) {
      _M0IPB13StringBuilderPB6Logger13write__string(out, `:${redact ? "xxxxx" : _M0FP211localreview4amqp11uri__escape(self.password, 1)}`);
    }
    _M0IPB13StringBuilderPB6Logger11write__char(out, 64);
  }
  let host;
  const _tmp = self.host;
  const _bind$2 = ":";
  if (_M0MPC16string6String8contains(_tmp, new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length))) {
    host = `[${self.host}]`;
  } else {
    host = self.host;
  }
  _M0IPB13StringBuilderPB6Logger13write__string(out, _M0FP211localreview4amqp11uri__escape(host, 3));
  if (self.port !== (self.scheme === "amqps" ? 5671 : 5672)) {
    _M0IPB13StringBuilderPB6Logger13write__string(out, `:${_M0MPC13int3Int18to__string_2einner(self.port, 10)}`);
  }
  let path;
  if (self.vhost === "/") {
    path = "/";
  } else {
    const _tmp$2 = self.vhost;
    const _bind$3 = " ";
    if (_M0MPC16string6String8contains(_tmp$2, new _M0TPC16string10StringView(_bind$3, 0, _bind$3.length))) {
      path = _M0FP211localreview4amqp11uri__escape(self.vhost, 2);
    } else {
      path = _M0FP211localreview4amqp11uri__escape(self.vhost, 0);
    }
  }
  let _tmp$2;
  if (!_M0MPC16string6String9is__empty(path)) {
    const _bind$3 = "/";
    _tmp$2 = !_M0MPC16string6String11has__prefix(path, new _M0TPC16string10StringView(_bind$3, 0, _bind$3.length));
  } else {
    _tmp$2 = false;
  }
  if (_tmp$2) {
    _M0IPB13StringBuilderPB6Logger11write__char(out, 47);
  }
  _M0IPB13StringBuilderPB6Logger13write__string(out, path);
  const separator = new _M0TPB8MutLocalGsE("?");
  const _bind$3 = [{ _0: "cacertfile", _1: self.ca_cert_file }, { _0: "certfile", _1: self.cert_file }, { _0: "keyfile", _1: self.key_file }, { _0: "server_name_indication", _1: self.server_name }];
  const _bind$4 = _bind$3.length;
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp$3;
    if (_ < _bind$4) {
      const _foreach_element = _bind$3[_];
      let key;
      let value;
      _L: {
        const _key = _foreach_element._0;
        const _value = _foreach_element._1;
        key = _key;
        value = _value;
        break _L;
      }
      if (!_M0MPC16string6String9is__empty(value)) {
        _M0IPB13StringBuilderPB6Logger13write__string(out, `${separator.val}${key}=${_M0FP211localreview4amqp11uri__escape(value, 0)}`);
        separator.val = "&";
      }
      _tmp$3 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPB13StringBuilder10to__string(out);
}
function _M0MP211localreview4amqp3URI10to__string(self) {
  return _M0MP211localreview4amqp3URI6format(self, false);
}
function _M0MP211localreview4amqp3URI8redacted(self) {
  return _M0MP211localreview4amqp3URI6format(self, true);
}
function _M0FP211localreview4amqp16check__mechanism(mechanism) {
  if (_M0MPC16string6String9is__empty(mechanism) || (mechanism.length > 255 || _M0MPB4Iter3anyGcE(_M0MPC16string6String4iter(mechanism), (c) => c < 33 || c > 126))) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid SASL mechanism"));
  } else {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
  }
}
function _M0MP211localreview4amqp14Authentication6custom(mechanism, response) {
  const _bind$2 = _M0FP211localreview4amqp16check__mechanism(mechanism);
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _ok._0;
  } else {
    return _bind$2;
  }
  if (response.length > 1048576) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("SASL response exceeds 1 MiB"));
  }
  return new _M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRP211localreview4amqp10FrameErrorE2Ok(new _M0TP211localreview4amqp14Authentication(mechanism, response));
}
function _M0MP211localreview4amqp14Authentication5plain(username, password) {
  let _tmp;
  const _bind$2 = "\u0000";
  if (_M0MPC16string6String8contains(username, new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length))) {
    _tmp = true;
  } else {
    const _bind$3 = "\u0000";
    _tmp = _M0MPC16string6String8contains(password, new _M0TPC16string10StringView(_bind$3, 0, _bind$3.length));
  }
  if (_tmp) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid PLAIN credentials"));
  }
  const _bind$3 = `\u0000${username}\u0000${password}`;
  return _M0MP211localreview4amqp14Authentication6custom("PLAIN", _M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(_bind$3, 0, _bind$3.length), false));
}
function _M0FP211localreview4amqp12checked__int(value, low, high) {
  if (value < low || value > high) {
    return new _M0DTPC16result6ResultGmRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("integer field out of range"));
  }
  return new _M0DTPC16result6ResultGmRP211localreview4amqp10FrameErrorE2Ok(BigInt.asUintN(64, BigInt(value)));
}
function _M0FP211localreview4amqp12write__table(w, entries, depth) {
  const _bind$2 = _M0MP211localreview4amqp10WireWriter4node(w, depth);
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _ok._0;
  } else {
    return _bind$2;
  }
  const start = w.bytes.length;
  const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 0n, 4);
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _ok._0;
  } else {
    return _bind$3;
  }
  const _bind$4 = entries.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$4) {
      const _foreach_element = entries[_];
      let key;
      let value;
      _L: {
        const _key = _foreach_element._0;
        const _value = _foreach_element._1;
        key = _key;
        value = _value;
        break _L;
      }
      const _bind$5 = _M0MP211localreview4amqp10WireWriter8shortstr(w, key);
      if (_bind$5.$tag === 1) {
        const _ok = _bind$5;
        _ok._0;
      } else {
        return _bind$5;
      }
      const _bind$6 = _M0FP211localreview4amqp12write__field(w, value, depth + 1 | 0);
      if (_bind$6.$tag === 1) {
        const _ok = _bind$6;
        _ok._0;
      } else {
        return _bind$6;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(_M0MP211localreview4amqp10WireWriter11patch__size(w, start));
}
function _M0FP211localreview4amqp12write__field(w, value, depth) {
  const _bind$2 = _M0MP211localreview4amqp10WireWriter4node(w, depth);
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _ok._0;
  } else {
    return _bind$2;
  }
  let values;
  _L: {
    let entries;
    _L$2: {
      let v;
      _L$3: {
        let v$2;
        _L$4: {
          let v$3;
          _L$5: {
            let scale;
            let coefficient;
            _L$6: {
              let v$4;
              _L$7: {
                let v$5;
                _L$8: {
                  let v$6;
                  _L$9: {
                    let v$7;
                    _L$10: {
                      let v$8;
                      _L$11: {
                        let v$9;
                        _L$12: {
                          let v$10;
                          _L$13: {
                            let v$11;
                            _L$14: {
                              let v$12;
                              _L$15: {
                                let v$13;
                                _L$16: {
                                  switch (value.$tag) {
                                    case 0: {
                                      const _Boolean = value;
                                      const _v = _Boolean._0;
                                      v$13 = _v;
                                      break _L$16;
                                    }
                                    case 1: {
                                      const _Signed8 = value;
                                      const _v$2 = _Signed8._0;
                                      v$12 = _v$2;
                                      break _L$15;
                                    }
                                    case 2: {
                                      const _Unsigned8 = value;
                                      const _v$3 = _Unsigned8._0;
                                      v$11 = _v$3;
                                      break _L$14;
                                    }
                                    case 3: {
                                      const _Signed16 = value;
                                      const _v$4 = _Signed16._0;
                                      v$10 = _v$4;
                                      break _L$13;
                                    }
                                    case 4: {
                                      const _Unsigned16 = value;
                                      const _v$5 = _Unsigned16._0;
                                      v$9 = _v$5;
                                      break _L$12;
                                    }
                                    case 5: {
                                      const _Signed32 = value;
                                      const _v$6 = _Signed32._0;
                                      v$8 = _v$6;
                                      break _L$11;
                                    }
                                    case 6: {
                                      const _Unsigned32 = value;
                                      const _v$7 = _Unsigned32._0;
                                      v$7 = _v$7;
                                      break _L$10;
                                    }
                                    case 7: {
                                      const _Signed64 = value;
                                      const _v$8 = _Signed64._0;
                                      v$6 = _v$8;
                                      break _L$9;
                                    }
                                    case 8: {
                                      const _Float32Bits = value;
                                      const _v$9 = _Float32Bits._0;
                                      v$5 = _v$9;
                                      break _L$8;
                                    }
                                    case 9: {
                                      const _Float64Bits = value;
                                      const _v$10 = _Float64Bits._0;
                                      v$4 = _v$10;
                                      break _L$7;
                                    }
                                    case 10: {
                                      const _Decimal = value;
                                      const _scale = _Decimal._0;
                                      const _coefficient = _Decimal._1;
                                      scale = _scale;
                                      coefficient = _coefficient;
                                      break _L$6;
                                    }
                                    case 11: {
                                      const _LongString = value;
                                      const _v$11 = _LongString._0;
                                      v$3 = _v$11;
                                      break _L$5;
                                    }
                                    case 12: {
                                      const _ByteArray = value;
                                      const _v$12 = _ByteArray._0;
                                      v$2 = _v$12;
                                      break _L$4;
                                    }
                                    case 13: {
                                      const _Timestamp = value;
                                      const _v$13 = _Timestamp._0;
                                      v = _v$13;
                                      break _L$3;
                                    }
                                    case 16: {
                                      return _M0MP211localreview4amqp10WireWriter4uint(w, 86n, 1);
                                    }
                                    case 15: {
                                      const _TableValue = value;
                                      const _entries = _TableValue._0;
                                      entries = _entries;
                                      break _L$2;
                                    }
                                    default: {
                                      const _ArrayValue = value;
                                      const _values = _ArrayValue._0;
                                      values = _values;
                                      break _L;
                                    }
                                  }
                                }
                                const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 116n, 1);
                                if (_bind$3.$tag === 1) {
                                  const _ok = _bind$3;
                                  _ok._0;
                                } else {
                                  return _bind$3;
                                }
                                return _M0MP211localreview4amqp10WireWriter4uint(w, v$13 ? 1n : 0n, 1);
                              }
                              const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 98n, 1);
                              if (_bind$3.$tag === 1) {
                                const _ok = _bind$3;
                                _ok._0;
                              } else {
                                return _bind$3;
                              }
                              const _bind$4 = _M0FP211localreview4amqp12checked__int(v$12, -128, 127);
                              let _tmp;
                              if (_bind$4.$tag === 1) {
                                const _ok = _bind$4;
                                _tmp = _ok._0;
                              } else {
                                return _bind$4;
                              }
                              return _M0MP211localreview4amqp10WireWriter4uint(w, _tmp, 1);
                            }
                            const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 66n, 1);
                            if (_bind$3.$tag === 1) {
                              const _ok = _bind$3;
                              _ok._0;
                            } else {
                              return _bind$3;
                            }
                            const _bind$4 = _M0FP211localreview4amqp12checked__int(v$11, 0, 255);
                            let _tmp;
                            if (_bind$4.$tag === 1) {
                              const _ok = _bind$4;
                              _tmp = _ok._0;
                            } else {
                              return _bind$4;
                            }
                            return _M0MP211localreview4amqp10WireWriter4uint(w, _tmp, 1);
                          }
                          const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 115n, 1);
                          if (_bind$3.$tag === 1) {
                            const _ok = _bind$3;
                            _ok._0;
                          } else {
                            return _bind$3;
                          }
                          const _bind$4 = _M0FP211localreview4amqp12checked__int(v$10, -32768, 32767);
                          let _tmp;
                          if (_bind$4.$tag === 1) {
                            const _ok = _bind$4;
                            _tmp = _ok._0;
                          } else {
                            return _bind$4;
                          }
                          return _M0MP211localreview4amqp10WireWriter4uint(w, _tmp, 2);
                        }
                        const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 117n, 1);
                        if (_bind$3.$tag === 1) {
                          const _ok = _bind$3;
                          _ok._0;
                        } else {
                          return _bind$3;
                        }
                        const _bind$4 = _M0FP211localreview4amqp12checked__int(v$9, 0, 65535);
                        let _tmp;
                        if (_bind$4.$tag === 1) {
                          const _ok = _bind$4;
                          _tmp = _ok._0;
                        } else {
                          return _bind$4;
                        }
                        return _M0MP211localreview4amqp10WireWriter4uint(w, _tmp, 2);
                      }
                      const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 73n, 1);
                      if (_bind$3.$tag === 1) {
                        const _ok = _bind$3;
                        _ok._0;
                      } else {
                        return _bind$3;
                      }
                      return _M0MP211localreview4amqp10WireWriter4uint(w, BigInt.asUintN(64, BigInt(v$8)), 4);
                    }
                    const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 105n, 1);
                    if (_bind$3.$tag === 1) {
                      const _ok = _bind$3;
                      _ok._0;
                    } else {
                      return _bind$3;
                    }
                    return _M0MP211localreview4amqp10WireWriter4uint(w, _M0MPC14uint4UInt10to__uint64(v$7), 4);
                  }
                  const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 108n, 1);
                  if (_bind$3.$tag === 1) {
                    const _ok = _bind$3;
                    _ok._0;
                  } else {
                    return _bind$3;
                  }
                  return _M0MP211localreview4amqp10WireWriter4uint(w, v$6, 8);
                }
                const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 102n, 1);
                if (_bind$3.$tag === 1) {
                  const _ok = _bind$3;
                  _ok._0;
                } else {
                  return _bind$3;
                }
                return _M0MP211localreview4amqp10WireWriter4uint(w, _M0MPC14uint4UInt10to__uint64(v$5), 4);
              }
              const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 100n, 1);
              if (_bind$3.$tag === 1) {
                const _ok = _bind$3;
                _ok._0;
              } else {
                return _bind$3;
              }
              return _M0MP211localreview4amqp10WireWriter4uint(w, v$4, 8);
            }
            const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 68n, 1);
            if (_bind$3.$tag === 1) {
              const _ok = _bind$3;
              _ok._0;
            } else {
              return _bind$3;
            }
            const _bind$4 = _M0FP211localreview4amqp12checked__int(scale, 0, 255);
            let _tmp;
            if (_bind$4.$tag === 1) {
              const _ok = _bind$4;
              _tmp = _ok._0;
            } else {
              return _bind$4;
            }
            const _bind$5 = _M0MP211localreview4amqp10WireWriter4uint(w, _tmp, 1);
            if (_bind$5.$tag === 1) {
              const _ok = _bind$5;
              _ok._0;
            } else {
              return _bind$5;
            }
            return _M0MP211localreview4amqp10WireWriter4uint(w, BigInt.asUintN(64, BigInt(coefficient)), 4);
          }
          const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 83n, 1);
          if (_bind$3.$tag === 1) {
            const _ok = _bind$3;
            _ok._0;
          } else {
            return _bind$3;
          }
          return _M0MP211localreview4amqp10WireWriter7longstr(w, v$3);
        }
        const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 120n, 1);
        if (_bind$3.$tag === 1) {
          const _ok = _bind$3;
          _ok._0;
        } else {
          return _bind$3;
        }
        return _M0MP211localreview4amqp10WireWriter7longstr(w, v$2);
      }
      const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 84n, 1);
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        _ok._0;
      } else {
        return _bind$3;
      }
      return _M0MP211localreview4amqp10WireWriter4uint(w, v, 8);
    }
    const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 70n, 1);
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _ok._0;
    } else {
      return _bind$3;
    }
    return _M0FP211localreview4amqp12write__table(w, entries, depth);
  }
  const _bind$3 = _M0MP211localreview4amqp10WireWriter4uint(w, 65n, 1);
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _ok._0;
  } else {
    return _bind$3;
  }
  const start = w.bytes.length;
  const _bind$4 = _M0MP211localreview4amqp10WireWriter4uint(w, 0n, 4);
  if (_bind$4.$tag === 1) {
    const _ok = _bind$4;
    _ok._0;
  } else {
    return _bind$4;
  }
  const _bind$5 = values.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$5) {
      const item = values[_];
      const _bind$6 = _M0FP211localreview4amqp12write__field(w, item, depth + 1 | 0);
      if (_bind$6.$tag === 1) {
        const _ok = _bind$6;
        _ok._0;
      } else {
        return _bind$6;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(_M0MP211localreview4amqp10WireWriter11patch__size(w, start));
}
function _M0FP211localreview4amqp13encode__table(entries) {
  const w = _M0MP211localreview4amqp10WireWriter3new();
  const _bind$2 = _M0FP211localreview4amqp12write__table(w, entries, 0);
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _ok._0;
  } else {
    return _bind$2;
  }
  const _bind$3 = w.bytes;
  return new _M0DTPC16result6ResultGzRP211localreview4amqp10FrameErrorE2Ok(_M0MPC15bytes5Bytes11from__array(new _M0TPB9ArrayViewGyE(_bind$3, 0, _bind$3.length)));
}
function _M0MP211localreview4amqp14Authentication8amqplain(username, password) {
  const _bind$2 = _M0FP211localreview4amqp13encode__table([{ _0: "LOGIN", _1: new _M0DTP211localreview4amqp10FieldValue10LongString(_M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(username, 0, username.length), false)) }, { _0: "PASSWORD", _1: new _M0DTP211localreview4amqp10FieldValue10LongString(_M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(password, 0, password.length), false)) }]);
  let table;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    table = _ok._0;
  } else {
    return _bind$2;
  }
  return _M0MP211localreview4amqp14Authentication6custom("AMQPLAIN", _M0MPC15bytes9BytesView9to__owned(_M0MPC15bytes5Bytes12view_2einner(table, 4, undefined)));
}
function _M0FP211localreview4amqp27new__connection__properties() {
  return [{ _0: "product", _1: new _M0DTP211localreview4amqp10FieldValue10LongString($bytes_literal$2) }, { _0: "version", _1: new _M0DTP211localreview4amqp10FieldValue10LongString($bytes_literal$3) }, { _0: "platform", _1: new _M0DTP211localreview4amqp10FieldValue10LongString($bytes_literal$4) }];
}
function _M0FP211localreview4amqp33normalize__connection__properties(properties) {
  const source = _M0MPC15array5Array9is__emptyGRPB4JsonE(properties) ? _M0FP211localreview4amqp27new__connection__properties() : properties;
  const entries = _M0MPC15array5Array6filterGUsRP211localreview4amqp10FieldValueEE(source, (entry) => _M0IP016_24default__implPB2Eq10not__equalGsE(entry._0, "capabilities"));
  _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(entries, { _0: "capabilities", _1: new _M0DTP211localreview4amqp10FieldValue10TableValue([{ _0: "publisher_confirms", _1: new _M0DTP211localreview4amqp10FieldValue7Boolean(true) }, { _0: "consumer_cancel_notify", _1: new _M0DTP211localreview4amqp10FieldValue7Boolean(true) }, { _0: "connection.blocked", _1: new _M0DTP211localreview4amqp10FieldValue7Boolean(true) }, { _0: "basic.nack", _1: new _M0DTP211localreview4amqp10FieldValue7Boolean(true) }]) });
  return _M0FP211localreview4amqp13encode__table(entries);
}
function _M0FP211localreview4amqp16protocol__header() {
  return $bytes_literal$5;
}
function _M0MP211localreview4amqp9Assembler11new_2einner(max_body, strict_methods) {
  if (max_body < 0 || max_body > 16777216) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp9AssemblerRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid body limit"));
  }
  const _bind$2 = [];
  return new _M0DTPC16result6ResultGRP211localreview4amqp9AssemblerRP211localreview4amqp10FrameErrorE2Ok(new _M0TP211localreview4amqp9Assembler(_M0MPB3Map3MapGiRP211localreview4amqp7PendingE(new _M0TPB9ArrayViewGUiRP211localreview4amqp7PendingEE(_bind$2, 0, 0), undefined), max_body, strict_methods, 0, 0, false));
}
function _M0MP211localreview4amqp7Decoder11new_2einner(max_size) {
  if (max_size < 8 || max_size > 16777216) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp7DecoderRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid frame limit"));
  }
  return new _M0DTPC16result6ResultGRP211localreview4amqp7DecoderRP211localreview4amqp10FrameErrorE2Ok(new _M0TP211localreview4amqp7Decoder([], max_size, 7, false));
}
function _M0MP211localreview4amqp15StreamAssembler3new() {
  const _bind$2 = [];
  return new _M0TP211localreview4amqp15StreamAssembler(_M0MPB3Map3MapGiRP211localreview4amqp13StreamPendingE(new _M0TPB9ArrayViewGUiRP211localreview4amqp13StreamPendingEE(_bind$2, 0, 0), undefined), 0);
}
function _M0MP211localreview4amqp7Session28with__authentication_2einner(authentication, vhost, locale, channel_max, frame_max, heartbeat, stream_bodies, properties) {
  let _tmp;
  if (_M0MPC15array5Array9is__emptyGRPB4JsonE(authentication)) {
    _tmp = true;
  } else {
    let _tmp$2;
    if (authentication.length > 32) {
      _tmp$2 = true;
    } else {
      let _tmp$3;
      if (_M0MPC16string6String9is__empty(locale)) {
        _tmp$3 = true;
      } else {
        let _tmp$4;
        if (_M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(locale, 0, locale.length), false).length > 255) {
          _tmp$4 = true;
        } else {
          const _bind$2 = " ";
          _tmp$4 = _M0MPC16string6String8contains(locale, new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length));
        }
        _tmp$3 = _tmp$4;
      }
      _tmp$2 = _tmp$3;
    }
    _tmp = _tmp$2;
  }
  if (_tmp) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp7SessionRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid authentication candidates or locale"));
  }
  if (channel_max < 1 || (channel_max > 65535 || (frame_max < 4096 || (frame_max > 16777216 || (heartbeat < 0 || (heartbeat > 65535 || _M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(vhost, 0, vhost.length), false).length > 255)))))) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp7SessionRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid connection options"));
  }
  const _bind$2 = _M0FP211localreview4amqp33normalize__connection__properties(properties);
  let client_properties_wire;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    client_properties_wire = _ok._0;
  } else {
    return _bind$2;
  }
  if (client_properties_wire.length > (frame_max - 12 | 0)) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp7SessionRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("client properties exceed frame limit"));
  }
  const _bind$3 = _M0MP211localreview4amqp7Decoder11new_2einner(131072);
  let _tmp$2;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _tmp$2 = _ok._0;
  } else {
    return _bind$3;
  }
  const _tmp$3 = _tmp$2;
  const _bind$4 = _M0MP211localreview4amqp9Assembler11new_2einner(8388608, true);
  let _tmp$4;
  if (_bind$4.$tag === 1) {
    const _ok = _bind$4;
    _tmp$4 = _ok._0;
  } else {
    return _bind$4;
  }
  const _tmp$5 = _tmp$4;
  const _tmp$6 = _M0MP211localreview4amqp15StreamAssembler3new();
  const _tmp$7 = _M0MPC15array5Array4copyGsE(authentication);
  const _tmp$8 = [];
  const _bind$5 = [];
  const _tmp$9 = _M0MPB3Map3MapGisE(new _M0TPB9ArrayViewGUisEE(_bind$5, 0, 0), undefined);
  const _bind$6 = [];
  const _tmp$10 = _M0MPB3Map3MapGibE(new _M0TPB9ArrayViewGUibEE(_bind$6, 0, 0), undefined);
  const _bind$7 = [];
  return new _M0DTPC16result6ResultGRP211localreview4amqp7SessionRP211localreview4amqp10FrameErrorE2Ok(new _M0TP211localreview4amqp7Session(_tmp$3, _tmp$5, _tmp$6, stream_bodies, "start", _tmp$7, "", locale, vhost, client_properties_wire, $bytes_literal$6, _tmp$8, undefined, channel_max, frame_max, heartbeat, _tmp$9, _tmp$10, false, false, _M0MPB3Map3MapGimE(new _M0TPB9ArrayViewGUimEE(_bind$7, 0, 0), undefined), [_M0FP211localreview4amqp16protocol__header()]));
}
function _M0MP211localreview4amqp7Session11new_2einner(username, password, vhost, channel_max, frame_max, heartbeat, stream_bodies, properties) {
  const _bind$2 = _M0MP211localreview4amqp14Authentication5plain(username, password);
  let _tmp;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _tmp = _ok._0;
  } else {
    return _bind$2;
  }
  return _M0MP211localreview4amqp7Session28with__authentication_2einner([_tmp], vhost, "en_US", channel_max, frame_max, heartbeat, stream_bodies, properties);
}
function _M0MP211localreview4amqp7Session3new(username, password, vhost$46$opt, channel_max$46$opt, frame_max$46$opt, heartbeat$46$opt, stream_bodies$46$opt, properties$46$opt) {
  let vhost;
  if (vhost$46$opt === undefined) {
    vhost = "/";
  } else {
    const _Some = vhost$46$opt;
    vhost = _Some;
  }
  let channel_max;
  if (channel_max$46$opt === undefined) {
    channel_max = 64;
  } else {
    const _Some = channel_max$46$opt;
    channel_max = _Some;
  }
  let frame_max;
  if (frame_max$46$opt === undefined) {
    frame_max = 131072;
  } else {
    const _Some = frame_max$46$opt;
    frame_max = _Some;
  }
  let heartbeat;
  if (heartbeat$46$opt === undefined) {
    heartbeat = 60;
  } else {
    const _Some = heartbeat$46$opt;
    heartbeat = _Some;
  }
  const stream_bodies = stream_bodies$46$opt === -1 ? false : stream_bodies$46$opt;
  let properties;
  if (properties$46$opt.$tag === 1) {
    const _Some = properties$46$opt;
    properties = _Some._0;
  } else {
    properties = [];
  }
  return _M0MP211localreview4amqp7Session11new_2einner(username, password, vhost, channel_max, frame_max, heartbeat, stream_bodies, properties);
}
function _M0MP211localreview4amqp7Session6status(self) {
  return self.state;
}
function _M0MP211localreview4amqp9Assembler7discard(self, channel) {
  let p;
  _L: {
    const _bind$2 = _M0MPB3Map3getGiRP211localreview4amqp7PendingE(self.pending, channel);
    if (_bind$2 === undefined) {
      return;
    } else {
      const _Some = _bind$2;
      const _p = _Some;
      p = _p;
      break _L;
    }
  }
  self.buffered = self.buffered - p.body.length | 0;
  const _tmp = self.metadata;
  const _tmp$2 = p.method_payload.length;
  let _tmp$3;
  let h;
  _L$2: {
    _L$3: {
      const _bind$2 = p.header;
      if (_bind$2 === undefined) {
        _tmp$3 = 0;
      } else {
        const _Some = _bind$2;
        const _h = _Some;
        h = _h;
        break _L$3;
      }
      break _L$2;
    }
    _tmp$3 = h.length;
  }
  self.metadata = _tmp - (_tmp$2 + _tmp$3 | 0) | 0;
  _M0MPB3Map6removeGiRP211localreview4amqp7PendingE(self.pending, channel);
}
function _M0MP211localreview4amqp15StreamAssembler7discard(self, channel) {
  let p;
  _L: {
    const _bind$2 = _M0MPB3Map3getGiRP211localreview4amqp13StreamPendingE(self.pending, channel);
    if (_bind$2 === undefined) {
      return;
    } else {
      const _Some = _bind$2;
      const _p = _Some;
      p = _p;
      break _L;
    }
  }
  self.metadata = self.metadata - p.metadata | 0;
  _M0MPB3Map6removeGiRP211localreview4amqp13StreamPendingE(self.pending, channel);
}
function _M0MP211localreview4amqp7Session6closed(self) {
  const _it = _M0MPB3Map5iter2GisE(self.channels);
  while (true) {
    let channel;
    _L: {
      const _bind$2 = _M0MPB5Iter24nextGisE(_it);
      if (_bind$2 === undefined) {
        break;
      } else {
        const _Some = _bind$2;
        const _x = _Some;
        const _channel = _x._0;
        channel = _channel;
        break _L;
      }
    }
    _M0MP211localreview4amqp9Assembler7discard(self.assembler, channel);
    _M0MP211localreview4amqp15StreamAssembler7discard(self.stream_assembler, channel);
    continue;
  }
  _M0MPB3Map5clearGisE(self.channels);
  _M0MPB3Map5clearGibE(self.paused);
  _M0MPC15array5Array5clearGRP211localreview4amqp14AuthenticationE(self.auth);
  self.secret_update = false;
  _M0MPB3Map5clearGimE(self.sending);
  self.state = "closed";
}
function _M0MP211localreview4amqp7Session6limits(self) {
  return { _0: self.channel_limit, _1: self.frame_limit, _2: self.heartbeat_seconds };
}
function _M0MP211localreview4amqp7Session12take__output(self) {
  const out = _M0MPC15array5Array4copyGsE(self.output);
  _M0MPC15array5Array5clearGRP211localreview4amqp14AuthenticationE(self.output);
  return out;
}
function _M0FP211localreview4amqp8validate(frame, max_size) {
  if (frame.channel < 0 || frame.channel > 65535) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid channel"));
  }
  if (frame.payload.length > (max_size - 8 | 0)) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("frame exceeds limit"));
  }
  const _bind$2 = frame.kind;
  switch (_bind$2) {
    case 1: {
      if (frame.payload.length < 4) {
        return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("method frame requires class and method"));
      } else {
        return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
      }
    }
    case 2: {
      if (frame.channel === 0 || frame.payload.length < 14) {
        return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid content header"));
      } else {
        return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
      }
    }
    case 3: {
      if (frame.channel === 0) {
        return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("body on channel zero"));
      } else {
        return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
      }
    }
    case 8: {
      if (frame.channel !== 0 || frame.payload.length !== 0) {
        return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid heartbeat"));
      } else {
        return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
      }
    }
    default: {
      return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unknown frame type"));
    }
  }
}
function _M0MP211localreview4amqp5Frame14encode_2einner(self, max_size) {
  if (max_size < 8 || max_size > 16777216) {
    return new _M0DTPC16result6ResultGzRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid frame limit"));
  }
  const _bind$2 = _M0FP211localreview4amqp8validate(self, max_size);
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _ok._0;
  } else {
    return _bind$2;
  }
  const n = self.payload.length;
  const out = [self.kind & 255, self.channel >> 8 & 255, self.channel & 255, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, n & 255];
  const _bind$3 = self.payload;
  const _bind$4 = _bind$3.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$4) {
      const b = _bind$3[_];
      _M0MPC15array5Array4pushGyE(out, b);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0MPC15array5Array4pushGyE(out, 206);
  return new _M0DTPC16result6ResultGzRP211localreview4amqp10FrameErrorE2Ok(_M0MPC15bytes5Bytes11from__array(new _M0TPB9ArrayViewGyE(out, 0, out.length)));
}
function _M0FP211localreview4amqp15method__channel(class_id, channel) {
  if (channel < 0 || (channel > 65535 || _M0IP016_24default__implPB2Eq10not__equalGbE(class_id === 10, channel === 0))) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("connection methods require channel zero; other methods require a nonzero channel"));
  } else {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
  }
}
function _M0FP211localreview4amqp12method__spec(class_id, method_id) {
  _L: {
    switch (class_id) {
      case 10: {
        switch (method_id) {
          case 10: {
            return new _M0TP211localreview4amqp10MethodSpec(10, 10, "connection.start", [{ _0: "version-major", _1: 1 }, { _0: "version-minor", _1: 1 }, { _0: "server-properties", _1: 7 }, { _0: "mechanisms", _1: 6 }, { _0: "locales", _1: 6 }], false);
          }
          case 11: {
            return new _M0TP211localreview4amqp10MethodSpec(10, 11, "connection.start-ok", [{ _0: "client-properties", _1: 7 }, { _0: "mechanism", _1: 5 }, { _0: "response", _1: 6 }, { _0: "locale", _1: 5 }], false);
          }
          case 20: {
            return new _M0TP211localreview4amqp10MethodSpec(10, 20, "connection.secure", [{ _0: "challenge", _1: 6 }], false);
          }
          case 21: {
            return new _M0TP211localreview4amqp10MethodSpec(10, 21, "connection.secure-ok", [{ _0: "response", _1: 6 }], false);
          }
          case 30: {
            return new _M0TP211localreview4amqp10MethodSpec(10, 30, "connection.tune", [{ _0: "channel-max", _1: 2 }, { _0: "frame-max", _1: 3 }, { _0: "heartbeat", _1: 2 }], false);
          }
          case 31: {
            return new _M0TP211localreview4amqp10MethodSpec(10, 31, "connection.tune-ok", [{ _0: "channel-max", _1: 2 }, { _0: "frame-max", _1: 3 }, { _0: "heartbeat", _1: 2 }], false);
          }
          case 40: {
            return new _M0TP211localreview4amqp10MethodSpec(10, 40, "connection.open", [{ _0: "virtual-host", _1: 5 }, { _0: "reserved-1", _1: 5 }, { _0: "reserved-2", _1: 0 }], false);
          }
          case 41: {
            return new _M0TP211localreview4amqp10MethodSpec(10, 41, "connection.open-ok", [{ _0: "reserved-1", _1: 5 }], false);
          }
          case 50: {
            return new _M0TP211localreview4amqp10MethodSpec(10, 50, "connection.close", [{ _0: "reply-code", _1: 2 }, { _0: "reply-text", _1: 5 }, { _0: "class-id", _1: 2 }, { _0: "method-id", _1: 2 }], false);
          }
          case 51: {
            return new _M0TP211localreview4amqp10MethodSpec(10, 51, "connection.close-ok", [], false);
          }
          case 60: {
            return new _M0TP211localreview4amqp10MethodSpec(10, 60, "connection.blocked", [{ _0: "reason", _1: 5 }], false);
          }
          case 61: {
            return new _M0TP211localreview4amqp10MethodSpec(10, 61, "connection.unblocked", [], false);
          }
          case 70: {
            return new _M0TP211localreview4amqp10MethodSpec(10, 70, "connection.update-secret", [{ _0: "new-secret", _1: 6 }, { _0: "reason", _1: 5 }], false);
          }
          case 71: {
            return new _M0TP211localreview4amqp10MethodSpec(10, 71, "connection.update-secret-ok", [], false);
          }
          default: {
            break _L;
          }
        }
      }
      case 20: {
        switch (method_id) {
          case 10: {
            return new _M0TP211localreview4amqp10MethodSpec(20, 10, "channel.open", [{ _0: "reserved-1", _1: 5 }], false);
          }
          case 11: {
            return new _M0TP211localreview4amqp10MethodSpec(20, 11, "channel.open-ok", [{ _0: "reserved-1", _1: 6 }], false);
          }
          case 20: {
            return new _M0TP211localreview4amqp10MethodSpec(20, 20, "channel.flow", [{ _0: "active", _1: 0 }], false);
          }
          case 21: {
            return new _M0TP211localreview4amqp10MethodSpec(20, 21, "channel.flow-ok", [{ _0: "active", _1: 0 }], false);
          }
          case 40: {
            return new _M0TP211localreview4amqp10MethodSpec(20, 40, "channel.close", [{ _0: "reply-code", _1: 2 }, { _0: "reply-text", _1: 5 }, { _0: "class-id", _1: 2 }, { _0: "method-id", _1: 2 }], false);
          }
          case 41: {
            return new _M0TP211localreview4amqp10MethodSpec(20, 41, "channel.close-ok", [], false);
          }
          default: {
            break _L;
          }
        }
      }
      case 40: {
        switch (method_id) {
          case 10: {
            return new _M0TP211localreview4amqp10MethodSpec(40, 10, "exchange.declare", [{ _0: "reserved-1", _1: 2 }, { _0: "exchange", _1: 5 }, { _0: "type", _1: 5 }, { _0: "passive", _1: 0 }, { _0: "durable", _1: 0 }, { _0: "auto-delete", _1: 0 }, { _0: "internal", _1: 0 }, { _0: "no-wait", _1: 0 }, { _0: "arguments", _1: 7 }], false);
          }
          case 11: {
            return new _M0TP211localreview4amqp10MethodSpec(40, 11, "exchange.declare-ok", [], false);
          }
          case 20: {
            return new _M0TP211localreview4amqp10MethodSpec(40, 20, "exchange.delete", [{ _0: "reserved-1", _1: 2 }, { _0: "exchange", _1: 5 }, { _0: "if-unused", _1: 0 }, { _0: "no-wait", _1: 0 }], false);
          }
          case 21: {
            return new _M0TP211localreview4amqp10MethodSpec(40, 21, "exchange.delete-ok", [], false);
          }
          case 30: {
            return new _M0TP211localreview4amqp10MethodSpec(40, 30, "exchange.bind", [{ _0: "reserved-1", _1: 2 }, { _0: "destination", _1: 5 }, { _0: "source", _1: 5 }, { _0: "routing-key", _1: 5 }, { _0: "no-wait", _1: 0 }, { _0: "arguments", _1: 7 }], false);
          }
          case 31: {
            return new _M0TP211localreview4amqp10MethodSpec(40, 31, "exchange.bind-ok", [], false);
          }
          case 40: {
            return new _M0TP211localreview4amqp10MethodSpec(40, 40, "exchange.unbind", [{ _0: "reserved-1", _1: 2 }, { _0: "destination", _1: 5 }, { _0: "source", _1: 5 }, { _0: "routing-key", _1: 5 }, { _0: "no-wait", _1: 0 }, { _0: "arguments", _1: 7 }], false);
          }
          case 51: {
            return new _M0TP211localreview4amqp10MethodSpec(40, 51, "exchange.unbind-ok", [], false);
          }
          default: {
            break _L;
          }
        }
      }
      case 50: {
        switch (method_id) {
          case 10: {
            return new _M0TP211localreview4amqp10MethodSpec(50, 10, "queue.declare", [{ _0: "reserved-1", _1: 2 }, { _0: "queue", _1: 5 }, { _0: "passive", _1: 0 }, { _0: "durable", _1: 0 }, { _0: "exclusive", _1: 0 }, { _0: "auto-delete", _1: 0 }, { _0: "no-wait", _1: 0 }, { _0: "arguments", _1: 7 }], false);
          }
          case 11: {
            return new _M0TP211localreview4amqp10MethodSpec(50, 11, "queue.declare-ok", [{ _0: "queue", _1: 5 }, { _0: "message-count", _1: 3 }, { _0: "consumer-count", _1: 3 }], false);
          }
          case 20: {
            return new _M0TP211localreview4amqp10MethodSpec(50, 20, "queue.bind", [{ _0: "reserved-1", _1: 2 }, { _0: "queue", _1: 5 }, { _0: "exchange", _1: 5 }, { _0: "routing-key", _1: 5 }, { _0: "no-wait", _1: 0 }, { _0: "arguments", _1: 7 }], false);
          }
          case 21: {
            return new _M0TP211localreview4amqp10MethodSpec(50, 21, "queue.bind-ok", [], false);
          }
          case 50: {
            return new _M0TP211localreview4amqp10MethodSpec(50, 50, "queue.unbind", [{ _0: "reserved-1", _1: 2 }, { _0: "queue", _1: 5 }, { _0: "exchange", _1: 5 }, { _0: "routing-key", _1: 5 }, { _0: "arguments", _1: 7 }], false);
          }
          case 51: {
            return new _M0TP211localreview4amqp10MethodSpec(50, 51, "queue.unbind-ok", [], false);
          }
          case 30: {
            return new _M0TP211localreview4amqp10MethodSpec(50, 30, "queue.purge", [{ _0: "reserved-1", _1: 2 }, { _0: "queue", _1: 5 }, { _0: "no-wait", _1: 0 }], false);
          }
          case 31: {
            return new _M0TP211localreview4amqp10MethodSpec(50, 31, "queue.purge-ok", [{ _0: "message-count", _1: 3 }], false);
          }
          case 40: {
            return new _M0TP211localreview4amqp10MethodSpec(50, 40, "queue.delete", [{ _0: "reserved-1", _1: 2 }, { _0: "queue", _1: 5 }, { _0: "if-unused", _1: 0 }, { _0: "if-empty", _1: 0 }, { _0: "no-wait", _1: 0 }], false);
          }
          case 41: {
            return new _M0TP211localreview4amqp10MethodSpec(50, 41, "queue.delete-ok", [{ _0: "message-count", _1: 3 }], false);
          }
          default: {
            break _L;
          }
        }
      }
      case 60: {
        switch (method_id) {
          case 10: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 10, "basic.qos", [{ _0: "prefetch-size", _1: 3 }, { _0: "prefetch-count", _1: 2 }, { _0: "global", _1: 0 }], false);
          }
          case 11: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 11, "basic.qos-ok", [], false);
          }
          case 20: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 20, "basic.consume", [{ _0: "reserved-1", _1: 2 }, { _0: "queue", _1: 5 }, { _0: "consumer-tag", _1: 5 }, { _0: "no-local", _1: 0 }, { _0: "no-ack", _1: 0 }, { _0: "exclusive", _1: 0 }, { _0: "no-wait", _1: 0 }, { _0: "arguments", _1: 7 }], false);
          }
          case 21: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 21, "basic.consume-ok", [{ _0: "consumer-tag", _1: 5 }], false);
          }
          case 30: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 30, "basic.cancel", [{ _0: "consumer-tag", _1: 5 }, { _0: "no-wait", _1: 0 }], false);
          }
          case 31: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 31, "basic.cancel-ok", [{ _0: "consumer-tag", _1: 5 }], false);
          }
          case 40: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 40, "basic.publish", [{ _0: "reserved-1", _1: 2 }, { _0: "exchange", _1: 5 }, { _0: "routing-key", _1: 5 }, { _0: "mandatory", _1: 0 }, { _0: "immediate", _1: 0 }], true);
          }
          case 50: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 50, "basic.return", [{ _0: "reply-code", _1: 2 }, { _0: "reply-text", _1: 5 }, { _0: "exchange", _1: 5 }, { _0: "routing-key", _1: 5 }], true);
          }
          case 60: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 60, "basic.deliver", [{ _0: "consumer-tag", _1: 5 }, { _0: "delivery-tag", _1: 4 }, { _0: "redelivered", _1: 0 }, { _0: "exchange", _1: 5 }, { _0: "routing-key", _1: 5 }], true);
          }
          case 70: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 70, "basic.get", [{ _0: "reserved-1", _1: 2 }, { _0: "queue", _1: 5 }, { _0: "no-ack", _1: 0 }], false);
          }
          case 71: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 71, "basic.get-ok", [{ _0: "delivery-tag", _1: 4 }, { _0: "redelivered", _1: 0 }, { _0: "exchange", _1: 5 }, { _0: "routing-key", _1: 5 }, { _0: "message-count", _1: 3 }], true);
          }
          case 72: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 72, "basic.get-empty", [{ _0: "reserved-1", _1: 5 }], false);
          }
          case 80: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 80, "basic.ack", [{ _0: "delivery-tag", _1: 4 }, { _0: "multiple", _1: 0 }], false);
          }
          case 90: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 90, "basic.reject", [{ _0: "delivery-tag", _1: 4 }, { _0: "requeue", _1: 0 }], false);
          }
          case 100: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 100, "basic.recover-async", [{ _0: "requeue", _1: 0 }], false);
          }
          case 110: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 110, "basic.recover", [{ _0: "requeue", _1: 0 }], false);
          }
          case 111: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 111, "basic.recover-ok", [], false);
          }
          case 120: {
            return new _M0TP211localreview4amqp10MethodSpec(60, 120, "basic.nack", [{ _0: "delivery-tag", _1: 4 }, { _0: "multiple", _1: 0 }, { _0: "requeue", _1: 0 }], false);
          }
          default: {
            break _L;
          }
        }
      }
      case 90: {
        switch (method_id) {
          case 10: {
            return new _M0TP211localreview4amqp10MethodSpec(90, 10, "tx.select", [], false);
          }
          case 11: {
            return new _M0TP211localreview4amqp10MethodSpec(90, 11, "tx.select-ok", [], false);
          }
          case 20: {
            return new _M0TP211localreview4amqp10MethodSpec(90, 20, "tx.commit", [], false);
          }
          case 21: {
            return new _M0TP211localreview4amqp10MethodSpec(90, 21, "tx.commit-ok", [], false);
          }
          case 30: {
            return new _M0TP211localreview4amqp10MethodSpec(90, 30, "tx.rollback", [], false);
          }
          case 31: {
            return new _M0TP211localreview4amqp10MethodSpec(90, 31, "tx.rollback-ok", [], false);
          }
          default: {
            break _L;
          }
        }
      }
      case 85: {
        switch (method_id) {
          case 10: {
            return new _M0TP211localreview4amqp10MethodSpec(85, 10, "confirm.select", [{ _0: "nowait", _1: 0 }], false);
          }
          case 11: {
            return new _M0TP211localreview4amqp10MethodSpec(85, 11, "confirm.select-ok", [], false);
          }
          default: {
            break _L;
          }
        }
      }
      default: {
        break _L;
      }
    }
  }
  return undefined;
}
function _M0FP211localreview4amqp15write__argument(w, kind, value) {
  _L: {
    let t;
    _L$2: {
      let s;
      _L$3: {
        let s$2;
        _L$4: {
          let n;
          _L$5: {
            let n$2;
            _L$6: {
              let n$3;
              _L$7: {
                let n$4;
                _L$8: {
                  switch (kind) {
                    case 1: {
                      if (value.$tag === 1) {
                        const _Octet = value;
                        const _n = _Octet._0;
                        n$4 = _n;
                        break _L$8;
                      } else {
                        break _L;
                      }
                    }
                    case 2: {
                      if (value.$tag === 2) {
                        const _Short = value;
                        const _n = _Short._0;
                        n$3 = _n;
                        break _L$7;
                      } else {
                        break _L;
                      }
                    }
                    case 3: {
                      if (value.$tag === 3) {
                        const _Long = value;
                        const _n = _Long._0;
                        n$2 = _n;
                        break _L$6;
                      } else {
                        break _L;
                      }
                    }
                    case 4: {
                      if (value.$tag === 4) {
                        const _LongLong = value;
                        const _n = _LongLong._0;
                        n = _n;
                        break _L$5;
                      } else {
                        break _L;
                      }
                    }
                    case 5: {
                      if (value.$tag === 5) {
                        const _ShortString = value;
                        const _s = _ShortString._0;
                        s$2 = _s;
                        break _L$4;
                      } else {
                        break _L;
                      }
                    }
                    case 6: {
                      if (value.$tag === 6) {
                        const _LongString = value;
                        const _s = _LongString._0;
                        s = _s;
                        break _L$3;
                      } else {
                        break _L;
                      }
                    }
                    case 7: {
                      if (value.$tag === 7) {
                        const _Table = value;
                        const _t = _Table._0;
                        t = _t;
                        break _L$2;
                      } else {
                        break _L;
                      }
                    }
                    default: {
                      break _L;
                    }
                  }
                }
                const _bind$2 = _M0FP211localreview4amqp12checked__int(n$4, 0, 255);
                let _tmp;
                if (_bind$2.$tag === 1) {
                  const _ok = _bind$2;
                  _tmp = _ok._0;
                } else {
                  return _bind$2;
                }
                return _M0MP211localreview4amqp10WireWriter4uint(w, _tmp, 1);
              }
              const _bind$2 = _M0FP211localreview4amqp12checked__int(n$3, 0, 65535);
              let _tmp;
              if (_bind$2.$tag === 1) {
                const _ok = _bind$2;
                _tmp = _ok._0;
              } else {
                return _bind$2;
              }
              return _M0MP211localreview4amqp10WireWriter4uint(w, _tmp, 2);
            }
            return _M0MP211localreview4amqp10WireWriter4uint(w, _M0MPC14uint4UInt10to__uint64(n$2), 4);
          }
          return _M0MP211localreview4amqp10WireWriter4uint(w, n, 8);
        }
        return _M0MP211localreview4amqp10WireWriter8shortstr(w, s$2);
      }
      return _M0MP211localreview4amqp10WireWriter7longstr(w, s);
    }
    return _M0FP211localreview4amqp12write__table(w, t, 0);
  }
  return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("method argument type mismatch"));
}
function _M0MP211localreview4amqp6Method14encode_2einner(self, channel, max_size) {
  const _bind$2 = _M0FP211localreview4amqp15method__channel(self.class_id, channel);
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _ok._0;
  } else {
    return _bind$2;
  }
  let spec;
  const _bind$3 = _M0FP211localreview4amqp12method__spec(self.class_id, self.method_id);
  if (_bind$3 === undefined) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp5FrameRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unknown class or method id"));
  } else {
    const _Some = _bind$3;
    const _spec = _Some;
    spec = _spec;
  }
  if (self.arguments.length !== spec.fields.length) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp5FrameRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("method argument count mismatch"));
  }
  const w = _M0MP211localreview4amqp10WireWriter3new();
  const _bind$4 = _M0MP211localreview4amqp10WireWriter4uint(w, _M0MPC13int3Int10to__uint64(self.class_id), 2);
  if (_bind$4.$tag === 1) {
    const _ok = _bind$4;
    _ok._0;
  } else {
    return _bind$4;
  }
  const _bind$5 = _M0MP211localreview4amqp10WireWriter4uint(w, _M0MPC13int3Int10to__uint64(self.method_id), 2);
  if (_bind$5.$tag === 1) {
    const _ok = _bind$5;
    _ok._0;
  } else {
    return _bind$5;
  }
  const bits = new _M0TPB8MutLocalGmE(0n);
  const used = new _M0TPB8MutLocalGiE(0);
  const _bind$6 = spec.fields;
  const _bind$7 = _bind$6.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$7) {
      const _foreach_element = _bind$6[i];
      let kind;
      _L: {
        const _kind = _foreach_element._1;
        kind = _kind;
        break _L;
      }
      if (_M0IP211localreview4amqp12ArgumentKindPB2Eq5equal(kind, 0)) {
        let bit;
        const _bind$8 = _M0MPC15array5Array2atGRPB4JsonE(self.arguments, i);
        if (_bind$8.$tag === 0) {
          const _Bit = _bind$8;
          const _value = _Bit._0;
          bit = _value;
        } else {
          return new _M0DTPC16result6ResultGRP211localreview4amqp5FrameRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("method argument type mismatch"));
        }
        if (bit) {
          bits.val = BigInt.asUintN(64, bits.val | BigInt.asUintN(64, 1n << BigInt(used.val & 63)));
        }
        used.val = used.val + 1 | 0;
        if (used.val === 8) {
          const _bind$9 = _M0MP211localreview4amqp10WireWriter4uint(w, bits.val, 1);
          if (_bind$9.$tag === 1) {
            const _ok = _bind$9;
            _ok._0;
          } else {
            return _bind$9;
          }
          bits.val = 0n;
          used.val = 0;
        }
      } else {
        if (used.val > 0) {
          const _bind$8 = _M0MP211localreview4amqp10WireWriter4uint(w, bits.val, 1);
          if (_bind$8.$tag === 1) {
            const _ok = _bind$8;
            _ok._0;
          } else {
            return _bind$8;
          }
          bits.val = 0n;
          used.val = 0;
        }
        const _bind$8 = _M0FP211localreview4amqp15write__argument(w, kind, _M0MPC15array5Array2atGRPB4JsonE(self.arguments, i));
        if (_bind$8.$tag === 1) {
          const _ok = _bind$8;
          _ok._0;
        } else {
          return _bind$8;
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (used.val > 0) {
    const _bind$8 = _M0MP211localreview4amqp10WireWriter4uint(w, bits.val, 1);
    if (_bind$8.$tag === 1) {
      const _ok = _bind$8;
      _ok._0;
    } else {
      return _bind$8;
    }
  }
  const _bind$8 = w.bytes;
  const frame = new _M0TP211localreview4amqp5Frame(1, channel, _M0MPC15bytes5Bytes11from__array(new _M0TPB9ArrayViewGyE(_bind$8, 0, _bind$8.length)));
  if (max_size < 8 || max_size > 16777216) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp5FrameRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid frame limit"));
  }
  const _bind$9 = _M0FP211localreview4amqp8validate(frame, max_size);
  if (_bind$9.$tag === 1) {
    const _ok = _bind$9;
    _ok._0;
  } else {
    return _bind$9;
  }
  return new _M0DTPC16result6ResultGRP211localreview4amqp5FrameRP211localreview4amqp10FrameErrorE2Ok(frame);
}
function _M0FP211localreview4amqp22method__spec__by__name(name) {
  switch (name) {
    case "connection.start": {
      return _M0FP211localreview4amqp12method__spec(10, 10);
    }
    case "connection.start-ok": {
      return _M0FP211localreview4amqp12method__spec(10, 11);
    }
    case "connection.secure": {
      return _M0FP211localreview4amqp12method__spec(10, 20);
    }
    case "connection.secure-ok": {
      return _M0FP211localreview4amqp12method__spec(10, 21);
    }
    case "connection.tune": {
      return _M0FP211localreview4amqp12method__spec(10, 30);
    }
    case "connection.tune-ok": {
      return _M0FP211localreview4amqp12method__spec(10, 31);
    }
    case "connection.open": {
      return _M0FP211localreview4amqp12method__spec(10, 40);
    }
    case "connection.open-ok": {
      return _M0FP211localreview4amqp12method__spec(10, 41);
    }
    case "connection.close": {
      return _M0FP211localreview4amqp12method__spec(10, 50);
    }
    case "connection.close-ok": {
      return _M0FP211localreview4amqp12method__spec(10, 51);
    }
    case "connection.blocked": {
      return _M0FP211localreview4amqp12method__spec(10, 60);
    }
    case "connection.unblocked": {
      return _M0FP211localreview4amqp12method__spec(10, 61);
    }
    case "connection.update-secret": {
      return _M0FP211localreview4amqp12method__spec(10, 70);
    }
    case "connection.update-secret-ok": {
      return _M0FP211localreview4amqp12method__spec(10, 71);
    }
    case "channel.open": {
      return _M0FP211localreview4amqp12method__spec(20, 10);
    }
    case "channel.open-ok": {
      return _M0FP211localreview4amqp12method__spec(20, 11);
    }
    case "channel.flow": {
      return _M0FP211localreview4amqp12method__spec(20, 20);
    }
    case "channel.flow-ok": {
      return _M0FP211localreview4amqp12method__spec(20, 21);
    }
    case "channel.close": {
      return _M0FP211localreview4amqp12method__spec(20, 40);
    }
    case "channel.close-ok": {
      return _M0FP211localreview4amqp12method__spec(20, 41);
    }
    case "exchange.declare": {
      return _M0FP211localreview4amqp12method__spec(40, 10);
    }
    case "exchange.declare-ok": {
      return _M0FP211localreview4amqp12method__spec(40, 11);
    }
    case "exchange.delete": {
      return _M0FP211localreview4amqp12method__spec(40, 20);
    }
    case "exchange.delete-ok": {
      return _M0FP211localreview4amqp12method__spec(40, 21);
    }
    case "exchange.bind": {
      return _M0FP211localreview4amqp12method__spec(40, 30);
    }
    case "exchange.bind-ok": {
      return _M0FP211localreview4amqp12method__spec(40, 31);
    }
    case "exchange.unbind": {
      return _M0FP211localreview4amqp12method__spec(40, 40);
    }
    case "exchange.unbind-ok": {
      return _M0FP211localreview4amqp12method__spec(40, 51);
    }
    case "queue.declare": {
      return _M0FP211localreview4amqp12method__spec(50, 10);
    }
    case "queue.declare-ok": {
      return _M0FP211localreview4amqp12method__spec(50, 11);
    }
    case "queue.bind": {
      return _M0FP211localreview4amqp12method__spec(50, 20);
    }
    case "queue.bind-ok": {
      return _M0FP211localreview4amqp12method__spec(50, 21);
    }
    case "queue.unbind": {
      return _M0FP211localreview4amqp12method__spec(50, 50);
    }
    case "queue.unbind-ok": {
      return _M0FP211localreview4amqp12method__spec(50, 51);
    }
    case "queue.purge": {
      return _M0FP211localreview4amqp12method__spec(50, 30);
    }
    case "queue.purge-ok": {
      return _M0FP211localreview4amqp12method__spec(50, 31);
    }
    case "queue.delete": {
      return _M0FP211localreview4amqp12method__spec(50, 40);
    }
    case "queue.delete-ok": {
      return _M0FP211localreview4amqp12method__spec(50, 41);
    }
    case "basic.qos": {
      return _M0FP211localreview4amqp12method__spec(60, 10);
    }
    case "basic.qos-ok": {
      return _M0FP211localreview4amqp12method__spec(60, 11);
    }
    case "basic.consume": {
      return _M0FP211localreview4amqp12method__spec(60, 20);
    }
    case "basic.consume-ok": {
      return _M0FP211localreview4amqp12method__spec(60, 21);
    }
    case "basic.cancel": {
      return _M0FP211localreview4amqp12method__spec(60, 30);
    }
    case "basic.cancel-ok": {
      return _M0FP211localreview4amqp12method__spec(60, 31);
    }
    case "basic.publish": {
      return _M0FP211localreview4amqp12method__spec(60, 40);
    }
    case "basic.return": {
      return _M0FP211localreview4amqp12method__spec(60, 50);
    }
    case "basic.deliver": {
      return _M0FP211localreview4amqp12method__spec(60, 60);
    }
    case "basic.get": {
      return _M0FP211localreview4amqp12method__spec(60, 70);
    }
    case "basic.get-ok": {
      return _M0FP211localreview4amqp12method__spec(60, 71);
    }
    case "basic.get-empty": {
      return _M0FP211localreview4amqp12method__spec(60, 72);
    }
    case "basic.ack": {
      return _M0FP211localreview4amqp12method__spec(60, 80);
    }
    case "basic.reject": {
      return _M0FP211localreview4amqp12method__spec(60, 90);
    }
    case "basic.recover-async": {
      return _M0FP211localreview4amqp12method__spec(60, 100);
    }
    case "basic.recover": {
      return _M0FP211localreview4amqp12method__spec(60, 110);
    }
    case "basic.recover-ok": {
      return _M0FP211localreview4amqp12method__spec(60, 111);
    }
    case "basic.nack": {
      return _M0FP211localreview4amqp12method__spec(60, 120);
    }
    case "tx.select": {
      return _M0FP211localreview4amqp12method__spec(90, 10);
    }
    case "tx.select-ok": {
      return _M0FP211localreview4amqp12method__spec(90, 11);
    }
    case "tx.commit": {
      return _M0FP211localreview4amqp12method__spec(90, 20);
    }
    case "tx.commit-ok": {
      return _M0FP211localreview4amqp12method__spec(90, 21);
    }
    case "tx.rollback": {
      return _M0FP211localreview4amqp12method__spec(90, 30);
    }
    case "tx.rollback-ok": {
      return _M0FP211localreview4amqp12method__spec(90, 31);
    }
    case "confirm.select": {
      return _M0FP211localreview4amqp12method__spec(85, 10);
    }
    case "confirm.select-ok": {
      return _M0FP211localreview4amqp12method__spec(85, 11);
    }
    default: {
      return undefined;
    }
  }
}
function _M0MP211localreview4amqp6Method3new(name, arguments_) {
  let spec;
  const _bind$2 = _M0FP211localreview4amqp22method__spec__by__name(name);
  if (_bind$2 === undefined) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp6MethodRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unknown method name"));
  } else {
    const _Some = _bind$2;
    const _spec = _Some;
    spec = _spec;
  }
  return new _M0DTPC16result6ResultGRP211localreview4amqp6MethodRP211localreview4amqp10FrameErrorE2Ok(new _M0TP211localreview4amqp6Method(spec.class_id, spec.method_id, arguments_));
}
function _M0MP211localreview4amqp7Session4emit(self, name, args, channel) {
  const _tmp = self.output;
  const _bind$2 = _M0MP211localreview4amqp6Method3new(name, args);
  let _tmp$2;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _tmp$2 = _ok._0;
  } else {
    return _bind$2;
  }
  const _bind$3 = _M0MP211localreview4amqp6Method14encode_2einner(_tmp$2, channel, self.frame_limit);
  let _tmp$3;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _tmp$3 = _ok._0;
  } else {
    return _bind$3;
  }
  const _bind$4 = _M0MP211localreview4amqp5Frame14encode_2einner(_tmp$3, self.frame_limit);
  let _tmp$4;
  if (_bind$4.$tag === 1) {
    const _ok = _bind$4;
    _tmp$4 = _ok._0;
  } else {
    return _bind$4;
  }
  return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(_M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(_tmp, _tmp$4));
}
function _M0MP211localreview4amqp7Session4send(self, channel, command) {
  if (_M0MPB3Map8containsGimE(self.sending, channel)) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("method interrupts outgoing content"));
  }
  if (_M0IP016_24default__implPB2Eq10not__equalGsE(self.state, "ready")) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("connection is not ready"));
  }
  let spec;
  const _bind$2 = _M0FP211localreview4amqp12method__spec(command.class_id, command.method_id);
  if (_bind$2 === undefined) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unknown command"));
  } else {
    const _Some = _bind$2;
    const _spec = _Some;
    spec = _spec;
  }
  const name = spec.name;
  if (!_M0MPC15array5Array8containsGsE(["connection.close", "connection.update-secret", "channel.open", "channel.close", "channel.flow", "exchange.declare", "exchange.delete", "exchange.bind", "exchange.unbind", "queue.declare", "queue.bind", "queue.unbind", "queue.delete", "queue.purge", "basic.qos", "basic.consume", "basic.cancel", "basic.cancel-ok", "basic.get", "basic.ack", "basic.reject", "basic.nack", "basic.recover", "basic.recover-async", "tx.select", "tx.commit", "tx.rollback", "confirm.select"], name)) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unsupported client command"));
  }
  const _bind$3 = _M0MP211localreview4amqp6Method14encode_2einner(command, channel, self.frame_limit);
  let _tmp;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _tmp = _ok._0;
  } else {
    return _bind$3;
  }
  const _bind$4 = _M0MP211localreview4amqp5Frame14encode_2einner(_tmp, self.frame_limit);
  let wire;
  if (_bind$4.$tag === 1) {
    const _ok = _bind$4;
    wire = _ok._0;
  } else {
    return _bind$4;
  }
  if (name === "connection.close") {
    self.state = "closing";
  } else {
    if (name === "connection.update-secret") {
      if (self.secret_update) {
        return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("credential update is already pending"));
      }
      self.secret_update = true;
    } else {
      if (channel < 1 || channel > self.channel_limit) {
        return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid or unavailable channel"));
      } else {
        if (name === "channel.open") {
          if (_M0MPB3Map8containsGisE(self.channels, channel)) {
            return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("channel already allocated"));
          }
          _M0MPB3Map3setGisE(self.channels, channel, "opening");
        } else {
          if (_M0IP016_24default__implPB2Eq10not__equalGOsE(_M0MPB3Map3getGisE(self.channels, channel), "open")) {
            return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("channel is not open"));
          }
          if (spec.carries_content) {
            return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("use publish for content"));
          }
          if (name === "channel.close") {
            _M0MPB3Map3setGisE(self.channels, channel, "closing");
          }
        }
      }
    }
  }
  return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(_M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(self.output, wire));
}
function _M0FP211localreview4amqp21basic__property__spec() {
  return [{ _0: "content-type", _1: 5 }, { _0: "content-encoding", _1: 5 }, { _0: "headers", _1: 7 }, { _0: "delivery-mode", _1: 1 }, { _0: "priority", _1: 1 }, { _0: "correlation-id", _1: 5 }, { _0: "reply-to", _1: 5 }, { _0: "expiration", _1: 5 }, { _0: "message-id", _1: 5 }, { _0: "timestamp", _1: 4 }, { _0: "type", _1: 5 }, { _0: "user-id", _1: 5 }, { _0: "app-id", _1: 5 }, { _0: "cluster-id", _1: 5 }];
}
function _M0MP211localreview4amqp11BasicHeader14encode_2einner(self, channel, max_size) {
  if (channel < 1 || (channel > 65535 || (max_size < 8 || max_size > 16777216))) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp5FrameRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid content header channel or frame limit"));
  }
  const spec = _M0FP211localreview4amqp21basic__property__spec();
  if (self.properties.length > spec.length) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp5FrameRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("too many Basic properties"));
  }
  const _bind$2 = [];
  const values = _M0MPB3Map3MapGsRP211localreview4amqp8ArgumentE(new _M0TPB9ArrayViewGUsRP211localreview4amqp8ArgumentEE(_bind$2, 0, 0), undefined);
  const _bind$3 = self.properties;
  const _bind$4 = _bind$3.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$4) {
      const _foreach_element = _bind$3[_];
      let key;
      let value;
      _L: {
        const _key = _foreach_element._0;
        const _value = _foreach_element._1;
        key = _key;
        value = _value;
        break _L;
      }
      if (_M0MPB3Map8containsGsRP211localreview4amqp8ArgumentE(values, key) || !_M0MPC15array5Array3anyGUsRP211localreview4amqp12ArgumentKindEE(spec, (item) => item._0 === key)) {
        return new _M0DTPC16result6ResultGRP211localreview4amqp5FrameRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unknown or duplicate Basic property"));
      }
      _M0MPB3Map3setGsRP211localreview4amqp8ArgumentE(values, key, value);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const flags = new _M0TPB8MutLocalGmE(0n);
  const _bind$5 = spec.length;
  let _tmp$2 = 0;
  while (true) {
    const i = _tmp$2;
    if (i < _bind$5) {
      const _foreach_element = spec[i];
      let key;
      _L: {
        const _key = _foreach_element._0;
        key = _key;
        break _L;
      }
      if (_M0MPB3Map8containsGsRP211localreview4amqp8ArgumentE(values, key)) {
        flags.val = BigInt.asUintN(64, flags.val | BigInt.asUintN(64, 1n << BigInt((15 - i | 0) & 63)));
      }
      _tmp$2 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const w = _M0MP211localreview4amqp10WireWriter3new();
  const _bind$6 = _M0MP211localreview4amqp10WireWriter4uint(w, 60n, 2);
  if (_bind$6.$tag === 1) {
    const _ok = _bind$6;
    _ok._0;
  } else {
    return _bind$6;
  }
  const _bind$7 = _M0MP211localreview4amqp10WireWriter4uint(w, 0n, 2);
  if (_bind$7.$tag === 1) {
    const _ok = _bind$7;
    _ok._0;
  } else {
    return _bind$7;
  }
  const _bind$8 = _M0MP211localreview4amqp10WireWriter4uint(w, self.body_size, 8);
  if (_bind$8.$tag === 1) {
    const _ok = _bind$8;
    _ok._0;
  } else {
    return _bind$8;
  }
  const _bind$9 = _M0MP211localreview4amqp10WireWriter4uint(w, flags.val, 2);
  if (_bind$9.$tag === 1) {
    const _ok = _bind$9;
    _ok._0;
  } else {
    return _bind$9;
  }
  const _bind$10 = spec.length;
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp$3;
    if (_ < _bind$10) {
      const _foreach_element = spec[_];
      let key;
      let kind;
      _L: {
        const _key = _foreach_element._0;
        const _kind = _foreach_element._1;
        key = _key;
        kind = _kind;
        break _L;
      }
      let value;
      _L$2: {
        _L$3: {
          const _bind$11 = _M0MPB3Map3getGsRP211localreview4amqp8ArgumentE(values, key);
          if (_bind$11 === undefined) {
          } else {
            const _Some = _bind$11;
            const _value = _Some;
            value = _value;
            break _L$3;
          }
          break _L$2;
        }
        const _bind$11 = _M0FP211localreview4amqp15write__argument(w, kind, value);
        if (_bind$11.$tag === 1) {
          const _ok = _bind$11;
          _ok._0;
        } else {
          return _bind$11;
        }
      }
      _tmp$3 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$11 = w.bytes;
  const frame = new _M0TP211localreview4amqp5Frame(2, channel, _M0MPC15bytes5Bytes11from__array(new _M0TPB9ArrayViewGyE(_bind$11, 0, _bind$11.length)));
  const _bind$12 = _M0FP211localreview4amqp8validate(frame, max_size);
  if (_bind$12.$tag === 1) {
    const _ok = _bind$12;
    _ok._0;
  } else {
    return _bind$12;
  }
  return new _M0DTPC16result6ResultGRP211localreview4amqp5FrameRP211localreview4amqp10FrameErrorE2Ok(frame);
}
function _M0FP211localreview4amqp23content__frames_2einner(command, channel, properties, body, max_frame_size) {
  let spec;
  const _bind$2 = _M0FP211localreview4amqp12method__spec(command.class_id, command.method_id);
  if (_bind$2 === undefined) {
    return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unknown content method"));
  } else {
    const _Some = _bind$2;
    const _spec = _Some;
    spec = _spec;
  }
  if (!spec.carries_content) {
    return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("method does not carry content"));
  }
  const _bind$3 = _M0MP211localreview4amqp6Method14encode_2einner(command, channel, max_frame_size);
  let first;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    first = _ok._0;
  } else {
    return _bind$3;
  }
  const header = new _M0TP211localreview4amqp11BasicHeader(_M0MPC13int3Int10to__uint64(body.length), properties);
  const _bind$4 = _M0MP211localreview4amqp11BasicHeader14encode_2einner(header, channel, max_frame_size);
  let _tmp;
  if (_bind$4.$tag === 1) {
    const _ok = _bind$4;
    _tmp = _ok._0;
  } else {
    return _bind$4;
  }
  const frames = [first, _tmp];
  const _bind$5 = _M0FP211localreview4amqp12body__frames(channel, body, max_frame_size);
  let _bind$6;
  if (_bind$5.$tag === 1) {
    const _ok = _bind$5;
    _bind$6 = _ok._0;
  } else {
    return _bind$5;
  }
  const _bind$7 = _bind$6.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$7) {
      const frame = _bind$6[_];
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(frames, frame);
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE2Ok(frames);
}
function _M0MP211localreview4amqp7Session15publish_2einner(self, channel, exchange, routing_key, body, properties, mandatory, immediate) {
  if (_M0IP016_24default__implPB2Eq10not__equalGsE(self.state, "ready") || (_M0IP016_24default__implPB2Eq10not__equalGOsE(_M0MPB3Map3getGisE(self.channels, channel), "open") || (self.blocked || _M0IPC16option6OptionPB2Eq5equalGbE(_M0MPB3Map3getGibE(self.paused, channel), true)))) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("publishing is unavailable or blocked"));
  }
  if (_M0MPB3Map8containsGimE(self.sending, channel)) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("publication already in progress on channel"));
  }
  const _bind$2 = _M0MP211localreview4amqp6Method3new("basic.publish", [new _M0DTP211localreview4amqp8Argument5Short(0), new _M0DTP211localreview4amqp8Argument11ShortString(exchange), new _M0DTP211localreview4amqp8Argument11ShortString(routing_key), new _M0DTP211localreview4amqp8Argument3Bit(mandatory), new _M0DTP211localreview4amqp8Argument3Bit(immediate)]);
  let _tmp;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _tmp = _ok._0;
  } else {
    return _bind$2;
  }
  const _bind$3 = _M0FP211localreview4amqp23content__frames_2einner(_tmp, channel, properties, body, self.frame_limit);
  let frames;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    frames = _ok._0;
  } else {
    return _bind$3;
  }
  const _bind$4 = _M0MPC15array5Array3mapGRP211localreview4amqp5FramezEHRP211localreview4amqp10FrameError(frames, (f) => _M0MP211localreview4amqp5Frame14encode_2einner(f, self.frame_limit));
  let data;
  if (_bind$4.$tag === 1) {
    const _ok = _bind$4;
    data = _ok._0;
  } else {
    return _bind$4;
  }
  const _bind$5 = data.length;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp$2;
    if (_ < _bind$5) {
      const bytes = data[_];
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(self.output, bytes);
      _tmp$2 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
}
function _M0MP211localreview4amqp7Session9heartbeat(self) {
  if (_M0IP016_24default__implPB2Eq10not__equalGsE(self.state, "ready") && _M0IP016_24default__implPB2Eq10not__equalGsE(self.state, "open")) {
    return new _M0DTPC16result6ResultGzRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("connection is not active"));
  }
  return _M0MP211localreview4amqp5Frame14encode_2einner(new _M0TP211localreview4amqp5Frame(8, 0, $bytes_literal$0), 131072);
}
function _M0MP211localreview4amqp9Assembler6finish(self) {
  if (self.failed || !_M0MPB3Map9is__emptyGiRP211localreview4amqp7PendingE(self.pending)) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("incomplete or failed content stream"));
  } else {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
  }
}
function _M0MP211localreview4amqp7Decoder6finish(self) {
  if (self.poisoned || !_M0MPC15array5Array9is__emptyGyE(self.buffer)) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("incomplete or invalid stream"));
  } else {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
  }
}
function _M0MP211localreview4amqp15StreamAssembler6finish(self) {
  if (!_M0MPB3Map9is__emptyGiRP211localreview4amqp13StreamPendingE(self.pending)) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("incomplete streaming content"));
  } else {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
  }
}
function _M0MP211localreview4amqp7Session6finish(self) {
  const _defer = () => {
    _M0MPC15array5Array5clearGRP211localreview4amqp14AuthenticationE(self.auth);
  };
  let _err;
  _L: {
    let _defer_result;
    let _err$2;
    _L$2: {
      _L$3: {
        const _bind$2 = _M0MP211localreview4amqp7Decoder6finish(self.decoder);
        if (_bind$2.$tag === 1) {
          const _ok = _bind$2;
          _ok._0;
        } else {
          const _err$3 = _bind$2;
          _err$2 = _err$3._0;
          break _L$3;
        }
        const _bind$3 = _M0MP211localreview4amqp9Assembler6finish(self.assembler);
        if (_bind$3.$tag === 1) {
          const _ok = _bind$3;
          _ok._0;
        } else {
          const _err$3 = _bind$3;
          _err$2 = _err$3._0;
          break _L$3;
        }
        const _bind$4 = _M0MP211localreview4amqp15StreamAssembler6finish(self.stream_assembler);
        if (_bind$4.$tag === 1) {
          const _ok = _bind$4;
          _ok._0;
        } else {
          const _err$3 = _bind$4;
          _err$2 = _err$3._0;
          break _L$3;
        }
        if (_M0IP016_24default__implPB2Eq10not__equalGsE(self.state, "closed")) {
          self.state = "failed";
          _err$2 = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("connection ended without close handshake");
          break _L$3;
        }
        break _L$2;
      }
      self.state = "failed";
      _M0MPC15array5Array5clearGRP211localreview4amqp14AuthenticationE(self.output);
      _err = _err$2;
      break _L;
    }
    _defer();
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(_defer_result);
  }
  _defer();
  return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(_err);
}
function _M0MP211localreview4amqp7Decoder7consume(self, input) {
  const frames = [];
  const _bind$2 = input.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const byte = input[_];
      _M0MPC15array5Array4pushGyE(self.buffer, byte);
      if (self.buffer.length === 7) {
        const b = self.buffer;
        const n = BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, BigInt.asUintN(64, _M0MPC14byte4Byte9to__int64(_M0MPC15array5Array2atGyE(b, 3)) * 16777216n) + BigInt.asUintN(64, _M0MPC14byte4Byte9to__int64(_M0MPC15array5Array2atGyE(b, 4)) * 65536n)) + BigInt.asUintN(64, _M0MPC14byte4Byte9to__int64(_M0MPC15array5Array2atGyE(b, 5)) * 256n)) + _M0MPC14byte4Byte9to__int64(_M0MPC15array5Array2atGyE(b, 6)));
        if (BigInt.asIntN(64, n) > BigInt.asIntN(64, BigInt.asUintN(64, BigInt(self.limit - 8 | 0)))) {
          return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("declared frame exceeds limit"));
        }
        self.expected = (Number(BigInt.asIntN(32, n)) | 0) + 8 | 0;
      }
      if (self.buffer.length === self.expected && self.expected >= 8) {
        if (byte !== 206) {
          return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid frame terminator"));
        }
        const b = self.buffer;
        const payload = [];
        const _bind$3 = 7;
        const _bind$4 = b.length - 1 | 0;
        let _tmp$2 = _bind$3;
        while (true) {
          const i = _tmp$2;
          if (i < _bind$4) {
            _M0MPC15array5Array4pushGyE(payload, _M0MPC15array5Array2atGyE(b, i));
            _tmp$2 = i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        const frame = new _M0TP211localreview4amqp5Frame(_M0MPC15array5Array2atGyE(b, 0), (Math.imul(_M0MPC15array5Array2atGyE(b, 1), 256) | 0) + _M0MPC15array5Array2atGyE(b, 2) | 0, _M0MPC15bytes5Bytes11from__array(new _M0TPB9ArrayViewGyE(payload, 0, payload.length)));
        const _bind$5 = _M0FP211localreview4amqp8validate(frame, self.limit);
        if (_bind$5.$tag === 1) {
          const _ok = _bind$5;
          _ok._0;
        } else {
          return _bind$5;
        }
        _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(frames, frame);
        _M0MPC15array5Array5clearGyE(self.buffer);
        self.expected = 7;
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE2Ok(frames);
}
function _M0MP211localreview4amqp7Decoder4feed(self, input) {
  if (self.poisoned) {
    return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("decoder is poisoned"));
  }
  let _err;
  _L: {
    const _bind$2 = _M0MP211localreview4amqp7Decoder7consume(self, input);
    let _tmp;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _tmp = _ok._0;
    } else {
      const _err$2 = _bind$2;
      _err = _err$2._0;
      break _L;
    }
    return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE2Ok(_tmp);
  }
  self.poisoned = true;
  return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE3Err(_err);
}
function _M0MP211localreview4amqp7Decoder10set__limit(self, limit) {
  if (limit < 4096 || (limit > 16777216 || (self.buffer.length > limit || self.expected > limit))) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid negotiated frame limit"));
  }
  self.limit = limit;
  return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
}
function _M0FP211localreview4amqp11read__table(r, depth) {
  const _bind$2 = _M0MP211localreview4amqp10WireReader4node(r, depth);
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _ok._0;
  } else {
    return _bind$2;
  }
  const _bind$3 = _M0MP211localreview4amqp10WireReader14container__end(r);
  let end;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    end = _ok._0;
  } else {
    return _bind$3;
  }
  const outer = r.end;
  r.end = end;
  const entries = [];
  while (true) {
    if (r.pos < end) {
      const _bind$4 = _M0MP211localreview4amqp10WireReader8shortstr(r);
      let key;
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        key = _ok._0;
      } else {
        return _bind$4;
      }
      const _bind$5 = _M0FP211localreview4amqp11read__field(r, depth + 1 | 0);
      let _tmp;
      if (_bind$5.$tag === 1) {
        const _ok = _bind$5;
        _tmp = _ok._0;
      } else {
        return _bind$5;
      }
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(entries, { _0: key, _1: _tmp });
      continue;
    } else {
      break;
    }
  }
  r.end = outer;
  return new _M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERP211localreview4amqp10FrameErrorE2Ok(entries);
}
function _M0FP211localreview4amqp11read__field(r, depth) {
  const _bind$2 = _M0MP211localreview4amqp10WireReader4node(r, depth);
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _ok._0;
  } else {
    return _bind$2;
  }
  const _bind$3 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
  let _tmp;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _tmp = _ok._0;
  } else {
    return _bind$3;
  }
  const _bind$4 = Number(BigInt.asIntN(32, _tmp)) | 0;
  switch (_bind$4) {
    case 116: {
      const _bind$5 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
      let _tmp$2;
      if (_bind$5.$tag === 1) {
        const _ok = _bind$5;
        _tmp$2 = _ok._0;
      } else {
        return _bind$5;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue7Boolean(BigInt.asUintN(64, _tmp$2) !== BigInt.asUintN(64, 0n)));
    }
    case 98: {
      const _bind$6 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
      let _tmp$3;
      if (_bind$6.$tag === 1) {
        const _ok = _bind$6;
        _tmp$3 = _ok._0;
      } else {
        return _bind$6;
      }
      const n = Number(BigInt.asIntN(32, _tmp$3)) | 0;
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue7Signed8(n >= 128 ? n - 256 | 0 : n));
    }
    case 66: {
      const _bind$7 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
      let _tmp$4;
      if (_bind$7.$tag === 1) {
        const _ok = _bind$7;
        _tmp$4 = _ok._0;
      } else {
        return _bind$7;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue9Unsigned8(Number(BigInt.asIntN(32, _tmp$4)) | 0));
    }
    case 115: {
      const _bind$8 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
      let _tmp$5;
      if (_bind$8.$tag === 1) {
        const _ok = _bind$8;
        _tmp$5 = _ok._0;
      } else {
        return _bind$8;
      }
      const n$2 = Number(BigInt.asIntN(32, _tmp$5)) | 0;
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue8Signed16(n$2 >= 32768 ? n$2 - 65536 | 0 : n$2));
    }
    case 117: {
      const _bind$9 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
      let _tmp$6;
      if (_bind$9.$tag === 1) {
        const _ok = _bind$9;
        _tmp$6 = _ok._0;
      } else {
        return _bind$9;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue10Unsigned16(Number(BigInt.asIntN(32, _tmp$6)) | 0));
    }
    case 73: {
      const _bind$10 = _M0MP211localreview4amqp10WireReader4uint(r, 4);
      let _tmp$7;
      if (_bind$10.$tag === 1) {
        const _ok = _bind$10;
        _tmp$7 = _ok._0;
      } else {
        return _bind$10;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue8Signed32(Number(BigInt.asIntN(32, _tmp$7)) | 0));
    }
    case 105: {
      const _bind$11 = _M0MP211localreview4amqp10WireReader4uint(r, 4);
      let _tmp$8;
      if (_bind$11.$tag === 1) {
        const _ok = _bind$11;
        _tmp$8 = _ok._0;
      } else {
        return _bind$11;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue10Unsigned32(Number(BigInt.asUintN(32, _tmp$8)) | 0));
    }
    case 108: {
      const _bind$12 = _M0MP211localreview4amqp10WireReader4uint(r, 8);
      let _tmp$9;
      if (_bind$12.$tag === 1) {
        const _ok = _bind$12;
        _tmp$9 = _ok._0;
      } else {
        return _bind$12;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue8Signed64(_tmp$9));
    }
    case 102: {
      const _bind$13 = _M0MP211localreview4amqp10WireReader4uint(r, 4);
      let _tmp$10;
      if (_bind$13.$tag === 1) {
        const _ok = _bind$13;
        _tmp$10 = _ok._0;
      } else {
        return _bind$13;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue11Float32Bits(Number(BigInt.asUintN(32, _tmp$10)) | 0));
    }
    case 100: {
      const _bind$14 = _M0MP211localreview4amqp10WireReader4uint(r, 8);
      let _tmp$11;
      if (_bind$14.$tag === 1) {
        const _ok = _bind$14;
        _tmp$11 = _ok._0;
      } else {
        return _bind$14;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue11Float64Bits(_tmp$11));
    }
    case 68: {
      const _bind$15 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
      let _tmp$12;
      if (_bind$15.$tag === 1) {
        const _ok = _bind$15;
        _tmp$12 = _ok._0;
      } else {
        return _bind$15;
      }
      const scale = Number(BigInt.asIntN(32, _tmp$12)) | 0;
      const _bind$16 = _M0MP211localreview4amqp10WireReader4uint(r, 4);
      let _tmp$13;
      if (_bind$16.$tag === 1) {
        const _ok = _bind$16;
        _tmp$13 = _ok._0;
      } else {
        return _bind$16;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue7Decimal(scale, Number(BigInt.asIntN(32, _tmp$13)) | 0));
    }
    case 83: {
      const _bind$17 = _M0MP211localreview4amqp10WireReader7longstr(r);
      let _tmp$14;
      if (_bind$17.$tag === 1) {
        const _ok = _bind$17;
        _tmp$14 = _ok._0;
      } else {
        return _bind$17;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue10LongString(_tmp$14));
    }
    case 120: {
      const _bind$18 = _M0MP211localreview4amqp10WireReader7longstr(r);
      let _tmp$15;
      if (_bind$18.$tag === 1) {
        const _ok = _bind$18;
        _tmp$15 = _ok._0;
      } else {
        return _bind$18;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue9ByteArray(_tmp$15));
    }
    case 84: {
      const _bind$19 = _M0MP211localreview4amqp10WireReader4uint(r, 8);
      let _tmp$16;
      if (_bind$19.$tag === 1) {
        const _ok = _bind$19;
        _tmp$16 = _ok._0;
      } else {
        return _bind$19;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue9Timestamp(_tmp$16));
    }
    case 86: {
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(_M0DTP211localreview4amqp10FieldValue4Void__);
    }
    case 70: {
      const _bind$20 = _M0FP211localreview4amqp11read__table(r, depth);
      let _tmp$17;
      if (_bind$20.$tag === 1) {
        const _ok = _bind$20;
        _tmp$17 = _ok._0;
      } else {
        return _bind$20;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue10TableValue(_tmp$17));
    }
    case 65: {
      const _bind$21 = _M0MP211localreview4amqp10WireReader14container__end(r);
      let end;
      if (_bind$21.$tag === 1) {
        const _ok = _bind$21;
        end = _ok._0;
      } else {
        return _bind$21;
      }
      const outer = r.end;
      r.end = end;
      const values = [];
      while (true) {
        if (r.pos < end) {
          const _bind$22 = _M0FP211localreview4amqp11read__field(r, depth + 1 | 0);
          let _tmp$18;
          if (_bind$22.$tag === 1) {
            const _ok = _bind$22;
            _tmp$18 = _ok._0;
          } else {
            return _bind$22;
          }
          _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(values, _tmp$18);
          continue;
        } else {
          break;
        }
      }
      r.end = outer;
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue10ArrayValue(values));
    }
    default: {
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unknown field-table type tag"));
    }
  }
}
function _M0MP211localreview4amqp6Method6decode(frame) {
  const _bind$2 = _M0FP211localreview4amqp8validate(frame, 16777216);
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _ok._0;
  } else {
    return _bind$2;
  }
  if (frame.kind !== 1) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp6MethodRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("expected method frame"));
  }
  const _bind$3 = _M0MP211localreview4amqp10WireReader3new(frame.payload);
  let r;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    r = _ok._0;
  } else {
    return _bind$3;
  }
  const _bind$4 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
  let _tmp;
  if (_bind$4.$tag === 1) {
    const _ok = _bind$4;
    _tmp = _ok._0;
  } else {
    return _bind$4;
  }
  const class_id = Number(BigInt.asIntN(32, _tmp)) | 0;
  const _bind$5 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
  let _tmp$2;
  if (_bind$5.$tag === 1) {
    const _ok = _bind$5;
    _tmp$2 = _ok._0;
  } else {
    return _bind$5;
  }
  const method_id = Number(BigInt.asIntN(32, _tmp$2)) | 0;
  const _bind$6 = _M0FP211localreview4amqp15method__channel(class_id, frame.channel);
  if (_bind$6.$tag === 1) {
    const _ok = _bind$6;
    _ok._0;
  } else {
    return _bind$6;
  }
  let spec;
  const _bind$7 = _M0FP211localreview4amqp12method__spec(class_id, method_id);
  if (_bind$7 === undefined) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp6MethodRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unknown class or method id"));
  } else {
    const _Some = _bind$7;
    const _spec = _Some;
    spec = _spec;
  }
  const arguments_ = [];
  const bits = new _M0TPB8MutLocalGmE(0n);
  const used = new _M0TPB8MutLocalGiE(8);
  const _bind$8 = spec.fields;
  const _bind$9 = _bind$8.length;
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp$3;
    if (_ < _bind$9) {
      const _foreach_element = _bind$8[_];
      let kind;
      _L: {
        const _kind = _foreach_element._1;
        kind = _kind;
        break _L;
      }
      if (_M0IP211localreview4amqp12ArgumentKindPB2Eq5equal(kind, 0)) {
        if (used.val === 8) {
          const _bind$10 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
          let _tmp$4;
          if (_bind$10.$tag === 1) {
            const _ok = _bind$10;
            _tmp$4 = _ok._0;
          } else {
            return _bind$10;
          }
          bits.val = _tmp$4;
          used.val = 0;
        }
        _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(arguments_, new _M0DTP211localreview4amqp8Argument3Bit(BigInt.asUintN(64, BigInt.asUintN(64, bits.val & BigInt.asUintN(64, 1n << BigInt(used.val & 63)))) !== BigInt.asUintN(64, 0n)));
        used.val = used.val + 1 | 0;
      } else {
        used.val = 8;
        let _tmp$4;
        switch (kind) {
          case 1: {
            const _bind$10 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
            let _tmp$5;
            if (_bind$10.$tag === 1) {
              const _ok = _bind$10;
              _tmp$5 = _ok._0;
            } else {
              return _bind$10;
            }
            _tmp$4 = new _M0DTP211localreview4amqp8Argument5Octet(Number(BigInt.asIntN(32, _tmp$5)) | 0);
            break;
          }
          case 2: {
            const _bind$11 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
            let _tmp$6;
            if (_bind$11.$tag === 1) {
              const _ok = _bind$11;
              _tmp$6 = _ok._0;
            } else {
              return _bind$11;
            }
            _tmp$4 = new _M0DTP211localreview4amqp8Argument5Short(Number(BigInt.asIntN(32, _tmp$6)) | 0);
            break;
          }
          case 3: {
            const _bind$12 = _M0MP211localreview4amqp10WireReader4uint(r, 4);
            let _tmp$7;
            if (_bind$12.$tag === 1) {
              const _ok = _bind$12;
              _tmp$7 = _ok._0;
            } else {
              return _bind$12;
            }
            _tmp$4 = new _M0DTP211localreview4amqp8Argument4Long(Number(BigInt.asUintN(32, _tmp$7)) | 0);
            break;
          }
          case 4: {
            const _bind$13 = _M0MP211localreview4amqp10WireReader4uint(r, 8);
            let _tmp$8;
            if (_bind$13.$tag === 1) {
              const _ok = _bind$13;
              _tmp$8 = _ok._0;
            } else {
              return _bind$13;
            }
            _tmp$4 = new _M0DTP211localreview4amqp8Argument8LongLong(_tmp$8);
            break;
          }
          case 5: {
            const _bind$14 = _M0MP211localreview4amqp10WireReader8shortstr(r);
            let _tmp$9;
            if (_bind$14.$tag === 1) {
              const _ok = _bind$14;
              _tmp$9 = _ok._0;
            } else {
              return _bind$14;
            }
            _tmp$4 = new _M0DTP211localreview4amqp8Argument11ShortString(_tmp$9);
            break;
          }
          case 6: {
            const _bind$15 = _M0MP211localreview4amqp10WireReader7longstr(r);
            let _tmp$10;
            if (_bind$15.$tag === 1) {
              const _ok = _bind$15;
              _tmp$10 = _ok._0;
            } else {
              return _bind$15;
            }
            _tmp$4 = new _M0DTP211localreview4amqp8Argument10LongString(_tmp$10);
            break;
          }
          case 7: {
            const _bind$16 = _M0FP211localreview4amqp11read__table(r, 0);
            let _tmp$11;
            if (_bind$16.$tag === 1) {
              const _ok = _bind$16;
              _tmp$11 = _ok._0;
            } else {
              return _bind$16;
            }
            _tmp$4 = new _M0DTP211localreview4amqp8Argument5Table(_tmp$11);
            break;
          }
          default: {
            return new _M0DTPC16result6ResultGRP211localreview4amqp6MethodRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid bit field state"));
          }
        }
        _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(arguments_, _tmp$4);
      }
      _tmp$3 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$10 = _M0MP211localreview4amqp10WireReader6finish(r);
  if (_bind$10.$tag === 1) {
    const _ok = _bind$10;
    _ok._0;
  } else {
    return _bind$10;
  }
  return new _M0DTPC16result6ResultGRP211localreview4amqp6MethodRP211localreview4amqp10FrameErrorE2Ok(new _M0TP211localreview4amqp6Method(class_id, method_id, arguments_));
}
function _M0FP211localreview4amqp13decode__table(bytes) {
  const _bind$2 = _M0MP211localreview4amqp10WireReader3new(bytes);
  let r;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    r = _ok._0;
  } else {
    return _bind$2;
  }
  const _bind$3 = _M0FP211localreview4amqp11read__table(r, 0);
  let result;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    result = _ok._0;
  } else {
    return _bind$3;
  }
  const _bind$4 = _M0MP211localreview4amqp10WireReader6finish(r);
  if (_bind$4.$tag === 1) {
    const _ok = _bind$4;
    _ok._0;
  } else {
    return _bind$4;
  }
  return new _M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERP211localreview4amqp10FrameErrorE2Ok(result);
}
function _M0MP211localreview4amqp7Session18client__properties(self) {
  return _M0FP211localreview4amqp13decode__table(self.client_properties_wire);
}
function _M0MP211localreview4amqp7Session14auth__response(self, response) {
  if (response.length > 1048576) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("SASL response exceeds 1 MiB"));
  }
  const _bind$2 = _M0MP211localreview4amqp7Session18client__properties(self);
  let _tmp;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _tmp = _ok._0;
  } else {
    return _bind$2;
  }
  const _bind$3 = _M0MP211localreview4amqp7Session4emit(self, "connection.start-ok", [new _M0DTP211localreview4amqp8Argument5Table(_tmp), new _M0DTP211localreview4amqp8Argument11ShortString(self.selected_auth), new _M0DTP211localreview4amqp8Argument10LongString(response), new _M0DTP211localreview4amqp8Argument11ShortString(self.locale)], 0);
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _ok._0;
  } else {
    return _bind$3;
  }
  self.state = "tune";
  return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
}
function _M0MP211localreview4amqp11BasicHeader6decode(frame) {
  const _bind$2 = _M0FP211localreview4amqp8validate(frame, 16777216);
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _ok._0;
  } else {
    return _bind$2;
  }
  if (frame.kind !== 2) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("expected content header frame"));
  }
  const _bind$3 = _M0MP211localreview4amqp10WireReader3new(frame.payload);
  let r;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    r = _ok._0;
  } else {
    return _bind$3;
  }
  let _tmp;
  const _bind$4 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
  let _tmp$2;
  if (_bind$4.$tag === 1) {
    const _ok = _bind$4;
    _tmp$2 = _ok._0;
  } else {
    return _bind$4;
  }
  if (BigInt.asUintN(64, _tmp$2) !== BigInt.asUintN(64, 60n)) {
    _tmp = true;
  } else {
    const _bind$5 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
    let _tmp$3;
    if (_bind$5.$tag === 1) {
      const _ok = _bind$5;
      _tmp$3 = _ok._0;
    } else {
      return _bind$5;
    }
    _tmp = BigInt.asUintN(64, _tmp$3) !== BigInt.asUintN(64, 0n);
  }
  if (_tmp) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("expected Basic class header with weight zero"));
  }
  const _bind$5 = _M0MP211localreview4amqp10WireReader4uint(r, 8);
  let body_size;
  if (_bind$5.$tag === 1) {
    const _ok = _bind$5;
    body_size = _ok._0;
  } else {
    return _bind$5;
  }
  const _bind$6 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
  let flags;
  if (_bind$6.$tag === 1) {
    const _ok = _bind$6;
    flags = _ok._0;
  } else {
    return _bind$6;
  }
  if (BigInt.asUintN(64, BigInt.asUintN(64, flags & 3n)) !== BigInt.asUintN(64, 0n)) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unsupported Basic property flag or continuation"));
  }
  const properties = [];
  const _bind$7 = _M0FP211localreview4amqp21basic__property__spec();
  const _bind$8 = _bind$7.length;
  let _tmp$3 = 0;
  while (true) {
    const i = _tmp$3;
    if (i < _bind$8) {
      const _foreach_element = _bind$7[i];
      let key;
      let kind;
      _L: {
        const _key = _foreach_element._0;
        const _kind = _foreach_element._1;
        key = _key;
        kind = _kind;
        break _L;
      }
      if (BigInt.asUintN(64, BigInt.asUintN(64, flags & BigInt.asUintN(64, 1n << BigInt((15 - i | 0) & 63)))) !== BigInt.asUintN(64, 0n)) {
        let value;
        switch (kind) {
          case 5: {
            const _bind$9 = _M0MP211localreview4amqp10WireReader8shortstr(r);
            let _tmp$4;
            if (_bind$9.$tag === 1) {
              const _ok = _bind$9;
              _tmp$4 = _ok._0;
            } else {
              return _bind$9;
            }
            value = new _M0DTP211localreview4amqp8Argument11ShortString(_tmp$4);
            break;
          }
          case 1: {
            const _bind$10 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
            let _tmp$5;
            if (_bind$10.$tag === 1) {
              const _ok = _bind$10;
              _tmp$5 = _ok._0;
            } else {
              return _bind$10;
            }
            value = new _M0DTP211localreview4amqp8Argument5Octet(Number(BigInt.asIntN(32, _tmp$5)) | 0);
            break;
          }
          case 4: {
            const _bind$11 = _M0MP211localreview4amqp10WireReader4uint(r, 8);
            let _tmp$6;
            if (_bind$11.$tag === 1) {
              const _ok = _bind$11;
              _tmp$6 = _ok._0;
            } else {
              return _bind$11;
            }
            value = new _M0DTP211localreview4amqp8Argument8LongLong(_tmp$6);
            break;
          }
          case 7: {
            const _bind$12 = _M0FP211localreview4amqp11read__table(r, 0);
            let _tmp$7;
            if (_bind$12.$tag === 1) {
              const _ok = _bind$12;
              _tmp$7 = _ok._0;
            } else {
              return _bind$12;
            }
            value = new _M0DTP211localreview4amqp8Argument5Table(_tmp$7);
            break;
          }
          default: {
            return new _M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unsupported Basic property kind"));
          }
        }
        _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(properties, { _0: key, _1: value });
      }
      _tmp$3 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$9 = _M0MP211localreview4amqp10WireReader6finish(r);
  if (_bind$9.$tag === 1) {
    const _ok = _bind$9;
    _ok._0;
  } else {
    return _bind$9;
  }
  return new _M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE2Ok(new _M0TP211localreview4amqp11BasicHeader(body_size, properties));
}
function _M0MP211localreview4amqp5Frame11method__ids(self) {
  if (self.kind !== 1 || self.payload.length < 4) {
    return undefined;
  }
  const _tmp = self.payload;
  const _tmp$2 = Math.imul(0 >>> 0 < _tmp.length ? _tmp[0] : $oob(), 256) | 0;
  const _tmp$3 = self.payload;
  const _tmp$4 = _tmp$2 + (1 >>> 0 < _tmp$3.length ? _tmp$3[1] : $oob()) | 0;
  const _tmp$5 = self.payload;
  const _tmp$6 = Math.imul(2 >>> 0 < _tmp$5.length ? _tmp$5[2] : $oob(), 256) | 0;
  const _tmp$7 = self.payload;
  return { _0: _tmp$4, _1: _tmp$6 + (3 >>> 0 < _tmp$7.length ? _tmp$7[3] : $oob()) | 0 };
}
function _M0MP211localreview4amqp9Assembler4push(self, frame) {
  if (self.failed) {
    return new _M0DTPC16result6ResultGORP211localreview4amqp7ContentRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("assembler is poisoned"));
  }
  let _err;
  _L: {
    const _bind$2 = _M0FP211localreview4amqp8validate(frame, 16777216);
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _ok._0;
    } else {
      const _err$2 = _bind$2;
      _err = _err$2._0;
      break _L;
    }
    if (frame.kind === 8) {
      return new _M0DTPC16result6ResultGORP211localreview4amqp7ContentRP211localreview4amqp10FrameErrorE2Ok(undefined);
    }
    if (frame.kind === 1) {
      if (self.strict_methods) {
        const _bind$3 = _M0MP211localreview4amqp6Method6decode(frame);
        if (_bind$3.$tag === 1) {
          const _ok = _bind$3;
          _ok._0;
        } else {
          const _err$2 = _bind$3;
          _err = _err$2._0;
          break _L;
        }
      }
      if (_M0MPB3Map8containsGiRP211localreview4amqp7PendingE(self.pending, frame.channel)) {
        _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("method interrupts incomplete content");
        break _L;
      }
      const ids = _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_M0MP211localreview4amqp5Frame11method__ids(frame));
      if (ids._0 === 60 && (ids._1 === 40 || (ids._1 === 50 || (ids._1 === 60 || ids._1 === 71)))) {
        if (frame.channel === 0) {
          _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("content method on channel zero");
          break _L;
        }
        if (_M0MPB3Map6lengthGiRP211localreview4amqp7PendingE(self.pending) >= 64) {
          _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("in-flight channel limit");
          break _L;
        }
        if (frame.payload.length > (16777216 - self.metadata | 0)) {
          _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("buffered metadata limit");
          break _L;
        }
        self.metadata = self.metadata + frame.payload.length | 0;
        _M0MPB3Map3setGiRP211localreview4amqp7PendingE(self.pending, frame.channel, new _M0TP211localreview4amqp7Pending(frame.payload, undefined, 0, []));
      }
      return new _M0DTPC16result6ResultGORP211localreview4amqp7ContentRP211localreview4amqp10FrameErrorE2Ok(undefined);
    }
    let state;
    const _bind$3 = _M0MPB3Map3getGiRP211localreview4amqp7PendingE(self.pending, frame.channel);
    if (_bind$3 === undefined) {
      _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("content frame without preceding method");
      break _L;
    } else {
      const _Some = _bind$3;
      const _state = _Some;
      state = _state;
    }
    if (frame.kind === 2) {
      const _bind$4 = state.header;
      if (_bind$4 === undefined) {
      } else {
        _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("duplicate content header");
        break _L;
      }
      const bytes = frame.payload;
      const _bind$5 = _M0MP211localreview4amqp11BasicHeader6decode(frame);
      let _tmp;
      if (_bind$5.$tag === 1) {
        const _ok = _bind$5;
        _tmp = _ok._0;
      } else {
        const _err$2 = _bind$5;
        _err = _err$2._0;
        break _L;
      }
      const size = _tmp.body_size;
      if (BigInt.asUintN(64, size) > BigInt.asUintN(64, _M0MPC13int3Int10to__uint64(self.max_body))) {
        _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("declared body exceeds limit");
        break _L;
      }
      state.expected = Number(BigInt.asIntN(32, size)) | 0;
      if (bytes.length > (16777216 - self.metadata | 0)) {
        _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("buffered metadata limit");
        break _L;
      }
      self.metadata = self.metadata + bytes.length | 0;
      state.header = bytes;
      if (state.expected === 0) {
        self.metadata = self.metadata - (state.method_payload.length + bytes.length | 0) | 0;
        _M0MPB3Map6removeGiRP211localreview4amqp7PendingE(self.pending, frame.channel);
        return new _M0DTPC16result6ResultGORP211localreview4amqp7ContentRP211localreview4amqp10FrameErrorE2Ok(new _M0TP211localreview4amqp7Content(frame.channel, state.method_payload, bytes, $bytes_literal$0));
      }
      return new _M0DTPC16result6ResultGORP211localreview4amqp7ContentRP211localreview4amqp10FrameErrorE2Ok(undefined);
    }
    let header;
    const _bind$4 = state.header;
    if (_bind$4 === undefined) {
      _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("body before content header");
      break _L;
    } else {
      const _Some = _bind$4;
      const _header = _Some;
      header = _header;
    }
    if (frame.payload.length === 0) {
      _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("empty body fragment");
      break _L;
    }
    if ((state.body.length + frame.payload.length | 0) > state.expected) {
      _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("body exceeds declared length");
      break _L;
    }
    if ((self.buffered + frame.payload.length | 0) > self.max_body) {
      _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("total buffered body limit");
      break _L;
    }
    const _bind$5 = frame.payload;
    const _bind$6 = _bind$5.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind$6) {
        const b = _bind$5[_];
        _M0MPC15array5Array4pushGyE(state.body, b);
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    self.buffered = self.buffered + frame.payload.length | 0;
    let _tmp$2;
    if (state.body.length === state.expected) {
      const _bind$7 = state.body;
      const body = _M0MPC15bytes5Bytes11from__array(new _M0TPB9ArrayViewGyE(_bind$7, 0, _bind$7.length));
      self.buffered = self.buffered - body.length | 0;
      self.metadata = self.metadata - (state.method_payload.length + header.length | 0) | 0;
      _M0MPB3Map6removeGiRP211localreview4amqp7PendingE(self.pending, frame.channel);
      _tmp$2 = new _M0TP211localreview4amqp7Content(frame.channel, state.method_payload, header, body);
    } else {
      _tmp$2 = undefined;
    }
    return new _M0DTPC16result6ResultGORP211localreview4amqp7ContentRP211localreview4amqp10FrameErrorE2Ok(_tmp$2);
  }
  self.failed = true;
  return new _M0DTPC16result6ResultGORP211localreview4amqp7ContentRP211localreview4amqp10FrameErrorE3Err(_err);
}
function _M0MP211localreview4amqp15StreamAssembler4push(self, frame, events) {
  if (frame.kind === 1) {
    if (_M0MPB3Map8containsGiRP211localreview4amqp13StreamPendingE(self.pending, frame.channel)) {
      return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("method interrupts incomplete content"));
    }
    const _bind$2 = _M0MP211localreview4amqp6Method6decode(frame);
    let command;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      command = _ok._0;
    } else {
      return _bind$2;
    }
    const spec = _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_M0FP211localreview4amqp12method__spec(command.class_id, command.method_id));
    if (spec.carries_content) {
      if (_M0MPB3Map6lengthGiRP211localreview4amqp13StreamPendingE(self.pending) >= 64) {
        return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("in-flight channel limit"));
      }
      if (frame.payload.length > (16777216 - self.metadata | 0)) {
        return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("buffered metadata limit"));
      }
      self.metadata = self.metadata + frame.payload.length | 0;
      _M0MPB3Map3setGiRP211localreview4amqp13StreamPendingE(self.pending, frame.channel, new _M0TP211localreview4amqp13StreamPending(command, frame.payload.length, undefined));
    }
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
  }
  const _bind$2 = _M0MPC16option6Option16unwrap__or__elseGRP211localreview4amqp13StreamPendingEHRP211localreview4amqp10FrameError(_M0MPB3Map3getGiRP211localreview4amqp13StreamPendingE(self.pending, frame.channel), () => new _M0DTPC16result6ResultGRP211localreview4amqp13StreamPendingRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("content frame without preceding method")));
  let p;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    p = _ok._0;
  } else {
    return _bind$2;
  }
  if (frame.kind === 2) {
    const _bind$3 = p.remaining;
    if (_bind$3 === undefined) {
    } else {
      return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("duplicate content header"));
    }
    const _bind$4 = _M0MP211localreview4amqp11BasicHeader6decode(frame);
    let header;
    if (_bind$4.$tag === 1) {
      const _ok = _bind$4;
      header = _ok._0;
    } else {
      return _bind$4;
    }
    p.remaining = header.body_size;
    _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(events, new _M0DTP211localreview4amqp12SessionEvent12MessageStart(frame.channel, p.command, header));
    if (BigInt.asUintN(64, header.body_size) === BigInt.asUintN(64, 0n)) {
      _M0MP211localreview4amqp15StreamAssembler7discard(self, frame.channel);
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(events, new _M0DTP211localreview4amqp12SessionEvent10MessageEnd(frame.channel));
    }
  } else {
    const _bind$3 = _M0MPC16option6Option16unwrap__or__elseGmEHRP211localreview4amqp10FrameError(p.remaining, () => new _M0DTPC16result6ResultGmRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("body before content header")));
    let remaining;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      remaining = _ok._0;
    } else {
      return _bind$3;
    }
    if (frame.payload.length === 0 || BigInt.asUintN(64, _M0MPC13int3Int10to__uint64(frame.payload.length)) > BigInt.asUintN(64, remaining)) {
      return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid streaming body length"));
    }
    const left = BigInt.asUintN(64, remaining - _M0MPC13int3Int10to__uint64(frame.payload.length));
    p.remaining = left;
    _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(events, new _M0DTP211localreview4amqp12SessionEvent11MessageData(frame.channel, frame.payload));
    if (BigInt.asUintN(64, left) === BigInt.asUintN(64, 0n)) {
      _M0MP211localreview4amqp15StreamAssembler7discard(self, frame.channel);
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(events, new _M0DTP211localreview4amqp12SessionEvent10MessageEnd(frame.channel));
    }
  }
  return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
}
function _M0MP211localreview4amqp7Session16receive__content(self, frame, events) {
  if (self.stream_bodies) {
    return _M0MP211localreview4amqp15StreamAssembler4push(self.stream_assembler, frame, events);
  } else {
    let content;
    _L: {
      const _bind$2 = _M0MP211localreview4amqp9Assembler4push(self.assembler, frame);
      let _bind$3;
      if (_bind$2.$tag === 1) {
        const _ok = _bind$2;
        _bind$3 = _ok._0;
      } else {
        return _bind$2;
      }
      if (_bind$3 === undefined) {
        return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
      } else {
        const _Some = _bind$3;
        const _content = _Some;
        content = _content;
        break _L;
      }
    }
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(_M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(events, new _M0DTP211localreview4amqp12SessionEvent7Message(content)));
  }
}
function _M0MP211localreview4amqp7Session4feed(self, input) {
  if (self.state === "failed" || self.state === "closed") {
    return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp12SessionEventERP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("session is closed"));
  }
  let _err;
  _L: {
    const events = [];
    const _bind$2 = _M0MP211localreview4amqp7Decoder4feed(self.decoder, input);
    let _bind$3;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _bind$3 = _ok._0;
    } else {
      const _err$2 = _bind$2;
      _err = _err$2._0;
      break _L;
    }
    const _bind$4 = _bind$3.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind$4) {
        const frame = _bind$3[_];
        _L$2: {
          if (self.state === "closed") {
            break;
          }
          if (_M0IP016_24default__implPB2Eq10not__equalGsE(self.state, "start") && _M0IP016_24default__implPB2Eq10not__equalGsE(self.state, "tune")) {
            const _bind$5 = _M0FP211localreview4amqp8validate(frame, self.frame_limit);
            if (_bind$5.$tag === 1) {
              const _ok = _bind$5;
              _ok._0;
            } else {
              const _err$2 = _bind$5;
              _err = _err$2._0;
              break _L;
            }
          }
          if (frame.kind === 8) {
            break _L$2;
          }
          if (frame.kind !== 1) {
            if (self.state === "closing" || _M0IPC16option6OptionPB2Eq5equalGsE(_M0MPB3Map3getGisE(self.channels, frame.channel), "closing")) {
              break _L$2;
            }
            if (_M0IP016_24default__implPB2Eq10not__equalGsE(self.state, "ready") || _M0IP016_24default__implPB2Eq10not__equalGOsE(_M0MPB3Map3getGisE(self.channels, frame.channel), "open")) {
              _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("content on inactive channel");
              break _L;
            }
            const _bind$5 = _M0MP211localreview4amqp7Session16receive__content(self, frame, events);
            if (_bind$5.$tag === 1) {
              const _ok = _bind$5;
              _ok._0;
            } else {
              const _err$2 = _bind$5;
              _err = _err$2._0;
              break _L;
            }
            break _L$2;
          }
          const _bind$5 = _M0MP211localreview4amqp6Method6decode(frame);
          let command;
          if (_bind$5.$tag === 1) {
            const _ok = _bind$5;
            command = _ok._0;
          } else {
            const _err$2 = _bind$5;
            _err = _err$2._0;
            break _L;
          }
          const name = _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_M0FP211localreview4amqp12method__spec(command.class_id, command.method_id)).name;
          const args = command.arguments;
          if (name === "connection.close") {
            const _bind$6 = _M0MP211localreview4amqp7Session4emit(self, "connection.close-ok", [], 0);
            if (_bind$6.$tag === 1) {
              const _ok = _bind$6;
              _ok._0;
            } else {
              const _err$2 = _bind$6;
              _err = _err$2._0;
              break _L;
            }
            _M0MP211localreview4amqp7Session6closed(self);
            let code;
            let reason;
            _L$3: {
              _L$4: {
                if (args.length >= 2) {
                  const _x = args[0];
                  if (_x.$tag === 2) {
                    const _Short = _x;
                    const _code = _Short._0;
                    const _x$2 = args[1];
                    if (_x$2.$tag === 5) {
                      const _ShortString = _x$2;
                      const _reason = _ShortString._0;
                      code = _code;
                      reason = _reason;
                      break _L$4;
                    }
                  }
                }
                break _L$3;
              }
              _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(events, new _M0DTP211localreview4amqp12SessionEvent6Closed(code, reason));
            }
            break _L$2;
          }
          if (self.state === "closing") {
            if (name === "connection.close-ok") {
              _M0MP211localreview4amqp7Session6closed(self);
              _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(events, new _M0DTP211localreview4amqp12SessionEvent6Closed(200, "normal close"));
            }
            break _L$2;
          }
          const _bind$6 = self.state;
          switch (_bind$6) {
            case "start": {
              if (_M0IP016_24default__implPB2Eq10not__equalGsE(name, "connection.start")) {
                _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("expected connection.start");
                break _L;
              }
              _L$3: {
                _L$4: {
                  let mechanisms;
                  let server_properties;
                  let locales;
                  _L$5: {
                    if (args.length === 5) {
                      const _x = args[0];
                      if (_x.$tag === 1) {
                        const _Octet = _x;
                        const _x$2 = _Octet._0;
                        if (_x$2 === 0) {
                          const _x$3 = args[1];
                          if (_x$3.$tag === 1) {
                            const _Octet$2 = _x$3;
                            const _x$4 = _Octet$2._0;
                            if (_x$4 === 9) {
                              const _x$5 = args[2];
                              if (_x$5.$tag === 7) {
                                const _Table = _x$5;
                                const _server_properties = _Table._0;
                                const _x$6 = args[3];
                                if (_x$6.$tag === 6) {
                                  const _LongString = _x$6;
                                  const _mechanisms = _LongString._0;
                                  const _x$7 = args[4];
                                  if (_x$7.$tag === 6) {
                                    const _LongString$2 = _x$7;
                                    const _locales = _LongString$2._0;
                                    mechanisms = _mechanisms;
                                    server_properties = _server_properties;
                                    locales = _locales;
                                    break _L$5;
                                  } else {
                                    break _L$4;
                                  }
                                } else {
                                  break _L$4;
                                }
                              } else {
                                break _L$4;
                              }
                            } else {
                              break _L$4;
                            }
                          } else {
                            break _L$4;
                          }
                        } else {
                          break _L$4;
                        }
                      } else {
                        break _L$4;
                      }
                    } else {
                      break _L$4;
                    }
                  }
                  const _bind$7 = _M0FP211localreview4amqp13encode__table(server_properties);
                  let _tmp$2;
                  if (_bind$7.$tag === 1) {
                    const _ok = _bind$7;
                    _tmp$2 = _ok._0;
                  } else {
                    const _err$2 = _bind$7;
                    _err = _err$2._0;
                    break _L;
                  }
                  self.server_properties_wire = _tmp$2;
                  const _tmp$3 = _M0FPC28encoding4utf821decode__lossy_2einner(new _M0TPC15bytes9BytesView(locales, 0, locales.length), false);
                  const _bind$8 = " ";
                  self.server_locales = _M0MPB4Iter9to__arrayGsE(_M0MPB4Iter3mapGRPC16string10StringViewsE(_M0MPC16string6String5split(_tmp$3, new _M0TPC16string10StringView(_bind$8, 0, _bind$8.length)), (s) => _M0MPC16string10StringView9to__owned(s)));
                  self.server_version = { _0: 0, _1: 9 };
                  const _tmp$4 = _M0FPC28encoding4utf821decode__lossy_2einner(new _M0TPC15bytes9BytesView(mechanisms, 0, mechanisms.length), false);
                  const _bind$9 = " ";
                  const offered = _M0MPB4Iter9to__arrayGsE(_M0MPC16string6String5split(_tmp$4, new _M0TPC16string10StringView(_bind$9, 0, _bind$9.length)));
                  const _tmp$5 = _M0FPC28encoding4utf821decode__lossy_2einner(new _M0TPC15bytes9BytesView(locales, 0, locales.length), false);
                  const _bind$10 = " ";
                  const has_locale = _M0MPB4Iter3anyGRPC16string10StringViewE(_M0MPC16string6String5split(_tmp$5, new _M0TPC16string10StringView(_bind$10, 0, _bind$10.length)), (s) => {
                    const _bind$11 = self.locale;
                    return _M0IPC16string10StringViewPB2Eq5equal(s, new _M0TPC16string10StringView(_bind$11, 0, _bind$11.length));
                  });
                  if (!has_locale) {
                    _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("requested locale is unavailable");
                    break _L;
                  }
                  const selected = new _M0TPB8MutLocalGOUiRP211localreview4amqp14AuthenticationEE(undefined);
                  const _bind$11 = self.auth;
                  const _bind$12 = _bind$11.length;
                  let _tmp$6 = 0;
                  while (true) {
                    const i = _tmp$6;
                    if (i < _bind$12) {
                      const candidate = _bind$11[i];
                      const _bind$13 = candidate.mechanism;
                      if (_M0MPC15array5Array8containsGRPC16string10StringViewE(offered, new _M0TPC16string10StringView(_bind$13, 0, _bind$13.length))) {
                        selected.val = { _0: i, _1: candidate };
                        break;
                      }
                      _tmp$6 = i + 1 | 0;
                      continue;
                    } else {
                      break;
                    }
                  }
                  let index;
                  let candidate;
                  _L$6: {
                    const _bind$13 = _M0MPC16option6Option16unwrap__or__elseGUiRP211localreview4amqp14AuthenticationEEHRP211localreview4amqp10FrameError(selected.val, () => new _M0DTPC16result6ResultGUiRP211localreview4amqp14AuthenticationERP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("no shared SASL mechanism")));
                    let _bind$14;
                    if (_bind$13.$tag === 1) {
                      const _ok = _bind$13;
                      _bind$14 = _ok._0;
                    } else {
                      const _err$2 = _bind$13;
                      _err = _err$2._0;
                      break _L;
                    }
                    const _index = _bind$14._0;
                    const _candidate = _bind$14._1;
                    index = _index;
                    candidate = _candidate;
                    break _L$6;
                  }
                  self.selected_auth = candidate.mechanism;
                  _M0MPC15array5Array5clearGRP211localreview4amqp14AuthenticationE(self.auth);
                  let response;
                  _L$7: {
                    _L$8: {
                      const _bind$13 = candidate.response;
                      if (_bind$13 === undefined) {
                        self.state = "authenticate";
                        _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(events, new _M0DTP211localreview4amqp12SessionEvent23AuthenticationRequested(index, candidate.mechanism));
                      } else {
                        const _Some = _bind$13;
                        const _response = _Some;
                        response = _response;
                        break _L$8;
                      }
                      break _L$7;
                    }
                    const _bind$13 = _M0MP211localreview4amqp7Session14auth__response(self, response);
                    if (_bind$13.$tag === 1) {
                      const _ok = _bind$13;
                      _ok._0;
                    } else {
                      const _err$2 = _bind$13;
                      _err = _err$2._0;
                      break _L;
                    }
                  }
                  break _L$3;
                }
                _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unsupported protocol version");
                break _L;
              }
              break;
            }
            case "tune": {
              if (_M0IP016_24default__implPB2Eq10not__equalGsE(name, "connection.tune")) {
                _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("expected connection.tune; additional SASL challenge unsupported");
                break _L;
              }
              let frame_max;
              let channels;
              let heartbeat;
              _L$4: {
                _L$5: {
                  if (args.length === 3) {
                    const _x = args[0];
                    if (_x.$tag === 2) {
                      const _Short = _x;
                      const _channels = _Short._0;
                      const _x$2 = args[1];
                      if (_x$2.$tag === 3) {
                        const _Long = _x$2;
                        const _frame_max = _Long._0;
                        const _x$3 = args[2];
                        if (_x$3.$tag === 2) {
                          const _Short$2 = _x$3;
                          const _heartbeat = _Short$2._0;
                          frame_max = _frame_max;
                          channels = _channels;
                          heartbeat = _heartbeat;
                          break _L$5;
                        }
                      }
                    }
                  }
                  break _L$4;
                }
                if (frame_max !== 0 && frame_max >>> 0 < 4096 >>> 0) {
                  _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("server frame limit below minimum");
                  break _L;
                }
                if (channels !== 0 && channels < self.channel_limit) {
                  self.channel_limit = channels;
                }
                if (frame_max !== 0 && frame_max >>> 0 < self.frame_limit >>> 0) {
                  self.frame_limit = frame_max;
                }
                self.heartbeat_seconds = heartbeat === 0 || self.heartbeat_seconds === 0 ? (heartbeat > self.heartbeat_seconds ? heartbeat : self.heartbeat_seconds) : heartbeat < self.heartbeat_seconds ? heartbeat : self.heartbeat_seconds;
                const _bind$7 = _M0MP211localreview4amqp7Decoder10set__limit(self.decoder, self.frame_limit);
                if (_bind$7.$tag === 1) {
                  const _ok = _bind$7;
                  _ok._0;
                } else {
                  const _err$2 = _bind$7;
                  _err = _err$2._0;
                  break _L;
                }
                const _bind$8 = _M0MP211localreview4amqp7Session4emit(self, "connection.tune-ok", [new _M0DTP211localreview4amqp8Argument5Short(self.channel_limit), new _M0DTP211localreview4amqp8Argument4Long(self.frame_limit), new _M0DTP211localreview4amqp8Argument5Short(self.heartbeat_seconds)], 0);
                if (_bind$8.$tag === 1) {
                  const _ok = _bind$8;
                  _ok._0;
                } else {
                  const _err$2 = _bind$8;
                  _err = _err$2._0;
                  break _L;
                }
                const _bind$9 = _M0MP211localreview4amqp7Session4emit(self, "connection.open", [new _M0DTP211localreview4amqp8Argument11ShortString(self.vhost), new _M0DTP211localreview4amqp8Argument11ShortString(""), new _M0DTP211localreview4amqp8Argument3Bit(false)], 0);
                if (_bind$9.$tag === 1) {
                  const _ok = _bind$9;
                  _ok._0;
                } else {
                  const _err$2 = _bind$9;
                  _err = _err$2._0;
                  break _L;
                }
                self.state = "open";
              }
              break;
            }
            case "open": {
              if (_M0IP016_24default__implPB2Eq10not__equalGsE(name, "connection.open-ok")) {
                _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("expected connection.open-ok");
                break _L;
              }
              self.state = "ready";
              _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(events, _M0DTP211localreview4amqp12SessionEvent5Ready__);
              break;
            }
            case "ready": {
              if (frame.channel === 0) {
                if (name === "connection.blocked") {
                  self.blocked = true;
                } else {
                  if (name === "connection.unblocked") {
                    self.blocked = false;
                  } else {
                    if (name === "connection.update-secret-ok" && self.secret_update) {
                      self.secret_update = false;
                    } else {
                      _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unexpected connection method");
                      break _L;
                    }
                  }
                }
                _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(events, new _M0DTP211localreview4amqp12SessionEvent8Received(0, command));
                break _L$2;
              }
              if (!_M0MPB3Map8containsGisE(self.channels, frame.channel)) {
                _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("method on unknown channel");
                break _L;
              }
              if (name === "channel.close") {
                const _bind$7 = _M0MP211localreview4amqp7Session4emit(self, "channel.close-ok", [], frame.channel);
                if (_bind$7.$tag === 1) {
                  const _ok = _bind$7;
                  _ok._0;
                } else {
                  const _err$2 = _bind$7;
                  _err = _err$2._0;
                  break _L;
                }
                _M0MP211localreview4amqp9Assembler7discard(self.assembler, frame.channel);
                _M0MP211localreview4amqp15StreamAssembler7discard(self.stream_assembler, frame.channel);
                _M0MPB3Map6removeGisE(self.channels, frame.channel);
                _M0MPB3Map6removeGimE(self.sending, frame.channel);
                _M0MPB3Map6removeGibE(self.paused, frame.channel);
                let code;
                let reason;
                _L$5: {
                  _L$6: {
                    if (args.length >= 2) {
                      const _x = args[0];
                      if (_x.$tag === 2) {
                        const _Short = _x;
                        const _code = _Short._0;
                        const _x$2 = args[1];
                        if (_x$2.$tag === 5) {
                          const _ShortString = _x$2;
                          const _reason = _ShortString._0;
                          code = _code;
                          reason = _reason;
                          break _L$6;
                        }
                      }
                    }
                    break _L$5;
                  }
                  _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(events, new _M0DTP211localreview4amqp12SessionEvent13ChannelClosed(frame.channel, code, reason));
                }
                break _L$2;
              }
              const _bind$7 = _M0MPB3Map3getGisE(self.channels, frame.channel);
              if (_bind$7 === undefined) {
              } else {
                const _Some = _bind$7;
                const _x = _Some;
                switch (_x) {
                  case "opening": {
                    if (_M0IP016_24default__implPB2Eq10not__equalGsE(name, "channel.open-ok")) {
                      _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("expected channel.open-ok");
                      break _L;
                    }
                    _M0MPB3Map3setGisE(self.channels, frame.channel, "open");
                    break;
                  }
                  case "closing": {
                    if (name === "channel.close-ok") {
                      _M0MP211localreview4amqp9Assembler7discard(self.assembler, frame.channel);
                      _M0MP211localreview4amqp15StreamAssembler7discard(self.stream_assembler, frame.channel);
                      _M0MPB3Map6removeGisE(self.channels, frame.channel);
                      _M0MPB3Map6removeGimE(self.sending, frame.channel);
                      _M0MPB3Map6removeGibE(self.paused, frame.channel);
                      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(events, new _M0DTP211localreview4amqp12SessionEvent13ChannelClosed(frame.channel, 200, "normal close"));
                    }
                    break _L$2;
                  }
                }
              }
              if (name === "channel.flow") {
                _L$5: {
                  _L$6: {
                    let active;
                    _L$7: {
                      if (args.length === 1) {
                        const _x = args[0];
                        if (_x.$tag === 0) {
                          const _Bit = _x;
                          const _active = _Bit._0;
                          active = _active;
                          break _L$7;
                        } else {
                          break _L$6;
                        }
                      } else {
                        break _L$6;
                      }
                    }
                    _M0MPB3Map3setGibE(self.paused, frame.channel, !active);
                    const _bind$8 = _M0MP211localreview4amqp7Session4emit(self, "channel.flow-ok", [new _M0DTP211localreview4amqp8Argument3Bit(active)], frame.channel);
                    if (_bind$8.$tag === 1) {
                      const _ok = _bind$8;
                      _ok._0;
                    } else {
                      const _err$2 = _bind$8;
                      _err = _err$2._0;
                      break _L;
                    }
                    break _L$5;
                  }
                }
              }
              const _bind$8 = _M0MP211localreview4amqp7Session16receive__content(self, frame, events);
              if (_bind$8.$tag === 1) {
                const _ok = _bind$8;
                _ok._0;
              } else {
                const _err$2 = _bind$8;
                _err = _err$2._0;
                break _L;
              }
              if (!_M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_M0FP211localreview4amqp12method__spec(command.class_id, command.method_id)).carries_content) {
                _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(events, new _M0DTP211localreview4amqp12SessionEvent8Received(frame.channel, command));
              }
              break;
            }
            default: {
              _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid session state");
              break _L;
            }
          }
          break _L$2;
        }
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp12SessionEventERP211localreview4amqp10FrameErrorE2Ok(events);
  }
  self.state = "failed";
  _M0MPC15array5Array5clearGRP211localreview4amqp14AuthenticationE(self.auth);
  _M0MPC15array5Array5clearGRP211localreview4amqp14AuthenticationE(self.output);
  return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp12SessionEventERP211localreview4amqp10FrameErrorE3Err(_err);
}
function _M0FP211localreview4amqp13method__names() {
  return ["connection.start", "connection.start-ok", "connection.secure", "connection.secure-ok", "connection.tune", "connection.tune-ok", "connection.open", "connection.open-ok", "connection.close", "connection.close-ok", "connection.blocked", "connection.unblocked", "connection.update-secret", "connection.update-secret-ok", "channel.open", "channel.open-ok", "channel.flow", "channel.flow-ok", "channel.close", "channel.close-ok", "exchange.declare", "exchange.declare-ok", "exchange.delete", "exchange.delete-ok", "exchange.bind", "exchange.bind-ok", "exchange.unbind", "exchange.unbind-ok", "queue.declare", "queue.declare-ok", "queue.bind", "queue.bind-ok", "queue.unbind", "queue.unbind-ok", "queue.purge", "queue.purge-ok", "queue.delete", "queue.delete-ok", "basic.qos", "basic.qos-ok", "basic.consume", "basic.consume-ok", "basic.cancel", "basic.cancel-ok", "basic.publish", "basic.return", "basic.deliver", "basic.get", "basic.get-ok", "basic.get-empty", "basic.ack", "basic.reject", "basic.recover-async", "basic.recover", "basic.recover-ok", "basic.nack", "tx.select", "tx.select-ok", "tx.commit", "tx.commit-ok", "tx.rollback", "tx.rollback-ok", "confirm.select", "confirm.select-ok"];
}
function _M0MP211localreview4amqp7Session22publish__start_2einner(self, channel, exchange, routing_key, body_size, properties, mandatory, immediate) {
  if (_M0IP016_24default__implPB2Eq10not__equalGsE(self.state, "ready") || (_M0IP016_24default__implPB2Eq10not__equalGOsE(_M0MPB3Map3getGisE(self.channels, channel), "open") || (self.blocked || _M0IPC16option6OptionPB2Eq5equalGbE(_M0MPB3Map3getGibE(self.paused, channel), true)))) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("publishing is unavailable or blocked"));
  }
  if (_M0MPB3Map8containsGimE(self.sending, channel)) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("publication already in progress on channel"));
  }
  const _bind$2 = _M0MP211localreview4amqp6Method3new("basic.publish", [new _M0DTP211localreview4amqp8Argument5Short(0), new _M0DTP211localreview4amqp8Argument11ShortString(exchange), new _M0DTP211localreview4amqp8Argument11ShortString(routing_key), new _M0DTP211localreview4amqp8Argument3Bit(mandatory), new _M0DTP211localreview4amqp8Argument3Bit(immediate)]);
  let command;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    command = _ok._0;
  } else {
    return _bind$2;
  }
  const _bind$3 = _M0MP211localreview4amqp6Method14encode_2einner(command, channel, self.frame_limit);
  let _tmp;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _tmp = _ok._0;
  } else {
    return _bind$3;
  }
  const _bind$4 = _M0MP211localreview4amqp5Frame14encode_2einner(_tmp, self.frame_limit);
  let first;
  if (_bind$4.$tag === 1) {
    const _ok = _bind$4;
    first = _ok._0;
  } else {
    return _bind$4;
  }
  const header = new _M0TP211localreview4amqp11BasicHeader(body_size, properties);
  const _bind$5 = _M0MP211localreview4amqp11BasicHeader14encode_2einner(header, channel, self.frame_limit);
  let _tmp$2;
  if (_bind$5.$tag === 1) {
    const _ok = _bind$5;
    _tmp$2 = _ok._0;
  } else {
    return _bind$5;
  }
  const _bind$6 = _M0MP211localreview4amqp5Frame14encode_2einner(_tmp$2, self.frame_limit);
  let second;
  if (_bind$6.$tag === 1) {
    const _ok = _bind$6;
    second = _ok._0;
  } else {
    return _bind$6;
  }
  if (BigInt.asUintN(64, body_size) > BigInt.asUintN(64, 0n)) {
    _M0MPB3Map3setGimE(self.sending, channel, body_size);
  }
  _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(self.output, first);
  return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(_M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(self.output, second));
}
function _M0MP211localreview4amqp7Session13publish__body(self, channel, data) {
  if (_M0IP016_24default__implPB2Eq10not__equalGsE(self.state, "ready") || _M0IP016_24default__implPB2Eq10not__equalGOsE(_M0MPB3Map3getGisE(self.channels, channel), "open")) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("publication channel is unavailable"));
  }
  const _bind$2 = _M0MPC16option6Option16unwrap__or__elseGmEHRP211localreview4amqp10FrameError(_M0MPB3Map3getGimE(self.sending, channel), () => new _M0DTPC16result6ResultGmRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("no outgoing content on channel")));
  let remaining;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    remaining = _ok._0;
  } else {
    return _bind$2;
  }
  if (data.length === 0 || BigInt.asUintN(64, _M0MPC13int3Int10to__uint64(data.length)) > BigInt.asUintN(64, remaining)) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid outgoing body length"));
  }
  const _bind$3 = _M0MP211localreview4amqp5Frame14encode_2einner(new _M0TP211localreview4amqp5Frame(3, channel, data), self.frame_limit);
  let wire;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    wire = _ok._0;
  } else {
    return _bind$3;
  }
  const left = BigInt.asUintN(64, remaining - _M0MPC13int3Int10to__uint64(data.length));
  if (BigInt.asUintN(64, left) === BigInt.asUintN(64, 0n)) {
    _M0MPB3Map6removeGimE(self.sending, channel);
  } else {
    _M0MPB3Map3setGimE(self.sending, channel, left);
  }
  return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(_M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(self.output, wire));
}
function _M0MP211localreview4amqp7Content13basic__header(self) {
  return _M0MP211localreview4amqp11BasicHeader6decode(new _M0TP211localreview4amqp5Frame(2, self.channel, self.header));
}
function _M0MP211localreview4amqp7Session18server__properties(self) {
  return _M0FP211localreview4amqp13decode__table(self.server_properties_wire);
}
function _M0MP211localreview4amqp7Session15server__locales(self) {
  return _M0MPC15array5Array4copyGsE(self.server_locales);
}
function _M0MP211localreview4amqp7Session15server__version(self) {
  return self.server_version;
}
function _M0MP211localreview4amqp7Session13virtual__host(self) {
  return self.vhost;
}
function _M0MP211localreview4amqp7Session6locale(self) {
  return self.locale;
}
function _M0MP211localreview4amqp14Authentication8deferred(mechanism) {
  const _bind$2 = _M0FP211localreview4amqp16check__mechanism(mechanism);
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _ok._0;
  } else {
    return _bind$2;
  }
  return new _M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRP211localreview4amqp10FrameErrorE2Ok(new _M0TP211localreview4amqp14Authentication(mechanism, undefined));
}
function _M0MP211localreview4amqp14Authentication8external() {
  return new _M0TP211localreview4amqp14Authentication("EXTERNAL", $bytes_literal$7);
}
function _M0MP211localreview4amqp7Session23respond__authentication(self, response) {
  if (_M0IP016_24default__implPB2Eq10not__equalGsE(self.state, "authenticate")) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("no initial SASL response is pending"));
  }
  return _M0MP211localreview4amqp7Session14auth__response(self, response);
}
function _M0MP211localreview4amqp7Session25authentication__mechanism(self) {
  return self.selected_auth;
}
function _M0FP411localreview4amqp3cmd3web10uri__parse(input) {
  let _try_err;
  _L: {
    const _bind$2 = _M0FP211localreview4amqp10parse__uri(input);
    let uri;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      uri = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    let heartbeat;
    let value;
    _L$2: {
      _L$3: {
        const _bind$3 = uri.heartbeat_seconds;
        if (_bind$3 === undefined) {
          heartbeat = _M0MPC14json4Json4null();
        } else {
          const _Some = _bind$3;
          const _value = _Some;
          value = _value;
          break _L$3;
        }
        break _L$2;
      }
      heartbeat = _M0IPC16string6StringPB6ToJson8to__json(_M0MPC15int645Int6418to__string_2einner(value, 10));
    }
    let ns;
    let value$2;
    _L$3: {
      _L$4: {
        const _bind$3 = uri.heartbeat_seconds;
        if (_bind$3 === undefined) {
          ns = _M0MPC14json4Json4null();
        } else {
          const _Some = _bind$3;
          const _value = _Some;
          value$2 = _value;
          break _L$4;
        }
        break _L$3;
      }
      ns = _M0IPC16string6StringPB6ToJson8to__json(_M0MPC15int645Int6418to__string_2einner(BigInt.asUintN(64, value$2 * 1000000000n), 10));
    }
    const _bind$3 = [{ _0: "ok", _1: _M0MPC14json4Json7boolean(true) }, { _0: "scheme", _1: _M0IPC16string6StringPB6ToJson8to__json(uri.scheme) }, { _0: "host", _1: _M0IPC16string6StringPB6ToJson8to__json(uri.host) }, { _0: "port", _1: _M0IPC13int3IntPB6ToJson8to__json(uri.port) }, { _0: "username", _1: _M0IPC16string6StringPB6ToJson8to__json(uri.username) }, { _0: "password", _1: _M0IPC16string6StringPB6ToJson8to__json(uri.password) }, { _0: "vhost", _1: _M0IPC16string6StringPB6ToJson8to__json(uri.vhost) }, { _0: "certFile", _1: _M0IPC16string6StringPB6ToJson8to__json(uri.cert_file) }, { _0: "keyFile", _1: _M0IPC16string6StringPB6ToJson8to__json(uri.key_file) }, { _0: "caCertFile", _1: _M0IPC16string6StringPB6ToJson8to__json(uri.ca_cert_file) }, { _0: "serverName", _1: _M0IPC16string6StringPB6ToJson8to__json(uri.server_name) }, { _0: "authMechanism", _1: _M0IPC15array5ArrayPB6ToJson8to__jsonGsE(uri.auth_mechanism) }, { _0: "heartbeatSeconds", _1: heartbeat }, { _0: "heartbeatNs", _1: ns }, { _0: "connectionTimeout", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0MPC15int645Int6418to__string_2einner(uri.connection_timeout, 10)) }, { _0: "channelMax", _1: _M0IPC13int3IntPB6ToJson8to__json(uri.channel_max) }, { _0: "canonical", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0MP211localreview4amqp3URI10to__string(uri)) }, { _0: "redacted", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0MP211localreview4amqp3URI8redacted(uri)) }];
    return _M0MPC14json4Json17stringify_2einner(_M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$3, 0, 18), undefined)), false, 0, undefined);
  }
  return "ERROR: invalid AMQP URI";
}
function _M0FP411localreview4amqp3cmd3web7session(key) {
  return _M0MPC16option6Option16unwrap__or__elseGRP211localreview4amqp7SessionEHRPB7Failure(_M0MPB3Map3getGsRP211localreview4amqp7SessionE(_M0FP411localreview4amqp3cmd3web8sessions, key), () => new _M0DTPC16result6ResultGRP211localreview4amqp7SessionRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("unknown session")));
}
function _M0FP411localreview4amqp3cmd3web3str(value) {
  let s;
  _L: {
    if (value.$tag === 4) {
      const _String = value;
      const _s = _String._0;
      s = _s;
      break _L;
    } else {
      return new _M0DTPC16result6ResultGsRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("expected string"));
    }
  }
  return new _M0DTPC16result6ResultGsRPC15error5ErrorE2Ok(s);
}
function _M0FP411localreview4amqp3cmd3web3int(value) {
  _L: {
    let n;
    _L$2: {
      if (value.$tag === 3) {
        const _Number = value;
        const _n = _Number._0;
        if (_n >= -2147483648 && (_n <= 2147483647 && _n === _M0MPC16double6Double7to__int(_n) + 0)) {
          n = _n;
          break _L$2;
        } else {
          break _L;
        }
      } else {
        break _L;
      }
    }
    return new _M0DTPC16result6ResultGiRPC15error5ErrorE2Ok(_M0MPC16double6Double7to__int(n));
  }
  return new _M0DTPC16result6ResultGiRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("expected int32"));
}
function _M0FP411localreview4amqp3cmd3web4uint(value) {
  _L: {
    let n;
    _L$2: {
      if (value.$tag === 3) {
        const _Number = value;
        const _n = _Number._0;
        if (_n >= 0 && (_n <= 4294967295 && _n === $f64_convert_i32_u(_M0MPC16double6Double8to__uint(_n)))) {
          n = _n;
          break _L$2;
        } else {
          break _L;
        }
      } else {
        break _L;
      }
    }
    return new _M0DTPC16result6ResultGjRPC15error5ErrorE2Ok(_M0MPC16double6Double8to__uint(n));
  }
  return new _M0DTPC16result6ResultGjRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("expected uint32"));
}
function _M0FP411localreview4amqp3cmd3web3obj(value) {
  let o;
  _L: {
    if (value.$tag === 6) {
      const _Object = value;
      const _o = _Object._0;
      o = _o;
      break _L;
    } else {
      return new _M0DTPC16result6ResultGRPB3MapGsRPB4JsonERPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("expected object"));
    }
  }
  return new _M0DTPC16result6ResultGRPB3MapGsRPB4JsonERPC15error5ErrorE2Ok(o);
}
function _M0FP411localreview4amqp3cmd3web8required(o, key) {
  return _M0MPC16option6Option16unwrap__or__elseGRPB4JsonEHRPB7Failure(_M0MPB3Map3getGsRPB4JsonE(o, key), () => new _M0DTPC16result6ResultGRPB4JsonRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(`missing field ${key}`)));
}
function _M0FP411localreview4amqp3cmd3web3hex(data) {
  const alphabet = $bytes_literal$8;
  const out = _M0MPC15bytes5Bytes5makei(Math.imul(data.length, 2) | 0, (i) => {
    if (2 === 0) {
      $panic();
    }
    const _tmp = i / 2 | 0;
    const n = _tmp >>> 0 < data.length ? data[_tmp] : $oob();
    let _tmp$2;
    if (2 === 0) {
      $panic();
    }
    if ((i % 2 | 0) === 0) {
      if (16 === 0) {
        $panic();
      }
      _tmp$2 = n / 16 | 0;
    } else {
      if (16 === 0) {
        $panic();
      }
      _tmp$2 = n % 16 | 0;
    }
    const _tmp$3 = _tmp$2;
    return _tmp$3 >>> 0 < alphabet.length ? alphabet[_tmp$3] : $oob();
  });
  let _try_err;
  _L: {
    const _bind$2 = _M0FPC28encoding4utf814decode_2einner(new _M0TPC15bytes9BytesView(out, 0, out.length), false);
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      return _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
  }
  return $panic();
}
function _M0FP411localreview4amqp3cmd3web11table__json(entries) {
  const _bind$2 = [];
  const out = _M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 0), undefined);
  const _bind$3 = entries.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$3) {
      const _foreach_element = entries[_];
      let key;
      let value;
      _L: {
        const _key = _foreach_element._0;
        const _value = _foreach_element._1;
        key = _key;
        value = _value;
        break _L;
      }
      _M0MPB3Map3setGsRPB4JsonE(out, key, _M0FP411localreview4amqp3cmd3web11field__json(value));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPC14json4Json6object(out);
}
function _M0FP411localreview4amqp3cmd3web11field__json(v) {
  let t;
  _L: {
    let a;
    _L$2: {
      let b;
      _L$3: {
        let b$2;
        _L$4: {
          let scale;
          let n;
          _L$5: {
            let n$2;
            _L$6: {
              let n$3;
              _L$7: {
                let n$4;
                _L$8: {
                  let n$5;
                  _L$9: {
                    let n$6;
                    _L$10: {
                      let n$7;
                      _L$11: {
                        let b$3;
                        _L$12: {
                          switch (v.$tag) {
                            case 0: {
                              const _Boolean = v;
                              const _b = _Boolean._0;
                              b$3 = _b;
                              break _L$12;
                            }
                            case 1: {
                              const _Signed8 = v;
                              const _n = _Signed8._0;
                              n$7 = _n;
                              break _L$11;
                            }
                            case 2: {
                              const _Unsigned8 = v;
                              const _n$2 = _Unsigned8._0;
                              n$7 = _n$2;
                              break _L$11;
                            }
                            case 3: {
                              const _Signed16 = v;
                              const _n$3 = _Signed16._0;
                              n$7 = _n$3;
                              break _L$11;
                            }
                            case 4: {
                              const _Unsigned16 = v;
                              const _n$4 = _Unsigned16._0;
                              n$7 = _n$4;
                              break _L$11;
                            }
                            case 5: {
                              const _Signed32 = v;
                              const _n$5 = _Signed32._0;
                              n$7 = _n$5;
                              break _L$11;
                            }
                            case 6: {
                              const _Unsigned32 = v;
                              const _n$6 = _Unsigned32._0;
                              n$6 = _n$6;
                              break _L$10;
                            }
                            case 7: {
                              const _Signed64 = v;
                              const _n$7 = _Signed64._0;
                              n$5 = _n$7;
                              break _L$9;
                            }
                            case 13: {
                              const _Timestamp = v;
                              const _n$8 = _Timestamp._0;
                              n$4 = _n$8;
                              break _L$8;
                            }
                            case 8: {
                              const _Float32Bits = v;
                              const _n$9 = _Float32Bits._0;
                              n$3 = _n$9;
                              break _L$7;
                            }
                            case 9: {
                              const _Float64Bits = v;
                              const _n$10 = _Float64Bits._0;
                              n$2 = _n$10;
                              break _L$6;
                            }
                            case 10: {
                              const _Decimal = v;
                              const _scale = _Decimal._0;
                              const _n$11 = _Decimal._1;
                              scale = _scale;
                              n = _n$11;
                              break _L$5;
                            }
                            case 11: {
                              const _LongString = v;
                              const _b$2 = _LongString._0;
                              b$2 = _b$2;
                              break _L$4;
                            }
                            case 12: {
                              const _ByteArray = v;
                              const _b$3 = _ByteArray._0;
                              b = _b$3;
                              break _L$3;
                            }
                            case 14: {
                              const _ArrayValue = v;
                              const _a = _ArrayValue._0;
                              a = _a;
                              break _L$2;
                            }
                            case 15: {
                              const _TableValue = v;
                              const _t = _TableValue._0;
                              t = _t;
                              break _L;
                            }
                            default: {
                              return _M0MPC14json4Json4null();
                            }
                          }
                        }
                        return _M0IPC14bool4BoolPB6ToJson8to__json(b$3);
                      }
                      return _M0IPC13int3IntPB6ToJson8to__json(n$7);
                    }
                    return _M0IPC16double6DoublePB6ToJson8to__json($f64_convert_i32_u(n$6));
                  }
                  const _bind$2 = [{ _0: "$type", _1: _M0MPC14json4Json6string("int64") }, { _0: "value", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0MPC15int645Int6418to__string_2einner(n$5, 10)) }];
                  return _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 2), undefined));
                }
                const _bind$2 = [{ _0: "$type", _1: _M0MPC14json4Json6string("timestamp") }, { _0: "value", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0MPC16uint646UInt6418to__string_2einner(n$4, 10)) }];
                return _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 2), undefined));
              }
              const _bind$2 = [{ _0: "$type", _1: _M0MPC14json4Json6string("float32-bits") }, { _0: "value", _1: _M0IPC16double6DoublePB6ToJson8to__json($f64_convert_i32_u(n$3)) }];
              return _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 2), undefined));
            }
            const _bind$2 = [{ _0: "$type", _1: _M0MPC14json4Json6string("float64-bits") }, { _0: "value", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0MPC16uint646UInt6418to__string_2einner(n$2, 10)) }];
            return _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 2), undefined));
          }
          const _bind$2 = [{ _0: "$type", _1: _M0MPC14json4Json6string("decimal") }, { _0: "scale", _1: _M0IPC13int3IntPB6ToJson8to__json(scale) }, { _0: "value", _1: _M0IPC13int3IntPB6ToJson8to__json(n) }];
          return _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 3), undefined));
        }
        const _bind$2 = [{ _0: "$type", _1: _M0MPC14json4Json6string("longstr") }, { _0: "hex", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0FP411localreview4amqp3cmd3web3hex(b$2)) }];
        return _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 2), undefined));
      }
      const _bind$2 = [{ _0: "$type", _1: _M0MPC14json4Json6string("bytes") }, { _0: "hex", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0FP411localreview4amqp3cmd3web3hex(b)) }];
      return _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 2), undefined));
    }
    return _M0IPC15array5ArrayPB6ToJson8to__jsonGRPB4JsonE(_M0MPC15array5Array3mapGRP211localreview4amqp10FieldValueRPB4JsonE(a, _M0FP411localreview4amqp3cmd3web11field__json));
  }
  return _M0FP411localreview4amqp3cmd3web11table__json(t);
}
function _M0FP411localreview4amqp3cmd3web10hex__digit(c) {
  return c >= 48 && c <= 57 ? c - 48 | 0 : c >= 97 && c <= 102 ? c - 87 | 0 : c >= 65 && c <= 70 ? c - 55 | 0 : -1;
}
function _M0FP411localreview4amqp3cmd3web13unhex_2einner(text, max_length) {
  if (text.length > max_length) {
    return new _M0DTPC16result6ResultGzRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("input too long"));
  }
  const digits = new _M0TPB8MutLocalGiE(0);
  const _bind$2 = 0;
  const _bind$3 = text.length;
  let _tmp = _bind$2;
  while (true) {
    const i = _tmp;
    if (i < _bind$3) {
      const c = i >>> 0 < text.length ? text.charCodeAt(i) : $oob();
      if (_M0FP411localreview4amqp3cmd3web10hex__digit(c) >= 0) {
        digits.val = digits.val + 1 | 0;
      } else {
        if (c !== 32 && (c !== 10 && (c !== 13 && c !== 9))) {
          return new _M0DTPC16result6ResultGzRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("invalid hex character"));
        }
      }
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  if (2 === 0) {
    $panic();
  }
  if ((digits.val % 2 | 0) !== 0) {
    return new _M0DTPC16result6ResultGzRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("odd hex length"));
  }
  const cursor = new _M0TPB8MutLocalGiE(0);
  if (2 === 0) {
    $panic();
  }
  return new _M0DTPC16result6ResultGzRPC15error5ErrorE2Ok(_M0MPC15bytes5Bytes5makei(digits.val / 2 | 0, (_discard_) => {
    const _tmp$2 = cursor.val;
    const high = new _M0TPB8MutLocalGiE(_M0FP411localreview4amqp3cmd3web10hex__digit(_tmp$2 >>> 0 < text.length ? text.charCodeAt(_tmp$2) : $oob()));
    while (true) {
      if (high.val < 0) {
        cursor.val = cursor.val + 1 | 0;
        const _tmp$3 = cursor.val;
        high.val = _M0FP411localreview4amqp3cmd3web10hex__digit(_tmp$3 >>> 0 < text.length ? text.charCodeAt(_tmp$3) : $oob());
        continue;
      } else {
        break;
      }
    }
    cursor.val = cursor.val + 1 | 0;
    const _tmp$3 = cursor.val;
    const low = new _M0TPB8MutLocalGiE(_M0FP411localreview4amqp3cmd3web10hex__digit(_tmp$3 >>> 0 < text.length ? text.charCodeAt(_tmp$3) : $oob()));
    while (true) {
      if (low.val < 0) {
        cursor.val = cursor.val + 1 | 0;
        const _tmp$4 = cursor.val;
        low.val = _M0FP411localreview4amqp3cmd3web10hex__digit(_tmp$4 >>> 0 < text.length ? text.charCodeAt(_tmp$4) : $oob());
        continue;
      } else {
        break;
      }
    }
    cursor.val = cursor.val + 1 | 0;
    return ((Math.imul(high.val, 16) | 0) + low.val | 0) & 255;
  }));
}
function _M0FP411localreview4amqp3cmd3web12table__parse(value, depth) {
  const out = [];
  const _bind$2 = _M0FP411localreview4amqp3cmd3web3obj(value);
  let _tmp;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _tmp = _ok._0;
  } else {
    return _bind$2;
  }
  const _it = _M0MPB3Map5iter2GsRPB4JsonE(_tmp);
  while (true) {
    let k;
    let v;
    _L: {
      const _bind$3 = _M0MPB5Iter24nextGsRPB4JsonE(_it);
      if (_bind$3 === undefined) {
        break;
      } else {
        const _Some = _bind$3;
        const _x = _Some;
        const _k = _x._0;
        const _v = _x._1;
        k = _k;
        v = _v;
        break _L;
      }
    }
    const _bind$3 = _M0FP411localreview4amqp3cmd3web12field__parse(v, depth + 1 | 0);
    let _tmp$2;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _tmp$2 = _ok._0;
    } else {
      return _bind$3;
    }
    _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(out, { _0: k, _1: _tmp$2 });
    continue;
  }
  return new _M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERPC15error5ErrorE2Ok(out);
}
function _M0FP411localreview4amqp3cmd3web12field__parse(value, depth) {
  if (depth > 32) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("table nesting limit"));
  }
  let o;
  _L: {
    let a;
    _L$2: {
      let s;
      _L$3: {
        switch (value.$tag) {
          case 0: {
            return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok(_M0DTP211localreview4amqp10FieldValue4Void__);
          }
          case 1: {
            return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue7Boolean(true));
          }
          case 2: {
            return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue7Boolean(false));
          }
          case 4: {
            const _String = value;
            const _s = _String._0;
            s = _s;
            break _L$3;
          }
          case 3: {
            const _bind$2 = _M0FP411localreview4amqp3cmd3web3int(value);
            let _tmp;
            if (_bind$2.$tag === 1) {
              const _ok = _bind$2;
              _tmp = _ok._0;
            } else {
              return _bind$2;
            }
            return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue8Signed32(_tmp));
          }
          case 5: {
            const _Array = value;
            const _a = _Array._0;
            a = _a;
            break _L$2;
          }
          default: {
            const _Object = value;
            const _o = _Object._0;
            o = _o;
            break _L;
          }
        }
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue10LongString(_M0FPC28encoding4utf814encode_2einner(new _M0TPC16string10StringView(s, 0, s.length), false)));
    }
    const _bind$2 = _M0MPC15array5Array3mapGRPB4JsonRP211localreview4amqp10FieldValueEHRPC15error5Error(a, (v) => _M0FP411localreview4amqp3cmd3web12field__parse(v, depth + 1 | 0));
    let _tmp;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _tmp = _ok._0;
    } else {
      return _bind$2;
    }
    return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue10ArrayValue(_tmp));
  }
  _L$2: {
    const _bind$2 = _M0MPB3Map3getGsRPB4JsonE(o, "$type");
    if (_bind$2 === undefined) {
      const _bind$3 = _M0FP411localreview4amqp3cmd3web12table__parse(value, depth);
      let _tmp;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        _tmp = _ok._0;
      } else {
        return _bind$3;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue10TableValue(_tmp));
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      if (_x.$tag === 4) {
        const _String = _x;
        const _x$2 = _String._0;
        switch (_x$2) {
          case "int64": {
            const _bind$3 = _M0FP411localreview4amqp3cmd3web8required(o, "value");
            let _tmp;
            if (_bind$3.$tag === 1) {
              const _ok = _bind$3;
              _tmp = _ok._0;
            } else {
              return _bind$3;
            }
            const _bind$4 = _M0FPC14json10from__jsonGlE(_tmp, undefined);
            let _tmp$2;
            if (_bind$4.$tag === 1) {
              const _ok = _bind$4;
              _tmp$2 = _ok._0;
            } else {
              return _bind$4;
            }
            return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue8Signed64(_tmp$2));
          }
          case "timestamp": {
            const _bind$5 = _M0FP411localreview4amqp3cmd3web8required(o, "value");
            let _tmp$3;
            if (_bind$5.$tag === 1) {
              const _ok = _bind$5;
              _tmp$3 = _ok._0;
            } else {
              return _bind$5;
            }
            const _bind$6 = _M0FPC14json10from__jsonGmE(_tmp$3, undefined);
            let _tmp$4;
            if (_bind$6.$tag === 1) {
              const _ok = _bind$6;
              _tmp$4 = _ok._0;
            } else {
              return _bind$6;
            }
            return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue9Timestamp(_tmp$4));
          }
          case "float32-bits": {
            const _bind$7 = _M0FP411localreview4amqp3cmd3web8required(o, "value");
            let _tmp$5;
            if (_bind$7.$tag === 1) {
              const _ok = _bind$7;
              _tmp$5 = _ok._0;
            } else {
              return _bind$7;
            }
            const _bind$8 = _M0FP411localreview4amqp3cmd3web4uint(_tmp$5);
            let _tmp$6;
            if (_bind$8.$tag === 1) {
              const _ok = _bind$8;
              _tmp$6 = _ok._0;
            } else {
              return _bind$8;
            }
            return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue11Float32Bits(_tmp$6));
          }
          case "float64-bits": {
            const _bind$9 = _M0FP411localreview4amqp3cmd3web8required(o, "value");
            let _tmp$7;
            if (_bind$9.$tag === 1) {
              const _ok = _bind$9;
              _tmp$7 = _ok._0;
            } else {
              return _bind$9;
            }
            const _bind$10 = _M0FPC14json10from__jsonGmE(_tmp$7, undefined);
            let _tmp$8;
            if (_bind$10.$tag === 1) {
              const _ok = _bind$10;
              _tmp$8 = _ok._0;
            } else {
              return _bind$10;
            }
            return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue11Float64Bits(_tmp$8));
          }
          case "decimal": {
            const _bind$11 = _M0FP411localreview4amqp3cmd3web8required(o, "scale");
            let _tmp$9;
            if (_bind$11.$tag === 1) {
              const _ok = _bind$11;
              _tmp$9 = _ok._0;
            } else {
              return _bind$11;
            }
            const _bind$12 = _M0FP411localreview4amqp3cmd3web3int(_tmp$9);
            let _tmp$10;
            if (_bind$12.$tag === 1) {
              const _ok = _bind$12;
              _tmp$10 = _ok._0;
            } else {
              return _bind$12;
            }
            const _bind$13 = _M0FP411localreview4amqp3cmd3web8required(o, "value");
            let _tmp$11;
            if (_bind$13.$tag === 1) {
              const _ok = _bind$13;
              _tmp$11 = _ok._0;
            } else {
              return _bind$13;
            }
            const _bind$14 = _M0FP411localreview4amqp3cmd3web3int(_tmp$11);
            let _tmp$12;
            if (_bind$14.$tag === 1) {
              const _ok = _bind$14;
              _tmp$12 = _ok._0;
            } else {
              return _bind$14;
            }
            return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue7Decimal(_tmp$10, _tmp$12));
          }
          case "longstr": {
            const _bind$15 = _M0FP411localreview4amqp3cmd3web8required(o, "hex");
            let _tmp$13;
            if (_bind$15.$tag === 1) {
              const _ok = _bind$15;
              _tmp$13 = _ok._0;
            } else {
              return _bind$15;
            }
            const _bind$16 = _M0FP411localreview4amqp3cmd3web3str(_tmp$13);
            let _tmp$14;
            if (_bind$16.$tag === 1) {
              const _ok = _bind$16;
              _tmp$14 = _ok._0;
            } else {
              return _bind$16;
            }
            const _bind$17 = _M0FP411localreview4amqp3cmd3web13unhex_2einner(_tmp$14, 2097152);
            let _tmp$15;
            if (_bind$17.$tag === 1) {
              const _ok = _bind$17;
              _tmp$15 = _ok._0;
            } else {
              return _bind$17;
            }
            return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue10LongString(_tmp$15));
          }
          case "bytes": {
            const _bind$18 = _M0FP411localreview4amqp3cmd3web8required(o, "hex");
            let _tmp$16;
            if (_bind$18.$tag === 1) {
              const _ok = _bind$18;
              _tmp$16 = _ok._0;
            } else {
              return _bind$18;
            }
            const _bind$19 = _M0FP411localreview4amqp3cmd3web3str(_tmp$16);
            let _tmp$17;
            if (_bind$19.$tag === 1) {
              const _ok = _bind$19;
              _tmp$17 = _ok._0;
            } else {
              return _bind$19;
            }
            const _bind$20 = _M0FP411localreview4amqp3cmd3web13unhex_2einner(_tmp$17, 2097152);
            let _tmp$18;
            if (_bind$20.$tag === 1) {
              const _ok = _bind$20;
              _tmp$18 = _ok._0;
            } else {
              return _bind$20;
            }
            return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue9ByteArray(_tmp$18));
          }
          default: {
            break _L$2;
          }
        }
      } else {
        break _L$2;
      }
    }
  }
  return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("unknown table type"));
}
function _M0FP411localreview4amqp3cmd3web14argument__json(a) {
  let t;
  _L: {
    let b;
    _L$2: {
      let s;
      _L$3: {
        let n;
        _L$4: {
          let n$2;
          _L$5: {
            let n$3;
            _L$6: {
              let b$2;
              _L$7: {
                switch (a.$tag) {
                  case 0: {
                    const _Bit = a;
                    const _b = _Bit._0;
                    b$2 = _b;
                    break _L$7;
                  }
                  case 1: {
                    const _Octet = a;
                    const _n = _Octet._0;
                    n$3 = _n;
                    break _L$6;
                  }
                  case 2: {
                    const _Short = a;
                    const _n$2 = _Short._0;
                    n$3 = _n$2;
                    break _L$6;
                  }
                  case 3: {
                    const _Long = a;
                    const _n$3 = _Long._0;
                    n$2 = _n$3;
                    break _L$5;
                  }
                  case 4: {
                    const _LongLong = a;
                    const _n$4 = _LongLong._0;
                    n = _n$4;
                    break _L$4;
                  }
                  case 5: {
                    const _ShortString = a;
                    const _s = _ShortString._0;
                    s = _s;
                    break _L$3;
                  }
                  case 6: {
                    const _LongString = a;
                    const _b$2 = _LongString._0;
                    b = _b$2;
                    break _L$2;
                  }
                  default: {
                    const _Table = a;
                    const _t = _Table._0;
                    t = _t;
                    break _L;
                  }
                }
              }
              return _M0IPC14bool4BoolPB6ToJson8to__json(b$2);
            }
            return _M0IPC13int3IntPB6ToJson8to__json(n$3);
          }
          return _M0IPC16double6DoublePB6ToJson8to__json($f64_convert_i32_u(n$2));
        }
        return _M0IPC16string6StringPB6ToJson8to__json(_M0MPC16uint646UInt6418to__string_2einner(n, 10));
      }
      return _M0IPC16string6StringPB6ToJson8to__json(s);
    }
    return _M0IPC16string6StringPB6ToJson8to__json(_M0FP411localreview4amqp3cmd3web3hex(b));
  }
  return _M0FP411localreview4amqp3cmd3web11table__json(t);
}
function _M0FP411localreview4amqp3cmd3web15argument__parse(kind, value) {
  switch (kind) {
    case 0: {
      switch (value.$tag) {
        case 1: {
          return new _M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp8Argument3Bit(true));
        }
        case 2: {
          return new _M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp8Argument3Bit(false));
        }
        default: {
          return new _M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("expected boolean"));
        }
      }
    }
    case 1: {
      const _bind$2 = _M0FP411localreview4amqp3cmd3web3int(value);
      let _tmp;
      if (_bind$2.$tag === 1) {
        const _ok = _bind$2;
        _tmp = _ok._0;
      } else {
        return _bind$2;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp8Argument5Octet(_tmp));
    }
    case 2: {
      const _bind$3 = _M0FP411localreview4amqp3cmd3web3int(value);
      let _tmp$2;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        _tmp$2 = _ok._0;
      } else {
        return _bind$3;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp8Argument5Short(_tmp$2));
    }
    case 3: {
      const _bind$4 = _M0FP411localreview4amqp3cmd3web4uint(value);
      let _tmp$3;
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        _tmp$3 = _ok._0;
      } else {
        return _bind$4;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp8Argument4Long(_tmp$3));
    }
    case 4: {
      const _bind$5 = _M0FPC14json10from__jsonGmE(value, undefined);
      let _tmp$4;
      if (_bind$5.$tag === 1) {
        const _ok = _bind$5;
        _tmp$4 = _ok._0;
      } else {
        return _bind$5;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp8Argument8LongLong(_tmp$4));
    }
    case 5: {
      const _bind$6 = _M0FP411localreview4amqp3cmd3web3str(value);
      let _tmp$5;
      if (_bind$6.$tag === 1) {
        const _ok = _bind$6;
        _tmp$5 = _ok._0;
      } else {
        return _bind$6;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp8Argument11ShortString(_tmp$5));
    }
    case 6: {
      const _bind$7 = _M0FP411localreview4amqp3cmd3web3str(value);
      let _tmp$6;
      if (_bind$7.$tag === 1) {
        const _ok = _bind$7;
        _tmp$6 = _ok._0;
      } else {
        return _bind$7;
      }
      const _bind$8 = _M0FP411localreview4amqp3cmd3web13unhex_2einner(_tmp$6, 2097152);
      let _tmp$7;
      if (_bind$8.$tag === 1) {
        const _ok = _bind$8;
        _tmp$7 = _ok._0;
      } else {
        return _bind$8;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp8Argument10LongString(_tmp$7));
    }
    default: {
      const _bind$9 = _M0FP411localreview4amqp3cmd3web12table__parse(value, 0);
      let _tmp$8;
      if (_bind$9.$tag === 1) {
        const _ok = _bind$9;
        _tmp$8 = _ok._0;
      } else {
        return _bind$9;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp8ArgumentRPC15error5ErrorE2Ok(new _M0DTP211localreview4amqp8Argument5Table(_tmp$8));
    }
  }
}
function _M0FP411localreview4amqp3cmd3web12method__json(channel, command) {
  const spec = _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_M0FP211localreview4amqp12method__spec(command.class_id, command.method_id));
  const _bind$2 = [];
  const args = _M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 0), undefined);
  const _bind$3 = spec.fields;
  const _bind$4 = _bind$3.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind$4) {
      const _foreach_element = _bind$3[i];
      let key;
      _L: {
        const _key = _foreach_element._0;
        key = _key;
        break _L;
      }
      _M0MPB3Map3setGsRPB4JsonE(args, key, _M0FP411localreview4amqp3cmd3web14argument__json(_M0MPC15array5Array2atGRPB4JsonE(command.arguments, i)));
      _tmp = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$5 = [{ _0: "type", _1: _M0MPC14json4Json6string("method") }, { _0: "channel", _1: _M0IPC13int3IntPB6ToJson8to__json(channel) }, { _0: "name", _1: _M0IPC16string6StringPB6ToJson8to__json(spec.name) }, { _0: "args", _1: _M0MPC14json4Json6object(args) }];
  return _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$5, 0, 4), undefined));
}
function _M0FP411localreview4amqp3cmd3web11event__json(e) {
  let c;
  _L: {
    let code;
    let reason;
    _L$2: {
      let code$2;
      let ch;
      let reason$2;
      _L$3: {
        let ch$2;
        _L$4: {
          let ch$3;
          let data;
          _L$5: {
            let command;
            let ch$4;
            let header;
            _L$6: {
              let ch$5;
              let command$2;
              _L$7: {
                let index;
                let mechanism;
                _L$8: {
                  switch (e.$tag) {
                    case 0: {
                      const _bind$2 = [{ _0: "type", _1: _M0MPC14json4Json6string("ready") }];
                      return new _M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE2Ok(_M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 1), undefined)));
                    }
                    case 1: {
                      const _AuthenticationRequested = e;
                      const _index = _AuthenticationRequested._0;
                      const _mechanism = _AuthenticationRequested._1;
                      index = _index;
                      mechanism = _mechanism;
                      break _L$8;
                    }
                    case 2: {
                      const _Received = e;
                      const _ch = _Received._0;
                      const _command = _Received._1;
                      ch$5 = _ch;
                      command$2 = _command;
                      break _L$7;
                    }
                    case 4: {
                      const _MessageStart = e;
                      const _ch$2 = _MessageStart._0;
                      const _command$2 = _MessageStart._1;
                      const _header = _MessageStart._2;
                      command = _command$2;
                      ch$4 = _ch$2;
                      header = _header;
                      break _L$6;
                    }
                    case 5: {
                      const _MessageData = e;
                      const _ch$3 = _MessageData._0;
                      const _data = _MessageData._1;
                      ch$3 = _ch$3;
                      data = _data;
                      break _L$5;
                    }
                    case 6: {
                      const _MessageEnd = e;
                      const _ch$4 = _MessageEnd._0;
                      ch$2 = _ch$4;
                      break _L$4;
                    }
                    case 7: {
                      const _ChannelClosed = e;
                      const _ch$5 = _ChannelClosed._0;
                      const _code = _ChannelClosed._1;
                      const _reason = _ChannelClosed._2;
                      code$2 = _code;
                      ch = _ch$5;
                      reason$2 = _reason;
                      break _L$3;
                    }
                    case 8: {
                      const _Closed = e;
                      const _code$2 = _Closed._0;
                      const _reason$2 = _Closed._1;
                      code = _code$2;
                      reason = _reason$2;
                      break _L$2;
                    }
                    default: {
                      const _Message = e;
                      const _c = _Message._0;
                      c = _c;
                      break _L;
                    }
                  }
                }
                const _bind$2 = [{ _0: "type", _1: _M0MPC14json4Json6string("authenticate") }, { _0: "index", _1: _M0IPC13int3IntPB6ToJson8to__json(index) }, { _0: "mechanism", _1: _M0IPC16string6StringPB6ToJson8to__json(mechanism) }];
                return new _M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE2Ok(_M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 3), undefined)));
              }
              return new _M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE2Ok(_M0FP411localreview4amqp3cmd3web12method__json(ch$5, command$2));
            }
            const _bind$2 = _M0FP411localreview4amqp3cmd3web3obj(_M0FP411localreview4amqp3cmd3web12method__json(ch$4, command));
            let o;
            if (_bind$2.$tag === 1) {
              const _ok = _bind$2;
              o = _ok._0;
            } else {
              return _bind$2;
            }
            _M0MPB3Map3setGsRPB4JsonE(o, "type", _M0MPC14json4Json6string("messageStart"));
            _M0MPB3Map3setGsRPB4JsonE(o, "bodySize", _M0IPC16string6StringPB6ToJson8to__json(_M0MPC16uint646UInt6418to__string_2einner(header.body_size, 10)));
            const _bind$3 = [];
            const props = _M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$3, 0, 0), undefined);
            const _bind$4 = header.properties;
            const _bind$5 = _bind$4.length;
            let _tmp = 0;
            while (true) {
              const _ = _tmp;
              if (_ < _bind$5) {
                const _foreach_element = _bind$4[_];
                let k;
                let v;
                _L$7: {
                  const _k = _foreach_element._0;
                  const _v = _foreach_element._1;
                  k = _k;
                  v = _v;
                  break _L$7;
                }
                _M0MPB3Map3setGsRPB4JsonE(props, k, _M0FP411localreview4amqp3cmd3web14argument__json(v));
                _tmp = _ + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            _M0MPB3Map3setGsRPB4JsonE(o, "properties", _M0MPC14json4Json6object(props));
            return new _M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE2Ok(_M0MPC14json4Json6object(o));
          }
          const _bind$2 = [{ _0: "type", _1: _M0MPC14json4Json6string("messageData") }, { _0: "channel", _1: _M0IPC13int3IntPB6ToJson8to__json(ch$3) }, { _0: "bodyHex", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0FP411localreview4amqp3cmd3web3hex(data)) }];
          return new _M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE2Ok(_M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 3), undefined)));
        }
        const _bind$2 = [{ _0: "type", _1: _M0MPC14json4Json6string("messageEnd") }, { _0: "channel", _1: _M0IPC13int3IntPB6ToJson8to__json(ch$2) }];
        return new _M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE2Ok(_M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 2), undefined)));
      }
      const _bind$2 = [{ _0: "type", _1: _M0MPC14json4Json6string("channelClosed") }, { _0: "channel", _1: _M0IPC13int3IntPB6ToJson8to__json(ch) }, { _0: "code", _1: _M0IPC13int3IntPB6ToJson8to__json(code$2) }, { _0: "reason", _1: _M0IPC16string6StringPB6ToJson8to__json(reason$2) }];
      return new _M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE2Ok(_M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 4), undefined)));
    }
    const _bind$2 = [{ _0: "type", _1: _M0MPC14json4Json6string("closed") }, { _0: "code", _1: _M0IPC13int3IntPB6ToJson8to__json(code) }, { _0: "reason", _1: _M0IPC16string6StringPB6ToJson8to__json(reason) }];
    return new _M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE2Ok(_M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 3), undefined)));
  }
  const _tmp = c.channel;
  const _bind$2 = _M0MP211localreview4amqp6Method6decode(new _M0TP211localreview4amqp5Frame(1, c.channel, c.method_payload));
  let _tmp$2;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _tmp$2 = _ok._0;
  } else {
    return _bind$2;
  }
  const _bind$3 = _M0FP411localreview4amqp3cmd3web3obj(_M0FP411localreview4amqp3cmd3web12method__json(_tmp, _tmp$2));
  let o;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    o = _ok._0;
  } else {
    return _bind$3;
  }
  _M0MPB3Map3setGsRPB4JsonE(o, "type", _M0MPC14json4Json6string("message"));
  _M0MPB3Map3setGsRPB4JsonE(o, "bodyHex", _M0IPC16string6StringPB6ToJson8to__json(_M0FP411localreview4amqp3cmd3web3hex(c.body)));
  const _bind$4 = [];
  const props = _M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$4, 0, 0), undefined);
  const _bind$5 = _M0MP211localreview4amqp7Content13basic__header(c);
  let _tmp$3;
  if (_bind$5.$tag === 1) {
    const _ok = _bind$5;
    _tmp$3 = _ok._0;
  } else {
    return _bind$5;
  }
  const _bind$6 = _tmp$3.properties;
  const _bind$7 = _bind$6.length;
  let _tmp$4 = 0;
  while (true) {
    const _ = _tmp$4;
    if (_ < _bind$7) {
      const _foreach_element = _bind$6[_];
      let k;
      let v;
      _L$2: {
        const _k = _foreach_element._0;
        const _v = _foreach_element._1;
        k = _k;
        v = _v;
        break _L$2;
      }
      _M0MPB3Map3setGsRPB4JsonE(props, k, _M0FP411localreview4amqp3cmd3web14argument__json(v));
      _tmp$4 = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  _M0MPB3Map3setGsRPB4JsonE(o, "properties", _M0MPC14json4Json6object(props));
  return new _M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE2Ok(_M0MPC14json4Json6object(o));
}
function _M0FP411localreview4amqp3cmd3web6result(s, events) {
  let frame;
  let channels;
  let heartbeat;
  _L: {
    const _bind$2 = _M0MP211localreview4amqp7Session6limits(s);
    const _channels = _bind$2._0;
    const _frame = _bind$2._1;
    const _heartbeat = _bind$2._2;
    frame = _frame;
    channels = _channels;
    heartbeat = _heartbeat;
    break _L;
  }
  const _tmp = { _0: "state", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0MP211localreview4amqp7Session6status(s)) };
  const _tmp$2 = { _0: "authenticationMechanism", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0MP211localreview4amqp7Session25authentication__mechanism(s)) };
  const _tmp$3 = { _0: "channelMax", _1: _M0IPC13int3IntPB6ToJson8to__json(channels) };
  const _tmp$4 = { _0: "frameMax", _1: _M0IPC13int3IntPB6ToJson8to__json(frame) };
  const _tmp$5 = { _0: "heartbeat", _1: _M0IPC13int3IntPB6ToJson8to__json(heartbeat) };
  const _tmp$6 = { _0: "output", _1: _M0IPC15array5ArrayPB6ToJson8to__jsonGsE(_M0MPC15array5Array3mapGzsE(_M0MP211localreview4amqp7Session12take__output(s), _M0FP411localreview4amqp3cmd3web3hex)) };
  const _bind$2 = _M0MPC15array5Array3mapGRP211localreview4amqp12SessionEventRPB4JsonEHRPC15error5Error(events, _M0FP411localreview4amqp3cmd3web11event__json);
  let _tmp$7;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _tmp$7 = _ok._0;
  } else {
    return _bind$2;
  }
  const _bind$3 = [_tmp, _tmp$2, _tmp$3, _tmp$4, _tmp$5, _tmp$6, { _0: "events", _1: _M0IPC15array5ArrayPB6ToJson8to__jsonGRPB4JsonE(_tmp$7) }];
  return new _M0DTPC16result6ResultGsRPC15error5ErrorE2Ok(_M0MPC14json4Json17stringify_2einner(_M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$3, 0, 7), undefined)), false, 0, undefined));
}
function _M0FP411localreview4amqp3cmd3web13session__open(key, user, password, vhost, channel_max, frame_max, heartbeat) {
  let _try_err;
  _L: {
    if (key.length > 128 || (_M0MPB3Map8containsGsRP211localreview4amqp7SessionE(_M0FP411localreview4amqp3cmd3web8sessions, key) || _M0MPB3Map6lengthGsRP211localreview4amqp7SessionE(_M0FP411localreview4amqp3cmd3web8sessions) >= 64)) {
      _try_err = new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("session limit or duplicate");
      break _L;
    }
    const _bind$2 = _M0MP211localreview4amqp7Session3new(user, password, vhost, channel_max, frame_max, heartbeat, -1, _M0DTPC16option6OptionGRPB5ArrayGUsRP211localreview4amqp10FieldValueEEE4None__);
    let s;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      s = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    _M0MPB3Map3setGsRP211localreview4amqp7SessionE(_M0FP411localreview4amqp3cmd3web8sessions, key, s);
    const _bind$3 = _M0FP411localreview4amqp3cmd3web6result(s, []);
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      return _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
  }
  const e = _try_err;
  return `ERROR: ${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRPC15error5ErrorE(e))}`;
}
function _M0FP411localreview4amqp3cmd3web13session__drop(key) {
  _M0MPB3Map6removeGsRP211localreview4amqp7SessionE(_M0FP411localreview4amqp3cmd3web8sessions, key);
}
function _M0FP411localreview4amqp3cmd3web13session__feed(key, input) {
  let _try_err;
  _L: {
    const _bind$2 = _M0FP411localreview4amqp3cmd3web7session(key);
    let s;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      s = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    const _bind$3 = _M0FP411localreview4amqp3cmd3web13unhex_2einner(input, 2097152);
    let _tmp;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _tmp = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    const _bind$4 = _M0MP211localreview4amqp7Session4feed(s, _tmp);
    let _tmp$2;
    if (_bind$4.$tag === 1) {
      const _ok = _bind$4;
      _tmp$2 = _ok._0;
    } else {
      const _err = _bind$4;
      _try_err = _err._0;
      break _L;
    }
    const _bind$5 = _M0FP411localreview4amqp3cmd3web6result(s, _tmp$2);
    if (_bind$5.$tag === 1) {
      const _ok = _bind$5;
      return _ok._0;
    } else {
      const _err = _bind$5;
      _try_err = _err._0;
      break _L;
    }
  }
  const e = _try_err;
  return `ERROR: ${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRPC15error5ErrorE(e))}`;
}
function _M0FP411localreview4amqp3cmd3web13session__send(key, channel, name, arguments_) {
  let _try_err;
  _L: {
    if (arguments_.length > 2097152) {
      _try_err = new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("argument size limit");
      break _L;
    }
    const _bind$2 = _M0MPC16option6Option16unwrap__or__elseGRP211localreview4amqp10MethodSpecEHRPB7Failure(_M0FP211localreview4amqp22method__spec__by__name(name), () => new _M0DTPC16result6ResultGRP211localreview4amqp10MethodSpecRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("unknown method")));
    let spec;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      spec = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    let values;
    const _bind$3 = _M0FPC14json13parse_2einner(new _M0TPC16string10StringView(arguments_, 0, arguments_.length), 1024);
    let _bind$4;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _bind$4 = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    if (_bind$4.$tag === 5) {
      const _Array = _bind$4;
      const _a = _Array._0;
      values = _a;
    } else {
      _try_err = new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("expected array");
      break _L;
    }
    if (values.length !== spec.fields.length) {
      _try_err = new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("argument count");
      break _L;
    }
    const args = [];
    const _bind$5 = spec.fields;
    const _bind$6 = _bind$5.length;
    let _tmp = 0;
    while (true) {
      const i = _tmp;
      if (i < _bind$6) {
        const _foreach_element = _bind$5[i];
        let kind;
        _L$2: {
          const _kind = _foreach_element._1;
          kind = _kind;
          break _L$2;
        }
        const _bind$7 = _M0FP411localreview4amqp3cmd3web15argument__parse(kind, _M0MPC15array5Array2atGRPB4JsonE(values, i));
        let _tmp$2;
        if (_bind$7.$tag === 1) {
          const _ok = _bind$7;
          _tmp$2 = _ok._0;
        } else {
          const _err = _bind$7;
          _try_err = _err._0;
          break _L;
        }
        _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(args, _tmp$2);
        _tmp = i + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const _bind$7 = _M0FP411localreview4amqp3cmd3web7session(key);
    let s;
    if (_bind$7.$tag === 1) {
      const _ok = _bind$7;
      s = _ok._0;
    } else {
      const _err = _bind$7;
      _try_err = _err._0;
      break _L;
    }
    const _bind$8 = _M0MP211localreview4amqp6Method3new(name, args);
    let _tmp$2;
    if (_bind$8.$tag === 1) {
      const _ok = _bind$8;
      _tmp$2 = _ok._0;
    } else {
      const _err = _bind$8;
      _try_err = _err._0;
      break _L;
    }
    const _bind$9 = _M0MP211localreview4amqp7Session4send(s, channel, _tmp$2);
    if (_bind$9.$tag === 1) {
      const _ok = _bind$9;
      _ok._0;
    } else {
      const _err = _bind$9;
      _try_err = _err._0;
      break _L;
    }
    const _bind$10 = _M0FP411localreview4amqp3cmd3web6result(s, []);
    if (_bind$10.$tag === 1) {
      const _ok = _bind$10;
      return _ok._0;
    } else {
      const _err = _bind$10;
      _try_err = _err._0;
      break _L;
    }
  }
  const e = _try_err;
  return `ERROR: ${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRPC15error5ErrorE(e))}`;
}
function _M0FP411localreview4amqp3cmd3web23session__publish__flags(key, channel, exchange, routing_key, body, properties, mandatory, immediate) {
  let _try_err;
  _L: {
    if (properties.length > 2097152) {
      _try_err = new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("property size limit");
      break _L;
    }
    const props = [];
    const _bind$2 = _M0FPC14json13parse_2einner(new _M0TPC16string10StringView(properties, 0, properties.length), 1024);
    let _tmp;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _tmp = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    const _bind$3 = _M0FP411localreview4amqp3cmd3web3obj(_tmp);
    let _tmp$2;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _tmp$2 = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    const _it = _M0MPB3Map5iter2GsRPB4JsonE(_tmp$2);
    while (true) {
      let k;
      let v;
      _L$2: {
        const _bind$4 = _M0MPB5Iter24nextGsRPB4JsonE(_it);
        if (_bind$4 === undefined) {
          break;
        } else {
          const _Some = _bind$4;
          const _x = _Some;
          const _k = _x._0;
          const _v = _x._1;
          k = _k;
          v = _v;
          break _L$2;
        }
      }
      const _bind$4 = _M0MPC16option6Option16unwrap__or__elseGUsRP211localreview4amqp12ArgumentKindEEHRPB7Failure(_M0MPB4Iter11find__firstGUsRP211localreview4amqp12ArgumentKindEE(_M0MPC15array5Array4iterGUsRP211localreview4amqp12ArgumentKindEE(_M0FP211localreview4amqp21basic__property__spec()), (pair) => pair._0 === k), () => new _M0DTPC16result6ResultGUsRP211localreview4amqp12ArgumentKindERPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("unknown property")));
      let _tmp$3;
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        _tmp$3 = _ok._0;
      } else {
        const _err = _bind$4;
        _try_err = _err._0;
        break _L;
      }
      const kind = _tmp$3._1;
      const _bind$5 = _M0FP411localreview4amqp3cmd3web15argument__parse(kind, v);
      let _tmp$4;
      if (_bind$5.$tag === 1) {
        const _ok = _bind$5;
        _tmp$4 = _ok._0;
      } else {
        const _err = _bind$5;
        _try_err = _err._0;
        break _L;
      }
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(props, { _0: k, _1: _tmp$4 });
      continue;
    }
    const _bind$4 = _M0FP411localreview4amqp3cmd3web7session(key);
    let s;
    if (_bind$4.$tag === 1) {
      const _ok = _bind$4;
      s = _ok._0;
    } else {
      const _err = _bind$4;
      _try_err = _err._0;
      break _L;
    }
    const _bind$5 = _M0FP411localreview4amqp3cmd3web13unhex_2einner(body, 2097152);
    let _tmp$3;
    if (_bind$5.$tag === 1) {
      const _ok = _bind$5;
      _tmp$3 = _ok._0;
    } else {
      const _err = _bind$5;
      _try_err = _err._0;
      break _L;
    }
    const _bind$6 = _M0MP211localreview4amqp7Session15publish_2einner(s, channel, exchange, routing_key, _tmp$3, props, mandatory, immediate);
    if (_bind$6.$tag === 1) {
      const _ok = _bind$6;
      _ok._0;
    } else {
      const _err = _bind$6;
      _try_err = _err._0;
      break _L;
    }
    const _bind$7 = _M0FP411localreview4amqp3cmd3web6result(s, []);
    if (_bind$7.$tag === 1) {
      const _ok = _bind$7;
      return _ok._0;
    } else {
      const _err = _bind$7;
      _try_err = _err._0;
      break _L;
    }
  }
  const e = _try_err;
  return `ERROR: ${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRPC15error5ErrorE(e))}`;
}
function _M0FP411localreview4amqp3cmd3web16session__publish(key, channel, exchange, routing_key, body, properties, mandatory) {
  return _M0FP411localreview4amqp3cmd3web23session__publish__flags(key, channel, exchange, routing_key, body, properties, mandatory, false);
}
function _M0FP411localreview4amqp3cmd3web18session__heartbeat(key) {
  let _try_err;
  _L: {
    const _bind$2 = _M0FP411localreview4amqp3cmd3web7session(key);
    let _tmp;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _tmp = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    const _bind$3 = _M0MP211localreview4amqp7Session9heartbeat(_tmp);
    let _tmp$2;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _tmp$2 = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    return _M0FP411localreview4amqp3cmd3web3hex(_tmp$2);
  }
  const e = _try_err;
  return `ERROR: ${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRPC15error5ErrorE(e))}`;
}
function _M0FP411localreview4amqp3cmd3web15session__finish(key) {
  let _try_err;
  _L: {
    const _bind$2 = _M0FP411localreview4amqp3cmd3web7session(key);
    let _tmp;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _tmp = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    const _bind$3 = _M0MP211localreview4amqp7Session6finish(_tmp);
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    return "";
  }
  const e = _try_err;
  return `ERROR: ${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRPC15error5ErrorE(e))}`;
}
function _M0FP411localreview4amqp3cmd3web30session__publish__start__flags(key, channel, exchange, routing_key, body_size, properties, mandatory, immediate) {
  let _try_err;
  _L: {
    if (properties.length > 2097152) {
      _try_err = new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("property size limit");
      break _L;
    }
    const props = [];
    const _bind$2 = _M0FPC14json13parse_2einner(new _M0TPC16string10StringView(properties, 0, properties.length), 1024);
    let _tmp;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      _tmp = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    const _bind$3 = _M0FP411localreview4amqp3cmd3web3obj(_tmp);
    let _tmp$2;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _tmp$2 = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    const _it = _M0MPB3Map5iter2GsRPB4JsonE(_tmp$2);
    while (true) {
      let k;
      let v;
      _L$2: {
        const _bind$4 = _M0MPB5Iter24nextGsRPB4JsonE(_it);
        if (_bind$4 === undefined) {
          break;
        } else {
          const _Some = _bind$4;
          const _x = _Some;
          const _k = _x._0;
          const _v = _x._1;
          k = _k;
          v = _v;
          break _L$2;
        }
      }
      const _bind$4 = _M0MPC16option6Option16unwrap__or__elseGUsRP211localreview4amqp12ArgumentKindEEHRPB7Failure(_M0MPB4Iter11find__firstGUsRP211localreview4amqp12ArgumentKindEE(_M0MPC15array5Array4iterGUsRP211localreview4amqp12ArgumentKindEE(_M0FP211localreview4amqp21basic__property__spec()), (pair) => pair._0 === k), () => new _M0DTPC16result6ResultGUsRP211localreview4amqp12ArgumentKindERPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("unknown property")));
      let _tmp$3;
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        _tmp$3 = _ok._0;
      } else {
        const _err = _bind$4;
        _try_err = _err._0;
        break _L;
      }
      const kind = _tmp$3._1;
      const _bind$5 = _M0FP411localreview4amqp3cmd3web15argument__parse(kind, v);
      let _tmp$4;
      if (_bind$5.$tag === 1) {
        const _ok = _bind$5;
        _tmp$4 = _ok._0;
      } else {
        const _err = _bind$5;
        _try_err = _err._0;
        break _L;
      }
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(props, { _0: k, _1: _tmp$4 });
      continue;
    }
    const _bind$4 = _M0FPC14json10from__jsonGmE(_M0IPC16string6StringPB6ToJson8to__json(body_size), undefined);
    let size;
    if (_bind$4.$tag === 1) {
      const _ok = _bind$4;
      size = _ok._0;
    } else {
      const _err = _bind$4;
      _try_err = _err._0;
      break _L;
    }
    const _bind$5 = _M0FP411localreview4amqp3cmd3web7session(key);
    let s;
    if (_bind$5.$tag === 1) {
      const _ok = _bind$5;
      s = _ok._0;
    } else {
      const _err = _bind$5;
      _try_err = _err._0;
      break _L;
    }
    const _bind$6 = _M0MP211localreview4amqp7Session22publish__start_2einner(s, channel, exchange, routing_key, size, props, mandatory, immediate);
    if (_bind$6.$tag === 1) {
      const _ok = _bind$6;
      _ok._0;
    } else {
      const _err = _bind$6;
      _try_err = _err._0;
      break _L;
    }
    const _bind$7 = _M0FP411localreview4amqp3cmd3web6result(s, []);
    if (_bind$7.$tag === 1) {
      const _ok = _bind$7;
      return _ok._0;
    } else {
      const _err = _bind$7;
      _try_err = _err._0;
      break _L;
    }
  }
  const e = _try_err;
  return `ERROR: ${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRPC15error5ErrorE(e))}`;
}
function _M0FP411localreview4amqp3cmd3web23session__publish__start(key, channel, exchange, routing_key, body_size, properties, mandatory) {
  return _M0FP411localreview4amqp3cmd3web30session__publish__start__flags(key, channel, exchange, routing_key, body_size, properties, mandatory, false);
}
function _M0FP411localreview4amqp3cmd3web22session__publish__body(key, channel, input) {
  let _try_err;
  _L: {
    const _bind$2 = _M0FP411localreview4amqp3cmd3web7session(key);
    let s;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      s = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    const _bind$3 = _M0FP411localreview4amqp3cmd3web13unhex_2einner(input, 131072);
    let _tmp;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _tmp = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    const _bind$4 = _M0MP211localreview4amqp7Session13publish__body(s, channel, _tmp);
    if (_bind$4.$tag === 1) {
      const _ok = _bind$4;
      _ok._0;
    } else {
      const _err = _bind$4;
      _try_err = _err._0;
      break _L;
    }
    const _bind$5 = _M0FP411localreview4amqp3cmd3web6result(s, []);
    if (_bind$5.$tag === 1) {
      const _ok = _bind$5;
      return _ok._0;
    } else {
      const _err = _bind$5;
      _try_err = _err._0;
      break _L;
    }
  }
  const e = _try_err;
  return `ERROR: ${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRPC15error5ErrorE(e))}`;
}
function _M0FP411localreview4amqp3cmd3web8describe(frame) {
  const _bind$2 = frame.kind;
  let detail;
  switch (_bind$2) {
    case 1: {
      const _bind$3 = _M0MP211localreview4amqp6Method6decode(frame);
      let command;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        command = _ok._0;
      } else {
        return _bind$3;
      }
      const spec = _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_M0FP211localreview4amqp12method__spec(command.class_id, command.method_id));
      const args = [];
      const _bind$4 = command.arguments;
      const _bind$5 = _bind$4.length;
      let _tmp = 0;
      while (true) {
        const i = _tmp;
        if (i < _bind$5) {
          const value = _bind$4[i];
          const _bind$6 = [{ _0: "name", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0MPC15array5Array2atGRPB4JsonE(spec.fields, i)._0) }, { _0: "value", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRP211localreview4amqp8ArgumentE(value))) }];
          _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(args, _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$6, 0, 2), undefined)));
          _tmp = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const _bind$6 = [{ _0: "name", _1: _M0IPC16string6StringPB6ToJson8to__json(spec.name) }, { _0: "arguments", _1: _M0IPC15array5ArrayPB6ToJson8to__jsonGRPB4JsonE(args) }, { _0: "carriesContent", _1: _M0IPC14bool4BoolPB6ToJson8to__json(spec.carries_content) }];
      detail = _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$6, 0, 3), undefined));
      break;
    }
    case 2: {
      const _bind$7 = _M0MP211localreview4amqp11BasicHeader6decode(frame);
      let header;
      if (_bind$7.$tag === 1) {
        const _ok = _bind$7;
        header = _ok._0;
      } else {
        return _bind$7;
      }
      const _bind$8 = [{ _0: "bodySize", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0MPC16uint646UInt6418to__string_2einner(header.body_size, 10)) }, { _0: "properties", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRPB5ArrayGUsRP211localreview4amqp8ArgumentEEE(header.properties))) }];
      detail = _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$8, 0, 2), undefined));
      break;
    }
    default: {
      const _bind$9 = [{ _0: "bytes", _1: _M0IPC13int3IntPB6ToJson8to__json(frame.payload.length) }, { _0: "hex", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0FP411localreview4amqp3cmd3web3hex(frame.payload)) }];
      detail = _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$9, 0, 2), undefined));
    }
  }
  const _bind$10 = [{ _0: "kind", _1: _M0IPC13int3IntPB6ToJson8to__json(frame.kind) }, { _0: "channel", _1: _M0IPC13int3IntPB6ToJson8to__json(frame.channel) }, { _0: "detail", _1: detail }];
  return new _M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE2Ok(_M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$10, 0, 3), undefined)));
}
function _M0FP411localreview4amqp3cmd3web13inspect__wire(input, assemble) {
  let _try_err;
  _L: {
    const _bind$2 = _M0FP411localreview4amqp3cmd3web13unhex_2einner(input, 3145728);
    let data;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      data = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    if (data.length > 1048576) {
      _try_err = new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("inspection limit: 1 MiB");
      break _L;
    }
    const _bind$3 = _M0MP211localreview4amqp7Decoder11new_2einner(1048576);
    let decoder;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      decoder = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    const _bind$4 = _M0MP211localreview4amqp7Decoder4feed(decoder, data);
    let frames;
    if (_bind$4.$tag === 1) {
      const _ok = _bind$4;
      frames = _ok._0;
    } else {
      const _err = _bind$4;
      _try_err = _err._0;
      break _L;
    }
    const _bind$5 = _M0MP211localreview4amqp7Decoder6finish(decoder);
    if (_bind$5.$tag === 1) {
      const _ok = _bind$5;
      _ok._0;
    } else {
      const _err = _bind$5;
      _try_err = _err._0;
      break _L;
    }
    const results = [];
    if (assemble) {
      const _bind$6 = _M0MP211localreview4amqp9Assembler11new_2einner(1048576, true);
      let assembler;
      if (_bind$6.$tag === 1) {
        const _ok = _bind$6;
        assembler = _ok._0;
      } else {
        const _err = _bind$6;
        _try_err = _err._0;
        break _L;
      }
      const _bind$7 = frames.length;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind$7) {
          const frame = frames[_];
          let content;
          _L$2: {
            _L$3: {
              const _bind$8 = _M0MP211localreview4amqp9Assembler4push(assembler, frame);
              let _bind$9;
              if (_bind$8.$tag === 1) {
                const _ok = _bind$8;
                _bind$9 = _ok._0;
              } else {
                const _err = _bind$8;
                _try_err = _err._0;
                break _L;
              }
              if (_bind$9 === undefined) {
              } else {
                const _Some = _bind$9;
                const _content = _Some;
                content = _content;
                break _L$3;
              }
              break _L$2;
            }
            const _tmp$2 = { _0: "channel", _1: _M0IPC13int3IntPB6ToJson8to__json(content.channel) };
            const _bind$8 = _M0MP211localreview4amqp7Content13basic__header(content);
            let _tmp$3;
            if (_bind$8.$tag === 1) {
              const _ok = _bind$8;
              _tmp$3 = _ok._0;
            } else {
              const _err = _bind$8;
              _try_err = _err._0;
              break _L;
            }
            const _bind$9 = [_tmp$2, { _0: "properties", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRPB5ArrayGUsRP211localreview4amqp8ArgumentEEE(_tmp$3.properties))) }, { _0: "bodyHex", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0FP411localreview4amqp3cmd3web3hex(content.body)) }, { _0: "bodyBytes", _1: _M0IPC13int3IntPB6ToJson8to__json(content.body.length) }];
            _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(results, _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$9, 0, 4), undefined)));
          }
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const _bind$8 = _M0MP211localreview4amqp9Assembler6finish(assembler);
      if (_bind$8.$tag === 1) {
        const _ok = _bind$8;
        _ok._0;
      } else {
        const _err = _bind$8;
        _try_err = _err._0;
        break _L;
      }
    } else {
      const _bind$6 = frames.length;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind$6) {
          const frame = frames[_];
          const _bind$7 = _M0FP411localreview4amqp3cmd3web8describe(frame);
          let _tmp$2;
          if (_bind$7.$tag === 1) {
            const _ok = _bind$7;
            _tmp$2 = _ok._0;
          } else {
            const _err = _bind$7;
            _try_err = _err._0;
            break _L;
          }
          _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(results, _tmp$2);
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
    }
    return _M0MPC14json4Json17stringify_2einner(_M0IPC15array5ArrayPB6ToJson8to__jsonGRPB4JsonE(results), false, 0, undefined);
  }
  const e = _try_err;
  return `ERROR: ${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRPC15error5ErrorE(e))}`;
}
function _M0FP411localreview4amqp3cmd3web3run(input) {
  const _bind$2 = "inspect:";
  if (_M0MPC16string6String11has__prefix(input, new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length))) {
    return _M0FP411localreview4amqp3cmd3web13inspect__wire(_M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(input, 8, undefined)), false);
  }
  const _bind$3 = "strict:";
  if (_M0MPC16string6String11has__prefix(input, new _M0TPC16string10StringView(_bind$3, 0, _bind$3.length))) {
    return _M0FP411localreview4amqp3cmd3web13inspect__wire(_M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(input, 7, undefined)), true);
  }
  let _try_err;
  _L: {
    const _bind$4 = "assemble:";
    const assemble = _M0MPC16string6String11has__prefix(input, new _M0TPC16string10StringView(_bind$4, 0, _bind$4.length));
    const _bind$5 = _M0FP411localreview4amqp3cmd3web13unhex_2einner(assemble ? _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(input, 9, undefined)) : input, 200000);
    let data;
    if (_bind$5.$tag === 1) {
      const _ok = _bind$5;
      data = _ok._0;
    } else {
      const _err = _bind$5;
      _try_err = _err._0;
      break _L;
    }
    const _bind$6 = _M0MP211localreview4amqp7Decoder11new_2einner(131072);
    let d;
    if (_bind$6.$tag === 1) {
      const _ok = _bind$6;
      d = _ok._0;
    } else {
      const _err = _bind$6;
      _try_err = _err._0;
      break _L;
    }
    const _bind$7 = _M0MP211localreview4amqp7Decoder4feed(d, data);
    let frames;
    if (_bind$7.$tag === 1) {
      const _ok = _bind$7;
      frames = _ok._0;
    } else {
      const _err = _bind$7;
      _try_err = _err._0;
      break _L;
    }
    const _bind$8 = _M0MP211localreview4amqp7Decoder6finish(d);
    if (_bind$8.$tag === 1) {
      const _ok = _bind$8;
      _ok._0;
    } else {
      const _err = _bind$8;
      _try_err = _err._0;
      break _L;
    }
    const lines = [];
    if (assemble) {
      const _bind$9 = _M0MP211localreview4amqp9Assembler11new_2einner(8388608, false);
      let assembler;
      if (_bind$9.$tag === 1) {
        const _ok = _bind$9;
        assembler = _ok._0;
      } else {
        const _err = _bind$9;
        _try_err = _err._0;
        break _L;
      }
      const _bind$10 = frames.length;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind$10) {
          const frame = frames[_];
          let content;
          _L$2: {
            _L$3: {
              const _bind$11 = _M0MP211localreview4amqp9Assembler4push(assembler, frame);
              let _bind$12;
              if (_bind$11.$tag === 1) {
                const _ok = _bind$11;
                _bind$12 = _ok._0;
              } else {
                const _err = _bind$11;
                _try_err = _err._0;
                break _L;
              }
              if (_bind$12 === undefined) {
              } else {
                const _Some = _bind$12;
                const _content = _Some;
                content = _content;
                break _L$3;
              }
              break _L$2;
            }
            _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(lines, `${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRP211localreview4amqp7ContentE(content))}\nBody hex: ${_M0FP411localreview4amqp3cmd3web3hex(content.body)}`);
          }
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const _bind$11 = _M0MP211localreview4amqp9Assembler6finish(assembler);
      if (_bind$11.$tag === 1) {
        const _ok = _bind$11;
        _ok._0;
      } else {
        const _err = _bind$11;
        _try_err = _err._0;
        break _L;
      }
      const _bind$12 = "\n\n";
      return _M0MPC15array5Array4joinGsE(lines, new _M0TPC16string10StringView(_bind$12, 0, _bind$12.length));
    }
    const _bind$9 = frames.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind$9) {
        const frame = frames[_];
        const _tmp$2 = _M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRP211localreview4amqp5FrameE(frame));
        const _bind$10 = _M0MP211localreview4amqp5Frame14encode_2einner(frame, 131072);
        let _tmp$3;
        if (_bind$10.$tag === 1) {
          const _ok = _bind$10;
          _tmp$3 = _ok._0;
        } else {
          const _err = _bind$10;
          _try_err = _err._0;
          break _L;
        }
        _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(lines, `${_tmp$2}\nRe-encoded: ${_M0FP411localreview4amqp3cmd3web3hex(_tmp$3)}`);
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const _bind$10 = "\n\n";
    return _M0MPC15array5Array4joinGsE(lines, new _M0TPC16string10StringView(_bind$10, 0, _bind$10.length));
  }
  const e = _try_err;
  return `ERROR: ${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRPC15error5ErrorE(e))}`;
}
function _M0FP411localreview4amqp3cmd3web7schemas() {
  const records = [];
  const _bind$2 = _M0FP211localreview4amqp13method__names();
  const _bind$3 = _bind$2.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$3) {
      const name = _bind$2[_];
      const spec = _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_M0FP211localreview4amqp22method__spec__by__name(name));
      const fields = _M0MPC15array5Array3mapGUsRP211localreview4amqp12ArgumentKindERPB4JsonE(spec.fields, (pair) => {
        const _bind$4 = [{ _0: "name", _1: _M0IPC16string6StringPB6ToJson8to__json(pair._0) }, { _0: "kind", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRP211localreview4amqp12ArgumentKindE(pair._1))) }];
        return _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$4, 0, 2), undefined));
      });
      const _bind$4 = [{ _0: "name", _1: _M0IPC16string6StringPB6ToJson8to__json(name) }, { _0: "classId", _1: _M0IPC13int3IntPB6ToJson8to__json(spec.class_id) }, { _0: "methodId", _1: _M0IPC13int3IntPB6ToJson8to__json(spec.method_id) }, { _0: "fields", _1: _M0IPC15array5ArrayPB6ToJson8to__jsonGRPB4JsonE(fields) }, { _0: "carriesContent", _1: _M0IPC14bool4BoolPB6ToJson8to__json(spec.carries_content) }];
      _M0MPC15array5Array4pushGRP211localreview4amqp8ArgumentE(records, _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$4, 0, 5), undefined)));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPC14json4Json17stringify_2einner(_M0IPC15array5ArrayPB6ToJson8to__jsonGRPB4JsonE(records), false, 0, undefined);
}
function _M0FP411localreview4amqp3cmd3web21metadata__field__json(value) {
  let entries;
  _L: {
    let values;
    _L$2: {
      let bytes;
      _L$3: {
        switch (value.$tag) {
          case 11: {
            const _LongString = value;
            const _bytes = _LongString._0;
            bytes = _bytes;
            break _L$3;
          }
          case 14: {
            const _ArrayValue = value;
            const _values = _ArrayValue._0;
            values = _values;
            break _L$2;
          }
          case 15: {
            const _TableValue = value;
            const _entries = _TableValue._0;
            entries = _entries;
            break _L;
          }
          default: {
            return _M0FP411localreview4amqp3cmd3web11field__json(value);
          }
        }
      }
      let _try_err;
      _L$4: {
        const _bind$2 = _M0FPC28encoding4utf814decode_2einner(new _M0TPC15bytes9BytesView(bytes, 0, bytes.length), false);
        let _tmp;
        if (_bind$2.$tag === 1) {
          const _ok = _bind$2;
          _tmp = _ok._0;
        } else {
          const _err = _bind$2;
          _try_err = _err._0;
          break _L$4;
        }
        return _M0IPC16string6StringPB6ToJson8to__json(_tmp);
      }
      return _M0FP411localreview4amqp3cmd3web11field__json(value);
    }
    return _M0IPC15array5ArrayPB6ToJson8to__jsonGRPB4JsonE(_M0MPC15array5Array3mapGRP211localreview4amqp10FieldValueRPB4JsonE(values, _M0FP411localreview4amqp3cmd3web21metadata__field__json));
  }
  return _M0FP411localreview4amqp3cmd3web21metadata__table__json(entries);
}
function _M0FP411localreview4amqp3cmd3web21metadata__table__json(entries) {
  const _bind$2 = [];
  const out = _M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$2, 0, 0), undefined);
  const _bind$3 = entries.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$3) {
      const _foreach_element = entries[_];
      let key;
      let value;
      _L: {
        const _key = _foreach_element._0;
        const _value = _foreach_element._1;
        key = _key;
        value = _value;
        break _L;
      }
      _M0MPB3Map3setGsRPB4JsonE(out, key, _M0FP411localreview4amqp3cmd3web21metadata__field__json(value));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPC14json4Json6object(out);
}
function _M0FP411localreview4amqp3cmd3web25parse__client__properties(input) {
  if (input.length > 2097152) {
    return new _M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("properties size limit"));
  }
  const _bind$2 = _M0FPC14json13parse_2einner(new _M0TPC16string10StringView(input, 0, input.length), 1024);
  let _tmp;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _tmp = _ok._0;
  } else {
    return _bind$2;
  }
  const _bind$3 = _M0FP411localreview4amqp3cmd3web3obj(_tmp);
  let properties;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    properties = _ok._0;
  } else {
    return _bind$3;
  }
  if (_M0MPB3Map8containsGsRPB4JsonE(properties, "capabilities")) {
    _M0MPB3Map3setGsRPB4JsonE(properties, "capabilities", _M0MPC14json4Json7boolean(false));
  }
  return _M0FP411localreview4amqp3cmd3web12table__parse(_M0MPC14json4Json6object(properties), 0);
}
function _M0FP411localreview4amqp3cmd3web22connection__properties(input) {
  let _try_err;
  _L: {
    const _bind$2 = _M0FP411localreview4amqp3cmd3web25parse__client__properties(input);
    let entries;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      entries = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    const _bind$3 = _M0FP211localreview4amqp33normalize__connection__properties(entries);
    let encoded;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      encoded = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    const _bind$4 = _M0FP211localreview4amqp13decode__table(encoded);
    let _tmp;
    if (_bind$4.$tag === 1) {
      const _ok = _bind$4;
      _tmp = _ok._0;
    } else {
      const _err = _bind$4;
      _try_err = _err._0;
      break _L;
    }
    return _M0MPC14json4Json17stringify_2einner(_M0FP411localreview4amqp3cmd3web21metadata__table__json(_tmp), false, 0, undefined);
  }
  return "ERROR: invalid client properties";
}
function _M0FP411localreview4amqp3cmd3web31default__connection__properties() {
  return _M0MPC14json4Json17stringify_2einner(_M0FP411localreview4amqp3cmd3web21metadata__table__json(_M0FP211localreview4amqp27new__connection__properties()), false, 0, undefined);
}
function _M0FP411localreview4amqp3cmd3web17session__metadata(key) {
  let _try_err;
  _L: {
    const _bind$2 = _M0FP411localreview4amqp3cmd3web7session(key);
    let s;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      s = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    let version;
    let major;
    let minor;
    _L$2: {
      _L$3: {
        const _bind$3 = _M0MP211localreview4amqp7Session15server__version(s);
        if (_bind$3 === undefined) {
          version = _M0MPC14json4Json4null();
        } else {
          const _Some = _bind$3;
          const _x = _Some;
          const _major = _x._0;
          const _minor = _x._1;
          major = _major;
          minor = _minor;
          break _L$3;
        }
        break _L$2;
      }
      const _bind$3 = [{ _0: "major", _1: _M0IPC13int3IntPB6ToJson8to__json(major) }, { _0: "minor", _1: _M0IPC13int3IntPB6ToJson8to__json(minor) }];
      version = _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$3, 0, 2), undefined));
    }
    const _bind$3 = _M0MP211localreview4amqp7Session18client__properties(s);
    let _tmp;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _tmp = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    const _tmp$2 = { _0: "clientProperties", _1: _M0FP411localreview4amqp3cmd3web21metadata__table__json(_tmp) };
    const _bind$4 = _M0MP211localreview4amqp7Session18server__properties(s);
    let _tmp$3;
    if (_bind$4.$tag === 1) {
      const _ok = _bind$4;
      _tmp$3 = _ok._0;
    } else {
      const _err = _bind$4;
      _try_err = _err._0;
      break _L;
    }
    const _bind$5 = [_tmp$2, { _0: "serverProperties", _1: _M0FP411localreview4amqp3cmd3web21metadata__table__json(_tmp$3) }, { _0: "serverLocales", _1: _M0IPC15array5ArrayPB6ToJson8to__jsonGsE(_M0MP211localreview4amqp7Session15server__locales(s)) }, { _0: "serverVersion", _1: version }, { _0: "vhost", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0MP211localreview4amqp7Session13virtual__host(s)) }, { _0: "locale", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0MP211localreview4amqp7Session6locale(s)) }];
    return _M0MPC14json4Json17stringify_2einner(_M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$5, 0, 6), undefined)), false, 0, undefined);
  }
  return "ERROR: connection metadata unavailable";
}
function _M0FP411localreview4amqp3cmd3web18open__auth_2einner(key, authentication, vhost, locale, channel_max, frame_max, heartbeat, stream_bodies, properties) {
  let _try_err;
  _L: {
    if (key.length > 128 || (_M0MPB3Map8containsGsRP211localreview4amqp7SessionE(_M0FP411localreview4amqp3cmd3web8sessions, key) || (_M0MPB3Map6lengthGsRP211localreview4amqp7SessionE(_M0FP411localreview4amqp3cmd3web8sessions) >= 64 || (authentication.length > 4194304 || properties.length > 2097152)))) {
      _try_err = new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("session or authentication size limit");
      break _L;
    }
    let candidates;
    let values;
    _L$2: {
      const _bind$2 = _M0FPC14json13parse_2einner(new _M0TPC16string10StringView(authentication, 0, authentication.length), 1024);
      let _bind$3;
      if (_bind$2.$tag === 1) {
        const _ok = _bind$2;
        _bind$3 = _ok._0;
      } else {
        const _err = _bind$2;
        _try_err = _err._0;
        break _L;
      }
      if (_bind$3.$tag === 5) {
        const _Array = _bind$3;
        const _values = _Array._0;
        values = _values;
        break _L$2;
      } else {
        _try_err = new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("expected authentication array");
        break _L;
      }
    }
    const _bind$2 = _M0MPC15array5Array3mapGRPB4JsonRP211localreview4amqp14AuthenticationEHRPC15error5Error(values, (value) => {
      const _bind$3 = _M0FP411localreview4amqp3cmd3web3obj(value);
      let o;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        o = _ok._0;
      } else {
        return _bind$3;
      }
      const _bind$4 = _M0FP411localreview4amqp3cmd3web8required(o, "mechanism");
      let _tmp;
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        _tmp = _ok._0;
      } else {
        return _bind$4;
      }
      const _bind$5 = _M0FP411localreview4amqp3cmd3web3str(_tmp);
      let mechanism;
      if (_bind$5.$tag === 1) {
        const _ok = _bind$5;
        mechanism = _ok._0;
      } else {
        return _bind$5;
      }
      const _bind$6 = _M0FP411localreview4amqp3cmd3web8required(o, "kind");
      let _tmp$2;
      if (_bind$6.$tag === 1) {
        const _ok = _bind$6;
        _tmp$2 = _ok._0;
      } else {
        return _bind$6;
      }
      const _bind$7 = _M0FP411localreview4amqp3cmd3web3str(_tmp$2);
      let _bind$8;
      if (_bind$7.$tag === 1) {
        const _ok = _bind$7;
        _bind$8 = _ok._0;
      } else {
        return _bind$7;
      }
      switch (_bind$8) {
        case "plain": {
          const _bind$9 = _M0FP411localreview4amqp3cmd3web8required(o, "username");
          let _tmp$3;
          if (_bind$9.$tag === 1) {
            const _ok = _bind$9;
            _tmp$3 = _ok._0;
          } else {
            return _bind$9;
          }
          const _bind$10 = _M0FP411localreview4amqp3cmd3web3str(_tmp$3);
          let _tmp$4;
          if (_bind$10.$tag === 1) {
            const _ok = _bind$10;
            _tmp$4 = _ok._0;
          } else {
            return _bind$10;
          }
          const _tmp$5 = _tmp$4;
          const _bind$11 = _M0FP411localreview4amqp3cmd3web8required(o, "password");
          let _tmp$6;
          if (_bind$11.$tag === 1) {
            const _ok = _bind$11;
            _tmp$6 = _ok._0;
          } else {
            return _bind$11;
          }
          const _bind$12 = _M0FP411localreview4amqp3cmd3web3str(_tmp$6);
          let _tmp$7;
          if (_bind$12.$tag === 1) {
            const _ok = _bind$12;
            _tmp$7 = _ok._0;
          } else {
            return _bind$12;
          }
          return _M0MP211localreview4amqp14Authentication5plain(_tmp$5, _tmp$7);
        }
        case "amqplain": {
          const _bind$13 = _M0FP411localreview4amqp3cmd3web8required(o, "username");
          let _tmp$8;
          if (_bind$13.$tag === 1) {
            const _ok = _bind$13;
            _tmp$8 = _ok._0;
          } else {
            return _bind$13;
          }
          const _bind$14 = _M0FP411localreview4amqp3cmd3web3str(_tmp$8);
          let _tmp$9;
          if (_bind$14.$tag === 1) {
            const _ok = _bind$14;
            _tmp$9 = _ok._0;
          } else {
            return _bind$14;
          }
          const _tmp$10 = _tmp$9;
          const _bind$15 = _M0FP411localreview4amqp3cmd3web8required(o, "password");
          let _tmp$11;
          if (_bind$15.$tag === 1) {
            const _ok = _bind$15;
            _tmp$11 = _ok._0;
          } else {
            return _bind$15;
          }
          const _bind$16 = _M0FP411localreview4amqp3cmd3web3str(_tmp$11);
          let _tmp$12;
          if (_bind$16.$tag === 1) {
            const _ok = _bind$16;
            _tmp$12 = _ok._0;
          } else {
            return _bind$16;
          }
          return _M0MP211localreview4amqp14Authentication8amqplain(_tmp$10, _tmp$12);
        }
        case "external": {
          return new _M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRPC15error5ErrorE2Ok(_M0MP211localreview4amqp14Authentication8external());
        }
        case "deferred": {
          return _M0MP211localreview4amqp14Authentication8deferred(mechanism);
        }
        default: {
          return new _M0DTPC16result6ResultGRP211localreview4amqp14AuthenticationRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("unknown authentication kind"));
        }
      }
    });
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      candidates = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    const _bind$3 = _M0FP411localreview4amqp3cmd3web25parse__client__properties(properties);
    let _tmp;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _tmp = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    const _bind$4 = _M0MP211localreview4amqp7Session28with__authentication_2einner(candidates, vhost, locale, channel_max, frame_max, heartbeat, stream_bodies, _tmp);
    let s;
    if (_bind$4.$tag === 1) {
      const _ok = _bind$4;
      s = _ok._0;
    } else {
      const _err = _bind$4;
      _try_err = _err._0;
      break _L;
    }
    _M0MPB3Map3setGsRP211localreview4amqp7SessionE(_M0FP411localreview4amqp3cmd3web8sessions, key, s);
    const _bind$5 = _M0FP411localreview4amqp3cmd3web6result(s, []);
    if (_bind$5.$tag === 1) {
      const _ok = _bind$5;
      return _ok._0;
    } else {
      const _err = _bind$5;
      _try_err = _err._0;
      break _L;
    }
  }
  return "ERROR: invalid authentication or connection options";
}
function _M0FP411localreview4amqp3cmd3web19session__open__auth(key, authentication, vhost, locale, channel_max, frame_max, heartbeat) {
  return _M0FP411localreview4amqp3cmd3web18open__auth_2einner(key, authentication, vhost, locale, channel_max, frame_max, heartbeat, false, "{}");
}
function _M0FP411localreview4amqp3cmd3web27session__open__stream__auth(key, authentication, vhost, locale, channel_max, frame_max, heartbeat) {
  return _M0FP411localreview4amqp3cmd3web18open__auth_2einner(key, authentication, vhost, locale, channel_max, frame_max, heartbeat, true, "{}");
}
function _M0FP411localreview4amqp3cmd3web31session__open__auth__properties(key, authentication, vhost, locale, channel_max, frame_max, heartbeat, stream_bodies, properties) {
  return _M0FP411localreview4amqp3cmd3web18open__auth_2einner(key, authentication, vhost, locale, channel_max, frame_max, heartbeat, stream_bodies, properties);
}
function _M0FP411localreview4amqp3cmd3web23session__auth__response(key, response) {
  let _try_err;
  _L: {
    const _bind$2 = _M0FP411localreview4amqp3cmd3web7session(key);
    let s;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      s = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    const _bind$3 = _M0FP411localreview4amqp3cmd3web13unhex_2einner(response, 2097152);
    let _tmp;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _tmp = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    const _bind$4 = _M0MP211localreview4amqp7Session23respond__authentication(s, _tmp);
    if (_bind$4.$tag === 1) {
      const _ok = _bind$4;
      _ok._0;
    } else {
      const _err = _bind$4;
      _try_err = _err._0;
      break _L;
    }
    const _bind$5 = _M0FP411localreview4amqp3cmd3web6result(s, []);
    if (_bind$5.$tag === 1) {
      const _ok = _bind$5;
      return _ok._0;
    } else {
      const _err = _bind$5;
      _try_err = _err._0;
      break _L;
    }
  }
  return "ERROR: invalid or unexpected authentication response";
}
(() => {
})();
export { _M0FP411localreview4amqp3cmd3web10uri__parse as uri_parse, _M0FP411localreview4amqp3cmd3web13session__open as session_open, _M0FP411localreview4amqp3cmd3web13session__drop as session_drop, _M0FP411localreview4amqp3cmd3web13session__feed as session_feed, _M0FP411localreview4amqp3cmd3web13session__send as session_send, _M0FP411localreview4amqp3cmd3web23session__publish__flags as session_publish_flags, _M0FP411localreview4amqp3cmd3web16session__publish as session_publish, _M0FP411localreview4amqp3cmd3web18session__heartbeat as session_heartbeat, _M0FP411localreview4amqp3cmd3web15session__finish as session_finish, _M0FP411localreview4amqp3cmd3web30session__publish__start__flags as session_publish_start_flags, _M0FP411localreview4amqp3cmd3web23session__publish__start as session_publish_start, _M0FP411localreview4amqp3cmd3web22session__publish__body as session_publish_body, _M0FP411localreview4amqp3cmd3web13inspect__wire as inspect_wire, _M0FP411localreview4amqp3cmd3web3run as run, _M0FP411localreview4amqp3cmd3web7schemas as schemas, _M0FP411localreview4amqp3cmd3web22connection__properties as connection_properties, _M0FP411localreview4amqp3cmd3web31default__connection__properties as default_connection_properties, _M0FP411localreview4amqp3cmd3web17session__metadata as session_metadata, _M0FP411localreview4amqp3cmd3web19session__open__auth as session_open_auth, _M0FP411localreview4amqp3cmd3web27session__open__stream__auth as session_open_stream_auth, _M0FP411localreview4amqp3cmd3web31session__open__auth__properties as session_open_auth_properties, _M0FP411localreview4amqp3cmd3web23session__auth__response as session_auth_response }
//# sourceMappingURL=web.js.map
