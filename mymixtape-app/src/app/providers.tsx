"use client";

import { MixerProvider, PlaylistProvider, UserProvider } from "@/context";

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
