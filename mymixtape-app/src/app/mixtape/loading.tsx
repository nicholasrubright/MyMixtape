import Loader from "@/components/shared/Loader";
import { hasSessionCookie } from "@/utils/session";

export default function Loading() {
  return (
    <div className="container text-center py-5">
      {!hasSessionCookie() && <h4>Redirecting...</h4>}
      <Loader />
    </div>
  );
}
