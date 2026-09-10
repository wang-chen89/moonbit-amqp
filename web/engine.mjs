class $PanicError extends Error {}
function $panic() {
  throw new $PanicError();
}
function _M0DTPB4Json4Null() {}
_M0DTPB4Json4Null.prototype.$tag = 0;
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
function _M0TPB4IterGUsRPB4JsonEE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function $makebytes(a, b) {
  const arr = new Uint8Array(a);
  if (b !== 0) {
    arr.fill(b);
  }
  return arr;
}
const _M0MPB7JSArray4push = (arr, val) => { arr.push(val); };
function _M0TPB8MutLocalGiE(param0) {
  this.val = param0;
}
function _M0TPB4IterGsE(param0, param1) {
  this.f = param0;
  this.size_hint = param1;
}
function _M0TPB9ArrayViewGsE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function $make_array_len_and_init(a, b) {
  const arr = new Array(a);
  arr.fill(b);
  return arr;
}
function _M0TPB3MapGsRPB4JsonE(param0, param1, param2, param3, param4, param5, param6) {
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
function _M0TPB5EntryGsRPB4JsonE(param0, param1, param2, param3, param4, param5) {
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
function _M0TPB5EntryGsRPC15debug4ReprE(param0, param1, param2, param3, param4, param5) {
  this.prev = param0;
  this.next = param1;
  this.psl = param2;
  this.hash = param3;
  this.key = param4;
  this.value = param5;
}
function _M0TPB8MutLocalGORPB5EntryGsRPB4JsonEE(param0) {
  this.val = param0;
}
function _M0TPC15bytes9BytesView(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
const $bytes_literal$0 = new Uint8Array();
const _M0MPB7JSArray11set__length = (arr, len) => { arr.length = len; };
const _M0MPB7JSArray12append__view = (dst, src, src_offset, len) => {
   for (let i = 0; i < len; i++) {
     dst.push(src[src_offset + i]);
   }
 };
const _M0MPB7JSArray3pop = (arr) => arr.pop();
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
function _M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGsRPC28encoding4utf89MalformedE2Ok.prototype.$tag = 1;
function _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid.prototype.$tag = 2;
function _M0DTPC15error5Error60moonbitlang_2fcore_2fencoding_2futf8_2eMalformed_2eMalformed(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error60moonbitlang_2fcore_2fencoding_2futf8_2eMalformed_2eMalformed.prototype.$tag = 1;
function _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure(param0) {
  this._0 = param0;
}
_M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure.prototype.$tag = 0;
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
function _M0TPB9ArrayViewGUsRPC15debug4ReprEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
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
function _M0DTPC16result6ResultGmRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGmRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGmRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGmRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
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
function _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
function _M0TP211localreview4amqp10MethodSpec(param0, param1, param2, param3, param4) {
  this.class_id = param0;
  this.method_id = param1;
  this.name = param2;
  this.fields = param3;
  this.carries_content = param4;
}
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
function _M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
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
function _M0TP211localreview4amqp11BasicHeader(param0, param1) {
  this.body_size = param0;
  this.properties = param1;
}
function _M0TP211localreview4amqp5Frame(param0, param1, param2) {
  this.kind = param0;
  this.channel = param1;
  this.payload = param2;
}
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
function _M0TPB9ArrayViewGyE(param0, param1, param2) {
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
function _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE2Ok.prototype.$tag = 1;
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
function _M0TPB9ArrayViewGUsRPB4JsonEE(param0, param1, param2) {
  this.buf = param0;
  this.start = param1;
  this.end = param2;
}
function _M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE3Err(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE3Err.prototype.$tag = 0;
function _M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE2Ok(param0) {
  this._0 = param0;
}
_M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE2Ok.prototype.$tag = 1;
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
const _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger = { method_0: _M0IPB13StringBuilderPB6Logger13write__string, method_1: _M0IP016_24default__implPB6Logger16write__substringGRPB13StringBuilderE, method_2: _M0IPB13StringBuilderPB6Logger11write__view, method_3: _M0IPB13StringBuilderPB6Logger11write__char, method_4: _M0IP016_24default__implPB6Logger28write__string__interpolationGRPB13StringBuilderE, method_5: _M0IP016_24default__implPB6Logger5writeGRPB13StringBuilderE };
function _M0FP15Error8to__repr(_e) {
  switch (_e.$tag) {
    case 1: {
      return _M0IPC28encoding4utf89MalformedPC15debug5Debug8to__reprGRPC28encoding4utf89MalformedE(_e);
    }
    case 0: {
      return _M0IPB7FailurePC15debug5Debug8to__reprGRPB7FailureE(_e);
    }
    default: {
      return _M0IP211localreview4amqp10FrameErrorPC15debug5Debug8to__reprGRP211localreview4amqp10FrameErrorE(_e);
    }
  }
}
const _M0MPC16string6String4trimN7_2abindS6861 = "\t\n\r ";
const _M0MPB4Iter4nextN6constrS9855GcE = 0;
const _M0MPB4Iter4nextN6constrS9856GcE = 0;
const _M0MPB4Iter4nextN6constrS9855GUsRPB4JsonEE = 0;
const _M0MPB4Iter4nextN6constrS9856GUsRPB4JsonEE = 0;
const _M0MPB4Iter3newN6constrS9863GcE = 0;
const _M0MPB4Iter3newN6constrS9863GUsRPB4JsonEE = 0;
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
const _M0FPB4seed = _M0FPB12random__seed();
const _M0FPC15debug6renderN6constrS1705 = 16;
function _M0FPC15abort5abortGsE(msg) {
  return $panic();
}
function _M0FPC15abort5abortGOiE(msg) {
  return $panic();
}
function _M0IPC16string6StringPB6ToJson8to__json(self) {
  return new _M0DTPB4Json6String(self);
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
function _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(self, obj) {
  _M0IPC16string10StringViewPB4Show6output(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
}
function _M0MPB13StringBuilder13write__objectGsE(self, obj) {
  _M0IP016_24default__implPB4Show6outputGsE(obj, { self: self, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
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
function _M0MPC16string10StringView12view_2einner(self, start_offset, end_offset) {
  let end_offset$2;
  if (end_offset === undefined) {
    end_offset$2 = self.end - self.start | 0;
  } else {
    const _Some = end_offset;
    end_offset$2 = _Some;
  }
  return start_offset >= 0 && (start_offset <= end_offset$2 && end_offset$2 <= (self.end - self.start | 0)) ? new _M0TPC16string10StringView(self.str, self.start + start_offset | 0, self.start + end_offset$2 | 0) : _M0FPC15abort5abortGsE("Invalid index for View");
}
function _M0IPC16uint166UInt16PB2Eq5equal(self, that) {
  return self === that;
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
function _M0IP016_24default__implPB2Eq10not__equalGbE(x, y) {
  return !(x === y);
}
function _M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(x, y) {
  return !_M0IPC16string10StringViewPB2Eq5equal(x, y);
}
function _M0IP016_24default__implPB2Eq10not__equalGsE(x, y) {
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
function _M0IP016_24default__implPB4Show6outputGdE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC16double6DoublePB4Show10to__string(self));
}
function _M0IP016_24default__implPB4Show6outputGsE(self, logger) {
  logger.method_table.method_0(logger.self, _M0IPC16string6StringPB4Show10to__string(self));
}
function _M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(self) {
  const logger = _M0MPB13StringBuilder21StringBuilder_2einner(0);
  _M0IPC15debug4ReprPB4Show6output(self, { self: logger, method_table: _M0FP092moonbitlang_2fcore_2fbuiltin_2fStringBuilder_24as_24_40moonbitlang_2fcore_2fbuiltin_2eLogger });
  return _M0MPB13StringBuilder10to__string(logger);
}
function _M0MPB4Iter4nextGcE(self) {
  const _func = self.f;
  const result = _func();
  const _bind = self.size_hint;
  if (result === -1) {
    self.size_hint = _M0MPB4Iter4nextN6constrS9856GcE;
  } else {
    if (_bind === undefined) {
    } else {
      const _Some = _bind;
      const _n = _Some;
      self.size_hint = _n > 0 ? _n - 1 | 0 : _M0MPB4Iter4nextN6constrS9855GcE;
    }
  }
  return result;
}
function _M0MPB4Iter4nextGUsRPB4JsonEE(self) {
  const _func = self.f;
  const result = _func();
  const _bind = self.size_hint;
  if (result === undefined) {
    self.size_hint = _M0MPB4Iter4nextN6constrS9856GUsRPB4JsonEE;
  } else {
    if (_bind === undefined) {
    } else {
      const _Some = _bind;
      const _n = _Some;
      self.size_hint = _n > 0 ? _n - 1 | 0 : _M0MPB4Iter4nextN6constrS9855GUsRPB4JsonEE;
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
function _M0MPC16string10StringView9to__owned(self) {
  return self.str.substring(self.start, self.end);
}
function _M0IPC16string10StringViewPB4Show6output(self, logger) {
  logger.method_table.method_2(logger.self, self);
}
function _M0MPC16string10StringView3all(self, f) {
  const _bind = self.str;
  const _bind$2 = self.start;
  const _bind$3 = self.end;
  let _tmp = _bind$2;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind$3) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$4 = _bind.charCodeAt(_string_index);
        if (_bind$4 >= 55296 && _bind$4 <= 56319 && (_string_index + 1 | 0) < _bind$3) {
          const _bind$5 = _bind.charCodeAt(_string_index + 1 | 0);
          if (_bind$5 >= 56320 && _bind$5 <= 57343) {
            _decoded_next_string_index = _string_index + 2 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char((((Math.imul(_bind$4 - 55296 | 0, 1024) | 0) + _bind$5 | 0) - 56320 | 0) + 65536 | 0);
            break _L;
          } else {
            _decoded_next_string_index = _string_index + 1 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$4);
            break _L;
          }
        } else {
          _decoded_next_string_index = _string_index + 1 | 0;
          _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$4);
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
function _M0IPC16string6StringPB4Show10to__string(self) {
  return self;
}
function _M0MPC16string6String6repeat(self, n) {
  if (n < 0) {
    return _M0FPC15abort5abortGsE("negative repeat count");
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
          return _M0FPC15abort5abortGsE("repeat result too large");
        }
      }
    }
  }
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
function _M0MPC15array5Array4pushGRPB4JsonE(self, value) {
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
function _M0MPC14char4Char8to__uint(self) {
  return self;
}
function _M0FPB23build__ascii__char__set(chars) {
  let bits0 = 0;
  let bits1 = 0;
  let bits2 = 0;
  let bits3 = 0;
  const _bind = chars.str;
  const _bind$2 = chars.start;
  const _bind$3 = chars.end;
  let _tmp = _bind$2;
  while (true) {
    const _string_index = _tmp;
    if (_string_index < _bind$3) {
      let _decoded_next_string_index;
      let _decoded_char;
      _L: {
        const _bind$4 = _bind.charCodeAt(_string_index);
        if (_bind$4 >= 55296 && _bind$4 <= 56319 && (_string_index + 1 | 0) < _bind$3) {
          const _bind$5 = _bind.charCodeAt(_string_index + 1 | 0);
          if (_bind$5 >= 56320 && _bind$5 <= 57343) {
            _decoded_next_string_index = _string_index + 2 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char((((Math.imul(_bind$4 - 55296 | 0, 1024) | 0) + _bind$5 | 0) - 56320 | 0) + 65536 | 0);
            break _L;
          } else {
            _decoded_next_string_index = _string_index + 1 | 0;
            _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$4);
            break _L;
          }
        } else {
          _decoded_next_string_index = _string_index + 1 | 0;
          _decoded_char = _M0MPC13int3Int16unsafe__to__char(_bind$4);
          break _L;
        }
      }
      const code = _M0MPC14char4Char8to__uint(_decoded_char);
      if (code >>> 0 < 128 >>> 0) {
        const bit = 1 << (code & 31);
        const _bind$4 = code >>> 5 | 0;
        switch (_bind$4) {
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
    const _bind = code >>> 5 | 0;
    switch (_bind) {
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
      const _bind = _M0MPC16string6String29offset__of__nth__char_2einner(x.str, 1, x.start, x.end);
      let _tmp$3;
      if (_bind === undefined) {
        _tmp$3 = x.end;
      } else {
        const _Some = _bind;
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
function _M0MPC16string10StringView12trim_2einner(self, chars) {
  const _bind = _M0FPB23build__ascii__char__set(chars);
  if (_bind === undefined) {
    return _M0MPC16string10StringView22trim__end__with__chars(_M0MPC16string10StringView24trim__start__with__chars(self, chars), chars);
  } else {
    const _Some = _bind;
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
function _M0MPB4Iter3mapGssE(self, f) {
  return new _M0TPB4IterGsE(() => {
    const _bind = _M0MPB4Iter4nextGUsRPB4JsonEE(self);
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
      const _x = _Some;
      return f(_x);
    }
  }, self.size_hint);
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
function _M0MPC15array9ArrayView4iterGsE(self) {
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
function _M0MPC15array5Array4iterGsE(self) {
  return _M0MPC15array9ArrayView4iterGsE(new _M0TPB9ArrayViewGsE(self, 0, self.length));
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
    const _bind = _x_end - _x_start | 0;
    let size_hint;
    let _tmp = 0;
    let _tmp$2 = hd.end - hd.start | 0;
    while (true) {
      const _ = _tmp;
      const size_hint$2 = _tmp$2;
      if (_ < _bind) {
        const s = _x_buf[_x_start + _ | 0];
        _tmp = _ + 1 | 0;
        const _bind$2 = _M0IPC16string6StringPB12ToStringView16to__string__view(s);
        _tmp$2 = (size_hint$2 + (_bind$2.end - _bind$2.start | 0) | 0) + (separator.end - separator.start | 0) | 0;
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
      const _bind$2 = _x_end - _x_start | 0;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$2) {
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
      const _bind$2 = _x_end - _x_start | 0;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$2) {
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
    const _bind = _x_end - _x_start | 0;
    let size_hint;
    let _tmp = 0;
    let _tmp$2 = hd.end - hd.start | 0;
    while (true) {
      const _ = _tmp;
      const size_hint$2 = _tmp$2;
      if (_ < _bind) {
        const s = _x_buf[_x_start + _ | 0];
        _tmp = _ + 1 | 0;
        const _bind$2 = _M0IPC16string10StringViewPB12ToStringView16to__string__view(s);
        _tmp$2 = (size_hint$2 + (_bind$2.end - _bind$2.start | 0) | 0) + (separator.end - separator.start | 0) | 0;
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
      const _bind$2 = _x_end - _x_start | 0;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$2) {
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
      const _bind$2 = _x_end - _x_start | 0;
      let _tmp$3 = 0;
      while (true) {
        const _ = _tmp$3;
        if (_ < _bind$2) {
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
function _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(self) {
  if (self === undefined) {
    return $panic();
  } else {
    const _Some = self;
    return _Some;
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
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = _M0FPB21calc__grow__threshold(capacity$2);
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return new _M0TPB3MapGsRPB4JsonE(_bind$3, 0, capacity$2, _bind, _bind$2, _bind$4, -1);
}
function _M0FPB8new__mapGiRP211localreview4amqp7PendingE(capacity) {
  const capacity$2 = _M0MPC13int3Int20next__power__of__two(capacity);
  const _bind = capacity$2 - 1 | 0;
  const _bind$2 = _M0FPB21calc__grow__threshold(capacity$2);
  const _bind$3 = $make_array_len_and_init(capacity$2, undefined);
  const _bind$4 = undefined;
  return new _M0TPB3MapGiRP211localreview4amqp7PendingE(_bind$3, 0, capacity$2, _bind, _bind$2, _bind$4, -1);
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
function _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, entry) {
  const _bind = self.tail;
  if (_bind === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind >>> 0 < _tmp.length ? _tmp[_bind] : $oob()).next = entry;
  }
  self.tail = idx;
  self.entries[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map20add__entry__to__tailGiRP211localreview4amqp7PendingE(self, idx, entry) {
  const _bind = self.tail;
  if (_bind === -1) {
    self.head = entry;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind >>> 0 < _tmp.length ? _tmp[_bind] : $oob()).next = entry;
  }
  self.tail = idx;
  self.entries[idx] = entry;
  self.size = self.size + 1 | 0;
}
function _M0MPB3Map10set__entryGsRPB4JsonE(self, entry, new_idx) {
  const _bind = entry.next;
  if (_bind === undefined) {
    self.tail = new_idx;
  } else {
    const _Some = _bind;
    const _next = _Some;
    _next.prev = new_idx;
  }
  self.entries[new_idx] = entry;
}
function _M0MPB3Map10set__entryGiRP211localreview4amqp7PendingE(self, entry, new_idx) {
  const _bind = entry.next;
  if (_bind === undefined) {
    self.tail = new_idx;
  } else {
    const _Some = _bind;
    const _next = _Some;
    _next.prev = new_idx;
  }
  self.entries[new_idx] = entry;
}
function _M0MPB3Map10push__awayGsRPB4JsonE(self, idx, entry) {
  let _tmp = entry.psl + 1 | 0;
  let _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
  let _tmp$3 = entry;
  while (true) {
    const psl = _tmp;
    const idx$2 = _tmp$2;
    const entry$2 = _tmp$3;
    const _bind = self.entries[idx$2];
    if (_bind === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGsRPB4JsonE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (psl > _curr_entry.psl) {
        entry$2.psl = psl;
        _M0MPB3Map10set__entryGsRPB4JsonE(self, entry$2, idx$2);
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
    const _bind = self.entries[idx$2];
    if (_bind === undefined) {
      entry$2.psl = psl;
      _M0MPB3Map10set__entryGiRP211localreview4amqp7PendingE(self, entry$2, idx$2);
      return;
    } else {
      const _Some = _bind;
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
function _M0MPB3Map20rehash__place__entryGsRPB4JsonE(self, outer) {
  const hash = outer.hash;
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      outer.psl = psl;
      outer.prev = self.tail;
      _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, outer);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr = _Some;
      if (psl > _curr.psl) {
        _M0MPB3Map10push__awayGsRPB4JsonE(self, idx, _curr);
        outer.psl = psl;
        outer.prev = self.tail;
        _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, outer);
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
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      outer.psl = psl;
      outer.prev = self.tail;
      _M0MPB3Map20add__entry__to__tailGiRP211localreview4amqp7PendingE(self, idx, outer);
      return undefined;
    } else {
      const _Some = _bind;
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
function _M0MPB3Map4growGsRPB4JsonE(self) {
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
      _M0MPB3Map20rehash__place__entryGsRPB4JsonE(self, _e);
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
function _M0MPB3Map15set__with__hashGsRPB4JsonE(self, key, value, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const psl = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsRPB4JsonE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = undefined;
      const entry = new _M0TPB5EntryGsRPB4JsonE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsRPB4JsonE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRPB4JsonE(self, idx, _curr_entry);
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGsRPB4JsonE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, entry);
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
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGiRP211localreview4amqp7PendingE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = undefined;
      const entry = new _M0TPB5EntryGiRP211localreview4amqp7PendingE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGiRP211localreview4amqp7PendingE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind;
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
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGiRP211localreview4amqp7PendingE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGiRP211localreview4amqp7PendingE(self, idx, entry);
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
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      if (self.size >= self.grow_at) {
        _M0MPB3Map4growGsRPB4JsonE(self);
        _tmp = 0;
        _tmp$2 = hash & self.capacity_mask;
        continue;
      }
      const _bind$2 = self.tail;
      const _bind$3 = undefined;
      const entry = new _M0TPB5EntryGsRPC15debug4ReprE(_bind$2, _bind$3, psl, hash, key, value);
      _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, entry);
      return undefined;
    } else {
      const _Some = _bind;
      const _curr_entry = _Some;
      if (_curr_entry.hash === hash && _curr_entry.key === key) {
        _curr_entry.value = value;
        return undefined;
      }
      if (psl > _curr_entry.psl) {
        if (self.size >= self.grow_at) {
          _M0MPB3Map4growGsRPB4JsonE(self);
          _tmp = 0;
          _tmp$2 = hash & self.capacity_mask;
          continue;
        }
        _M0MPB3Map10push__awayGsRPB4JsonE(self, idx, _curr_entry);
        const _bind$2 = self.tail;
        const _bind$3 = undefined;
        const entry = new _M0TPB5EntryGsRPC15debug4ReprE(_bind$2, _bind$3, psl, hash, key, value);
        _M0MPB3Map20add__entry__to__tailGsRPB4JsonE(self, idx, entry);
        return undefined;
      }
      _tmp = psl + 1 | 0;
      _tmp$2 = (idx + 1 | 0) & self.capacity_mask;
      continue;
    }
  }
}
function _M0MPB3Map3setGsRPB4JsonE(self, key, value) {
  _M0MPB3Map15set__with__hashGsRPB4JsonE(self, key, value, _M0IPC16string6StringPB4Hash4hash(key));
}
function _M0MPB3Map3setGiRP211localreview4amqp7PendingE(self, key, value) {
  _M0MPB3Map15set__with__hashGiRP211localreview4amqp7PendingE(self, key, value, _M0IPC13int3IntPB4Hash4hash(key));
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
  const _bind = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
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
  const _bind = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
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
  const _bind = arr.end - arr.start | 0;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
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
function _M0MPB3Map3getGiRP211localreview4amqp7PendingE(self, key) {
  const hash = _M0IPC13int3IntPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      return undefined;
    } else {
      const _Some = _bind;
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
function _M0MPB3Map8containsGiRP211localreview4amqp7PendingE(self, key) {
  const hash = _M0IPC13int3IntPB4Hash4hash(key);
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      return false;
    } else {
      const _Some = _bind;
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
function _M0MPB3Map13remove__entryGiRP211localreview4amqp7PendingE(self, entry) {
  const _bind = entry.prev;
  if (_bind === -1) {
    self.head = entry.next;
  } else {
    const _tmp = self.entries;
    _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_bind >>> 0 < _tmp.length ? _tmp[_bind] : $oob()).next = entry.next;
  }
  const _bind$2 = entry.next;
  if (_bind$2 === undefined) {
    self.tail = entry.prev;
    return;
  } else {
    const _Some = _bind$2;
    const _next = _Some;
    _next.prev = entry.prev;
    return;
  }
}
function _M0MPB3Map11shift__backGiRP211localreview4amqp7PendingE(self, idx) {
  let _tmp = idx;
  while (true) {
    const cur = _tmp;
    const next = (cur + 1 | 0) & self.capacity_mask;
    _L: {
      const _bind = self.entries[next];
      if (_bind === undefined) {
        break _L;
      } else {
        const _Some = _bind;
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
function _M0MPB3Map18remove__with__hashGiRP211localreview4amqp7PendingE(self, key, hash) {
  let _tmp = 0;
  let _tmp$2 = hash & self.capacity_mask;
  while (true) {
    const i = _tmp;
    const idx = _tmp$2;
    const _bind = self.entries[idx];
    if (_bind === undefined) {
      return;
    } else {
      const _Some = _bind;
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
function _M0MPB3Map6removeGiRP211localreview4amqp7PendingE(self, key) {
  _M0MPB3Map18remove__with__hashGiRP211localreview4amqp7PendingE(self, key, _M0IPC13int3IntPB4Hash4hash(key));
}
function _M0MPB3Map6lengthGiRP211localreview4amqp7PendingE(self) {
  return self.size;
}
function _M0MPB3Map9is__emptyGiRP211localreview4amqp7PendingE(self) {
  return self.size === 0;
}
function _M0MPB3Map9is__emptyGsRPB4JsonE(self) {
  return self.size === 0;
}
function _M0MPB3Map4iterGsRPB4JsonE(self) {
  const curr_entry = new _M0TPB8MutLocalGORPB5EntryGsRPB4JsonEE(self.head);
  const len = self.size;
  const remaining = new _M0TPB8MutLocalGiE(len);
  return _M0MPB4Iter3newGUsRPB4JsonEE(() => {
    _L: {
      if (remaining.val > 0) {
        const _bind = curr_entry.val;
        if (_bind === undefined) {
          break _L;
        } else {
          const _Some = _bind;
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
function _M0MPB3Map5iter2GsRPC15debug4ReprE(self) {
  return _M0MPB3Map4iterGsRPB4JsonE(self);
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
function _M0MPC15array5Array3mapGUsRP211localreview4amqp12ArgumentKindERPB4JsonE(self, f) {
  const arr = new Array(self.length);
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
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
function _M0MPC15array5Array3mapGRPB4JsonRPB4JsonE(self, f) {
  const arr = new Array(self.length);
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
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
function _M0MPC15array5Array3mapGUsRP211localreview4amqp8ArgumentERPC15debug4ReprE(self, f) {
  const arr = new Array(self.length);
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
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
function _M0MPC15array5Array3mapGyRPC15debug4ReprE(self, f) {
  const arr = new Array(self.length);
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
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
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
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
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
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
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
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
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
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
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
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
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
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
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
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
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
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
function _M0IPC15array5ArrayPB6ToJson8to__jsonGRPB4JsonE(self) {
  return new _M0DTPB4Json5Array(_M0MPC15array5Array3mapGRPB4JsonRPB4JsonE(self, (x) => _M0IPC14json4JsonPB6ToJson8to__json(x)));
}
function _M0MPB4Iter10size__hintGsE(self) {
  return self.size_hint;
}
function _M0MPB4Iter4iterGsE(self) {
  return self;
}
function _M0MPB5Iter24nextGsRPC15debug4ReprE(self) {
  return _M0MPB4Iter4nextGUsRPB4JsonEE(self);
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
    const _bind = end$2 - start | 0;
    return new _M0TPC15bytes9BytesView(self, start, start + _bind | 0);
  } else {
    return _M0FPC15abort5abortGsE("Invalid index for View");
  }
}
function _M0IPC16string6StringPB4Hash4hash(self) {
  let acc = (_M0FPB4seed >>> 0) + (374761393 >>> 0) | 0;
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const i = _tmp;
    if (i < _bind) {
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
function _M0IPC16double6DoublePB4Show10to__string(self) {
  return String(self);
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
function _M0MPC15array5Array9is__emptyGyE(self) {
  return self.length === 0;
}
function _M0MPC15array5Array9is__emptyGRPB4JsonE(self) {
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
function _M0MPC15array5Array2atGUsRP211localreview4amqp12ArgumentKindEE(self, index) {
  const len = self.length;
  return index >= 0 && index < len ? self[index] : $panic();
}
function _M0MPC15array5Array2atGyE(self, index) {
  const len = self.length;
  return index >= 0 && index < len ? self[index] : $panic();
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
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
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
function _M0MPC15array5Array5clearGyE(self) {
  _M0MPC15array5Array28unsafe__truncate__to__lengthGyE(self, 0);
}
function _M0MPC15array5Array6filterGsE(self, f) {
  const arr = [];
  const _bind = self.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const v = self[_];
      if (f(v)) {
        _M0MPC15array5Array4pushGRPB4JsonE(arr, v);
      }
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return arr;
}
function _M0MPC15array5Array10push__iterGsE(self, iter) {
  const _bind = _M0MPB4Iter10size__hintGsE(iter);
  if (_bind === undefined) {
  } else {
    const _Some = _bind;
    const _n = _Some;
    _M0MPC15array5Array17reserve__capacityGsE(self, self.length + _n | 0);
  }
  while (true) {
    const _bind$2 = _M0MPB4Iter4nextGUsRPB4JsonEE(iter);
    if (_bind$2 === undefined) {
      return;
    } else {
      const _Some = _bind$2;
      const _x = _Some;
      _M0MPC15array5Array4pushGRPB4JsonE(self, _x);
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
function _M0MPC15debug4Repr6string(x) {
  return new _M0DTPC15debug4Repr9StringLit(x);
}
function _M0MPC15debug4Repr5array(children) {
  return new _M0DTPC15debug4Repr5Array(children);
}
function _M0MPC15debug4Repr6record(fields) {
  const _acc = [];
  const _it = _M0MPB3Map5iter2GsRPC15debug4ReprE(fields);
  let _tmp;
  while (true) {
    const _bind = _M0MPB5Iter24nextGsRPC15debug4ReprE(_it);
    if (_bind === undefined) {
      _tmp = _acc;
      break;
    } else {
      const _Some = _bind;
      const _x = _Some;
      const _name = _x._0;
      const _value = _x._1;
      _M0MPC15array5Array4pushGRPB4JsonE(_acc, new _M0DTPC15debug4Repr11RecordField(_name, _value));
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
      _M0MPC15array5Array4pushGRPB4JsonE(_self, `${start}${_first}`);
      _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGsE(_x));
      _M0MPC15array5Array4pushGRPB4JsonE(_self, `${_last}${finish}`);
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
        const _bind = _x_end - 1 | 0;
        let _tmp = 0;
        while (true) {
          const _ = _tmp;
          if (_ < _bind) {
            const m = lines[1 + _ | 0];
            const t = _M0MPC16string6String4trim(m, undefined);
            if (_M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(t, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1134, 0, _M0FPC15debug14compact__linesN7_2abindS1134.length))) {
              _M0MPC15array5Array4pushGRPB4JsonE(parts, t);
            }
            _tmp = _ + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        const joined0 = _M0MPC15array5Array4joinGRPC16string10StringViewE(parts, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1147, 0, _M0FPC15debug14compact__linesN7_2abindS1147.length));
        const _bind$2 = _M0MPC16string6String13strip__suffix(joined0, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1141, 0, _M0FPC15debug14compact__linesN7_2abindS1141.length));
        let joined;
        if (_bind$2 === undefined) {
          joined = new _M0TPC16string10StringView(joined0, 0, joined0.length);
        } else {
          const _Some = _bind$2;
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
          const _bind = _x_end - 1 | 0;
          let _tmp = 0;
          while (true) {
            const _ = _tmp;
            if (_ < _bind) {
              const m = lines[1 + _ | 0];
              const t = _M0MPC16string6String4trim(m, undefined);
              if (_M0IP016_24default__implPB2Eq10not__equalGRPC16string10StringViewE(t, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1152, 0, _M0FPC15debug14compact__linesN7_2abindS1152.length))) {
                _M0MPC15array5Array4pushGRPB4JsonE(parts, t);
              }
              _tmp = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          const joined0 = _M0MPC15array5Array4joinGRPC16string10StringViewE(parts, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1161, 0, _M0FPC15debug14compact__linesN7_2abindS1161.length));
          const _bind$2 = _M0MPC16string6String13strip__suffix(joined0, new _M0TPC16string10StringView(_M0FPC15debug14compact__linesN7_2abindS1155, 0, _M0FPC15debug14compact__linesN7_2abindS1155.length));
          let joined;
          if (_bind$2 === undefined) {
            joined = new _M0TPC16string10StringView(joined0, 0, joined0.length);
          } else {
            const _Some = _bind$2;
            joined = _Some;
          }
          const _string_builder = _M0MPB13StringBuilder21StringBuilder_2einner(0);
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _first);
          _M0MPB13StringBuilder13write__objectGRPC16string10StringViewE(_string_builder, joined);
          _M0MPB13StringBuilder13write__objectGsE(_string_builder, _last);
          return [_M0MPB13StringBuilder10to__string(_string_builder)];
        } else {
          const parts = [new _M0TPC16string10StringView(_first, 0, _first.length)];
          const _bind = _x_end - 1 | 0;
          let _tmp = 0;
          while (true) {
            const _ = _tmp;
            if (_ < _bind) {
              const m = lines[1 + _ | 0];
              _M0MPC15array5Array4pushGRPB4JsonE(parts, _M0MPC16string6String4trim(m, undefined));
              _tmp = _ + 1 | 0;
              continue;
            } else {
              break;
            }
          }
          _M0MPC15array5Array4pushGRPB4JsonE(parts, _M0MPC16string6String4trim(_last, undefined));
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
          _M0MPC15array5Array3setGsE(lines, last_i, `${_M0MPC15array5Array2atGUsRP211localreview4amqp12ArgumentKindEE(lines, last_i)},`);
        }
        const _self = [];
        _M0MPC15array5Array4pushGRPB4JsonE(_self, open);
        _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(lines));
        _M0MPC15array5Array4pushGRPB4JsonE(_self, close);
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
            _M0MPC15array5Array4pushGRPB4JsonE(_self, open);
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(_M0FPC15debug14indent__spaces(indent_by, new _M0TPC15debug13ContentParens(0, _item)).lines));
            _M0MPC15array5Array4pushGRPB4JsonE(_self, close);
            return _self;
          }
        }
      }
    } else {
      const out = [open];
      const _bind = contents.length;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind) {
          const item = contents[_];
          const item_lines = _M0MPC15array5Array6filterGsE(item, (line) => _M0IP016_24default__implPB2Eq10not__equalGsE(line, ""));
          if (item_lines.length === 0) {
          } else {
            if (item_lines.length === 1) {
              const _x = item_lines[0];
              _M0MPC15array5Array4pushGRPB4JsonE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${_x},`);
            } else {
              const _first = item_lines[0];
              const _last = item_lines[item_lines.length - 1 | 0];
              const _x_end = item_lines.length - 1 | 0;
              _M0MPC15array5Array4pushGRPB4JsonE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${_first}`);
              const _bind$2 = _x_end - 1 | 0;
              let _tmp$2 = 0;
              while (true) {
                const _$2 = _tmp$2;
                if (_$2 < _bind$2) {
                  const mid = item_lines[1 + _$2 | 0];
                  _M0MPC15array5Array4pushGRPB4JsonE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${mid}`);
                  _tmp$2 = _$2 + 1 | 0;
                  continue;
                } else {
                  break;
                }
              }
              _M0MPC15array5Array4pushGRPB4JsonE(out, `${_M0MPC16string6String6repeat(" ", indent_by)}${_last},`);
            }
          }
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      _M0MPC15array5Array4pushGRPB4JsonE(out, close);
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
            const _bind = _x_end - 1 | 0;
            let _tmp = 0;
            while (true) {
              const _ = _tmp;
              if (_ < _bind) {
                const item = contents[1 + _ | 0];
                const _bind$2 = _M0FPC15debug15surround__lines(space, ",", item);
                _M0MPC15array5Array6appendGsE(middle_lines, new _M0TPB9ArrayViewGsE(_bind$2, 0, _bind$2.length));
                _tmp = _ + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            const _self = [];
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(_M0FPC15debug15surround__lines(begin, ",", _first)));
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(middle_lines));
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array5Array4iterGsE(_M0FPC15debug15surround__lines(space, end, _last)));
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
                _M0MPC15array5Array4pushGRPB4JsonE(_self, begin);
                _M0MPC15array5Array10push__iterGsE(_self, _M0MPB4Iter4iterGsE(_M0MPB4Iter3mapGssE(_M0MPC15array9ArrayView4iterGsE(_x), (line) => `${_M0MPC16string6String6repeat(" ", 2)}${line}`)));
                _M0MPC15array5Array4pushGRPB4JsonE(_self, `${_M0MPC16string6String6repeat(" ", 2)}${_last_line},`);
                _M0MPC15array5Array4pushGRPB4JsonE(_self, end);
                return _self;
              }
            }
          } else {
            const out = [begin];
            const _bind = contents.length;
            let _tmp = 0;
            while (true) {
              const _ = _tmp;
              if (_ < _bind) {
                const item = contents[_];
                const item_lines = _M0MPC15array5Array6filterGsE(item, (line) => _M0IP016_24default__implPB2Eq10not__equalGsE(line, ""));
                if (item_lines.length === 0) {
                } else {
                  if (item_lines.length === 1) {
                    const _x = item_lines[0];
                    _M0MPC15array5Array4pushGRPB4JsonE(out, `${_M0MPC16string6String6repeat(" ", 2)}${_x},`);
                  } else {
                    const _first = item_lines[0];
                    const _last = item_lines[item_lines.length - 1 | 0];
                    const _x_end = item_lines.length - 1 | 0;
                    _M0MPC15array5Array4pushGRPB4JsonE(out, `${_M0MPC16string6String6repeat(" ", 2)}${_first}`);
                    const _bind$2 = _x_end - 1 | 0;
                    let _tmp$2 = 0;
                    while (true) {
                      const _$2 = _tmp$2;
                      if (_$2 < _bind$2) {
                        const mid = item_lines[1 + _$2 | 0];
                        _M0MPC15array5Array4pushGRPB4JsonE(out, `${_M0MPC16string6String6repeat(" ", 2)}${mid}`);
                        _tmp$2 = _$2 + 1 | 0;
                        continue;
                      } else {
                        break;
                      }
                    }
                    _M0MPC15array5Array4pushGRPB4JsonE(out, `${_M0MPC16string6String6repeat(" ", 2)}${_last},`);
                  }
                }
                _tmp = _ + 1 | 0;
                continue;
              } else {
                break;
              }
            }
            _M0MPC15array5Array4pushGRPB4JsonE(out, end);
            return out;
          }
        }
      }
    }
  }
}
function _M0FPC15debug10comma__seq(begin, end, contents) {
  const _bind = contents.length;
  let _tmp = 0;
  let _tmp$2 = 0;
  while (true) {
    const _ = _tmp;
    const size = _tmp$2;
    if (_ < _bind) {
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
        const _bind = v.lines;
        if (_bind.length === 0) {
          return _M0FPC15debug14empty__content();
        } else {
          if (_bind.length === 1) {
            const _one = _bind[0];
            return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens((1 + k.size | 0) + v.size | 0, [`${_M0FPC15debug14print__content(_M0FPC15debug8surround("", ": ", k))}${_one}`]));
          } else {
            const _first = _bind[0];
            const _x$6 = new _M0TPB9ArrayViewGsE(_bind, 1, _bind.length);
            const head = `${_M0FPC15debug14print__content(_M0FPC15debug8surround("", ": ", k))}${_first}`;
            const _tmp$2 = (1 + k.size | 0) + v.size | 0;
            const _self = [];
            _M0MPC15array5Array4pushGRPB4JsonE(_self, head);
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGsE(_x$6));
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
        const _bind = _val.lines;
        if (_bind.length === 0) {
          return _M0FPC15debug14empty__content();
        } else {
          if (_bind.length === 1) {
            const _first = _bind[0];
            return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(1 + _val.size | 0, [`${_name$3}=${_first}`]));
          } else {
            const _first = _bind[0];
            const _x$6 = new _M0TPB9ArrayViewGsE(_bind, 1, _bind.length);
            const _tmp$2 = 1 + _val.size | 0;
            const _self = [];
            _M0MPC15array5Array4pushGRPB4JsonE(_self, `${_name$3}=${_first}`);
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGsE(_x$6));
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
        const _bind = v.lines;
        if (_bind.length === 0) {
          return _M0FPC15debug14empty__content();
        } else {
          if (_bind.length === 1) {
            const _one = _bind[0];
            return _M0FPC15debug10no__parens(_M0FPC15debug15content__parens(1 + v.size | 0, [`${label}: ${_one}`]));
          } else {
            const _first = _bind[0];
            const _x$6 = new _M0TPB9ArrayViewGsE(_bind, 1, _bind.length);
            const _tmp$2 = 1 + v.size | 0;
            const _self = [];
            _M0MPC15array5Array4pushGRPB4JsonE(_self, `${label}: ${_first}`);
            _M0MPC15array5Array10push__iterGsE(_self, _M0MPC15array9ArrayView4iterGsE(_x$6));
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
function _M0FPC28encoding4utf821utf8__find__malformed(src, src_offset, src_length) {
  const _bind = src_offset + src_length | 0;
  const _bind$2 = src.length;
  if (src_offset < 0 || (src_offset > _bind || _bind > _bind$2)) {
    $panic();
  }
  const view = new _M0TPC15bytes9BytesView(src, src_offset, _bind);
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
  const _bind = bytes.end - bytes.start | 0;
  if (malformed_offset < 0 || malformed_offset > _bind) {
    $panic();
  }
  return new _M0TPC15bytes9BytesView(bytes.buf, bytes.start + malformed_offset | 0, bytes.start + _bind | 0);
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
function _M0IPC15error5ErrorPC15debug5Debug8to__repr(self) {
  return _M0FP15Error8to__repr(self);
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
  const _bind = str.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
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
        _M0MPC15array5Array4pushGRPB4JsonE(cache, `${_last}${_M0MPC16string6String6repeat(" ", indent)}`);
      } else {
        _M0MPC15array5Array4pushGRPB4JsonE(cache, "\n");
      }
      continue;
    } else {
      break;
    }
  }
  _M0IPB13StringBuilderPB6Logger13write__string(buf, _M0MPC15array5Array2atGUsRP211localreview4amqp12ArgumentKindEE(cache, level));
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
            const element = _M0MPC15array5Array2atGUsRP211localreview4amqp12ArgumentKindEE(_arr, _i);
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
          const _bind = _M0MPB4Iter4nextGUsRPB4JsonEE(_iterator);
          if (_bind === undefined) {
            depth = depth - 1 | 0;
            _M0MPC15array5Array3popGRPC14json10WriteFrameE(stack);
            if (indent > 0) {
              _M0FPC14json13write__indent(buf, indent_cache, depth, indent);
            }
            _M0IPB13StringBuilderPB6Logger11write__char(buf, 125);
            _tmp = undefined;
            continue;
          } else {
            const _Some = _bind;
            const _x$2 = _Some;
            const _k = _x$2._0;
            const _v = _x$2._1;
            let v2 = _v;
            if (replacer === undefined) {
            } else {
              const _Some$2 = replacer;
              const _replacer = _Some$2;
              const _func = _replacer.f;
              const _bind$2 = _func(_k, _v);
              if (_bind$2 === undefined) {
                _tmp = undefined;
                continue;
              } else {
                const _Some$3 = _bind$2;
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
            _M0MPC15array5Array4pushGRPB4JsonE(stack, new _M0DTPC14json10WriteFrame6Object(_M0MPB3Map4iterGsRPB4JsonE(_members), true));
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
            _M0MPC15array5Array4pushGRPB4JsonE(stack, new _M0DTPC14json10WriteFrame5Array(_arr, 0));
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
function _M0IPC14json4JsonPB6ToJson8to__json(self) {
  return self;
}
function _M0IP211localreview4amqp8ArgumentPC15debug5Debug8to__repr(_x_392) {
  let _arg_400;
  _L: {
    let _arg_399;
    _L$2: {
      let _arg_398;
      _L$3: {
        let _arg_397;
        _L$4: {
          let _arg_396;
          _L$5: {
            let _arg_395;
            _L$6: {
              let _arg_394;
              _L$7: {
                let _arg_393;
                _L$8: {
                  switch (_x_392.$tag) {
                    case 0: {
                      const _Bit = _x_392;
                      const _$42$arg_393 = _Bit._0;
                      _arg_393 = _$42$arg_393;
                      break _L$8;
                    }
                    case 1: {
                      const _Octet = _x_392;
                      const _$42$arg_394 = _Octet._0;
                      _arg_394 = _$42$arg_394;
                      break _L$7;
                    }
                    case 2: {
                      const _Short = _x_392;
                      const _$42$arg_395 = _Short._0;
                      _arg_395 = _$42$arg_395;
                      break _L$6;
                    }
                    case 3: {
                      const _Long = _x_392;
                      const _$42$arg_396 = _Long._0;
                      _arg_396 = _$42$arg_396;
                      break _L$5;
                    }
                    case 4: {
                      const _LongLong = _x_392;
                      const _$42$arg_397 = _LongLong._0;
                      _arg_397 = _$42$arg_397;
                      break _L$4;
                    }
                    case 5: {
                      const _ShortString = _x_392;
                      const _$42$arg_398 = _ShortString._0;
                      _arg_398 = _$42$arg_398;
                      break _L$3;
                    }
                    case 6: {
                      const _LongString = _x_392;
                      const _$42$arg_399 = _LongString._0;
                      _arg_399 = _$42$arg_399;
                      break _L$2;
                    }
                    default: {
                      const _Table = _x_392;
                      const _$42$arg_400 = _Table._0;
                      _arg_400 = _$42$arg_400;
                      break _L;
                    }
                  }
                }
                return _M0MPC15debug4Repr4ctor("Bit", [{ _0: undefined, _1: _M0IPC14bool4BoolPC15debug5Debug8to__repr(_arg_393) }]);
              }
              return _M0MPC15debug4Repr4ctor("Octet", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_394) }]);
            }
            return _M0MPC15debug4Repr4ctor("Short", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_395) }]);
          }
          return _M0MPC15debug4Repr4ctor("Long", [{ _0: undefined, _1: _M0IPC14uint4UIntPC15debug5Debug8to__repr(_arg_396) }]);
        }
        return _M0MPC15debug4Repr4ctor("LongLong", [{ _0: undefined, _1: _M0IPC16uint646UInt64PC15debug5Debug8to__repr(_arg_397) }]);
      }
      return _M0MPC15debug4Repr4ctor("ShortString", [{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_arg_398) }]);
    }
    return _M0MPC15debug4Repr4ctor("LongString", [{ _0: undefined, _1: _M0IPC15bytes5BytesPC15debug5Debug8to__repr(_arg_399) }]);
  }
  return _M0MPC15debug4Repr4ctor("Table", [{ _0: undefined, _1: _M0IPC15array5ArrayPC15debug5Debug8to__reprGUsRP211localreview4amqp10FieldValueEE(_arg_400) }]);
}
function _M0IP211localreview4amqp12ArgumentKindPC15debug5Debug8to__repr(_x_346) {
  switch (_x_346) {
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
function _M0IP211localreview4amqp12ArgumentKindPB2Eq5equal(_x_342, _x_343) {
  switch (_x_342) {
    case 0: {
      if (_x_343 === 0) {
        return true;
      } else {
        return false;
      }
    }
    case 1: {
      if (_x_343 === 1) {
        return true;
      } else {
        return false;
      }
    }
    case 2: {
      if (_x_343 === 2) {
        return true;
      } else {
        return false;
      }
    }
    case 3: {
      if (_x_343 === 3) {
        return true;
      } else {
        return false;
      }
    }
    case 4: {
      if (_x_343 === 4) {
        return true;
      } else {
        return false;
      }
    }
    case 5: {
      if (_x_343 === 5) {
        return true;
      } else {
        return false;
      }
    }
    case 6: {
      if (_x_343 === 6) {
        return true;
      } else {
        return false;
      }
    }
    default: {
      if (_x_343 === 7) {
        return true;
      } else {
        return false;
      }
    }
  }
}
function _M0IP211localreview4amqp10FrameErrorPC15debug5Debug8to__reprGRP211localreview4amqp10FrameErrorE(_x_332) {
  let _arg_333;
  _L: {
    const _Invalid = _x_332;
    const _$42$arg_333 = _Invalid._0;
    _arg_333 = _$42$arg_333;
    break _L;
  }
  return _M0MPC15debug4Repr4ctor("Invalid", [{ _0: undefined, _1: _M0IPC16string6StringPC15debug5Debug8to__repr(_arg_333) }]);
}
function _M0IP211localreview4amqp7ContentPC15debug5Debug8to__repr(_x_330) {
  const _bind = [{ _0: "channel", _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_x_330.channel) }, { _0: "method_payload", _1: _M0IPC15bytes5BytesPC15debug5Debug8to__repr(_x_330.method_payload) }, { _0: "header", _1: _M0IPC15bytes5BytesPC15debug5Debug8to__repr(_x_330.header) }, { _0: "body", _1: _M0IPC15bytes5BytesPC15debug5Debug8to__repr(_x_330.body) }];
  return _M0MPC15debug4Repr6record(_M0MPB3Map3MapGsRPC15debug4ReprE(new _M0TPB9ArrayViewGUsRPC15debug4ReprEE(_bind, 0, 4), undefined));
}
function _M0IP211localreview4amqp10FieldValuePC15debug5Debug8to__repr(_x_290) {
  let _arg_307;
  _L: {
    let _arg_306;
    _L$2: {
      let _arg_305;
      _L$3: {
        let _arg_304;
        _L$4: {
          let _arg_303;
          _L$5: {
            let _arg_301;
            let _arg_302;
            _L$6: {
              let _arg_300;
              _L$7: {
                let _arg_299;
                _L$8: {
                  let _arg_298;
                  _L$9: {
                    let _arg_297;
                    _L$10: {
                      let _arg_296;
                      _L$11: {
                        let _arg_295;
                        _L$12: {
                          let _arg_294;
                          _L$13: {
                            let _arg_293;
                            _L$14: {
                              let _arg_292;
                              _L$15: {
                                let _arg_291;
                                _L$16: {
                                  switch (_x_290.$tag) {
                                    case 0: {
                                      const _Boolean = _x_290;
                                      const _$42$arg_291 = _Boolean._0;
                                      _arg_291 = _$42$arg_291;
                                      break _L$16;
                                    }
                                    case 1: {
                                      const _Signed8 = _x_290;
                                      const _$42$arg_292 = _Signed8._0;
                                      _arg_292 = _$42$arg_292;
                                      break _L$15;
                                    }
                                    case 2: {
                                      const _Unsigned8 = _x_290;
                                      const _$42$arg_293 = _Unsigned8._0;
                                      _arg_293 = _$42$arg_293;
                                      break _L$14;
                                    }
                                    case 3: {
                                      const _Signed16 = _x_290;
                                      const _$42$arg_294 = _Signed16._0;
                                      _arg_294 = _$42$arg_294;
                                      break _L$13;
                                    }
                                    case 4: {
                                      const _Unsigned16 = _x_290;
                                      const _$42$arg_295 = _Unsigned16._0;
                                      _arg_295 = _$42$arg_295;
                                      break _L$12;
                                    }
                                    case 5: {
                                      const _Signed32 = _x_290;
                                      const _$42$arg_296 = _Signed32._0;
                                      _arg_296 = _$42$arg_296;
                                      break _L$11;
                                    }
                                    case 6: {
                                      const _Unsigned32 = _x_290;
                                      const _$42$arg_297 = _Unsigned32._0;
                                      _arg_297 = _$42$arg_297;
                                      break _L$10;
                                    }
                                    case 7: {
                                      const _Signed64 = _x_290;
                                      const _$42$arg_298 = _Signed64._0;
                                      _arg_298 = _$42$arg_298;
                                      break _L$9;
                                    }
                                    case 8: {
                                      const _Float32Bits = _x_290;
                                      const _$42$arg_299 = _Float32Bits._0;
                                      _arg_299 = _$42$arg_299;
                                      break _L$8;
                                    }
                                    case 9: {
                                      const _Float64Bits = _x_290;
                                      const _$42$arg_300 = _Float64Bits._0;
                                      _arg_300 = _$42$arg_300;
                                      break _L$7;
                                    }
                                    case 10: {
                                      const _Decimal = _x_290;
                                      const _$42$arg_301 = _Decimal._0;
                                      const _$42$arg_302 = _Decimal._1;
                                      _arg_301 = _$42$arg_301;
                                      _arg_302 = _$42$arg_302;
                                      break _L$6;
                                    }
                                    case 11: {
                                      const _LongString = _x_290;
                                      const _$42$arg_303 = _LongString._0;
                                      _arg_303 = _$42$arg_303;
                                      break _L$5;
                                    }
                                    case 12: {
                                      const _ByteArray = _x_290;
                                      const _$42$arg_304 = _ByteArray._0;
                                      _arg_304 = _$42$arg_304;
                                      break _L$4;
                                    }
                                    case 13: {
                                      const _Timestamp = _x_290;
                                      const _$42$arg_305 = _Timestamp._0;
                                      _arg_305 = _$42$arg_305;
                                      break _L$3;
                                    }
                                    case 14: {
                                      const _ArrayValue = _x_290;
                                      const _$42$arg_306 = _ArrayValue._0;
                                      _arg_306 = _$42$arg_306;
                                      break _L$2;
                                    }
                                    case 15: {
                                      const _TableValue = _x_290;
                                      const _$42$arg_307 = _TableValue._0;
                                      _arg_307 = _$42$arg_307;
                                      break _L;
                                    }
                                    default: {
                                      return _M0MPC15debug4Repr4ctor("Void", []);
                                    }
                                  }
                                }
                                return _M0MPC15debug4Repr4ctor("Boolean", [{ _0: undefined, _1: _M0IPC14bool4BoolPC15debug5Debug8to__repr(_arg_291) }]);
                              }
                              return _M0MPC15debug4Repr4ctor("Signed8", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_292) }]);
                            }
                            return _M0MPC15debug4Repr4ctor("Unsigned8", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_293) }]);
                          }
                          return _M0MPC15debug4Repr4ctor("Signed16", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_294) }]);
                        }
                        return _M0MPC15debug4Repr4ctor("Unsigned16", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_295) }]);
                      }
                      return _M0MPC15debug4Repr4ctor("Signed32", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_296) }]);
                    }
                    return _M0MPC15debug4Repr4ctor("Unsigned32", [{ _0: undefined, _1: _M0IPC14uint4UIntPC15debug5Debug8to__repr(_arg_297) }]);
                  }
                  return _M0MPC15debug4Repr4ctor("Signed64", [{ _0: undefined, _1: _M0IPC15int645Int64PC15debug5Debug8to__repr(_arg_298) }]);
                }
                return _M0MPC15debug4Repr4ctor("Float32Bits", [{ _0: undefined, _1: _M0IPC14uint4UIntPC15debug5Debug8to__repr(_arg_299) }]);
              }
              return _M0MPC15debug4Repr4ctor("Float64Bits", [{ _0: undefined, _1: _M0IPC16uint646UInt64PC15debug5Debug8to__repr(_arg_300) }]);
            }
            return _M0MPC15debug4Repr4ctor("Decimal", [{ _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_301) }, { _0: undefined, _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_arg_302) }]);
          }
          return _M0MPC15debug4Repr4ctor("LongString", [{ _0: undefined, _1: _M0IPC15bytes5BytesPC15debug5Debug8to__repr(_arg_303) }]);
        }
        return _M0MPC15debug4Repr4ctor("ByteArray", [{ _0: undefined, _1: _M0IPC15bytes5BytesPC15debug5Debug8to__repr(_arg_304) }]);
      }
      return _M0MPC15debug4Repr4ctor("Timestamp", [{ _0: undefined, _1: _M0IPC16uint646UInt64PC15debug5Debug8to__repr(_arg_305) }]);
    }
    return _M0MPC15debug4Repr4ctor("ArrayValue", [{ _0: undefined, _1: _M0IPC15array5ArrayPC15debug5Debug8to__reprGRP211localreview4amqp10FieldValueE(_arg_306) }]);
  }
  return _M0MPC15debug4Repr4ctor("TableValue", [{ _0: undefined, _1: _M0IPC15array5ArrayPC15debug5Debug8to__reprGUsRP211localreview4amqp10FieldValueEE(_arg_307) }]);
}
function _M0IP211localreview4amqp5FramePC15debug5Debug8to__repr(_x_216) {
  const _bind = [{ _0: "kind", _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_x_216.kind) }, { _0: "channel", _1: _M0IPC13int3IntPC15debug5Debug8to__repr(_x_216.channel) }, { _0: "payload", _1: _M0IPC15bytes5BytesPC15debug5Debug8to__repr(_x_216.payload) }];
  return _M0MPC15debug4Repr6record(_M0MPB3Map3MapGsRPC15debug4ReprE(new _M0TPB9ArrayViewGUsRPC15debug4ReprEE(_bind, 0, 3), undefined));
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
  const _bind = 0;
  let _tmp = _bind;
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
  const _bind = _M0MP211localreview4amqp10WireReader4uint(self, 1);
  let _tmp;
  if (_bind.$tag === 1) {
    const _ok = _bind;
    _tmp = _ok._0;
  } else {
    return _bind;
  }
  const _bind$2 = _M0MP211localreview4amqp10WireReader3raw(self, _tmp);
  let data;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    data = _ok._0;
  } else {
    return _bind$2;
  }
  let _try_err;
  _L: {
    const _bind$3 = _M0FPC28encoding4utf814decode_2einner(new _M0TPC15bytes9BytesView(data, 0, data.length), false);
    let _tmp$2;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      _tmp$2 = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    return new _M0DTPC16result6ResultGsRP211localreview4amqp10FrameErrorE2Ok(_tmp$2);
  }
  return new _M0DTPC16result6ResultGsRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid UTF-8 shortstr"));
}
function _M0MP211localreview4amqp10WireReader7longstr(self) {
  const _bind = _M0MP211localreview4amqp10WireReader4uint(self, 4);
  let _tmp;
  if (_bind.$tag === 1) {
    const _ok = _bind;
    _tmp = _ok._0;
  } else {
    return _bind;
  }
  return _M0MP211localreview4amqp10WireReader3raw(self, _tmp);
}
function _M0MP211localreview4amqp10WireReader14container__end(self) {
  const _bind = _M0MP211localreview4amqp10WireReader4uint(self, 4);
  let size;
  if (_bind.$tag === 1) {
    const _ok = _bind;
    size = _ok._0;
  } else {
    return _bind;
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
function _M0FP211localreview4amqp13method__names() {
  return ["connection.start", "connection.start-ok", "connection.secure", "connection.secure-ok", "connection.tune", "connection.tune-ok", "connection.open", "connection.open-ok", "connection.close", "connection.close-ok", "connection.blocked", "connection.unblocked", "connection.update-secret", "connection.update-secret-ok", "channel.open", "channel.open-ok", "channel.flow", "channel.flow-ok", "channel.close", "channel.close-ok", "exchange.declare", "exchange.declare-ok", "exchange.delete", "exchange.delete-ok", "exchange.bind", "exchange.bind-ok", "exchange.unbind", "exchange.unbind-ok", "queue.declare", "queue.declare-ok", "queue.bind", "queue.bind-ok", "queue.unbind", "queue.unbind-ok", "queue.purge", "queue.purge-ok", "queue.delete", "queue.delete-ok", "basic.qos", "basic.qos-ok", "basic.consume", "basic.consume-ok", "basic.cancel", "basic.cancel-ok", "basic.publish", "basic.return", "basic.deliver", "basic.get", "basic.get-ok", "basic.get-empty", "basic.ack", "basic.reject", "basic.recover-async", "basic.recover", "basic.recover-ok", "basic.nack", "tx.select", "tx.select-ok", "tx.commit", "tx.commit-ok", "tx.rollback", "tx.rollback-ok", "confirm.select", "confirm.select-ok"];
}
function _M0FP211localreview4amqp21basic__property__spec() {
  return [{ _0: "content-type", _1: 5 }, { _0: "content-encoding", _1: 5 }, { _0: "headers", _1: 7 }, { _0: "delivery-mode", _1: 1 }, { _0: "priority", _1: 1 }, { _0: "correlation-id", _1: 5 }, { _0: "reply-to", _1: 5 }, { _0: "expiration", _1: 5 }, { _0: "message-id", _1: 5 }, { _0: "timestamp", _1: 4 }, { _0: "type", _1: 5 }, { _0: "user-id", _1: 5 }, { _0: "app-id", _1: 5 }, { _0: "cluster-id", _1: 5 }];
}
function _M0FP211localreview4amqp8validate(frame, max_size) {
  if (frame.channel < 0 || frame.channel > 65535) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid channel"));
  }
  if (frame.payload.length > (max_size - 8 | 0)) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("frame exceeds limit"));
  }
  const _bind = frame.kind;
  switch (_bind) {
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
function _M0FP211localreview4amqp11read__table(r, depth) {
  const _bind = _M0MP211localreview4amqp10WireReader4node(r, depth);
  if (_bind.$tag === 1) {
    const _ok = _bind;
    _ok._0;
  } else {
    return _bind;
  }
  const _bind$2 = _M0MP211localreview4amqp10WireReader14container__end(r);
  let end;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    end = _ok._0;
  } else {
    return _bind$2;
  }
  const outer = r.end;
  r.end = end;
  const entries = [];
  while (true) {
    if (r.pos < end) {
      const _bind$3 = _M0MP211localreview4amqp10WireReader8shortstr(r);
      let key;
      if (_bind$3.$tag === 1) {
        const _ok = _bind$3;
        key = _ok._0;
      } else {
        return _bind$3;
      }
      const _bind$4 = _M0FP211localreview4amqp11read__field(r, depth + 1 | 0);
      let _tmp;
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        _tmp = _ok._0;
      } else {
        return _bind$4;
      }
      _M0MPC15array5Array4pushGRPB4JsonE(entries, { _0: key, _1: _tmp });
      continue;
    } else {
      break;
    }
  }
  r.end = outer;
  return new _M0DTPC16result6ResultGRPB5ArrayGUsRP211localreview4amqp10FieldValueEERP211localreview4amqp10FrameErrorE2Ok(entries);
}
function _M0FP211localreview4amqp11read__field(r, depth) {
  const _bind = _M0MP211localreview4amqp10WireReader4node(r, depth);
  if (_bind.$tag === 1) {
    const _ok = _bind;
    _ok._0;
  } else {
    return _bind;
  }
  const _bind$2 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
  let _tmp;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    _tmp = _ok._0;
  } else {
    return _bind$2;
  }
  const _bind$3 = Number(BigInt.asIntN(32, _tmp)) | 0;
  switch (_bind$3) {
    case 116: {
      const _bind$4 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
      let _tmp$2;
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        _tmp$2 = _ok._0;
      } else {
        return _bind$4;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue7Boolean(BigInt.asUintN(64, _tmp$2) !== BigInt.asUintN(64, 0n)));
    }
    case 98: {
      const _bind$5 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
      let _tmp$3;
      if (_bind$5.$tag === 1) {
        const _ok = _bind$5;
        _tmp$3 = _ok._0;
      } else {
        return _bind$5;
      }
      const n = Number(BigInt.asIntN(32, _tmp$3)) | 0;
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue7Signed8(n >= 128 ? n - 256 | 0 : n));
    }
    case 66: {
      const _bind$6 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
      let _tmp$4;
      if (_bind$6.$tag === 1) {
        const _ok = _bind$6;
        _tmp$4 = _ok._0;
      } else {
        return _bind$6;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue9Unsigned8(Number(BigInt.asIntN(32, _tmp$4)) | 0));
    }
    case 115: {
      const _bind$7 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
      let _tmp$5;
      if (_bind$7.$tag === 1) {
        const _ok = _bind$7;
        _tmp$5 = _ok._0;
      } else {
        return _bind$7;
      }
      const n$2 = Number(BigInt.asIntN(32, _tmp$5)) | 0;
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue8Signed16(n$2 >= 32768 ? n$2 - 65536 | 0 : n$2));
    }
    case 117: {
      const _bind$8 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
      let _tmp$6;
      if (_bind$8.$tag === 1) {
        const _ok = _bind$8;
        _tmp$6 = _ok._0;
      } else {
        return _bind$8;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue10Unsigned16(Number(BigInt.asIntN(32, _tmp$6)) | 0));
    }
    case 73: {
      const _bind$9 = _M0MP211localreview4amqp10WireReader4uint(r, 4);
      let _tmp$7;
      if (_bind$9.$tag === 1) {
        const _ok = _bind$9;
        _tmp$7 = _ok._0;
      } else {
        return _bind$9;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue8Signed32(Number(BigInt.asIntN(32, _tmp$7)) | 0));
    }
    case 105: {
      const _bind$10 = _M0MP211localreview4amqp10WireReader4uint(r, 4);
      let _tmp$8;
      if (_bind$10.$tag === 1) {
        const _ok = _bind$10;
        _tmp$8 = _ok._0;
      } else {
        return _bind$10;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue10Unsigned32(Number(BigInt.asUintN(32, _tmp$8)) | 0));
    }
    case 108: {
      const _bind$11 = _M0MP211localreview4amqp10WireReader4uint(r, 8);
      let _tmp$9;
      if (_bind$11.$tag === 1) {
        const _ok = _bind$11;
        _tmp$9 = _ok._0;
      } else {
        return _bind$11;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue8Signed64(_tmp$9));
    }
    case 102: {
      const _bind$12 = _M0MP211localreview4amqp10WireReader4uint(r, 4);
      let _tmp$10;
      if (_bind$12.$tag === 1) {
        const _ok = _bind$12;
        _tmp$10 = _ok._0;
      } else {
        return _bind$12;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue11Float32Bits(Number(BigInt.asUintN(32, _tmp$10)) | 0));
    }
    case 100: {
      const _bind$13 = _M0MP211localreview4amqp10WireReader4uint(r, 8);
      let _tmp$11;
      if (_bind$13.$tag === 1) {
        const _ok = _bind$13;
        _tmp$11 = _ok._0;
      } else {
        return _bind$13;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue11Float64Bits(_tmp$11));
    }
    case 68: {
      const _bind$14 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
      let _tmp$12;
      if (_bind$14.$tag === 1) {
        const _ok = _bind$14;
        _tmp$12 = _ok._0;
      } else {
        return _bind$14;
      }
      const scale = Number(BigInt.asIntN(32, _tmp$12)) | 0;
      const _bind$15 = _M0MP211localreview4amqp10WireReader4uint(r, 4);
      let _tmp$13;
      if (_bind$15.$tag === 1) {
        const _ok = _bind$15;
        _tmp$13 = _ok._0;
      } else {
        return _bind$15;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue7Decimal(scale, Number(BigInt.asIntN(32, _tmp$13)) | 0));
    }
    case 83: {
      const _bind$16 = _M0MP211localreview4amqp10WireReader7longstr(r);
      let _tmp$14;
      if (_bind$16.$tag === 1) {
        const _ok = _bind$16;
        _tmp$14 = _ok._0;
      } else {
        return _bind$16;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue10LongString(_tmp$14));
    }
    case 120: {
      const _bind$17 = _M0MP211localreview4amqp10WireReader7longstr(r);
      let _tmp$15;
      if (_bind$17.$tag === 1) {
        const _ok = _bind$17;
        _tmp$15 = _ok._0;
      } else {
        return _bind$17;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue9ByteArray(_tmp$15));
    }
    case 84: {
      const _bind$18 = _M0MP211localreview4amqp10WireReader4uint(r, 8);
      let _tmp$16;
      if (_bind$18.$tag === 1) {
        const _ok = _bind$18;
        _tmp$16 = _ok._0;
      } else {
        return _bind$18;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue9Timestamp(_tmp$16));
    }
    case 86: {
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(_M0DTP211localreview4amqp10FieldValue4Void__);
    }
    case 70: {
      const _bind$19 = _M0FP211localreview4amqp11read__table(r, depth);
      let _tmp$17;
      if (_bind$19.$tag === 1) {
        const _ok = _bind$19;
        _tmp$17 = _ok._0;
      } else {
        return _bind$19;
      }
      return new _M0DTPC16result6ResultGRP211localreview4amqp10FieldValueRP211localreview4amqp10FrameErrorE2Ok(new _M0DTP211localreview4amqp10FieldValue10TableValue(_tmp$17));
    }
    case 65: {
      const _bind$20 = _M0MP211localreview4amqp10WireReader14container__end(r);
      let end;
      if (_bind$20.$tag === 1) {
        const _ok = _bind$20;
        end = _ok._0;
      } else {
        return _bind$20;
      }
      const outer = r.end;
      r.end = end;
      const values = [];
      while (true) {
        if (r.pos < end) {
          const _bind$21 = _M0FP211localreview4amqp11read__field(r, depth + 1 | 0);
          let _tmp$18;
          if (_bind$21.$tag === 1) {
            const _ok = _bind$21;
            _tmp$18 = _ok._0;
          } else {
            return _bind$21;
          }
          _M0MPC15array5Array4pushGRPB4JsonE(values, _tmp$18);
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
function _M0MP211localreview4amqp11BasicHeader6decode(frame) {
  const _bind = _M0FP211localreview4amqp8validate(frame, 16777216);
  if (_bind.$tag === 1) {
    const _ok = _bind;
    _ok._0;
  } else {
    return _bind;
  }
  if (frame.kind !== 2) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("expected content header frame"));
  }
  const _bind$2 = _M0MP211localreview4amqp10WireReader3new(frame.payload);
  let r;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    r = _ok._0;
  } else {
    return _bind$2;
  }
  let _tmp;
  const _bind$3 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
  let _tmp$2;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _tmp$2 = _ok._0;
  } else {
    return _bind$3;
  }
  if (BigInt.asUintN(64, _tmp$2) !== BigInt.asUintN(64, 60n)) {
    _tmp = true;
  } else {
    const _bind$4 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
    let _tmp$3;
    if (_bind$4.$tag === 1) {
      const _ok = _bind$4;
      _tmp$3 = _ok._0;
    } else {
      return _bind$4;
    }
    _tmp = BigInt.asUintN(64, _tmp$3) !== BigInt.asUintN(64, 0n);
  }
  if (_tmp) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("expected Basic class header with weight zero"));
  }
  const _bind$4 = _M0MP211localreview4amqp10WireReader4uint(r, 8);
  let body_size;
  if (_bind$4.$tag === 1) {
    const _ok = _bind$4;
    body_size = _ok._0;
  } else {
    return _bind$4;
  }
  const _bind$5 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
  let flags;
  if (_bind$5.$tag === 1) {
    const _ok = _bind$5;
    flags = _ok._0;
  } else {
    return _bind$5;
  }
  if (BigInt.asUintN(64, BigInt.asUintN(64, flags & 3n)) !== BigInt.asUintN(64, 0n)) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unsupported Basic property flag or continuation"));
  }
  const properties = [];
  const _bind$6 = _M0FP211localreview4amqp21basic__property__spec();
  const _bind$7 = _bind$6.length;
  let _tmp$3 = 0;
  while (true) {
    const i = _tmp$3;
    if (i < _bind$7) {
      const _foreach_element = _bind$6[i];
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
            const _bind$8 = _M0MP211localreview4amqp10WireReader8shortstr(r);
            let _tmp$4;
            if (_bind$8.$tag === 1) {
              const _ok = _bind$8;
              _tmp$4 = _ok._0;
            } else {
              return _bind$8;
            }
            value = new _M0DTP211localreview4amqp8Argument11ShortString(_tmp$4);
            break;
          }
          case 1: {
            const _bind$9 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
            let _tmp$5;
            if (_bind$9.$tag === 1) {
              const _ok = _bind$9;
              _tmp$5 = _ok._0;
            } else {
              return _bind$9;
            }
            value = new _M0DTP211localreview4amqp8Argument5Octet(Number(BigInt.asIntN(32, _tmp$5)) | 0);
            break;
          }
          case 4: {
            const _bind$10 = _M0MP211localreview4amqp10WireReader4uint(r, 8);
            let _tmp$6;
            if (_bind$10.$tag === 1) {
              const _ok = _bind$10;
              _tmp$6 = _ok._0;
            } else {
              return _bind$10;
            }
            value = new _M0DTP211localreview4amqp8Argument8LongLong(_tmp$6);
            break;
          }
          case 7: {
            const _bind$11 = _M0FP211localreview4amqp11read__table(r, 0);
            let _tmp$7;
            if (_bind$11.$tag === 1) {
              const _ok = _bind$11;
              _tmp$7 = _ok._0;
            } else {
              return _bind$11;
            }
            value = new _M0DTP211localreview4amqp8Argument5Table(_tmp$7);
            break;
          }
          default: {
            return new _M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unsupported Basic property kind"));
          }
        }
        _M0MPC15array5Array4pushGRPB4JsonE(properties, { _0: key, _1: value });
      }
      _tmp$3 = i + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$8 = _M0MP211localreview4amqp10WireReader6finish(r);
  if (_bind$8.$tag === 1) {
    const _ok = _bind$8;
    _ok._0;
  } else {
    return _bind$8;
  }
  return new _M0DTPC16result6ResultGRP211localreview4amqp11BasicHeaderRP211localreview4amqp10FrameErrorE2Ok(new _M0TP211localreview4amqp11BasicHeader(body_size, properties));
}
function _M0FP211localreview4amqp15method__channel(class_id, channel) {
  if (channel < 0 || (channel > 65535 || _M0IP016_24default__implPB2Eq10not__equalGbE(class_id === 10, channel === 0))) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("connection methods require channel zero; other methods require a nonzero channel"));
  } else {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
  }
}
function _M0MP211localreview4amqp7Content13basic__header(self) {
  return _M0MP211localreview4amqp11BasicHeader6decode(new _M0TP211localreview4amqp5Frame(2, self.channel, self.header));
}
function _M0MP211localreview4amqp6Method6decode(frame) {
  const _bind = _M0FP211localreview4amqp8validate(frame, 16777216);
  if (_bind.$tag === 1) {
    const _ok = _bind;
    _ok._0;
  } else {
    return _bind;
  }
  if (frame.kind !== 1) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp6MethodRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("expected method frame"));
  }
  const _bind$2 = _M0MP211localreview4amqp10WireReader3new(frame.payload);
  let r;
  if (_bind$2.$tag === 1) {
    const _ok = _bind$2;
    r = _ok._0;
  } else {
    return _bind$2;
  }
  const _bind$3 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
  let _tmp;
  if (_bind$3.$tag === 1) {
    const _ok = _bind$3;
    _tmp = _ok._0;
  } else {
    return _bind$3;
  }
  const class_id = Number(BigInt.asIntN(32, _tmp)) | 0;
  const _bind$4 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
  let _tmp$2;
  if (_bind$4.$tag === 1) {
    const _ok = _bind$4;
    _tmp$2 = _ok._0;
  } else {
    return _bind$4;
  }
  const method_id = Number(BigInt.asIntN(32, _tmp$2)) | 0;
  const _bind$5 = _M0FP211localreview4amqp15method__channel(class_id, frame.channel);
  if (_bind$5.$tag === 1) {
    const _ok = _bind$5;
    _ok._0;
  } else {
    return _bind$5;
  }
  let spec;
  const _bind$6 = _M0FP211localreview4amqp12method__spec(class_id, method_id);
  if (_bind$6 === undefined) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp6MethodRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("unknown class or method id"));
  } else {
    const _Some = _bind$6;
    const _spec = _Some;
    spec = _spec;
  }
  const arguments_ = [];
  const bits = new _M0TPB8MutLocalGmE(0n);
  const used = new _M0TPB8MutLocalGiE(8);
  const _bind$7 = spec.fields;
  const _bind$8 = _bind$7.length;
  let _tmp$3 = 0;
  while (true) {
    const _ = _tmp$3;
    if (_ < _bind$8) {
      const _foreach_element = _bind$7[_];
      let kind;
      _L: {
        const _kind = _foreach_element._1;
        kind = _kind;
        break _L;
      }
      if (_M0IP211localreview4amqp12ArgumentKindPB2Eq5equal(kind, 0)) {
        if (used.val === 8) {
          const _bind$9 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
          let _tmp$4;
          if (_bind$9.$tag === 1) {
            const _ok = _bind$9;
            _tmp$4 = _ok._0;
          } else {
            return _bind$9;
          }
          bits.val = _tmp$4;
          used.val = 0;
        }
        _M0MPC15array5Array4pushGRPB4JsonE(arguments_, new _M0DTP211localreview4amqp8Argument3Bit(BigInt.asUintN(64, BigInt.asUintN(64, bits.val & BigInt.asUintN(64, 1n << BigInt(used.val & 63)))) !== BigInt.asUintN(64, 0n)));
        used.val = used.val + 1 | 0;
      } else {
        used.val = 8;
        let _tmp$4;
        switch (kind) {
          case 1: {
            const _bind$9 = _M0MP211localreview4amqp10WireReader4uint(r, 1);
            let _tmp$5;
            if (_bind$9.$tag === 1) {
              const _ok = _bind$9;
              _tmp$5 = _ok._0;
            } else {
              return _bind$9;
            }
            _tmp$4 = new _M0DTP211localreview4amqp8Argument5Octet(Number(BigInt.asIntN(32, _tmp$5)) | 0);
            break;
          }
          case 2: {
            const _bind$10 = _M0MP211localreview4amqp10WireReader4uint(r, 2);
            let _tmp$6;
            if (_bind$10.$tag === 1) {
              const _ok = _bind$10;
              _tmp$6 = _ok._0;
            } else {
              return _bind$10;
            }
            _tmp$4 = new _M0DTP211localreview4amqp8Argument5Short(Number(BigInt.asIntN(32, _tmp$6)) | 0);
            break;
          }
          case 3: {
            const _bind$11 = _M0MP211localreview4amqp10WireReader4uint(r, 4);
            let _tmp$7;
            if (_bind$11.$tag === 1) {
              const _ok = _bind$11;
              _tmp$7 = _ok._0;
            } else {
              return _bind$11;
            }
            _tmp$4 = new _M0DTP211localreview4amqp8Argument4Long(Number(BigInt.asUintN(32, _tmp$7)) | 0);
            break;
          }
          case 4: {
            const _bind$12 = _M0MP211localreview4amqp10WireReader4uint(r, 8);
            let _tmp$8;
            if (_bind$12.$tag === 1) {
              const _ok = _bind$12;
              _tmp$8 = _ok._0;
            } else {
              return _bind$12;
            }
            _tmp$4 = new _M0DTP211localreview4amqp8Argument8LongLong(_tmp$8);
            break;
          }
          case 5: {
            const _bind$13 = _M0MP211localreview4amqp10WireReader8shortstr(r);
            let _tmp$9;
            if (_bind$13.$tag === 1) {
              const _ok = _bind$13;
              _tmp$9 = _ok._0;
            } else {
              return _bind$13;
            }
            _tmp$4 = new _M0DTP211localreview4amqp8Argument11ShortString(_tmp$9);
            break;
          }
          case 6: {
            const _bind$14 = _M0MP211localreview4amqp10WireReader7longstr(r);
            let _tmp$10;
            if (_bind$14.$tag === 1) {
              const _ok = _bind$14;
              _tmp$10 = _ok._0;
            } else {
              return _bind$14;
            }
            _tmp$4 = new _M0DTP211localreview4amqp8Argument10LongString(_tmp$10);
            break;
          }
          case 7: {
            const _bind$15 = _M0FP211localreview4amqp11read__table(r, 0);
            let _tmp$11;
            if (_bind$15.$tag === 1) {
              const _ok = _bind$15;
              _tmp$11 = _ok._0;
            } else {
              return _bind$15;
            }
            _tmp$4 = new _M0DTP211localreview4amqp8Argument5Table(_tmp$11);
            break;
          }
          default: {
            return new _M0DTPC16result6ResultGRP211localreview4amqp6MethodRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid bit field state"));
          }
        }
        _M0MPC15array5Array4pushGRPB4JsonE(arguments_, _tmp$4);
      }
      _tmp$3 = _ + 1 | 0;
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
  return new _M0DTPC16result6ResultGRP211localreview4amqp6MethodRP211localreview4amqp10FrameErrorE2Ok(new _M0TP211localreview4amqp6Method(class_id, method_id, arguments_));
}
function _M0MP211localreview4amqp5Frame14encode_2einner(self, max_size) {
  if (max_size < 8 || max_size > 16777216) {
    return new _M0DTPC16result6ResultGzRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid frame limit"));
  }
  const _bind = _M0FP211localreview4amqp8validate(self, max_size);
  if (_bind.$tag === 1) {
    const _ok = _bind;
    _ok._0;
  } else {
    return _bind;
  }
  const n = self.payload.length;
  const out = [self.kind & 255, self.channel >> 8 & 255, self.channel & 255, n >> 24 & 255, n >> 16 & 255, n >> 8 & 255, n & 255];
  const _bind$2 = self.payload;
  const _bind$3 = _bind$2.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$3) {
      const b = _bind$2[_];
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
function _M0MP211localreview4amqp7Decoder11new_2einner(max_size) {
  if (max_size < 8 || max_size > 16777216) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp7DecoderRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid frame limit"));
  }
  return new _M0DTPC16result6ResultGRP211localreview4amqp7DecoderRP211localreview4amqp10FrameErrorE2Ok(new _M0TP211localreview4amqp7Decoder([], max_size, 7, false));
}
function _M0MP211localreview4amqp7Decoder7consume(self, input) {
  const frames = [];
  const _bind = input.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
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
        const _bind$2 = 7;
        const _bind$3 = b.length - 1 | 0;
        let _tmp$2 = _bind$2;
        while (true) {
          const i = _tmp$2;
          if (i < _bind$3) {
            _M0MPC15array5Array4pushGyE(payload, _M0MPC15array5Array2atGyE(b, i));
            _tmp$2 = i + 1 | 0;
            continue;
          } else {
            break;
          }
        }
        const frame = new _M0TP211localreview4amqp5Frame(_M0MPC15array5Array2atGyE(b, 0), (Math.imul(_M0MPC15array5Array2atGyE(b, 1), 256) | 0) + _M0MPC15array5Array2atGyE(b, 2) | 0, _M0MPC15bytes5Bytes11from__array(new _M0TPB9ArrayViewGyE(payload, 0, payload.length)));
        const _bind$4 = _M0FP211localreview4amqp8validate(frame, self.limit);
        if (_bind$4.$tag === 1) {
          const _ok = _bind$4;
          _ok._0;
        } else {
          return _bind$4;
        }
        _M0MPC15array5Array4pushGRPB4JsonE(frames, frame);
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
    const _bind = _M0MP211localreview4amqp7Decoder7consume(self, input);
    let _tmp;
    if (_bind.$tag === 1) {
      const _ok = _bind;
      _tmp = _ok._0;
    } else {
      const _err$2 = _bind;
      _err = _err$2._0;
      break _L;
    }
    return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE2Ok(_tmp);
  }
  self.poisoned = true;
  return new _M0DTPC16result6ResultGRPB5ArrayGRP211localreview4amqp5FrameERP211localreview4amqp10FrameErrorE3Err(_err);
}
function _M0MP211localreview4amqp7Decoder6finish(self) {
  if (self.poisoned || !_M0MPC15array5Array9is__emptyGyE(self.buffer)) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("incomplete or invalid stream"));
  } else {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
  }
}
function _M0MP211localreview4amqp9Assembler11new_2einner(max_body, strict_methods) {
  if (max_body < 0 || max_body > 16777216) {
    return new _M0DTPC16result6ResultGRP211localreview4amqp9AssemblerRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("invalid body limit"));
  }
  const _bind = [];
  return new _M0DTPC16result6ResultGRP211localreview4amqp9AssemblerRP211localreview4amqp10FrameErrorE2Ok(new _M0TP211localreview4amqp9Assembler(_M0MPB3Map3MapGiRP211localreview4amqp7PendingE(new _M0TPB9ArrayViewGUiRP211localreview4amqp7PendingEE(_bind, 0, 0), undefined), max_body, strict_methods, 0, 0, false));
}
function _M0MP211localreview4amqp9Assembler4push(self, frame) {
  if (self.failed) {
    return new _M0DTPC16result6ResultGORP211localreview4amqp7ContentRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("assembler is poisoned"));
  }
  let _err;
  _L: {
    const _bind = _M0FP211localreview4amqp8validate(frame, 16777216);
    if (_bind.$tag === 1) {
      const _ok = _bind;
      _ok._0;
    } else {
      const _err$2 = _bind;
      _err = _err$2._0;
      break _L;
    }
    if (frame.kind === 8) {
      return new _M0DTPC16result6ResultGORP211localreview4amqp7ContentRP211localreview4amqp10FrameErrorE2Ok(undefined);
    }
    if (frame.kind === 1) {
      if (self.strict_methods) {
        const _bind$2 = _M0MP211localreview4amqp6Method6decode(frame);
        if (_bind$2.$tag === 1) {
          const _ok = _bind$2;
          _ok._0;
        } else {
          const _err$2 = _bind$2;
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
    const _bind$2 = _M0MPB3Map3getGiRP211localreview4amqp7PendingE(self.pending, frame.channel);
    if (_bind$2 === undefined) {
      _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("content frame without preceding method");
      break _L;
    } else {
      const _Some = _bind$2;
      const _state = _Some;
      state = _state;
    }
    if (frame.kind === 2) {
      const _bind$3 = state.header;
      if (_bind$3 === undefined) {
      } else {
        _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("duplicate content header");
        break _L;
      }
      const bytes = frame.payload;
      const _bind$4 = _M0MP211localreview4amqp11BasicHeader6decode(frame);
      let _tmp;
      if (_bind$4.$tag === 1) {
        const _ok = _bind$4;
        _tmp = _ok._0;
      } else {
        const _err$2 = _bind$4;
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
    const _bind$3 = state.header;
    if (_bind$3 === undefined) {
      _err = new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("body before content header");
      break _L;
    } else {
      const _Some = _bind$3;
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
    const _bind$4 = frame.payload;
    const _bind$5 = _bind$4.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind$5) {
        const b = _bind$4[_];
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
      const _bind$6 = state.body;
      const body = _M0MPC15bytes5Bytes11from__array(new _M0TPB9ArrayViewGyE(_bind$6, 0, _bind$6.length));
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
function _M0MP211localreview4amqp9Assembler6finish(self) {
  if (self.failed || !_M0MPB3Map9is__emptyGiRP211localreview4amqp7PendingE(self.pending)) {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE3Err(new _M0DTPC15error5Error41localreview_2famqp_2eFrameError_2eInvalid("incomplete or failed content stream"));
  } else {
    return new _M0DTPC16result6ResultGuRP211localreview4amqp10FrameErrorE2Ok(undefined);
  }
}
function _M0FP411localreview4amqp3cmd3web3hex(data) {
  const alphabet = "0123456789abcdef";
  const out = [];
  const _bind = data.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind) {
      const b = data[_];
      const n = b;
      if (16 === 0) {
        $panic();
      }
      const _tmp$2 = n / 16 | 0;
      if (16 === 0) {
        $panic();
      }
      const _tmp$3 = _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(alphabet, _tmp$2, (n / 16 | 0) + 1 | 0));
      if (16 === 0) {
        $panic();
      }
      const _tmp$4 = n % 16 | 0;
      if (16 === 0) {
        $panic();
      }
      _M0MPC15array5Array4pushGRPB4JsonE(out, `${_tmp$3}${_M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(alphabet, _tmp$4, (n % 16 | 0) + 1 | 0))}`);
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  const _bind$2 = "";
  return _M0MPC15array5Array4joinGsE(out, new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length));
}
function _M0FP411localreview4amqp3cmd3web8describe(frame) {
  const _bind = frame.kind;
  let detail;
  switch (_bind) {
    case 1: {
      const _bind$2 = _M0MP211localreview4amqp6Method6decode(frame);
      let command;
      if (_bind$2.$tag === 1) {
        const _ok = _bind$2;
        command = _ok._0;
      } else {
        return _bind$2;
      }
      const spec = _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_M0FP211localreview4amqp12method__spec(command.class_id, command.method_id));
      const args = [];
      const _bind$3 = command.arguments;
      const _bind$4 = _bind$3.length;
      let _tmp = 0;
      while (true) {
        const i = _tmp;
        if (i < _bind$4) {
          const value = _bind$3[i];
          const _bind$5 = [{ _0: "name", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0MPC15array5Array2atGUsRP211localreview4amqp12ArgumentKindEE(spec.fields, i)._0) }, { _0: "value", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRP211localreview4amqp8ArgumentE(value))) }];
          _M0MPC15array5Array4pushGRPB4JsonE(args, _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$5, 0, 2), undefined)));
          _tmp = i + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const _bind$5 = [{ _0: "name", _1: _M0IPC16string6StringPB6ToJson8to__json(spec.name) }, { _0: "arguments", _1: _M0IPC15array5ArrayPB6ToJson8to__jsonGRPB4JsonE(args) }, { _0: "carriesContent", _1: _M0IPC14bool4BoolPB6ToJson8to__json(spec.carries_content) }];
      detail = _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$5, 0, 3), undefined));
      break;
    }
    case 2: {
      const _bind$6 = _M0MP211localreview4amqp11BasicHeader6decode(frame);
      let header;
      if (_bind$6.$tag === 1) {
        const _ok = _bind$6;
        header = _ok._0;
      } else {
        return _bind$6;
      }
      const _bind$7 = [{ _0: "bodySize", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0MPC16uint646UInt6418to__string_2einner(header.body_size, 10)) }, { _0: "properties", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRPB5ArrayGUsRP211localreview4amqp8ArgumentEEE(header.properties))) }];
      detail = _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$7, 0, 2), undefined));
      break;
    }
    default: {
      const _bind$8 = [{ _0: "bytes", _1: _M0IPC13int3IntPB6ToJson8to__json(frame.payload.length) }, { _0: "hex", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0FP411localreview4amqp3cmd3web3hex(frame.payload)) }];
      detail = _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$8, 0, 2), undefined));
    }
  }
  const _bind$9 = [{ _0: "kind", _1: _M0IPC13int3IntPB6ToJson8to__json(frame.kind) }, { _0: "channel", _1: _M0IPC13int3IntPB6ToJson8to__json(frame.channel) }, { _0: "detail", _1: detail }];
  return new _M0DTPC16result6ResultGRPB4JsonRPC15error5ErrorE2Ok(_M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$9, 0, 3), undefined)));
}
function _M0FP411localreview4amqp3cmd3web13unhex_2einner(text, max_length) {
  const out = [];
  const high = new _M0TPB8MutLocalGiE(-1);
  if (text.length > max_length) {
    return new _M0DTPC16result6ResultGzRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("input too long"));
  }
  const _it = _M0MPC16string6String4iter(text);
  while (true) {
    let c;
    _L: {
      const _bind = _M0MPB4Iter4nextGcE(_it);
      if (_bind === -1) {
        break;
      } else {
        const _Some = _bind;
        const _c = _Some;
        c = _c;
        break _L;
      }
    }
    if (c === 32 || (c === 10 || (c === 13 || c === 9))) {
      continue;
    }
    let n;
    if (c >= 48 && c <= 57) {
      n = c - 48 | 0;
    } else {
      if (c >= 97 && c <= 102) {
        n = c - 87 | 0;
      } else {
        if (c >= 65 && c <= 70) {
          n = c - 55 | 0;
        } else {
          return new _M0DTPC16result6ResultGzRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("invalid hex character"));
        }
      }
    }
    if (high.val < 0) {
      high.val = n;
    } else {
      _M0MPC15array5Array4pushGyE(out, ((Math.imul(high.val, 16) | 0) + n | 0) & 255);
      high.val = -1;
    }
    continue;
  }
  if (high.val >= 0) {
    return new _M0DTPC16result6ResultGzRPB7FailureE3Err(new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("odd hex length"));
  }
  return new _M0DTPC16result6ResultGzRPC15error5ErrorE2Ok(_M0MPC15bytes5Bytes11from__array(new _M0TPB9ArrayViewGyE(out, 0, out.length)));
}
function _M0FP411localreview4amqp3cmd3web13inspect__wire(input, assemble) {
  let _try_err;
  _L: {
    const _bind = _M0FP411localreview4amqp3cmd3web13unhex_2einner(input, 3145728);
    let data;
    if (_bind.$tag === 1) {
      const _ok = _bind;
      data = _ok._0;
    } else {
      const _err = _bind;
      _try_err = _err._0;
      break _L;
    }
    if (data.length > 1048576) {
      _try_err = new _M0DTPC15error5Error48moonbitlang_2fcore_2fbuiltin_2eFailure_2eFailure("inspection limit: 1 MiB");
      break _L;
    }
    const _bind$2 = _M0MP211localreview4amqp7Decoder11new_2einner(1048576);
    let decoder;
    if (_bind$2.$tag === 1) {
      const _ok = _bind$2;
      decoder = _ok._0;
    } else {
      const _err = _bind$2;
      _try_err = _err._0;
      break _L;
    }
    const _bind$3 = _M0MP211localreview4amqp7Decoder4feed(decoder, data);
    let frames;
    if (_bind$3.$tag === 1) {
      const _ok = _bind$3;
      frames = _ok._0;
    } else {
      const _err = _bind$3;
      _try_err = _err._0;
      break _L;
    }
    const _bind$4 = _M0MP211localreview4amqp7Decoder6finish(decoder);
    if (_bind$4.$tag === 1) {
      const _ok = _bind$4;
      _ok._0;
    } else {
      const _err = _bind$4;
      _try_err = _err._0;
      break _L;
    }
    const results = [];
    if (assemble) {
      const _bind$5 = _M0MP211localreview4amqp9Assembler11new_2einner(1048576, true);
      let assembler;
      if (_bind$5.$tag === 1) {
        const _ok = _bind$5;
        assembler = _ok._0;
      } else {
        const _err = _bind$5;
        _try_err = _err._0;
        break _L;
      }
      const _bind$6 = frames.length;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind$6) {
          const frame = frames[_];
          let content;
          _L$2: {
            _L$3: {
              const _bind$7 = _M0MP211localreview4amqp9Assembler4push(assembler, frame);
              let _bind$8;
              if (_bind$7.$tag === 1) {
                const _ok = _bind$7;
                _bind$8 = _ok._0;
              } else {
                const _err = _bind$7;
                _try_err = _err._0;
                break _L;
              }
              if (_bind$8 === undefined) {
              } else {
                const _Some = _bind$8;
                const _content = _Some;
                content = _content;
                break _L$3;
              }
              break _L$2;
            }
            const _tmp$2 = { _0: "channel", _1: _M0IPC13int3IntPB6ToJson8to__json(content.channel) };
            const _bind$7 = _M0MP211localreview4amqp7Content13basic__header(content);
            let _tmp$3;
            if (_bind$7.$tag === 1) {
              const _ok = _bind$7;
              _tmp$3 = _ok._0;
            } else {
              const _err = _bind$7;
              _try_err = _err._0;
              break _L;
            }
            const _bind$8 = [_tmp$2, { _0: "properties", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRPB5ArrayGUsRP211localreview4amqp8ArgumentEEE(_tmp$3.properties))) }, { _0: "bodyHex", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0FP411localreview4amqp3cmd3web3hex(content.body)) }, { _0: "bodyBytes", _1: _M0IPC13int3IntPB6ToJson8to__json(content.body.length) }];
            _M0MPC15array5Array4pushGRPB4JsonE(results, _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$8, 0, 4), undefined)));
          }
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const _bind$7 = _M0MP211localreview4amqp9Assembler6finish(assembler);
      if (_bind$7.$tag === 1) {
        const _ok = _bind$7;
        _ok._0;
      } else {
        const _err = _bind$7;
        _try_err = _err._0;
        break _L;
      }
    } else {
      const _bind$5 = frames.length;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind$5) {
          const frame = frames[_];
          const _bind$6 = _M0FP411localreview4amqp3cmd3web8describe(frame);
          let _tmp$2;
          if (_bind$6.$tag === 1) {
            const _ok = _bind$6;
            _tmp$2 = _ok._0;
          } else {
            const _err = _bind$6;
            _try_err = _err._0;
            break _L;
          }
          _M0MPC15array5Array4pushGRPB4JsonE(results, _tmp$2);
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
  const _bind = "inspect:";
  if (_M0MPC16string6String11has__prefix(input, new _M0TPC16string10StringView(_bind, 0, _bind.length))) {
    return _M0FP411localreview4amqp3cmd3web13inspect__wire(_M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(input, 8, undefined)), false);
  }
  const _bind$2 = "strict:";
  if (_M0MPC16string6String11has__prefix(input, new _M0TPC16string10StringView(_bind$2, 0, _bind$2.length))) {
    return _M0FP411localreview4amqp3cmd3web13inspect__wire(_M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(input, 7, undefined)), true);
  }
  let _try_err;
  _L: {
    const _bind$3 = "assemble:";
    const assemble = _M0MPC16string6String11has__prefix(input, new _M0TPC16string10StringView(_bind$3, 0, _bind$3.length));
    const _bind$4 = _M0FP411localreview4amqp3cmd3web13unhex_2einner(assemble ? _M0MPC16string10StringView9to__owned(_M0MPC16string6String11sub_2einner(input, 9, undefined)) : input, 200000);
    let data;
    if (_bind$4.$tag === 1) {
      const _ok = _bind$4;
      data = _ok._0;
    } else {
      const _err = _bind$4;
      _try_err = _err._0;
      break _L;
    }
    const _bind$5 = _M0MP211localreview4amqp7Decoder11new_2einner(131072);
    let d;
    if (_bind$5.$tag === 1) {
      const _ok = _bind$5;
      d = _ok._0;
    } else {
      const _err = _bind$5;
      _try_err = _err._0;
      break _L;
    }
    const _bind$6 = _M0MP211localreview4amqp7Decoder4feed(d, data);
    let frames;
    if (_bind$6.$tag === 1) {
      const _ok = _bind$6;
      frames = _ok._0;
    } else {
      const _err = _bind$6;
      _try_err = _err._0;
      break _L;
    }
    const _bind$7 = _M0MP211localreview4amqp7Decoder6finish(d);
    if (_bind$7.$tag === 1) {
      const _ok = _bind$7;
      _ok._0;
    } else {
      const _err = _bind$7;
      _try_err = _err._0;
      break _L;
    }
    const lines = [];
    if (assemble) {
      const _bind$8 = _M0MP211localreview4amqp9Assembler11new_2einner(8388608, false);
      let assembler;
      if (_bind$8.$tag === 1) {
        const _ok = _bind$8;
        assembler = _ok._0;
      } else {
        const _err = _bind$8;
        _try_err = _err._0;
        break _L;
      }
      const _bind$9 = frames.length;
      let _tmp = 0;
      while (true) {
        const _ = _tmp;
        if (_ < _bind$9) {
          const frame = frames[_];
          let content;
          _L$2: {
            _L$3: {
              const _bind$10 = _M0MP211localreview4amqp9Assembler4push(assembler, frame);
              let _bind$11;
              if (_bind$10.$tag === 1) {
                const _ok = _bind$10;
                _bind$11 = _ok._0;
              } else {
                const _err = _bind$10;
                _try_err = _err._0;
                break _L;
              }
              if (_bind$11 === undefined) {
              } else {
                const _Some = _bind$11;
                const _content = _Some;
                content = _content;
                break _L$3;
              }
              break _L$2;
            }
            _M0MPC15array5Array4pushGRPB4JsonE(lines, `${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRP211localreview4amqp7ContentE(content))}\nBody hex: ${_M0FP411localreview4amqp3cmd3web3hex(content.body)}`);
          }
          _tmp = _ + 1 | 0;
          continue;
        } else {
          break;
        }
      }
      const _bind$10 = _M0MP211localreview4amqp9Assembler6finish(assembler);
      if (_bind$10.$tag === 1) {
        const _ok = _bind$10;
        _ok._0;
      } else {
        const _err = _bind$10;
        _try_err = _err._0;
        break _L;
      }
      const _bind$11 = "\n\n";
      return _M0MPC15array5Array4joinGsE(lines, new _M0TPC16string10StringView(_bind$11, 0, _bind$11.length));
    }
    const _bind$8 = frames.length;
    let _tmp = 0;
    while (true) {
      const _ = _tmp;
      if (_ < _bind$8) {
        const frame = frames[_];
        const _tmp$2 = _M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRP211localreview4amqp5FrameE(frame));
        const _bind$9 = _M0MP211localreview4amqp5Frame14encode_2einner(frame, 131072);
        let _tmp$3;
        if (_bind$9.$tag === 1) {
          const _ok = _bind$9;
          _tmp$3 = _ok._0;
        } else {
          const _err = _bind$9;
          _try_err = _err._0;
          break _L;
        }
        _M0MPC15array5Array4pushGRPB4JsonE(lines, `${_tmp$2}\nRe-encoded: ${_M0FP411localreview4amqp3cmd3web3hex(_tmp$3)}`);
        _tmp = _ + 1 | 0;
        continue;
      } else {
        break;
      }
    }
    const _bind$9 = "\n\n";
    return _M0MPC15array5Array4joinGsE(lines, new _M0TPC16string10StringView(_bind$9, 0, _bind$9.length));
  }
  const e = _try_err;
  return `ERROR: ${_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRPC15error5ErrorE(e))}`;
}
function _M0FP411localreview4amqp3cmd3web7schemas() {
  const records = [];
  const _bind = _M0FP211localreview4amqp13method__names();
  const _bind$2 = _bind.length;
  let _tmp = 0;
  while (true) {
    const _ = _tmp;
    if (_ < _bind$2) {
      const name = _bind[_];
      const spec = _M0MPC16option6Option6unwrapGRP211localreview4amqp10MethodSpecE(_M0FP211localreview4amqp22method__spec__by__name(name));
      const fields = _M0MPC15array5Array3mapGUsRP211localreview4amqp12ArgumentKindERPB4JsonE(spec.fields, (pair) => {
        const _bind$3 = [{ _0: "name", _1: _M0IPC16string6StringPB6ToJson8to__json(pair._0) }, { _0: "kind", _1: _M0IPC16string6StringPB6ToJson8to__json(_M0IP016_24default__implPB4Show10to__stringGRPC15debug4ReprE(_M0MPC15debug4Repr4ReprGRP211localreview4amqp12ArgumentKindE(pair._1))) }];
        return _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$3, 0, 2), undefined));
      });
      const _bind$3 = [{ _0: "name", _1: _M0IPC16string6StringPB6ToJson8to__json(name) }, { _0: "classId", _1: _M0IPC13int3IntPB6ToJson8to__json(spec.class_id) }, { _0: "methodId", _1: _M0IPC13int3IntPB6ToJson8to__json(spec.method_id) }, { _0: "fields", _1: _M0IPC15array5ArrayPB6ToJson8to__jsonGRPB4JsonE(fields) }, { _0: "carriesContent", _1: _M0IPC14bool4BoolPB6ToJson8to__json(spec.carries_content) }];
      _M0MPC15array5Array4pushGRPB4JsonE(records, _M0MPC14json4Json6object(_M0MPB3Map3MapGsRPB4JsonE(new _M0TPB9ArrayViewGUsRPB4JsonEE(_bind$3, 0, 5), undefined)));
      _tmp = _ + 1 | 0;
      continue;
    } else {
      break;
    }
  }
  return _M0MPC14json4Json17stringify_2einner(_M0IPC15array5ArrayPB6ToJson8to__jsonGRPB4JsonE(records), false, 0, undefined);
}
(() => {
})();
export { _M0FP411localreview4amqp3cmd3web13inspect__wire as inspect_wire, _M0FP411localreview4amqp3cmd3web3run as run, _M0FP411localreview4amqp3cmd3web7schemas as schemas }
//# sourceMappingURL=web.js.map
