// Code generated by protoc-gen-go. DO NOT EDIT.
// source: client.proto

package main

import (
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type RequestId struct {
	Album                string   `protobuf:"bytes,1,opt,name=album,proto3" json:"album,omitempty"`
	Year                 string   `protobuf:"bytes,2,opt,name=year,proto3" json:"year,omitempty"`
	Artist               string   `protobuf:"bytes,3,opt,name=artist,proto3" json:"artist,omitempty"`
	Ranked               string   `protobuf:"bytes,4,opt,name=ranked,proto3" json:"ranked,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *RequestId) Reset()         { *m = RequestId{} }
func (m *RequestId) String() string { return proto.CompactTextString(m) }
func (*RequestId) ProtoMessage()    {}
func (*RequestId) Descriptor() ([]byte, []int) {
	return fileDescriptor_014de31d7ac8c57c, []int{0}
}

func (m *RequestId) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_RequestId.Unmarshal(m, b)
}
func (m *RequestId) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_RequestId.Marshal(b, m, deterministic)
}
func (m *RequestId) XXX_Merge(src proto.Message) {
	xxx_messageInfo_RequestId.Merge(m, src)
}
func (m *RequestId) XXX_Size() int {
	return xxx_messageInfo_RequestId.Size(m)
}
func (m *RequestId) XXX_DiscardUnknown() {
	xxx_messageInfo_RequestId.DiscardUnknown(m)
}

var xxx_messageInfo_RequestId proto.InternalMessageInfo

func (m *RequestId) GetAlbum() string {
	if m != nil {
		return m.Album
	}
	return ""
}

func (m *RequestId) GetYear() string {
	if m != nil {
		return m.Year
	}
	return ""
}

func (m *RequestId) GetArtist() string {
	if m != nil {
		return m.Artist
	}
	return ""
}

func (m *RequestId) GetRanked() string {
	if m != nil {
		return m.Ranked
	}
	return ""
}

type ReplyInfo struct {
	Info                 string   `protobuf:"bytes,1,opt,name=info,proto3" json:"info,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *ReplyInfo) Reset()         { *m = ReplyInfo{} }
func (m *ReplyInfo) String() string { return proto.CompactTextString(m) }
func (*ReplyInfo) ProtoMessage()    {}
func (*ReplyInfo) Descriptor() ([]byte, []int) {
	return fileDescriptor_014de31d7ac8c57c, []int{1}
}

func (m *ReplyInfo) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ReplyInfo.Unmarshal(m, b)
}
func (m *ReplyInfo) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ReplyInfo.Marshal(b, m, deterministic)
}
func (m *ReplyInfo) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ReplyInfo.Merge(m, src)
}
func (m *ReplyInfo) XXX_Size() int {
	return xxx_messageInfo_ReplyInfo.Size(m)
}
func (m *ReplyInfo) XXX_DiscardUnknown() {
	xxx_messageInfo_ReplyInfo.DiscardUnknown(m)
}

var xxx_messageInfo_ReplyInfo proto.InternalMessageInfo

func (m *ReplyInfo) GetInfo() string {
	if m != nil {
		return m.Info
	}
	return ""
}

func init() {
	proto.RegisterType((*RequestId)(nil), "main.requestId")
	proto.RegisterType((*ReplyInfo)(nil), "main.replyInfo")
}

func init() {
	proto.RegisterFile("client.proto", fileDescriptor_014de31d7ac8c57c)
}

var fileDescriptor_014de31d7ac8c57c = []byte{
	// 177 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x3c, 0x8f, 0x41, 0xcb, 0x82, 0x40,
	0x10, 0x86, 0x3f, 0xbf, 0xcc, 0x70, 0x08, 0x82, 0x25, 0x62, 0xe9, 0x52, 0x78, 0xea, 0x24, 0x51,
	0xc7, 0x7e, 0x81, 0xd7, 0xfe, 0xc1, 0x9a, 0x63, 0x2c, 0xe9, 0xae, 0x8d, 0xe3, 0xc1, 0x7f, 0x1f,
	0x3b, 0x8a, 0xb7, 0x79, 0x9e, 0x85, 0xf7, 0x7d, 0x17, 0xb6, 0xaf, 0xc6, 0xa2, 0xe3, 0xbc, 0x23,
	0xcf, 0x5e, 0xc5, 0xad, 0xb1, 0x2e, 0x43, 0x48, 0x09, 0xbf, 0x03, 0xf6, 0x5c, 0x54, 0x6a, 0x0f,
	0x6b, 0xd3, 0x94, 0x43, 0xab, 0xa3, 0x73, 0x74, 0x49, 0x9f, 0x13, 0x28, 0x05, 0xf1, 0x88, 0x86,
	0xf4, 0xbf, 0x48, 0xb9, 0xd5, 0x01, 0x12, 0x43, 0x6c, 0x7b, 0xd6, 0x2b, 0xb1, 0x33, 0x05, 0x4f,
	0xc6, 0x7d, 0xb0, 0xd2, 0xf1, 0xe4, 0x27, 0xca, 0x4e, 0xa1, 0xa6, 0x6b, 0xc6, 0xc2, 0xd5, 0x3e,
	0x04, 0x5a, 0x57, 0xfb, 0xb9, 0x45, 0xee, 0xdb, 0x03, 0x36, 0x6f, 0x64, 0x79, 0xbe, 0x02, 0x10,
	0xf2, 0x40, 0x4e, 0x68, 0x97, 0x87, 0x9d, 0xf9, 0x32, 0xf2, 0xb8, 0x88, 0x39, 0x2e, 0xfb, 0x2b,
	0x13, 0xf9, 0xd1, 0xfd, 0x17, 0x00, 0x00, 0xff, 0xff, 0x77, 0x92, 0xfe, 0x4b, 0xe1, 0x00, 0x00,
	0x00,
}