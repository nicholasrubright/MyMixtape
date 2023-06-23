import { createContext, useState } from "react";
import { PlaylistContextType, PlaylistStateType } from "./types";
import { api } from "@/api/mixtape.api";

export const PlaylistContext = createContext<PlaylistContextType | null>(null);

export const PlaylistProvider = (props: ProviderProps) => {
  const { children } = props;

  const [state, setState] = useState<PlaylistStateType>({
    playlists: [],
    isLoading: false,
    error: null,
  });

  const getPlaylists = async (token: string) => {
    setState({
      ...state,
      isLoading: true,
    });

    const response = await api.getUserPlaylists(token, 0, 20);

    const playlists = response.items.map((item) => {
      return {
        id: item.id,
        images: item.images,
        name: item.name,
      };
    });

    setState({
      ...state,
      isLoading: false,
      playlists: playlists,
    });
  };

  return (
    <PlaylistContext.Provider value={{ state, getPlaylists }}>
      {children}
    </PlaylistContext.Provider>
  );
};

interface ProviderProps {
  children: JSX.Element;
}
