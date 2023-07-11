"use client";
import { useEffect } from "react";

export default function Error(props: ErrorProps) {
  const { error, reset } = props;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container py-5">
      <h1>Error</h1>
      <button type="button" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}

interface ErrorProps {
  error: Error;
  reset: () => void;
}
