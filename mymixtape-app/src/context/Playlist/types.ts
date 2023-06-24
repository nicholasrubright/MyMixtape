import { Playlist } from "@/types/models";

export type PlaylistStateType = {
  playlists: Playlist[];
  isLoading: boolean;
  error: null;
};

export type PlaylistContextType = {
  playlistState: PlaylistStateType;
  getPlaylists: (token: string) => Promise<void>;
};
