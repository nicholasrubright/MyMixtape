export default function CombineButton(props: CombineButtonProps) {
  const { isLoading, isDisabled } = props;

  return (
    <button type="button" className="btn btn-primary" disabled={isDisabled}>
      Combine
    </button>
  );
}

interface CombineButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
}
