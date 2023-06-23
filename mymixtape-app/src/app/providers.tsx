"use client";

import { PlaylistProvider, UserProvider, MixerProvider } from "@/context";

export function Providers(props: ProviderProps) {
  const { children } = props;

  return (
    <MixerProvider>
      <PlaylistProvider>
        <UserProvider>{children}</UserProvider>
      </PlaylistProvider>
    </MixerProvider>
  );
}

interface ProviderProps {
  children: JSX.Element;
}
