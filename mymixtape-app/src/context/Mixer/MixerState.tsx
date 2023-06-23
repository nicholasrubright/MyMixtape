import { useReducer } from "react";
import MixerReducer from "./mixerReducer";
import { ActionNames } from "../actionNames";
import MixerContext from "./mixerContext";
import { MixerState } from "./types";

export const MixerInitialState: MixerState = {
  token: null,
  isLoading: false,
  profile: null,
  playlists: [],
  error: null,
};

const MixerState = (props: StateProps) => {
  const { children } = props;

  const [state, dispatch] = useReducer(MixerReducer, MixerInitialState);

  // fetch access token
  const fetchAccessToken = (code: string, type: string) => {
    dispatch({
      type: ActionNames.FETCH_ACCESS_TOKEN,
      payload: null,
    });
  };

  return (
    <MixerContext.Provider
      value={{
        mixer: state,
        fetchAccessToken,
      }}
    >
      {children}
    </MixerContext.Provider>
  );
};

interface StateProps {
  children: JSX.Element;
}

export default MixerState;
