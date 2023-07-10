export default function FormLayout(props: FormLayoutProps) {
  const { children, submitButton } = props;

  return (
    <div className="container h-100">
      <form className="needs-validation h-100">
        <div id="fields" className="row mt-2 p-4">
          {children}
        </div>
        <div id="submitButton" className="row border-top p-3">
          <div className="col d-grid">{submitButton}</div>
        </div>
      </form>
    </div>
  );
}

interface FormLayoutProps {
  children: JSX.Element[];
  submitButton: JSX.Element;
}
