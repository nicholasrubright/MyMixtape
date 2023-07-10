"use client";
import { useState, createContext } from "react";

export const PlaylistContext = createContext({});

const PlaylistProvider = (props: PlaylistProviderProps) => {
  const [playlistIds, setPlaylistIds] = useState<string[]>([]);

  const selectPlaylist = (ids: string[]) => {
    setPlaylistIds([...ids]);
  };

  const combinePlaylists = (name: string, description: string) => {
    console.log("Combining playlists: ");
    console.log("SelectedPlaylists: ", playlistIds);
    console.log("Name: ", name);
    console.log("Description: ", description);
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlistIds,
        selectPlaylist,
        combinePlaylists,
      }}
    >
      {props.children}
    </PlaylistContext.Provider>
  );
};

interface PlaylistProviderProps {
  children: JSX.Element[] | JSX.Element;
}

export default PlaylistProvider;
