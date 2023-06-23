import { Alert, AlertType } from "@/types/models";

export type AlertStateType = {
  alert: Alert | null;
};

export type AlertContextType = {
  alertState: AlertStateType;
  setAlert: (type: AlertType, message: string) => void;
};
