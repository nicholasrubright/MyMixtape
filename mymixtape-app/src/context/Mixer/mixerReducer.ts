import { ActionNames } from "../actionNames";
import { MixerReducerType, MixerState } from "./types";

type ReducerAction = {
  type: string;
  payload: any;
};

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
