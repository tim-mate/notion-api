import { CustomError } from "shared/types";

// enum HttpStatus {
//   BadRequest = 400,
//   Unauthorized = 401,
//   Forbidden = 403,
//   NotFound = 404,
//   Conflict = 409,
// }

interface MessageList {
  [status: number]: string;
}

const messageList: MessageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

export const HttpError = (status: number, message = messageList[status]) => {
  const error: CustomError = new Error(message);
  error.status = status;
  return error;
};
