export type AuthorizationUrlResponse = {
  url: string;
};

export type AccessTokenResponse = {
  token: string;
  expires_in: number;
};

export type UserProfileResponse = {
  id: string;
  name: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
};

export type UserPlaylistsResponse = {
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

export type CombinePlaylistResponse = {
  id: string;
  name: string;
};

export type TestProfileResponse = {
  count: number;
};

// Error Response
export type ErrorResponse = {
  status: number;
  message: string;
};
