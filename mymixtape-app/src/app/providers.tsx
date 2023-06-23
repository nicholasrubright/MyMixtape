"use client";

import { PlaylistProvider, UserProvider } from "@/context";

export function Providers(props: ProviderProps) {
  const { children } = props;

  return (
    <PlaylistProvider>
      <UserProvider>{children}</UserProvider>
    </PlaylistProvider>
  );
}

interface ProviderProps {
  children: JSX.Element;
}
