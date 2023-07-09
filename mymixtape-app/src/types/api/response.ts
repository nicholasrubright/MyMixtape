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
  data: {};
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

export interface GetSessionTokenResponse extends ApiResponse {
  data: {
    token: string;
  };
}

export interface SetSessionTokenResponse extends ApiResponse {
  data: {
    token: string;
  };
}

// Error Response
export interface ErrorResponse extends ApiResponse {
  status: number;
  message: string;
}
