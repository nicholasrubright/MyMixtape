import { Poppins } from "next/font/google";

const font = Poppins({
  weight: "700",
  subsets: ["latin"],
});

export default function TitleSection() {
  return (
    <div className="container text-center py-5">
      <div className="row">
        <h1 className={`${font.className}`} style={{ fontSize: "55px" }}>
          Unite your <span className="logo">playlists</span>
        </h1>
      </div>
      <div className="row py-3">
        <p style={{ fontSize: "22px", color: "lightgray" }}>
          With MyMixtape, you can create your favorite playlist with all your
          best songs!
        </p>
      </div>
      <div className="row">
        <div className="d-grid gap-5 d-md-flex justify-content-center">
          <button type="button" className="btn px-5 btn-primary btn-lg">
            Get Started
          </button>
          <button type="button" className="btn px-5 btn-lg btn-secondary">
            What is it?
          </button>
        </div>
      </div>
    </div>
  );
}
