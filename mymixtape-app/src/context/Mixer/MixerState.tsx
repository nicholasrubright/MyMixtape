import { createContext, useReducer } from "react";
import MixerReducer from "./mixerReducer";
import { ActionNames } from "../actionNames";
import { MixerStateType } from "./types";
import { StateProps } from "../types";
import { api } from "@/api/mixtape.api";

const MixerInitialState: MixerStateType = {
  token: null,
  isLoading: false,
  error: null,
};

const fetchAccessToken = async (code: string) => {
  const [state, dispatch] = useReducer(MixerReducer, MixerInitialState);

  dispatch({
    type: ActionNames.FETCH_ACCESS_TOKEN,
    payload: null,
  });

  const response = await api.getAccessToken(code);

  dispatch({
    type: ActionNames.FETCH_ACCESS_TOKEN_SUCCESS,
    payload: "fake token",
  });
};

export const MixerContext = createContext({
  ...MixerInitialState,
  fetchAccessToken,
});

export const MixerState = (props: StateProps) => {
  const { children } = props;

  const [state, dispatch] = useReducer(MixerReducer, MixerInitialState);

  return (
    <MixerContext.Provider
      value={{
        ...state,
        fetchAccessToken,
      }}
    >
      {children}
    </MixerContext.Provider>
  );
};
