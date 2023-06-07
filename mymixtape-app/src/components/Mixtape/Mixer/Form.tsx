import CombineButton from "@/components/controls/CombineButton";

export default function Form() {
  return (
    <div className="container h-100">
      <div>
        <div id="fields" className="row mt-2 p-4">
          <div className="mb-3">
            <label htmlFor="newPlaylistName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control form-input"
              id="newPlaylistName"
              //   value={newPlaylistName}
              placeholder="Awesome Playlist"
              //   onChange={(e) => handleNewPlaylistName(e)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPlaylistDescription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control form-input"
              id="newPlaylistDescription"
              //   value={newPlaylistDescription}
              placeholder="This is a really awesome playlist..."
              //   onChange={(e) => handleNewPlaylistDescription(e)}
            />
          </div>
        </div>
        <div>
          <div id="stats" className="row p-3">
            <p>Total Songs: </p>
            <p>Total Selected Playlists: </p>
            <p>Total Hours on Selected Playlists: </p>
          </div>
          <div id="buttons" className="row border-top p-3 align-items-end">
            <div className="col d-grid align-self-end">
              <CombineButton isLoading={false} isDisabled={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
