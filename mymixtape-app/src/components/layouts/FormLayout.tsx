export default function FormLayout(props: FormLayoutProps) {
  const { children, submitButton } = props;

  return (
    <div className="container h-100">
      <form className="needs-validation">
        <div id="fields" className="row mt-2 p-4">
          {children}
        </div>
        <div id="submitButton" className="row border-top p-3 align-items-end">
          <div className="col d-grid align-self-end">{submitButton}</div>
        </div>
      </form>
    </div>
  );
}

interface FormLayoutProps {
  children: JSX.Element[];
  submitButton: JSX.Element;
}
