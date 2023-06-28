import { api } from "@/api/mixtape.api";
import Navbar from "../shared/Navbar";
import { Mixer } from "./Mixer";

export default async function MixerPage(props: MixerPageProps) {
  const { accessToken } = props;

  const profileResponse = await getUserProfile(accessToken);

  //const playlistsResponse = await getUserPlaylists(accessToken);

  return (
    <div className="container">
      <h1>Testing!!</h1>
      <div className="row float-end mb-3">
        <Navbar profile={profileResponse} />
      </div>
      {/* <div className="row container-fluid">
        <div>
          <Mixer />
        </div>
      </div> */}
    </div>
  );
}

interface MixerPageProps {
  accessToken: string;
}

async function getUserProfile(accessToken: string) {
  return await api.getUserProfile(accessToken);
}

async function getUserPlaylists(accessToken: string) {
  return await api.getUserPlaylists(accessToken, 0, 20);
}
