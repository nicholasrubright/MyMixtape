import { AlertType } from "@/types/models";

export default function Alert(props: AlertProps) {
  const { type, message } = props;

  let alertClass = "alert-primary";

  switch (type) {
    case AlertType.ERROR:
      alertClass = "alert-danger";
    case AlertType.WARNING:
      alertClass = "alert-warning";
    case AlertType.SUCCESS:
      alertClass = "alert-success";
    default:
      alertClass = "alert-primary";
  }

  return (
    <div
      className={`alert d-flex align-items-center ${alertClass}`}
      role="alert"
    >
      {message}
    </div>
  );
}

interface AlertProps {
  message: string;
  type: AlertType;
}
