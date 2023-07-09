import { getSession } from "@/api/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionCookie = cookies().get("mysession")?.value;

  if (!sessionCookie) {
    const apiResponse = await getSession(sessionCookie as string);

    const response = NextResponse.json(apiResponse);

    if (apiResponse.headers) {
      if (!sessionCookie && apiResponse.headers.has("Set-Cookie")) {
        response.headers.append(
          "Set-Cookie",
          apiResponse.headers.get("Set-Cookie") as string
        );
      }
    }

    return response;
  }

  return NextResponse.json(null);
}
