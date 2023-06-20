import { Playlist, PlaylistMapping } from "@/types/models";

export const createPlaylistMapping = (
  playlists: Playlist[]
): PlaylistMapping => {
  const mapping: PlaylistMapping = {};

  playlists.forEach((playlist) => {
    const { id } = playlist;
    mapping[id] = false;
  });

  return mapping;
};

export const remapPlaylistMapping = (
  playlists: Playlist[],
  playlistMapping: PlaylistMapping
): PlaylistMapping => {
  const mapping: PlaylistMapping = {};

  playlists.forEach((playlist) => {
    const { id } = playlist;

    if (!playlistMapping[id]) {
      mapping[id] = false;
    } else {
      mapping[id] = playlistMapping[id];
    }
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
