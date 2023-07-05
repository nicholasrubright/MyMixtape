import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionCookie = cookies().get("mysession")?.value;

  const apiResponse = await fetch(`http://mymixtape-api:8080/api/session`, {
    cache: "no-cache",
    method: "GET",
  });

  const response = NextResponse.json(await apiResponse.json());

  if (!sessionCookie && apiResponse.headers.has("Set-Cookie")) {
    response.headers.append(
      "Set-Cookie",
      apiResponse.headers.get("Set-Cookie") as string
    );
  }

  return response;
}
