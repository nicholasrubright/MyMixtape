"use client";
import { Playlist, PlaylistMapping } from "@/types/models";
import PlaylistBlock from "../../controls/Playlist/PlaylistBlock";
import ScrollableList from "@/components/controls/ScrollableList";
import { useContext, useEffect, useState } from "react";
import { remapPlaylistMapping } from "@/utils/playlists";
import { PlaylistContext } from "@/context/PlaylistContext";

export default function Playlists(props: PlaylistsProp) {
  const { playlists } = props;

  const context: any = useContext(PlaylistContext);

  const { selectPlaylist } = context;

  const [playlistMapping, setPlaylistMapping] = useState<PlaylistMapping>({});

  const handleSelectPlaylist = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: string
  ) => {
    const updatePlaylistMapping = playlistMapping;
    updatePlaylistMapping[index] = !updatePlaylistMapping[index];
    setPlaylistMapping({ ...updatePlaylistMapping });

    const ids = playlists.filter((p) => playlistMapping[p.id]).map((p) => p.id);
    selectPlaylist(ids);
  };

  useEffect(() => {
    const mapping = remapPlaylistMapping(playlists, playlistMapping);
    setPlaylistMapping({ ...mapping });
  }, [playlists]);

  const playlistBlocks = playlists.map((playlist) => {
    return (
      <PlaylistBlock
        key={playlist.id}
        id={playlist.id}
        name={playlist.name}
        images={playlist.images}
        active={playlistMapping[playlist.id]}
        selectPlaylist={handleSelectPlaylist}
      />
    );
  });

  return (
    <div className="container">
      <div className="row text-center mb-3">
        <h3>Playlists</h3>
      </div>
      <div className="row">
        <ScrollableList items={playlistBlocks} />
      </div>
      <div className="row mt-3 text-center py-2">{/* <p>Options</p> */}</div>
    </div>
  );
}

interface PlaylistsProp {
  playlists: Playlist[];
}
