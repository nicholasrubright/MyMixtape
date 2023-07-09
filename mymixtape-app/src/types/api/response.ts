export type ApiResponseData = {};

export type ApiResponse = {
  headers?: Headers;
  data: ApiResponseData;
};

export interface AuthorizationUrlResponse extends ApiResponse {
  data: {
    url: string;
  };
}

export interface AccessTokenResponse extends ApiResponse {
  data: {
    token: string;
    expires_in: number;
  };
}

export interface UserProfileResponse extends ApiResponse {
  data: {
    id: string;
    name: string;
    images: {
      url: string;
      height: number;
      width: number;
    }[];
  };
}

export interface UserPlaylistsResponse extends ApiResponse {
  data: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: {
      id: string;
      name: string;
      images: {
        url: string;
        height: number;
        width: number;
      }[];
    }[];
  };
}

export interface CombinePlaylistResponse extends ApiResponse {
  data: {
    id: string;
    name: string;
  };
}

export interface TestProfileResponse extends ApiResponse {
  data: {
    count: number;
  };
}

export interface GetSessionResponse extends ApiResponse {
  data: {
    count: number;
  };
}
// Error Response
export interface ErrorResponse extends ApiResponse {
  data: {
    status: number;
    message: string;
  };
}
