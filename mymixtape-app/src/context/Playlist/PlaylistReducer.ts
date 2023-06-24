import ActionNames from "../actionNames";
import { PlaylistStateType } from "./types";

export default function PlaylistReducer(
  state: PlaylistStateType,
  action: { type: string; payload: any }
): PlaylistStateType {
  switch (action.type) {
    case ActionNames.FETCH_USER_PLAYLISTS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionNames.FETCH_USER_PLAYLISTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        playlists: action.payload,
      };
    case ActionNames.FETCH_USER_PLAYLISTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ActionNames.COMBINE_PLAYLISTS:
      return {
        ...state,
        isLoading: true,
      };
    case ActionNames.COMBINE_PLAYLISTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case ActionNames.COMBINE_PLAYLISTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
