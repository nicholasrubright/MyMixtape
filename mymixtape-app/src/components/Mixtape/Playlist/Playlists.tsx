import { Playlist, PlaylistMapping } from "@/types/models";
import PlaylistBlock from "../../controls/Playlist/PlaylistBlock";
import ScrollableList from "@/components/controls/ScrollableList";
import { useEffect, useState } from "react";
import { remapPlaylistMapping } from "@/utils/playlists";

export default function Playlists(props: PlaylistsProp) {
  const { playlists } = props;

  const [playlistMapping, setPlaylistMapping] = useState<PlaylistMapping>({});

  const handleSelectPlaylist = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: string
  ) => {
    const updatePlaylistMapping = playlistMapping;
    updatePlaylistMapping[index] = !updatePlaylistMapping[index];
    setPlaylistMapping({ ...updatePlaylistMapping });
  };

  useEffect(() => {
    const mapping = remapPlaylistMapping(playlists, playlistMapping);
    setPlaylistMapping({ ...mapping });
  }, [playlists]);

  const playlistBlocks = playlists.map(() => {});

  // const playlist_blocks = playlists.map((playlist) => {
  //   return (
  //     <PlaylistBlock
  //       key={playlist.id}
  //       id={playlist.id}
  //       name={playlist.name}
  //       images={playlist.images}
  //       active={selectedPlaylists[playlist.id]}
  //       selectPlaylist={selectPlaylist}
  //     />
  //   );
  // });

  return (
    <div className="container">
      <div className="row text-center mb-3">
        <h3>Playlists</h3>
      </div>
      <div className="row">
        {/* <ScrollableList
          items={playlist_blocks}
          getMoreData={getMoreData}
          maxPlaylists={maxPlaylists}
          isLoading={isLoading}
        /> */}
      </div>
      <div className="row mt-3 text-center py-2">{/* <p>Options</p> */}</div>
    </div>
  );
}

interface PlaylistsProp {
  playlists: Playlist[];
}
