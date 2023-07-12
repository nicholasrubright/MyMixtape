import { setAccessToken } from "@/api/api";
import { getSessionCookieFromResponse, hasSetCookie } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";

// POST to setAccessToken
export async function POST(request: NextRequest) {
  const requestData = await request.json();

  const apiResponse = await setAccessToken(requestData);

  const response = NextResponse.json(apiResponse.data);

  if (hasSetCookie(apiResponse)) {
    response.headers.set(
      "Set-Cookie",
      getSessionCookieFromResponse(apiResponse)
    );
  }

  return response;
}
