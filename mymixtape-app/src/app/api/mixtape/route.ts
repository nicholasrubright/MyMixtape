import { setAccessToken } from "@/api/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestData = await request.json();
  const sessionCookie = cookies().get("mysession")?.value;

  if (sessionCookie) {
    const apiResponse = await setAccessToken(requestData, sessionCookie);
    const response = NextResponse.json(apiResponse);

    console.log(apiResponse);

    response.headers.set(
      "Set-Cookie",
      apiResponse.headers?.getSetCookie()[0] as string
    );
    //cookies().delete("mysession"); // doesn't like it when i delete the session variable
    return response;
  }

  return NextResponse.json(null);
}
