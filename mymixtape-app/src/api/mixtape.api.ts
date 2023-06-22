import { checkStatus } from "@/utils/fetch";
import {
  AccessTokenResponse,
  AuthorizationUrlResponse,
  CombinePlaylistResponse,
  UserPlaylistsResponse,
  UserProfileResponse,
} from "../types/api/response";
import { CombinePlaylistRequest } from "@/types/api/request";

const baseUrl = process.env.NEXT_PUBLIC_API_HOST;

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

const getUserProfile = async (token: string): Promise<UserProfileResponse> => {
  const response = await checkStatus<UserProfileResponse>(
    fetch(`${baseUrl}/api/user`, {
      method: "GET",
      headers: {
        "X-MyMixtape-Token": token,
      },
    })
  );

  return response;
};

const getUserPlaylists = async (
  token: string,
  offset: number,
  limit: number
): Promise<UserPlaylistsResponse> => {
  const params: Record<string, string> = {
    offset: offset.toString(),
    limit: limit.toString(),
  };

  const urlParams = new URLSearchParams(params);

  const response = await checkStatus<UserPlaylistsResponse>(
    fetch(`${baseUrl}/api/playlists?${urlParams}`, {
      method: "GET",
      headers: {
        "X-MyMixtape-Token": token,
      },
    })
  );

  return response;
};

const combinePlaylist = async (
  request: CombinePlaylistRequest,
  token: string
): Promise<CombinePlaylistResponse> => {
  const response = await checkStatus<CombinePlaylistResponse>(
    fetch(`${baseUrl}/api/playlists`, {
      method: "POST",
      headers: {
        "X-MyMixtape-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    })
  );

  return response;
};

export const api = {
  getAuthorizationUrl,
  getAccessToken,
  getUserProfile,
  getUserPlaylists,
  combinePlaylist,
};
