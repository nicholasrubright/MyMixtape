import { ReducerAction } from "../types";

export type MixerStateType = {
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

export type MixerReducerType = (
  state: MixerStateType,
  action: ReducerAction
) => MixerStateType;
