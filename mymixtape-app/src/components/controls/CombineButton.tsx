"use client";
export default function CombineButton(props: CombineButtonProps) {
  const { isLoading, handleCombineButton } = props;

  if (isLoading) {
    return (
      <button type="submit" className="btn btn-primary disabled placeholder">
        Combine
      </button>
    );
  }

  return (
    <button
      type="submit"
      className="btn btn-primary"
      onClick={(e) => handleCombineButton(e)}
    >
      Combine
    </button>
  );
}

interface CombineButtonProps {
  isLoading?: boolean;
  handleCombineButton: (e: any) => void;
}
