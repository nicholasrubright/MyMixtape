import { AccessTokenResponse } from "@/types/api/response";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestData = await request.json();

  const sessionCookie = cookies().get("mysession")?.value;

  const apiResponse = await fetch("http://mymixtape-api:8080/api/auth", {
    method: "POST",
    cache: "no-cache",
    body: JSON.stringify(requestData),
    headers: {
      Cookie: `mysession=${sessionCookie}`,
    },
  });

  const tokenResponse: AccessTokenResponse = await apiResponse.json();

  const response = NextResponse.json(tokenResponse);

  if (sessionCookie) {
    response.headers.set("Set-Cookie", sessionCookie);
  }

  return response;
}
