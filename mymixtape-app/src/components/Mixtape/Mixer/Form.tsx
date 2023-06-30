import CombineButton from "@/components/controls/CombineButton";

export default function Form(props: FormProps) {
  const {
    newPlaylistName,
    newPlaylistDescription,
    handleNewPlaylistName,
    handleNewPlaylistDescription,
    createNewPlaylist,
    isDisabled,
    isCombining,
  } = props;

  return (
    <div className="container h-100">
      <form className="needs-validation" noValidate>
        <div id="fields" className="row mt-2 p-4">
          <div className="mb-3">
            <label htmlFor="newPlaylistName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control form-input bg-white"
              id="newPlaylistName"
              value={newPlaylistName}
              placeholder="Awesome Playlist"
              required
              disabled={isDisabled}
              onChange={(e) => handleNewPlaylistName(e)}
            />
            <div className="invalid-feedback">Please enter a name.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="newPlaylistDescription" className="form-label">
              Description
            </label>
            <textarea
              className="form-control form-input bg-white"
              id="newPlaylistDescription"
              value={newPlaylistDescription}
              required
              disabled={isDisabled}
              placeholder="This is a really awesome playlist..."
              onChange={(e) => handleNewPlaylistDescription(e)}
            />
            <div className="invalid-feedback">Please enter a description.</div>
          </div>
        </div>
        <div>
          <div id="buttons" className="row border-top p-3 align-items-end">
            <div className="col d-grid align-self-end">
              <CombineButton
                isCombining={isCombining}
                isDisabled={isDisabled}
                createNewPlaylist={createNewPlaylist}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

interface FormProps {
  newPlaylistName: string;
  newPlaylistDescription: string;
  isDisabled: boolean;
  isCombining: boolean;
  handleNewPlaylistName: (e: any) => void;
  handleNewPlaylistDescription: (e: any) => void;
  createNewPlaylist: (e: any) => void;
}
