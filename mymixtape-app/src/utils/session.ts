import { ApiResponse } from "@/types/api/response";
import { cookies } from "next/headers";

export const hasSetCookie = (response: ApiResponse): boolean => {
  if (response.headers) {
    return (
      response.headers
        .getSetCookie()
        .find((c) => c.includes(getSessionName(null))) !== undefined
    );
  }

  return false;
};

export const getSessionCookieFromResponse = (response: ApiResponse) => {
  if (hasSetCookie(response)) {
    return (response.headers as Headers)
      .getSetCookie()
      .find((c) => c.includes(getSessionName(null))) as string;
  }

  throw new Error("Set-Cookie not in response");
};

export const getSessionName = (sessionCookie: string | null): string => {
  if (!process.env.API_SESSION_VAR) {
    throw new Error("Session variable not defined");
  }

  if (!sessionCookie) {
    return process.env.API_SESSION_VAR;
  }

  return !sessionCookie.includes(process.env.API_SESSION_VAR)
    ? `${process.env.API_SESSION_VAR}=${sessionCookie}`
    : sessionCookie;
};

export const hasSessionCookie = (): boolean => {
  return cookies().has(getSessionName(null));
};

export const getSessionCookie = (): string => {
  if (hasSessionCookie()) {
    return cookies().get(getSessionName(null))?.value as string;
  } else {
    throw Error("Session cookie does not exist");
  }
};
