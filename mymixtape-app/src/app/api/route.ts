import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("being callled");

  const apiResponse = await fetch("http://localhost:8080/api/session", {
    cache: "no-cache",
    method: "GET",
  });

  const sessionCookie = apiResponse.headers.getSetCookie()[0];

  const response = NextResponse.json(null);

  if (sessionCookie) {
    response.headers.set("Set-Cookie", sessionCookie);
  }

  return response;
}
