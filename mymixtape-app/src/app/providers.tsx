"use client";

import { MixtapeProvider } from "@/context/mixtape";

export function Providers(props: ProviderProps) {
  const { children } = props;

  return <MixtapeProvider>{children}</MixtapeProvider>;
}

interface ProviderProps {
  children: JSX.Element;
}
