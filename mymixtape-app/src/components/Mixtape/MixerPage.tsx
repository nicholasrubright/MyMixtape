import { Mixer } from "./Mixer";
import Header from "./Header/Header";
import MixtapeLayout from "../layouts/MixtapeLayout";
import { getUserPlaylists, getUserProfile } from "@/api/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function MixerPage(props: MixerPageProps) {
  //const sessionCookie = cookies().get("mysession")?.value;

  if (props.newSession) {
    const userProfileResponse = await getUserProfile(
      {},
      props.newSession
    ).catch((err) => {
      throw err;
    });
    const userPlaylistsResponse = await getUserPlaylists(
      {
        limit: 20,
        offset: 0,
      },
      props.newSession
    );

    return (
      <MixtapeLayout>
        <div className="row mb-3">
          <Header profileResponse={userProfileResponse} />
        </div>
        <div className="row p-0">
          <Mixer userPlaylistResponse={userPlaylistsResponse} />
        </div>
      </MixtapeLayout>
    );
  } else {
    redirect("/error");
  }
}

interface MixerPageProps {
  newSession: string;
}
