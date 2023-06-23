import { Playlist, Profile } from "@/types/models";

type ReducerAction = {
  type: string;
  payload: any;
};

export type MixerState = {
  token: string | null;
  isLoading: boolean;
  profile: Profile | null;
  playlists: Playlist[];
  error: string | null;
};

export type MixerReducerType = (
  state: MixerState,
  action: ReducerAction
) => MixerState;
