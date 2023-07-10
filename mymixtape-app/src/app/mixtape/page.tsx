import {
  getAuthorizationUrl,
  getUserPlaylists,
  getUserProfile,
} from "@/api/api";
import Profile from "@/components/Mixtape/Profile/Profile";
import { Mixer } from "@/components/Mixtape/Mixer";
import MixtapeLayout from "@/components/layouts/MixtapeLayout";
import Session from "@/components/shared/Session";
import { GetSession } from "@/utils/fetch";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProfileSkeleton from "@/components/Mixtape/Profile/ProfileSkeleton";
import { Suspense } from "react";

export default async function Page(props: PageProps) {
  const { searchParams } = props;
  const code = searchParams?.code || null;

  if (!code) {
    const authorizationUrl = await getAuthorizationUrl();

    if (authorizationUrl.data) {
      redirect(authorizationUrl.data.url); // redirect to spotify auth
    }
  }

  const sessionCookie = await initAuthentication(code as string);

  //const userProfile = getUserProfile(sessionCookie);
  const userPlaylists = getUserPlaylists(sessionCookie);

  const [playlists] = await Promise.all([userPlaylists]);

  return (
    <>
      <Session
        hasCookie={cookies().has(GetSession(null))}
        newSessionCookie={sessionCookie}
      />
      <div className="row mb-3">
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile sessionCookie={sessionCookie} />
        </Suspense>
      </div>
      <div className="row p-0">
        <Mixer userPlaylistResponse={playlists} />
      </div>
    </>
  );
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function initAuthentication(code: string): Promise<string> {
  if (cookies().has(GetSession(null))) {
    return cookies().get(GetSession(null))?.value as string;
  }

  const apiResponse = await fetch("http://localhost:3000/api/mixtape", {
    method: "POST",
    body: JSON.stringify({ code }),
    cache: "no-cache",
  });

  const responseHeaders = apiResponse.headers;

  const responseCookie = responseHeaders.getSetCookie()[0];

  return responseCookie;
}
