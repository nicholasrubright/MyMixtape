export default function NameField(props: NameFieldProps) {
  const id = "playlist_name";

  if (props.isLoading) {
    return (
      <div id={`${id}_field`} className="mb-3">
        <label htmlFor={id} className="form-label placeholder w-25">
          Name
        </label>
        <input
          type="text"
          className="form-control placeholder"
          id={id}
          placeholder="Awesome Playlist"
          required
        />
      </div>
    );
  }

  return (
    <div id={`${id}_field`} className="mb-3">
      <label htmlFor={id} className="form-label">
        Name
      </label>
      <input
        type="text"
        className="form-control form-input bg-white"
        id={id}
        placeholder="Awesome Playlist"
        required
      />
    </div>
  );
}

interface NameFieldProps {
  isLoading?: boolean;
}
