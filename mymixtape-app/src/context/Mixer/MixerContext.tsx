import { createContext, useReducer, useState } from "react";
import { MixerContextType, MixerStateType } from "./types";
import MixerReducer from "./MixerReducer";
import { addToken } from "./MixerActions";

export const MixerContext = createContext<MixerContextType | null>(null);

export const MixerProvider = (props: ProviderProps) => {
  const { children } = props;

  const initialState: MixerStateType = {
    token: null,
    error: null,
  };

  const [state, dispatch] = useReducer(MixerReducer, initialState);

  const setToken = (token: string) => {
    dispatch(addToken(token));
  };

  return (
    <MixerContext.Provider value={{ mixerState: state, setToken }}>
      {children}
    </MixerContext.Provider>
  );
};

interface ProviderProps {
  children: JSX.Element;
}
