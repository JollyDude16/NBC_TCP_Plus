import { HANDLER_IDS } from "../constants/handlerIds.js";
import initialHandler from "./users/initial.handler.js";


const handlers = {
    [HANDLER_IDS.INITIAL]:{
        handler : initialHandler,
        //왼쪽이 패키지 이름, 오른쪽이 타입 이름(패키지 + 타입)
        protoType: 'initial.InitialPacket'
    }

};

export const getHandlerById = (handlerId) => {
  if (!handlers[handlerId]) {
    console.error(`핸들러를 찾을 수 없습니다. ID: ${handlerId}`);
  }
  return handlers[handlerId].handler;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
    if (!handlers[handlerId]) {
      console.error(`프로토 타입을 찾을 수 없습니다.  ${handlerId}`);
    }
    return handlers[handlerId].protoType;

};
