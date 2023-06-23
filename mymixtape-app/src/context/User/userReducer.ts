import { ActionNames } from "../actionNames";
import { ReducerAction } from "../types";
import { UserReducerType, UserState } from "./types";

const UserReducer: UserReducerType = (
  state: UserState,
  action: ReducerAction
) => {
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
    case ActionNames.FETCH_USER_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default UserReducer;
