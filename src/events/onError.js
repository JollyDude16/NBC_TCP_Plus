import CustomError from "../error/customError.js";
import { handlerError } from "../error/errorHandler.js";
import { removeUser } from "../session/user.sessions.js";

export const onError = (socket) => (err) => {
  console.error('소켓 오류:', err);
  handlerError(socket, new CustomError(500, `소켓 오류 ${err.message}`));

  //세션에서 유저 삭제
  removeUser(socket);
};