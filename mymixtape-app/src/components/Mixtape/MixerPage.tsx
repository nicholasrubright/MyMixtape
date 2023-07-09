import { Mixer } from "./Mixer";
import Header from "./Header/Header";
import MixtapeLayout from "../layouts/MixtapeLayout";
import { cookies } from "next/headers";
import { getUserPlaylists, getUserProfile } from "@/api/api";

export default async function MixerPage() {
  const userProfileResponse = await getUserProfile();
  const userPlaylistsResponse = await getUserPlaylists();

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
async function getUserProfile() {
  const sessionCookie = cookies().get("mysession")?.value;
  console.log("sessionCookie getUserProifle: ", sessionCookie);
  return await api.getUserProfile(sessionCookie ?? null);

async function getUserPlaylists() {
  const sessionCookie = cookies().get("mysession")?.value;
  console.log("sessionCookie getUserPlaylists: ", sessionCookie);
  return await api.getUserPlaylists(sessionCookie ?? null, 0, 20);
}
