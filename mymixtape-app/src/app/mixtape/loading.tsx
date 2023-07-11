import Loader from "@/components/shared/Loader";

export default function Loading() {
  return (
    <div className="container text-center py-5">
      <h4>Redirecting...</h4>
      <Loader />
    </div>
  );
}
