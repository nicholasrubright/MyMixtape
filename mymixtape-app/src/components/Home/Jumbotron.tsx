import Link from "next/link";
import Image from "next/image";
import { Open_Sans, Poppins } from "next/font/google";

const titleFont = Poppins({
  weight: "700",
  subsets: ["latin"],
});

const subtitleFont = Open_Sans({
  weight: "300",
  subsets: ["latin"],
});

export default function Jumbotron() {
  return (
    <div className="container py-5 px-3 bg-light mt-5 rounded-5 bg-opacity-10 shadow-lg">
      <div className="px-3 row flex-lg-row-reverse align-items-center g-5 py-3">
        <div className="col-10 col-sm-8 col-lg-6">
          <Image
            src="/home_image.svg"
            className="d-block mx-lg-auto img-fluid"
            height="400"
            width="400"
            alt="HomeImage"
          />
        </div>
        <div className="col-lg-6">
          <h1 className={`display-5 fw-bold lh-2 mb-4 ${titleFont.className}`}>
            Unite your <span className="logo">playlists</span>, amplify your
            <span className="logo"> vibes</span>.
          </h1>
          <p className={`lead mb-3 lh-2 ${subtitleFont.className}`}>
            Combine and conquer your music playlists with our app, creating the
            ultimate playlist tailored to your unique taste!
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link
              href="/mixtape"
              className="btn btn-getStarted btn-lg px-4 me-md-2"
            >
              Get Started
            </Link>
            <Link href="/about" className="btn btn-learnMore btn-lg px-4">
              What is this?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
