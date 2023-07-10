export default function CombineButton(props: CombineButtonProps) {
  if (props.isLoading) {
    return (
      <button type="submit" className="btn btn-primary disabled placeholder">
        Combine
      </button>
    );
  }

  return (
    <button type="submit" className="btn btn-primary">
      Combine
    </button>
  );
}

interface CombineButtonProps {
  isLoading?: boolean;
}
