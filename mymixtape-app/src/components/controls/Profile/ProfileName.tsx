import { Poppins } from "next/font/google";

const font = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const getPlaceholder = () => {
  return (
    <h3 className="placeholder-glow">
      <span className="placeholder w-75"></span>
    </h3>
  );
};

export default function ProfileName(props: ProfileNameProps) {
  const { name, isLoading, isSkeleton } = props;

  if (isSkeleton) {
    return (
      <h3 className={font.className}>
        <span className="placeholder w-50"></span>
      </h3>
    );
  }

  if (isLoading) return getPlaceholder();

  return (
    <h3 className={font.className}>
      Welcome, <span className="logo">{name}</span>
    </h3>
  );
}

interface ProfileNameProps {
  name: string;
  isLoading: boolean;
  isSkeleton?: boolean;
}
