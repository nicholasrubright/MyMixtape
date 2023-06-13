import { Playlist, PlaylistMapping } from "@/types/models";
import PlaylistBlock from "./PlaylistBlock";

export default function Playlists(props: PlaylistsProp) {
  const { playlists, selectPlaylist, selectedPlaylists } = props;

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

  const isEmpty = playlists.length === 0;

  return (
    <div className="container">
      <div className="row text-center mb-3">
        <h3>Playlists</h3>
      </div>
      <div className="row overflow-auto px-3 playlist-container">
        {isEmpty && <h3 className="text-center p-4">No Playlists...</h3>}
        {!isEmpty && playlist_blocks}
      </div>
      <div className="row mt-3 text-center py-2">
        <p>Options</p>
      </div>
    </div>
  );
}

interface PlaylistsProp {
  playlists: Playlist[];
  selectedPlaylists: PlaylistMapping;
  selectPlaylist: (e: any, id: string) => void;
}
