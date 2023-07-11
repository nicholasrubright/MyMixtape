import MixerLayout from "@/components/layouts/MixerLayout";
import Playlists from "../Playlist/Playlists";
import CombineForm from "../Form/CombineForm";
import { getUserPlaylists } from "@/api/api";
import PlaylistProvider from "@/context/PlaylistContext";
import { redirect } from "next/navigation";
import { ApiError } from "next/dist/server/api-utils";

export default async function Mixer(props: MixerProps) {
  const { sessionCookie } = props;

  const userPlaylists = await getUserPlaylists(sessionCookie).catch(
    (err: ApiError) => {
      console.error("Error: ", err.message);
      redirect("/");
    }
  );

  return (
    <PlaylistProvider>
      <MixerLayout>
        <Playlists playlists={userPlaylists.data.items} />
        <CombineForm />
      </MixerLayout>
    </PlaylistProvider>
  );
}

interface MixerProps {
  sessionCookie: string;
}
