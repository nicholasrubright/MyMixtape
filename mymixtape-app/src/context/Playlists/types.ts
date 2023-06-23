import { Playlist } from "@/types/models";
import { ReducerAction } from "../types";

export type PlaylistState = {
  isLoading: boolean;
  error: string | null;
  playlists: Playlist[];
  selectedPlaylists: Record<string, Playlist>;
};

export type PlaylistReducerType = (
  state: PlaylistState,
  action: ReducerAction
) => PlaylistState;
