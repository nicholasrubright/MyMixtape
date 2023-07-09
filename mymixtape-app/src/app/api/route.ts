import { getSession } from "@/api/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("being callled");

  const apiResponse = await getSession();

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
