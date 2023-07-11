export default function MixtapeLayout(props: MixtapeLayoutProps) {
  const { children } = props;

  return (
    <div
      className="container py-5 bg-light mt-5 rounded-5 bg-opacity-10 shadow-lg"
      style={{ minHeight: "500px" }}
    >
      {children}
    </div>
  );
}

interface MixtapeLayoutProps {
  children: React.ReactNode;
}
