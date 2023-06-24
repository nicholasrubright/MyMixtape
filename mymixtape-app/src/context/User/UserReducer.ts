import ActionNames from "../actionNames";
import { UserStateType } from "./types";

export default function UserReducer(
  state: UserStateType,
  action: { type: string; payload: any }
): UserStateType {
  switch (action.type) {
    case ActionNames.FETCH_USER_PROFILE:
      return {
        ...state,
        isLoading: true,
      };
    case ActionNames.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: action.payload,
      };
    case ActionNames.FETCH_USER_PROFILE_FAILTURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
