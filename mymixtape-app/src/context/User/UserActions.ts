import { Profile } from "@/types/models";
import ActionNames from "../actionNames";
import { ContextAction } from "../types";

export const fetchProfile = (): ContextAction => ({
  type: ActionNames.FETCH_USER_PROFILE,
  payload: null,
});

export const fetchProfileSuccess = (profile: Profile): ContextAction => ({
  type: ActionNames.FETCH_USER_PROFILE_SUCCESS,
  payload: profile,
});

export const fetchProfileFailure = (error: string): ContextAction => ({
  type: ActionNames.FETCH_USER_PROFILE_FAILTURE,
  payload: error,
});
