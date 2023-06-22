import { Image } from "@/types/models";

export default function PlaylistBlock(props: PlaylistBlockProps) {
  const { id, name, images, active, selectPlaylist } = props;

  const image = images[0];

  return (
    <div className="container rounded py-3">
      <div
        id="playlist-block"
        className={`row playlist rounded shadow bg-light position-relative ${
          active ? "active" : ""
        }`}
      >
        <div className="col-auto p-0">
          <img
            className="rounded object-fit-scale"
            src={image.url}
            width="100"
            height="100"
          ></img>
        </div>
        <div className="col align-self-center">
          <h4 className="text-center text-break">{name}</h4>
        </div>
        <a
          onClick={(e) => selectPlaylist(e, id)}
          className="stretched-link"
        ></a>
      </div>
    </div>
  );
}

interface PlaylistBlockProps {
  id: string;
  name: string;
  images: Image[];
  active: boolean;
  selectPlaylist: (e: any, id: string) => void;
}
