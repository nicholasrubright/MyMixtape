export type MixerStateType = {
  token: string | null;
  error: null;
};

export type MixerContextType = {
  mixerState: MixerStateType;
  setToken: (token: string) => void;
};
