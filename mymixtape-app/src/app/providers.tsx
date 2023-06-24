"use client";

import {
  PlaylistProvider,
  UserProvider,
  MixerProvider,
  AlertProvider,
} from "@/context";

export function Providers(props: ProviderProps) {
  const { children } = props;

  return (
    <AlertProvider>
      <MixerProvider>
        <PlaylistProvider>
          <UserProvider>{children}</UserProvider>
        </PlaylistProvider>
      </MixerProvider>
    </AlertProvider>
  );
}

interface ProviderProps {
  children: JSX.Element;
}
