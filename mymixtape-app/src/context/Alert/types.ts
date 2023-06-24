import { Alert, AlertType } from "@/types/models";

export type AlertStateType = {
  alerts: Alert[];
};

export type AlertContextType = {
  alertState: AlertStateType;
  setAlert: (type: AlertType, message: string) => void;
};
