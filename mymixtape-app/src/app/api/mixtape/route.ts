import { setAccessToken } from "@/api/api";
import { getSessionCookieFromResponse, hasSetCookie } from "@/utils/session";
import { NextRequest, NextResponse } from "next/server";

// POST to setAccessToken
export async function POST(request: NextRequest) {
  const requestData = await request.json();

  const apiResponse = await setAccessToken(requestData);

  const response = NextResponse.json(apiResponse.data);

  if (hasSetCookie(apiResponse)) {
    let setCookie = getSessionCookieFromResponse(apiResponse);
    if (!setCookie.includes("Path")) {
      setCookie = setCookie.concat("; Path=/;");
    }

    response.headers.set("Set-Cookie", setCookie);
  }

  return response;
}
