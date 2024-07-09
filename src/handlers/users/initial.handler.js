import { HANDLER_IDS, RESPONSE_SUCCESS_CODE } from '../../constants/handlerIds.js';
import { addUser } from './../../session/user.sessions.js';
import { createResponse } from './../../utils/response/createResponse';

const initialHandler = ({socket, userId, payload}) =>{
    try{
        
    const {deviceId} = payload;

    addUser(socket, deviceId);

    const initialResponse = createResponse(
        HANDLER_IDS.INITIAL,
        RESPONSE_SUCCESS_CODE,
        {userId: deviceId},
        deviceId
    )
    socket.write(initialResponse);
    }
    catch(e){
        handlerError(socket, e);
    }
};

export default initialHandler;