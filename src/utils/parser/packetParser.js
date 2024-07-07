import { config } from 'dotenv';
import { getProtoTypeNameByHandlerId } from '../../handlers/index.js';
import { getProtoMessages } from '../../init/loadProtos.js';

export const parsePacket = (data) => {
  const protoMessages = getProtoMessages();

  // 공통 패킷 구조를 디코딩
  const Packet = protoMessages.common.Packet;
  let packet;
  try {
    packet = Packet.decode(data);
  } catch (error) {
    console.error(error);
  }

  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const clientVersion = packet.clientVersion;
  const sequence = packet.sequence;

  if (clientVersion !== config.client.version) {
    console.error('클라이언트 버전이 일치하지 않습니다.');
  }

const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
if(!protoTypeName){
    console.error(`알 수 없는 핸들러 ID:${handlerId}`);
}

const [namespace, typeName] = protoTypeName.split('.');
const PayloadType = protoMessages[namespace][typeName];
let payload;

try{
    payload = PayloadType.decode(packet.payload);
}catch(e){
    console.error(e);
}
const errorMessage = PayloadType.verify(payload);

if(errorMessage){
    console.error(`패킷 구조가 일치하지 않습니다 ${errorMessage}`);
}

//필드가 비어있는 경우
const expectedFields = Object.keys(PayloadType.fields);
const actualFields = Object.keys(payload);
const missingFields = expectedFields.filter((field)=>!actualFields.includes(field));

if(missingFields.length > 0){
    console.error(`필수 필드가 누락되었습니다. ${missingFields.join(', ')}`)
}
//sequence 는 호출 수
  return { handlerId, userId, payload, sequence };
};