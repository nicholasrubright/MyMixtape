import { checkStatus } from "@/utils/fetch";
import {
  AccessTokenResponse,
  AuthorizationUrlResponse,
  ErrorResponse,
} from "../types/api/response";

const baseUrl = "http://127.0.0.1:8080";

const getAuthorizationUrl = (): Promise<AuthorizationUrlResponse> => {
  const response = fetch(`${baseUrl}/api/auth`, {
    cache: "no-store",
  }).then(checkStatus);

  if ("error" in response) {
    throw new Error("There was an error in response");
  }

  return response as Promise<AuthorizationUrlResponse>;
};

const getAccessToken = (code: string): Promise<AccessTokenResponse> => {
  return fetch(`${baseUrl}/api/auth`, {
    method: "POST",
    body: JSON.stringify(code),
  }).then(checkStatus);
};

//export { getAuthorizationUrl, getAccessToken };

export const api = {
  getAuthorizationUrl,
  getAccessToken,
};
