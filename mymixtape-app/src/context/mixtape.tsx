"use client";
import { createContext, useContext, useState } from "react";

const MixtapeContext: React.Context<any> = createContext({});

export const MixtapeProvider = (props: MixtapeContextProviderProps) => {
  const [combineAlert, setCombineAlert] = useState<boolean>(false);

  return (
    <MixtapeContext.Provider value={{ combineAlert, setCombineAlert }}>
      {props.children}
    </MixtapeContext.Provider>
  );
};

export const useMixtapeContext = () => useContext(MixtapeContext);

interface MixtapeContextProviderProps {
  children: JSX.Element;
}
