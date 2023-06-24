import { AlertType } from "@/types/models";
import { Alert } from "../../types/models";

const getAlertClass = (type: AlertType): string => {
  switch (type) {
    case AlertType.ERROR:
      return "alert-danger";
    case AlertType.WARNING:
      return "alert-warning";
    case AlertType.SUCCESS:
      return "alert-success";
    default:
      return "alert-primary";
  }
};

export default function Alert(props: AlertProps) {
  const { alerts } = props;

  const alertComponents = alerts.map((alert) => {
    const alertClass = getAlertClass(alert.type);
    return (
      <div
        key={Math.random().toFixed(0)}
        className={`alert d-flex align-items-center ${alertClass}`}
        role="alert"
      >
        {alert.message}
      </div>
    );
  });

  return <div>{alertComponents}</div>;
}

interface AlertProps {
  alerts: Alert[];
}
