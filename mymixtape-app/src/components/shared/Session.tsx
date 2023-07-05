"use client";
import { useEffect } from "react";

export default function Session() {
  useEffect(() => {
    const getSession = async () => {
      await fetch("/api");
    };

    getSession();
  }, []);

  return null;
}
