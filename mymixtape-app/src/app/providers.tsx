"use client";

import { MixerState, PlaylistProvider, UserProvider } from "@/context";

export function Providers(props: ProviderProps) {
  const { children } = props;

  return (
    <MixerState>
      <PlaylistProvider>
        <UserProvider>{children}</UserProvider>
      </PlaylistProvider>
    </MixerState>
  );
}

interface ProviderProps {
  children: JSX.Element;
}
