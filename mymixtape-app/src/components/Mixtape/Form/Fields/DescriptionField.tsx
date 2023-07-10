export default function DescriptionField(props: DescriptionFieldProps) {
  const id = "playlist_description";

  if (props.isLoading) {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="form-label placeholder w-25">
          Description
        </label>
        <textarea
          className="form-control placeholder"
          id={id}
          required
          placeholder="This is a really awesome playlist..."
        />
      </div>
    );
  }

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        Description
      </label>
      <textarea
        className="form-control form-input bg-white"
        id={id}
        required
        placeholder="This is a really awesome playlist..."
      />
    </div>
  );
}

interface DescriptionFieldProps {
  isLoading?: boolean;
}
