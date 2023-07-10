export type PlaylistState = {
  playlistIds: string[];
};

export type PlaylistContextType = {
  state: PlaylistState;
  selectPlaylist: (id: string) => void;
  combinePlaylists: (name: string, description: string) => void;
};
