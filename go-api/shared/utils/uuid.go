package utils

// import (
// 	"bytes"
// 	"encoding/hex"
// 	"fmt"

// 	"github.com/jackc/pgx"
// )

// // UUID is a 16-byte array that is a pgx.PgxScanner and pgx.Encoder.
// type UUID [16]byte

// const uuidArrayOid = 2951

// func init() {
// 	pgx.DefaultTypeFormats["uuid"] = pgx.BinaryFormatCode
// 	pgx.DefaultTypeFormats["_uuid"] = pgx.BinaryFormatCode
// }

// // ScanPgx implements pgx.PgxScanner.
// func (u *UUID) ScanPgx(vr *pgx.ValueReader) error {
// 	if vr.Type().DataType != pgx.UuidOid {
// 		return pgx.SerializationError(fmt.Sprintf("UUID.Scan cannot decode OID %d", vr.Type().DataType))
// 	}

// 	if vr.Type().FormatCode != pgx.BinaryFormatCode {
// 		return pgx.ProtocolError(fmt.Sprintf("Unknown field description format code: %v", vr.Type().FormatCode))
// 	}

// 	if vr.Len() == -1 {
// 		return pgx.ProtocolError("Cannot decode null into *UUID; decode into **UUID instead")
// 	}

// 	if vr.Len() != 16 {
// 		return pgx.SerializationError(fmt.Sprintf("Received an invalid size for a UUID: %d", vr.Len()))
// 	}

// 	copy(u[:], vr.ReadBytes(vr.Len()))
// 	return vr.Err()
// }

// // Encode implements pgx.Encoder.
// func (u UUID) Encode(w *pgx.WriteBuf, oid pgx.Oid) error {
// 	if oid != pgx.UuidOid {
// 		return pgx.SerializationError(fmt.Sprintf("UUID.Encode cannot encode into OID %d", oid))
// 	}

// 	w.WriteInt32(16)
// 	w.WriteBytes(u[:])
// 	return nil
// }

// // FormatCode implements pgx.Encoder.
// func (u UUID) FormatCode() int16 {
// 	return pgx.BinaryFormatCode
// }

// func (u UUID) String() string {
// 	return hex.EncodeToString(u[:])
// }

// // Less returns whether this UUID is less than the given other UUID.
// func (u UUID) Less(other UUID) bool {
// 	return bytes.Compare(u[:], other[:]) == -1
// }

// // UUIDArray is a slice of UUID that is a PgxScanner and Encoder.
// type UUIDArray []UUID

// // ScanPgx implements pgx.PgxScanner.
// func (ua *UUIDArray) ScanPgx(vr *pgx.ValueReader) error {
// 	if vr.Type().DataType != uuidArrayOid {
// 		return pgx.SerializationError(fmt.Sprintf("UUID.Scan cannot decode OID %d", vr.Type().DataType))
// 	}

// 	if vr.Type().FormatCode != pgx.BinaryFormatCode {
// 		return pgx.ProtocolError(fmt.Sprintf("Unknown field description format code: %v", vr.Type().FormatCode))
// 	}

// 	if vr.Len() == -1 {
// 		*ua = nil
// 	}

// 	numEl, err := decode1dArrayHeader(vr)
// 	if err != nil {
// 		return err
// 	}

// 	a := make([]UUID, numEl)
// 	for i := 0; i < len(a); i++ {
// 		elSize := vr.ReadInt32()
// 		switch elSize {
// 		case 16:
// 			copy(a[i][:], vr.ReadBytes(16))
// 		case -1:
// 			return pgx.ProtocolError("Cannot decode null UUID element into *UUIDArray")
// 		default:
// 			return pgx.ProtocolError(fmt.Sprintf("Received an invalid size for a UUID element: %d", elSize))
// 		}
// 	}

// 	*ua = UUIDArray(a)
// 	return vr.Err()
// }

// // Encode implements pgx.Encoder.
// func (ua UUIDArray) Encode(w *pgx.WriteBuf, oid pgx.Oid) error {
// 	if oid != uuidArrayOid {
// 		return pgx.SerializationError(fmt.Sprintf("UUID.Encode cannot encode into OID %d", oid))
// 	}

// 	if ua == nil {
// 		w.WriteInt32(-1)
// 		return nil
// 	}

// 	encodeArrayHeader(w, pgx.UuidOid, len(ua), 4+16)

// 	for _, u := range ua {
// 		w.WriteInt32(16)
// 		w.WriteBytes(u[:])
// 	}

// 	return nil
// }

// func decode1dArrayHeader(vr *pgx.ValueReader) (length int32, err error) {
// 	numDims := vr.ReadInt32()
// 	if numDims > 1 {
// 		return 0, pgx.ProtocolError(fmt.Sprintf("Expected array to have 0 or 1 dimension, but it had %v", numDims))
// 	}

// 	vr.ReadInt32() // 0 if no nulls / 1 if there is one or more nulls -- but we don't care
// 	vr.ReadInt32() // element oid

// 	if numDims == 0 {
// 		return 0, nil
// 	}

// 	length = vr.ReadInt32()

// 	idxFirstElem := vr.ReadInt32()
// 	if idxFirstElem != 1 {
// 		return 0, pgx.ProtocolError(fmt.Sprintf("Expected array's first element to start a index 1, but it is %d", idxFirstElem))
// 	}

// 	return length, nil
// }

// func encodeArrayHeader(w *pgx.WriteBuf, oid, length, sizePerItem int) {
// 	w.WriteInt32(int32(20 + length*sizePerItem))
// 	w.WriteInt32(1)             // number of dimensions
// 	w.WriteInt32(0)             // no nulls
// 	w.WriteInt32(int32(oid))    // type of elements
// 	w.WriteInt32(int32(length)) // number of elements
// 	w.WriteInt32(1)             // index of first element
// }

// // FormatCode implements pgx.Encoder.
// func (ua UUIDArray) FormatCode() int16 {
// 	return pgx.BinaryFormatCode
// }

// func (ua UUIDArray) String() string {
// 	return fmt.Sprint([]UUID(ua))
// }
