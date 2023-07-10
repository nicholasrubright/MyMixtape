"use client";
export default function BlockLayout(props: BlockLayoutProps) {
  const { id, children, active, selectPlaylist } = props;

  const [image, name] = children;

  return (
    <div className="container rounded py-3">
      <div
        id="block"
        className={`row playlist rounded shadow bg-light position-relative ${
          active ? "active" : ""
        }`}
      >
        <div className="col-auto p-0">{image}</div>
        <div className="col align-self-center">{name}</div>
        <a
          onClick={(e) => selectPlaylist(e, id)}
          className="stretched-link"
        ></a>
      </div>
    </div>
  );
}

interface BlockLayoutProps {
  children: JSX.Element[];
  active: boolean;
  id: string;
  selectPlaylist: (e: any, index: string) => void;
}
