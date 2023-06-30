export default function CombineButton(props: CombineButtonProps) {
  const { isCombining, isDisabled, createNewPlaylist } = props;

  return (
    <button
      type="button"
      onClick={(e) => createNewPlaylist(e)}
      className="btn btn-combine"
      disabled={isDisabled}
    >
      {isCombining && (
        <span
          className="spinner-border spinner-border-sm mx-2"
          role="status"
        ></span>
      )}
      Combine
    </button>
  );
}

interface CombineButtonProps {
  isCombining: boolean;
  isDisabled: boolean;
  createNewPlaylist: (e: any) => void;
}
