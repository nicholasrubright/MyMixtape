import ActionNames from "../actionNames";
import { MixerStateType } from "./types";

export default function MixerReducer(
  state: MixerStateType,
  action: { type: string; payload: any }
): MixerStateType {
  switch (action.type) {
    case ActionNames.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}
