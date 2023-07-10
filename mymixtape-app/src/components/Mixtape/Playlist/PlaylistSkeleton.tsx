import BlockLayout from "@/components/layouts/BlockLayout";
import BlockImage from "@/components/controls/Playlist/BlockImage";
import BlockName from "@/components/controls/Playlist/BlockName";

export default function PlaylistSkeleton() {
  return (
    <div className="container">
      <div className="row text-center mb-3">
        <h3>Playlists</h3>
      </div>
      <div className="row">
        <div className="px-3 playlist-container">
          <BlockLayout active={false}>
            <BlockImage image={""} isLoading />
            <BlockName name={""} isLoading />
          </BlockLayout>
          <BlockLayout active={false}>
            <BlockImage image={""} isLoading />
            <BlockName name={""} isLoading />
          </BlockLayout>
          <BlockLayout active={false}>
            <BlockImage image={""} isLoading />
            <BlockName name={""} isLoading />
          </BlockLayout>
        </div>
      </div>
      <div className="row mt-3 text-center py-2">{/* <p>Options</p> */}</div>
    </div>
  );
}
