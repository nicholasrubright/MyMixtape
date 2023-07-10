"use client";

import { useEffect } from "react";

export default function Session(props: SessionProps) {
  const { hasCookie, newSessionCookie } = props;
  useEffect(() => {
    const setSession = async () => {
      await fetch("http://localhost:3000/api", {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify({ newSessionCookie }),
      });
    };

    if (typeof window !== "undefined" && !hasCookie) {
      setSession();
    }
  }, [hasCookie]);

  return null;
}

interface SessionProps {
  hasCookie: boolean;
  newSessionCookie: string;
}
