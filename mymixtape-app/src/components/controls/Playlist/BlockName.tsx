export default function BlockName(props: BlockNameProps) {
  const { name, isLoading } = props;

  if (isLoading) {
    return (
      <div>
        <h4 className="text-center text-break placeholder w-50"></h4>
        <h6 className="text-center text-break placeholder w-75"></h6>
      </div>
    );
  }

  return <h4 className="text-center text-break">{name}</h4>;
}

interface BlockNameProps {
  name: string;
  isLoading?: boolean;
}
