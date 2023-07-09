"use client";

export function Providers(props: ProviderProps) {
  const { children } = props;

  return <>{children}</>;
}

interface ProviderProps {
  children: JSX.Element;
}
