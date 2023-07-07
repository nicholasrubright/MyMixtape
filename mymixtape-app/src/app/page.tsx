import Jumbotron from "@/components/Home/Jumbotron";
import Session from "@/components/shared/Session";
import { cookies } from "next/headers";

export default function Home() {
  return (
    <div className="container-fluid">
      <Session hasCookie={cookies().has("mysession")} />
      <Jumbotron />
    </div>
  );
}
