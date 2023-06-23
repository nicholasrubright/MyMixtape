import { ReducerAction } from "../types";

export type MixerState = {
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

export type MixerReducerType = (
  state: MixerState,
  action: ReducerAction
) => MixerState;
