"use client";

import { useEffect } from "react";

export default function Session(props: SessionProps) {
  const { hasCookie } = props;

  useEffect(() => {
    const setSession = async () => {
      await fetch("http://localhost:3000/api", {
        method: "GET",
        cache: "no-cache",
      });
    };

    if (!hasCookie) {
      setSession();
    }
  }, [hasCookie]);

  return null;
}

interface SessionProps {
  hasCookie: boolean;
}
