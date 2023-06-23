import { ActionNames } from "../actionNames";
import { ReducerAction } from "../types";
import { PlaylistReducerType, PlaylistState } from "./types";

const PlaylistReducer: PlaylistReducerType = (
  state: PlaylistState,
  action: ReducerAction
) => {
  switch (action.type) {
    case ActionNames.FETCH_USER_PLAYLISTS: {
      return {
        ...state,
        isLoading: true,
      };
    }

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

    default:
      return state;
  }
};

export default PlaylistReducer;
