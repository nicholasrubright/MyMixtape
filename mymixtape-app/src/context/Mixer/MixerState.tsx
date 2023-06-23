import { useReducer } from "react";
import MixerReducer from "./mixerReducer";
import { ActionNames } from "../actionNames";
import MixerContext from "./mixerContext";
import { MixerState } from "./types";
import { StateProps } from "../types";

export const MixerInitialState: MixerState = {
  token: null,
  isLoading: false,
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

export default MixerState;
