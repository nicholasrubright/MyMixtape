import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestData = await request.json();

  const response = NextResponse.json(null);

  if (requestData) {
    response.headers.append(
      "Set-Cookie",
      requestData.newSessionCookie as string
    );
  }

  return response;
}
