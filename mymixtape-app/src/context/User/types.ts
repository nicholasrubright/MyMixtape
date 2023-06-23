import { Profile } from "@/types/models";

export type UserStateType = {
  profile: Profile;
  isLoading: boolean;
  error: null;
};

export type UserContextType = {
  userState: UserStateType;
  getProfile: (token: string) => Promise<void>;
};
