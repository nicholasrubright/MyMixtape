import {
  CombinePlaylistRequest,
  GetAccessTokenRequest,
  GetUserPlaylistsRequest,
  GetUserProfile,
} from "@/types/api/request";
import {
  AccessTokenResponse,
  AuthorizationUrlResponse,
  CombinePlaylistResponse,
  GetSessionResponse,
  UserPlaylistsResponse,
  UserProfileResponse,
} from "@/types/api/response";
import { parseResponse, getApiUrl } from "@/utils/fetch";
import mockApi from "./mock.api";

const DEBUG = process.env.NEXT_PUBLIC_DEBUG === "DEV" || false;

export const getAuthorizationUrl =
  async (): Promise<AuthorizationUrlResponse> => {
    if (DEBUG) return mockApi.mockGetAuthorizationUrl;

    return await parseResponse<AuthorizationUrlResponse>(
      fetch(`${getApiUrl()}/api/auth`, {
        method: "GET",
        cache: "no-cache",
      })
    );
  };

export const setAccessToken = async (
  request: GetAccessTokenRequest
): Promise<AccessTokenResponse> => {
  if (DEBUG) return mockApi.mockGetAccessToken;
  return await parseResponse<AccessTokenResponse>(
    fetch(`${getApiUrl()}/api/auth`, {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(request),
    })
  );
};

export const getUserProfile = async (
  request: GetUserProfile
): Promise<UserProfileResponse> => {
  if (DEBUG) return mockApi.mockGetUserProfile;
  return await parseResponse<UserProfileResponse>(
    fetch(`${getApiUrl()}/api/user`, {
      method: "GET",
      cache: "no-cache",
      headers: new Headers({
        Authorization: request.token as string,
      }),
    })
  );
};

export const getUserPlaylists = async (
  request: GetUserPlaylistsRequest
): Promise<UserPlaylistsResponse> => {
  if (DEBUG) return mockApi.mockGetUserPlaylists;

  const params: Record<string, string> = {
    offset: request.offset.toString(),
    limit: request.limit.toString(),
  };

  const urlParams = new URLSearchParams(params);

  return await parseResponse<UserPlaylistsResponse>(
    fetch(`${getApiUrl()}/api/playlists?${urlParams}`, {
      method: "GET",
      cache: "no-cache",
      headers: new Headers({
        Authorization: request.token as string,
      }),
    })
  );
};

export const combinePlaylists = async (request: CombinePlaylistRequest) => {
  if (DEBUG) return mockApi.mockCombinePlaylists;
  const formBody = new URLSearchParams({
    userId: request.user_id,
    name: request.name,
    description: request.description,
  });

  request.playlist_ids.forEach((playlistId) => {
    formBody.append("playlistIds", playlistId);
  });

  return await parseResponse<CombinePlaylistResponse>(
    fetch(`${getApiUrl()}/api/playlists`, {
      method: "POST",
      cache: "no-cache",
      headers: new Headers({
        Authorization: request.token as string,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      }),
      body: formBody.toString(),
    })
  );
};

export const getSession = async (): Promise<GetSessionResponse> => {
  if (DEBUG) return mockApi.mockGetSession;

  return await parseResponse<GetSessionResponse>(
    fetch(`${getApiUrl()}/api/session`, {
      method: "GET",
      cache: "no-cache",
    })
  );
};