import { checkStatus } from "@/utils/fetch";
import {
  AccessTokenResponse,
  AuthorizationUrlResponse,
  UserProfileResponse,
} from "../types/api/response";

const baseUrl = "http://127.0.0.1:8080";

const getAuthorizationUrl = async (): Promise<AuthorizationUrlResponse> => {
  const response = await checkStatus<AuthorizationUrlResponse>(
    fetch(`${baseUrl}/api/auth`, {
      cache: "no-store",
    })
  );

  return response;
};

const getAccessToken = async (code: string): Promise<AccessTokenResponse> => {
  const response = await checkStatus<AccessTokenResponse>(
    fetch(`${baseUrl}/api/auth`, {
      method: "POST",
      body: JSON.stringify({ code }),
    })
  );

  return response;
};

const getUserProfile = async (): Promise<UserProfileResponse> => {
  const response = await checkStatus<UserProfileResponse>(
    fetch(`${baseUrl}/api/user`)
  );

  return response;
};

export const api = {
  getAuthorizationUrl,
  getAccessToken,
  getUserProfile,
};
