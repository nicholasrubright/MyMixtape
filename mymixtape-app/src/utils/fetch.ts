import { ErrorResponse } from "../types/api/response";

export const checkStatus = (response: Response): Promise<any> => {
  if (response.ok) {
    return response.json();
  }

  return response.json() as Promise<ErrorResponse>;
};
