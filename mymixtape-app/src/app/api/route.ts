import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestData = await request.json();

  if (requestData) {
    const response = NextResponse.json(null);

    response.headers.append(
      "Set-Cookie",
      requestData.newSessionCookie as string
    );

    return response;
  }

  return NextResponse.json(null);
}
