import MixerLayout from "@/components/layouts/MixerLayout";
import PlaylistSkeleton from "../Playlist/PlaylistSkeleton";
import CombineFormSkeleton from "../Form/CombineFormSkeleton";

export default function MixerSkeleton() {
  return (
    <MixerLayout>
      <PlaylistSkeleton />
      <CombineFormSkeleton />
    </MixerLayout>
  );
}
