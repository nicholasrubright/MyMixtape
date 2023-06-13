export default function CombineButton(props: CombineButtonProps) {
  const { isLoading, isDisabled, createNewPlaylist } = props;

  return (
    <button
      type="button"
      onClick={(e) => createNewPlaylist(e)}
      className="btn btn-primary"
      disabled={isDisabled}
    >
      Combine
    </button>
  );
}

interface CombineButtonProps {
  isLoading: boolean;
  isDisabled: boolean;
  createNewPlaylist: (e: any) => void;
}
