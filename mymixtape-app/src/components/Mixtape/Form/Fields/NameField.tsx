"use client";

import { useRef } from "react";

export default function NameField(props: NameFieldProps) {
  const { name, hasError, handleName } = props;

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
        onChange={(e) => handleName(e)}
        type="text"
        className="form-control form-input bg-white"
        id={id}
        value={name}
        placeholder="Awesome Playlist"
        required
      />
      {hasError && (
        <div className="text-danger">
          <small>Please enter a name for the playlist.</small>
        </div>
      )}
    </div>
  );
}

interface NameFieldProps {
  name: string;
  isLoading?: boolean;
  hasError?: boolean;
  handleName: (e: any) => void;
}
