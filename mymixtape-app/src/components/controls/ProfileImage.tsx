import Loader from "../shared/Loader";

export default function ProfileImage(props: ProfileImageProps) {
  const { image, isLoading } = props;

  if (isLoading) return <Loader />;

  return (
    <img
      src={image}
      className="rounded-circle shadow border border-3"
      height="100px"
      width="100px"
    />
  );
}

interface ProfileImageProps {
  image: string;
  isLoading: boolean;
}