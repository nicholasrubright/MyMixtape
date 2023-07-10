import { ErrorResponse } from "../types/api/response";
import { ApiError } from "./errors";

export async function parseResponse<T>(
  response: Promise<Response>
): Promise<T> {
  return await response
    .then(async (responseObj: Response) => {
      if (responseObj.status === 204) {
        return {
          headers: responseObj.headers,
          data: {},
        } as T;
      }

      if (responseObj.ok) {
        return {
          headers: responseObj.headers,
          data: await responseObj.json(),
        } as T;
      }

      const { url } = responseObj;

      return responseObj.json().then((res: ErrorResponse) => {
        return Promise.reject(new ApiError(res.status, url, res.message));
      });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}

export const getApiUrl = (): string => {
  if (!process.env.API_CLIENT_URL || !process.env.API_SERVER_URL) {
    throw new Error("Api urls not defined");
  }

  return IsClientSide()
    ? process.env.API_CLIENT_URL
    : process.env.API_SERVER_URL;
};

export const IsClientSide = () => {
  return typeof window !== "undefined";
};

export const GetSession = (sessionCookie: string | null): string => {
  if (!process.env.API_SESSION_VAR) {
    throw new Error("Session variable not defined");
  }

  if (!sessionCookie) {
    return process.env.API_SESSION_VAR;
  }

  return !sessionCookie.includes(process.env.API_SESSION_VAR)
    ? `${process.env.API_SESSION_VAR}=${sessionCookie}`
    : sessionCookie;
};
