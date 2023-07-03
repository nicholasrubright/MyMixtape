"use client";

import { useEffect } from "react";

export default function Error(props: ErrorProps) {
  const { error, reset } = props;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}

interface ErrorProps {
  error: Error;
  reset: () => void;
}
