import {
  CombinePlaylistRequest,
  GetAccessTokenRequest,
  GetUserPlaylistsRequest,
} from "@/types/api/request";

import {
  AccessTokenResponse,
  ApiResponse,
  AuthorizationUrlResponse,
  CombinePlaylistResponse,
  GetSessionResponse,
  GetSessionTokenResponse,
  SetSessionTokenResponse,
  UserPlaylistsResponse,
  UserProfileResponse,
} from "@/types/api/response";
import { parseResponse, getApiUrl } from "@/utils/fetch";
import mockApi from "./mock.api";
import {
  getSessionCookieFromResponse,
  getSessionName,
  hasSetCookie,
} from "@/utils/session";

const DEBUG = process.env.NEXT_PUBLIC_DEBUG === "DEV" || false;

export const getAuthorizationUrl =
  async (): Promise<AuthorizationUrlResponse> => {
    if (DEBUG) return mockApi.mockGetAuthorizationUrl;

    return await parseResponse<AuthorizationUrlResponse>(
      fetch(`${getApiUrl()}/api/auth`, {
        method: "GET",
        cache: "no-cache",
      })
    ).catch((err) => {
      return mockApi.mockGetAuthorizationUrl;
    });
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
  ).catch((err) => {
    console.log(err);
    return err;
  });
};

export const getUserProfile = async (
  sessionCookie: string
): Promise<UserProfileResponse> => {
  if (DEBUG) return mockApi.mockGetUserProfile;
  sessionCookie = getSessionName(sessionCookie);
  return await parseResponse<UserProfileResponse>(
    fetch(`${getApiUrl()}/api/user`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Cookie: `${sessionCookie}`,
      },
    })
  ).catch((err) => {
    throw err;
  });
};

export const getUserPlaylists = async (
  sessionCookie: string,
  request?: GetUserPlaylistsRequest
): Promise<UserPlaylistsResponse> => {
  if (DEBUG) return mockApi.mockGetUserPlaylists;
  sessionCookie = getSessionName(sessionCookie);

  const params: Record<string, string> = {
    offset: request ? request.offset.toString() : "0",
    limit: request ? request.limit.toString() : "20",
  };

  const urlParams = new URLSearchParams(params);

  return await parseResponse<UserPlaylistsResponse>(
    fetch(`${getApiUrl()}/api/playlists?${urlParams}`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Cookie: `${sessionCookie}`,
      },
    })
  ).catch((err) => {
    throw err;
  });
};

export const combinePlaylists = async (
  request: CombinePlaylistRequest,
  sessionCookie: string
) => {
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
        Cookie: `${sessionCookie}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      }),
      body: formBody.toString(),
    })
  ).catch((err) => {
    throw err;
  });
};

// Router Handlers
export const postMixtape = async (code: string): Promise<string> => {
  const response = await parseResponse<ApiResponse>(
    fetch(`${process.env.CLIENT_URL}/api/mixtape`, {
      method: "POST",
      body: JSON.stringify({ code }),
      cache: "no-cache",
    })
  );

  if (hasSetCookie(response)) {
    return getSessionCookieFromResponse(response);
  }

  throw new Error("Set-Cookie not defined in response");
};
