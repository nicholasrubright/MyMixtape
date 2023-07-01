import { checkStatus } from "@/utils/fetch";
import {
  AccessTokenResponse,
  AuthorizationUrlResponse,
  CombinePlaylistResponse,
  UserPlaylistsResponse,
  UserProfileResponse,
} from "../types/api/response";
import { CombinePlaylistRequest } from "@/types/api/request";
import mockApi from "./mock.api";

const DEBUG = process.env.NEXT_PUBLIC_DEBUG === "DEV" || false;

const serverBaseUrl = process.env.NEXT_PUBLIC_SERVER_API_HOST;
const clientBaseUrl = process.env.NEXT_PUBLIC_CLIENT_API_HOST;

const getAuthorizationUrl = async (): Promise<AuthorizationUrlResponse> => {
  if (DEBUG) return mockApi.mockGetAuthorizationUrl;

  const response = await checkStatus<AuthorizationUrlResponse>(
    fetch(`${serverBaseUrl}/api/auth`, {
      cache: "no-store",
    })
  );

  return response;
};

const getAccessToken = async (code: string): Promise<AccessTokenResponse> => {
  if (DEBUG) return mockApi.mockGetAccessToken;

  const response = await checkStatus<AccessTokenResponse>(
    fetch(`${serverBaseUrl}/api/auth`, {
      method: "POST",
      body: JSON.stringify({ code }),
    })
  );

  return response;
};

const getUserProfile = async (token: string): Promise<UserProfileResponse> => {
  if (DEBUG) return mockApi.mockGetUserProfile;

  const response = await checkStatus<UserProfileResponse>(
    fetch(`${clientBaseUrl}/api/user`, {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
    })
  );

  return response;
};

const getUserPlaylists = async (
  token: string,
  offset: number,
  limit: number
): Promise<UserPlaylistsResponse> => {
  if (DEBUG) return mockApi.mockGetUserPlaylists;

  const params: Record<string, string> = {
    offset: offset.toString(),
    limit: limit.toString(),
  };

  const urlParams = new URLSearchParams(params);

  const response = await checkStatus<UserPlaylistsResponse>(
    fetch(`${clientBaseUrl}/api/playlists?${urlParams}`, {
      method: "GET",
      headers: new Headers({
        Authorization: token,
      }),
    })
  );

  return response;
};

const combinePlaylist = async (
  request: CombinePlaylistRequest,
  token: string
): Promise<CombinePlaylistResponse> => {
  if (DEBUG) return mockApi.mockCombinePlaylists;
  const formBody = new URLSearchParams({
    userId: request.user_id,
    name: request.name,
    description: request.description,
  });

  request.playlist_ids.forEach((playlistId) => {
    formBody.append("playlistIds", playlistId);
  });

  const response = await checkStatus<CombinePlaylistResponse>(
    fetch(`${clientBaseUrl}/api/playlists`, {
      method: "POST",
      headers: new Headers({
        Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      }),
      body: formBody.toString(),
    })
  );

  return response;
};

const getCount = async () => {
  return await checkStatus<{ count: number }>(
    fetch(`${serverBaseUrl}/api/test`, {
      method: "GET",
    })
  );
};

export const api = {
  getAuthorizationUrl,
  getAccessToken,
  getUserProfile,
  getUserPlaylists,
  combinePlaylist,
  getCount,
};
