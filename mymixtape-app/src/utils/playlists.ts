import { Playlist, PlaylistMapping } from "@/types/models";

export const getPlaylistMapping = (playlists: Playlist[]): PlaylistMapping => {
  const mapping: PlaylistMapping = {};

  playlists.forEach((playlist) => {
    const { id } = playlist;
    mapping[id] = false;
  });

  return mapping;
};

export const getSelectedPlaylists = (
  playlists: Playlist[],
  mapping: PlaylistMapping
) => {
  return playlists
    .filter((playlist) => mapping[playlist.id])
    .map((playlist) => playlist.id);
};
