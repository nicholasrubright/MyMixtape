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
        alerts: [...state.alerts, action.payload],
      };
    case ActionNames.CLEAR_ALERTS:
      return {
        ...state,
        alerts: [],
      };
    default:
      return state;
  }
}
