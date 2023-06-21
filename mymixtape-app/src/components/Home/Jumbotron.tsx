import Link from "next/link";

export default function Jumbotron() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold text-body-emphasis logo mb-4">
        MyMixtape
      </h1>
      <div className="col-lg-6 mx-auto">
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <Link
            href="/mixtape"
            className="btn text-white btn-lg px-4 gap-3 btn-getStarted"
          >
            Get Started!
          </Link>
          <Link
            href="/about"
            type="button"
            className="btn btn-learnMore text-white btn-lg px-4"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}
