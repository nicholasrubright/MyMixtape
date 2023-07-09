import { getUserPlaylists, getUserProfile, setAccessToken } from "@/api/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const requestData = await request.json();
  const sessionCookie = cookies().get("mysession")?.value;

  if (sessionCookie) {
    console.log("session cookie before auth: ", sessionCookie);
    const apiResponse = await setAccessToken(requestData, sessionCookie);

    console.log(
      "Same session?: ",
      sessionCookie === (apiResponse.headers?.getSetCookie()[0] as string)
    );
    const response = NextResponse.json(apiResponse);
    response.headers.set(
      "Set-Cookie",
      apiResponse.headers?.getSetCookie()[0] as string
    );

    return response;
  }

  return NextResponse.json(null);
}

export async function GET() {
  // get request on handler
  const sessionCookie = cookies().get("mysession")?.value;

  if (sessionCookie) {
    const userProfileResponse = await getUserProfile({}, sessionCookie);
    const userPlaylistsResponse = await getUserPlaylists(
      { limit: 20, offset: 0 },
      sessionCookie
    );

    const response = NextResponse.json({
      userProfileResponse,
      userPlaylistsResponse,
    });

    response.headers.set("Set-Cookie", sessionCookie);
    return response;
  }

  return NextResponse.json(null);
}
