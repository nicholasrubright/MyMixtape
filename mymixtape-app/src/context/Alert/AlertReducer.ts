import ActionNames from "../actionNames";
import { AlertStateType } from "./types";

export default function AlertReducer(
  state: AlertStateType,
  action: { type: string; payload: any }
): AlertStateType {
  switch (action.type) {
    case ActionNames.SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case ActionNames.CLEAR_ALERT:
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
}
