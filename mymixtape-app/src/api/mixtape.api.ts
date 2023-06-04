import { checkStatus } from "@/utils/fetch";
import { AuthorizationUrlResponse, ErrorResponse } from "../types/api/response";

const baseUrl = "http://127.0.0.1:8080";

export const getAuthorizationUrl = (): Promise<
  AuthorizationUrlResponse | ErrorResponse
> => {
  return fetch(`${baseUrl}/api/auth`).then(checkStatus);
};
