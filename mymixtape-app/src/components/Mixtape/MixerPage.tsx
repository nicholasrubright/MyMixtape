import { Mixer } from "./Mixer";
import Header from "./Header/Header";
import { api } from "@/api/mixtape.api";
import MixtapeLayout from "../layouts/MixtapeLayout";

export default async function MixerPage(props: MixerPageProps) {
  const { accessToken } = props;

  const userProfileResponse = await getUserProfile(accessToken);
  const userPlaylistsResponse = await getUserPlaylists(accessToken);

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
}

async function getUserProfile(token: string) {
  return await api.getUserProfile(token);
}

async function getUserPlaylists(token: string) {
  return await api.getUserPlaylists(token, 0, 20);
}

interface MixerPageProps {
  accessToken: string;
}
