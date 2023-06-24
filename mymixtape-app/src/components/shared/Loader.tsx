export default function Loader(props: LoaderProps) {
  const { isSmall } = props;

  let spinnerClass = "spinner-border m-4";

  if (isSmall) {
    spinnerClass = "spinner-border-sm mx-5";
  }

  return (
    <div className={`spinner-border ${spinnerClass}`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

interface LoaderProps {
  isSmall?: boolean;
}
