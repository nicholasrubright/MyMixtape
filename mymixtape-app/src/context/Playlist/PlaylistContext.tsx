import { createContext, useReducer, useState } from "react";
import { PlaylistContextType, PlaylistStateType } from "./types";
import { api } from "@/api/mixtape.api";
import PlaylistReducer from "./PlaylistReducer";
import {
  combinePlaylistsAction,
  combinePlaylistsFailure,
  combinePlaylistsSuccess,
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
    isLoading: true,
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
      throw Error("There was a problem fetching user playlists");
    }
  };

  const combinePlaylists = async (
    token: string,
    playlistIds: string[],
    name: string,
    description: string,
    userId: string
  ) => {
    try {
      dispatch(combinePlaylistsAction());

      await api.combinePlaylist(
        {
          playlist_ids: playlistIds,
          name,
          description,
          user_id: userId,
        },
        token
      );

      dispatch(combinePlaylistsSuccess());
    } catch (error) {
      dispatch(
        combinePlaylistsFailure("There was a problem combining playlists")
      );
      throw Error("There was a problem combining playlists");
    }
  };

  return (
    <PlaylistContext.Provider
      value={{ playlistState: state, getPlaylists, combinePlaylists }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

interface ProviderProps {
  children: JSX.Element;
}
