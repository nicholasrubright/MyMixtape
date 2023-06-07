import { Image } from "@/types/models";

export default function PlaylistBlock(props: PlaylistBlockProps) {
  const { name, images } = props;

  const image = images[0];

  return (
    <div className="container rounded py-3">
      <div
        id="playlist-block"
        className={`row playlist rounded shadow bg-light position-relative`}
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
          <h4 className="text-center">{name}</h4>
        </div>
        <a
          //   onClick={(e) => selectPlaylist(e, id)}
          className="stretched-link"
        ></a>
      </div>
    </div>
  );
}

interface PlaylistBlockProps {
  name: string;
  images: Image[];
}
