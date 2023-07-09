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
  GetSessionTokenResponse,
  SetSessionTokenResponse,
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
    ).catch((err) => {
      return mockApi.mockGetAuthorizationUrl;
    });
  };

export const setAccessToken = async (
  request: GetAccessTokenRequest,
  sessionCookie: string
): Promise<AccessTokenResponse> => {
  if (DEBUG) return mockApi.mockGetAccessToken;
  return await parseResponse<AccessTokenResponse>(
    fetch(`${getApiUrl()}/api/auth`, {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(request),
      headers: {
        Cookie: `mysession=${sessionCookie}`,
      },
    })
  ).catch((err) => {
    console.log(err);
    return err;
  });
};

export const getUserProfile = async (
  request: GetUserProfile,
  sessionCookie: string
): Promise<UserProfileResponse> => {
  if (DEBUG) return mockApi.mockGetUserProfile;
  return await parseResponse<UserProfileResponse>(
    fetch(`${getApiUrl()}/api/user`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Cookie: `${sessionCookie}`,
      },
    })
  ).catch((err) => {
    return mockApi.mockGetUserProfile;
  });
};

export const getUserPlaylists = async (
  request: GetUserPlaylistsRequest,
  sessionCookie: string
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
      headers: {
        Cookie: `${sessionCookie}`,
      },
    })
  ).catch((err) => {
    return mockApi.mockGetUserPlaylists;
  });
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
  ).catch((err) => {
    return mockApi.mockCombinePlaylists;
  });
};

export const getSession = async (
  sessionCookie: string
): Promise<GetSessionResponse> => {
  if (DEBUG) return mockApi.mockGetSession;

  return await parseResponse<GetSessionResponse>(
    fetch(`${getApiUrl()}/api/session`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Cookie: `mysession=${sessionCookie}`,
      },
    })
  ).catch((err) => {
    return mockApi.mockGetSession;
  });
};

export const setSessionToken = async (
  code: string
): Promise<SetSessionTokenResponse> => {
  return await parseResponse<SetSessionTokenResponse>(
    fetch(`${getApiUrl()}/api/session/set`, {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify({ code }),
    })
  );
};

export const getSessionToken = async (
  sessionCookie: string
): Promise<GetSessionTokenResponse> => {
  return await parseResponse<GetSessionTokenResponse>(
    fetch(`${getApiUrl()}/api/session/get`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Cookie: `mysession=${sessionCookie}`,
      },
    })
  );
};
