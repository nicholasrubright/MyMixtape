export default function BlockImage(props: BlockImageProps) {
  const { image, isLoading } = props;

  if (isLoading) {
    return (
      <img
        className="rounded object-fit-scale placeholder"
        src={""}
        width="100"
        height="100"
      />
    );
  }

  return (
    <img
      className="rounded object-fit-scale"
      src={image}
      width="100"
      height="100"
    />
  );
}

interface BlockImageProps {
  image: string;
  isLoading?: boolean;
}
