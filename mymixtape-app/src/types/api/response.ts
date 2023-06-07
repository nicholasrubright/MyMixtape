export type AuthorizationUrlResponse = {
  url: string;
  valid_token: boolean;
};

export type AccessTokenResponse = {
  token: string;
  expires_in: number;
};

// Error Response
export type ErrorResponse = {
  status: number;
  message: string;
};
