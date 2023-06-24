import { createContext, useReducer, useState } from "react";
import { PlaylistContextType, PlaylistStateType } from "./types";
import { api } from "@/api/mixtape.api";
import PlaylistReducer from "./PlaylistReducer";
import {
  fetchPlaylists,
  fetchPlaylistsFailure,
  fetchPlaylistsSuccess,
} from "./PlaylistActions";
import { Playlist } from "@/types/models";

export const PlaylistContext = createContext<PlaylistContextType | null>(null);

export const PlaylistProvider = (props: ProviderProps) => {
  const { children } = props;

  const initialState: PlaylistStateType = {
    playlists: [],
    isLoading: false,
    error: null,
  };

  const [state, dispatch] = useReducer(PlaylistReducer, initialState);

  const getPlaylists = async (token: string) => {
    try {
      dispatch(fetchPlaylists());

      const response = await api.getUserPlaylists(token, 0, 20);

      const playlists: Playlist[] = response.items.map((item) => {
        return {
          id: item.id,
          images: item.images,
          name: item.name,
        };
      });

      dispatch(fetchPlaylistsSuccess(playlists));
    } catch (err) {
      dispatch(
        fetchPlaylistsFailure("There was a problem fetching user playlists")
      );
    }
  };

  return (
    <PlaylistContext.Provider value={{ playlistState: state, getPlaylists }}>
      {children}
    </PlaylistContext.Provider>
  );
};

interface ProviderProps {
  children: JSX.Element;
}
