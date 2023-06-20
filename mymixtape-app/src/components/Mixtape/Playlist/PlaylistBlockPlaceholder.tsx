export default function PlaylistBlockPlaceholder() {
  return (
    <div className="container rounded py-3">
      <div
        id="playlist-block"
        className="row playlist rounded shadow bg-light position-relative"
      >
        <div className="col-auto p-0">
          <img
            className="rounded object-fit-scale"
            width="100"
            height="100"
          ></img>
        </div>
        <div className="col align-self-center">
          <h4 className="text-center placeholder-glow">
            <span className="placeholder"></span>
          </h4>
        </div>
      </div>
    </div>
  );
}
