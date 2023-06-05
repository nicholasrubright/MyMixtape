export type AuthorizationUrlResponse = {
  url: string;
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
