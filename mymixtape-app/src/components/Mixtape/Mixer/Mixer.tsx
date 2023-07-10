import MixerLayout from "@/components/layouts/MixerLayout";
import Playlists from "../Playlist/Playlists";
import CombineForm from "../Form/CombineForm";
import { getUserPlaylists } from "@/api/api";

export default async function Mixer(props: MixerProps) {
  const { sessionCookie } = props;

  const userPlaylists = await getUserPlaylists(sessionCookie);

  return (
    <MixerLayout>
      <Playlists playlists={userPlaylists.data.items} />
      <CombineForm />
    </MixerLayout>
  );
}

interface MixerProps {
  sessionCookie: string;
}
