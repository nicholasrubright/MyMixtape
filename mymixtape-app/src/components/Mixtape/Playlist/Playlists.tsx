import { Playlist, PlaylistMapping } from "@/types/models";
import PlaylistBlock from "./PlaylistBlock";
import ScrollableList from "@/components/controls/ScrollableList";
import PlaylistBlockPlaceholder from "./PlaylistBlockPlaceholder";

export default function Playlists(props: PlaylistsProp) {
  const {
    playlists,
    selectPlaylist,
    selectedPlaylists,
    getMoreData,
    maxPlaylists,
    isLoading,
  } = props;

  const playlist_blocks = playlists.map((playlist) => {
    return (
      <PlaylistBlock
        key={playlist.id}
        id={playlist.id}
        name={playlist.name}
        images={playlist.images}
        active={selectedPlaylists[playlist.id]}
        selectPlaylist={selectPlaylist}
      />
    );
  });

  return (
    <div className="container">
      <div className="row text-center mb-3">
        <h3>Playlists</h3>
      </div>
      <div className="row">
        <ScrollableList
          items={playlist_blocks}
          getMoreData={getMoreData}
          maxPlaylists={maxPlaylists}
          isLoading={isLoading}
        />
      </div>
      <div className="row mt-3 text-center py-2">{/* <p>Options</p> */}</div>
    </div>
  );
}

interface PlaylistsProp {
  playlists: Playlist[];
  selectedPlaylists: PlaylistMapping;
  selectPlaylist: (e: any, id: string) => void;
  getMoreData: (offset: number, limit: number) => void;
  maxPlaylists: number;
  isLoading: boolean;
}
