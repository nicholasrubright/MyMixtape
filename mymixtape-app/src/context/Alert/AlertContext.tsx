import { createContext, useState } from "react";
import { AlertContextType, AlertStateType } from "./types";
import { AlertType } from "../../types/models";

export const AlertContext = createContext<AlertContextType | null>(null);

export const AlertProvider = (props: ProviderProps) => {
  const { children } = props;

  const [state, setState] = useState<AlertStateType>({
    alert: null,
  });

  const setAlert = (type: AlertType, message: string) => {
    setState({
      ...state,
      alert: {
        type,
        message,
      },
    });

    setTimeout(() => {
      setState({
        ...state,
        alert: null,
      });
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
