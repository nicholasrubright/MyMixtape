export type MixerStateType = {
  token: string;
  error: null;
};

export type MixerContextType = {
  mixerState: MixerStateType;
  setToken: (token: string) => void;
};
