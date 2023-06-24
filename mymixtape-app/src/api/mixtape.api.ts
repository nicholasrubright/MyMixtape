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
  const params: Record<string, string> = {
    offset: offset.toString(),
    limit: limit.toString(),
  };

  const urlParams = new URLSearchParams(params);

  const response = await checkStatus<UserPlaylistsResponse>(
    fetch(`${baseUrl}/api/playlists?${urlParams}`, {
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
  const formBody = new URLSearchParams({
    userId: request.user_id,
    name: request.name,
    description: request.description,
  });

  request.playlist_ids.forEach((playlistId) => {
    formBody.append("playlistIds", playlistId);
  });

  const response = await checkStatus<CombinePlaylistResponse>(
    fetch(`${baseUrl}/api/playlists`, {
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

export const api = {
  getAuthorizationUrl,
  getAccessToken,
  getUserProfile,
  getUserPlaylists,
  combinePlaylist,
};
