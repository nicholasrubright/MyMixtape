import { ErrorResponse } from "../types/api/response";
import { ApiError } from "./errors";

export async function checkStatus<T>(response: Promise<Response>): Promise<T> {
  return await response
    .then(async (responseObj: Response) => {
      if (responseObj.ok) {
        return responseObj.json();
      }
      const { url } = responseObj;

      console.log("responseObj: ", responseObj);

      return responseObj.json().then((res: ErrorResponse) => {
        return Promise.reject(new ApiError(res.status, url, res.message));
      });
    })
    .catch((error) => {
      switch (error.constructor) {
        case ApiError:
          return Promise.reject(error);
        default:
          return Promise.reject(error);
      }
    });
}
