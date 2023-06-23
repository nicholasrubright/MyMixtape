import { ActionNames } from "../actionNames";
import { ReducerAction } from "../types";
import { MixerReducerType, MixerState } from "./types";

const MixerReducer: MixerReducerType = (
  state: MixerState,
  action: ReducerAction
) => {
  switch (action.type) {
    case ActionNames.FETCH_ACCESS_TOKEN: {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return state;
  }
};

export default MixerReducer;
