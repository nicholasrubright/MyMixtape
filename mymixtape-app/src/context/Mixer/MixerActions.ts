import ActionNames from "../actionNames";
import { ContextAction } from "../types";

export const addToken = (token: string): ContextAction => ({
  type: ActionNames.SET_TOKEN,
  payload: token,
});
