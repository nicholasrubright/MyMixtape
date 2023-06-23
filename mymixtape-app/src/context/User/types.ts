import { Profile } from "@/types/models";
import { ReducerAction } from "../types";

export type UserState = {
  isLoading: boolean;
  error: string | null;
  profile: Profile | null;
};

export type UserReducerType = (
  state: UserState,
  action: ReducerAction
) => UserState;
