import { Playlist } from "@/types/models";

export type PlaylistStateType = {
  playlists: Playlist[];
  isLoading: boolean;
  error: null;
};

export type PlaylistContextType = {
  playlistState: PlaylistStateType;
  getPlaylists: (token: string) => Promise<void>;
  combinePlaylists: (
    token: string,
    playlistIds: string[],
    name: string,
    description: string,
    userId: string
  ) => Promise<void>;
};
