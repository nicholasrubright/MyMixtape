import { setAccessToken } from "@/api/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestData = await request.json();

  const apiResponse = await setAccessToken(requestData);
  const response = NextResponse.json(apiResponse);

  const apiResponseSessionCookie =
    apiResponse.headers?.getSetCookie()[0] as string;

  response.headers.set("Set-Cookie", apiResponseSessionCookie);

  return response;
}
