import { Playlist } from "@/types/models";
import ActionNames from "../actionNames";
import { ContextAction } from "../types";

export const fetchPlaylists = (): ContextAction => ({
  type: ActionNames.FETCH_USER_PLAYLISTS,
  payload: null,
});

export const fetchPlaylistsSuccess = (
  playlists: Playlist[]
): ContextAction => ({
  type: ActionNames.FETCH_USER_PLAYLISTS_SUCCESS,
  payload: playlists,
});

export const fetchPlaylistsFailure = (error: string): ContextAction => ({
  type: ActionNames.FETCH_USER_PLAYLISTS_FAILURE,
  payload: error,
});

export const combinePlaylistsAction = (): ContextAction => ({
  type: ActionNames.COMBINE_PLAYLISTS,
  payload: null,
});

export const combinePlaylistsSuccess = (): ContextAction => ({
  type: ActionNames.COMBINE_PLAYLISTS_SUCCESS,
  payload: null,
});

export const combinePlaylistsFailure = (error: string): ContextAction => ({
  type: ActionNames.COMBINE_PLAYLISTS_FAILURE,
  payload: error,
});
