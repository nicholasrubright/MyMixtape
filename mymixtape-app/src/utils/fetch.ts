import { ErrorResponse } from "../types/api/response";
import { ApiError } from "./errors";

export async function parseResponse<T>(
  response: Promise<Response>
): Promise<T> {
  return await response.then(async (responseObj: Response) => {
    if (responseObj.ok) {
      return {
        headers: responseObj.headers,
        data: await responseObj.json(),
      } as T;
    }

    const { url } = responseObj;

    return responseObj.json().then((res: ErrorResponse) => {
      return Promise.reject(
        new ApiError(res.data.status, url, res.data.message)
      );
    });
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
