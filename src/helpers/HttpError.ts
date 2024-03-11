import { CustomError } from "types";

interface MessageList {
  [key: number]: string;
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
