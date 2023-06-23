import { useReducer } from "react";
import { StateProps } from "../types";
import PlaylistReducer from "./playlistReducer";
import { PlaylistState } from "./types";
import PlaylistContext from "./playlistContext";

export const PlaylistInitialState: PlaylistState = {
  playlists: [],
  selectedPlaylists: {},
  isLoading: false,
  error: null,
};

const PlaylistState = (props: StateProps) => {
  const { children } = props;

  const [state, dispatch] = useReducer(PlaylistReducer, PlaylistInitialState);

  // actions

  return (
    <PlaylistContext.Provider
      value={{
        playlist: state,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export default PlaylistState;
