import { createContext, useReducer } from "react";
import { AlertContextType, AlertStateType } from "./types";
import { AlertType } from "../../types/models";
import AlertReducer from "./AlertReducer";
import { clearAlert, createAlert } from "./AlertActions";

export const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = (props: ProviderProps) => {
  const { children } = props;

  const initialState: AlertStateType = {
    alert: null,
  };

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (type: AlertType, message: string) => {
    dispatch(createAlert(type, message));

    setTimeout(() => {
      dispatch(clearAlert());
    }, 8000);
  };

  return (
    <AlertContext.Provider value={{ alertState: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

interface ProviderProps {
  children: JSX.Element;
}
