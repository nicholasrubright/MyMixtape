"use client";
export default function DescriptionField(props: DescriptionFieldProps) {
  const { description, hasError, handleDescription } = props;
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
          value={description}
          onChange={(e) => handleDescription(e)}
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
        required={true}
        placeholder="This is a really awesome playlist..."
      />
      {hasError && (
        <div className="text-danger">
          <small>Please enter a description for the playlist.</small>
        </div>
      )}
    </div>
  );
}

interface DescriptionFieldProps {
  description: string;
  isLoading?: boolean;
  hasError?: boolean;
  handleDescription: (e: any) => void;
}
