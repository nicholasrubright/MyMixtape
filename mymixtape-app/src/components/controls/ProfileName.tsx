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
  const { name, isLoading } = props;

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
}
