import { createContext, useState } from "react";
import { MixerContextType, MixerStateType } from "./types";

export const MixerContext = createContext<MixerContextType | null>(null);

export const MixerProvider = (props: ProviderProps) => {
  const { children } = props;

  const [state, setState] = useState<MixerStateType>({
    token: "",
    error: null,
  });

  const setToken = (token: string) => {
    setState({
      ...state,
      token: token,
    });
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
