import { Mixer } from "./Mixer";
import Header from "./Header/Header";
import { api } from "@/api/mixtape.api";

export default async function MixerPage(props: MixerPageProps) {
  const { accessToken } = props;

  const userProfileResponse = await getUserProfile(accessToken);

  const userPlaylistsResponse = await getUserPlaylists(accessToken);

  return (
    <div className="container py-5 px-3 bg-light mt-5 rounded-5 bg-opacity-10 shadow-lg">
      <div className="row mb-3">
        <Header profileResponse={userProfileResponse} />
      </div>
      <div className="row p-0">
        <div>
          <Mixer userPlaylistResponse={userPlaylistsResponse} />
        </div>
      </div>
    </div>
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
