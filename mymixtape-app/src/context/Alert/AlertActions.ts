import { Alert, AlertType } from "@/types/models";
import ActionNames from "../actionNames";
import { ContextAction } from "../types";

export const createAlert = (
  type: AlertType,
  message: string
): ContextAction => ({
  type: ActionNames.SET_ALERT,
  payload: { type, message },
});

export const clearAlert = (): ContextAction => ({
  type: ActionNames.CLEAR_ALERT,
  payload: null,
});
