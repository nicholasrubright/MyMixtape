import { Mixer } from "./Mixer";
import Header from "./Header/Header";
import MixtapeLayout from "../layouts/MixtapeLayout";
import { getUserPlaylists, getUserProfile } from "@/api/api";
import Session from "../shared/Session";
import { cookies } from "next/headers";
import { GetSession } from "@/utils/fetch";

export default async function MixerPage(props: MixerPageProps) {
  let sessionCookie = props.newSessionCookie;
  sessionCookie = sessionCookie as string;

  const userProfileResponse = await getUserProfile(sessionCookie);
  const userPlaylistsResponse = await getUserPlaylists(
    { limit: 20, offset: 0 },
    sessionCookie
  );

  return (
    <MixtapeLayout>
      <Session
        hasCookie={cookies().has(GetSession(null))}
        newSessionCookie={sessionCookie}
      />
      <div className="row mb-3">
        <Header profileResponse={userProfileResponse} />
      </div>
      <div className="row p-0">
        <Mixer userPlaylistResponse={userPlaylistsResponse} />
      </div>
    </MixtapeLayout>
  );
}

interface MixerPageProps {
  newSessionCookie: string;
}
