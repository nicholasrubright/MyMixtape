export type AuthorizationUrlResponse = {
  url: string;
  valid_token: boolean;
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

// Error Response
export type ErrorResponse = {
  status: number;
  message: string;
};
