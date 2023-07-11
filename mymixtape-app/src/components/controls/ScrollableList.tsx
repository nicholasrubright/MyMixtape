export default function ScrollableList(props: ScrollableListProps) {
  const { items } = props;

  return <div className="overflow-auto px-3 playlist-container">{items}</div>;
}

interface ScrollableListProps {
  items: JSX.Element[];
}
