import PlaylistBlock from "./PlaylistBlock";

export default function PlaylistSkeleton() {
  return (
    <div className="container">
      <div className="row text-center mb-3">
        <h3>Playlists</h3>
      </div>
      <div className="row">
        <div className="px-3 playlist-container">
          <PlaylistBlock
            key={""}
            id={""}
            name={""}
            images={[]}
            active={false}
            selectPlaylist={() => {}}
            isSkeleton={true}
          />
        </div>
      </div>
      <div className="row mt-3 text-center py-2">{/* <p>Options</p> */}</div>
    </div>
  );
}
