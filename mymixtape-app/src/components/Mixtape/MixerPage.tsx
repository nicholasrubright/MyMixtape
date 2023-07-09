import { Mixer } from "./Mixer";
import Header from "./Header/Header";
import MixtapeLayout from "../layouts/MixtapeLayout";
import { getUserPlaylists, getUserProfile } from "@/api/api";

export default async function MixerPage(props: MixerPageProps) {
  const { accessToken } = props;

  const userProfileResponse = await getUserProfile({ token: accessToken });
  const userPlaylistsResponse = await getUserPlaylists({
    token: accessToken,
    offset: 0,
    limit: 20,
  });

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

interface MixerPageProps {
  accessToken: string;
}
