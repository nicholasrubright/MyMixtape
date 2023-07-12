import { getAuthorizationUrl, getUserPlaylists, postMixtape } from "@/api/api";
import Profile from "@/components/Mixtape/Profile/Profile";
import Session from "@/components/shared/Session";
import { getSessionCookie, hasSessionCookie } from "@/utils/session";
import { redirect } from "next/navigation";
import ProfileSkeleton from "@/components/Mixtape/Profile/ProfileSkeleton";
import { Suspense } from "react";
import Mixer from "@/components/Mixtape/Mixer/Mixer";
import MixerSkeleton from "@/components/Mixtape/Mixer/MixerSkeleton";

export default async function Page(props: PageProps) {
  const { searchParams } = props;
  const code = searchParams?.code || null;

  if (!code && !hasSessionCookie()) {
    const authorizationUrl = await getAuthorizationUrl();

    if (authorizationUrl.data) {
      redirect(authorizationUrl.data.url); // redirect to spotify auth
    }
  }

  const sessionCookie = await initAuthentication(code as string);

  return (
    <>
      <Session
        hasCookie={hasSessionCookie()}
        newSessionCookie={sessionCookie}
      />
      <div className="row mb-3">
        <Suspense fallback={<ProfileSkeleton />}>
          <Profile sessionCookie={sessionCookie} />
        </Suspense>
      </div>
      <div className="row p-0">
        <Suspense fallback={<MixerSkeleton />}>
          <Mixer sessionCookie={sessionCookie} />
        </Suspense>
      </div>
    </>
  );
}

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function initAuthentication(code: string): Promise<string> {
  if (hasSessionCookie()) {
    return getSessionCookie();
  }

  return await postMixtape(code);
}
