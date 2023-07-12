import { cookies } from "next/headers";

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
