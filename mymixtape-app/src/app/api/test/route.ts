import { getSessionToken, setSessionToken } from "@/api/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Set the token
export async function POST(request: NextRequest) {
  const requestData = await request.json();
  console.log(requestData);

  const apiResponse = await setSessionToken(requestData.code);
  const response = NextResponse.json(apiResponse.data);
  const sessionCookie = apiResponse.headers?.getSetCookie()[0];
  response.headers.set("Set-Cookie", sessionCookie as string);

  return response;
}

// Get the Token
export async function GET() {
  const sessionCookie = cookies().get("mysession")?.value;

  if (sessionCookie) {
    const apiResponse = await getSessionToken(sessionCookie);
    const response = NextResponse.json(apiResponse.data);
    response.headers.set("Set-Cookie", sessionCookie);

    return response;
  }

  return NextResponse.json(null);
}
