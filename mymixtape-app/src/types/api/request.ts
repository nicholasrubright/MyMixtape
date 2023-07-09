type ApiRequest = {
  token?: string;
};

export interface GetUserProfile extends ApiRequest {}

export interface CombinePlaylistRequest extends ApiRequest {
  user_id: string;
  name: string;
  description: string;
  playlist_ids: string[];
}

export interface GetAccessTokenRequest extends ApiRequest {
  code: string;
}

export interface GetUserPlaylistsRequest extends ApiRequest {
  offset: number;
  limit: number;
}
