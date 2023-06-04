import { getAuthorizationUrl } from "@/api/mixtape.api";
import Navbar from "@/components/Navbar";
import { AuthorizationUrlResponse } from "@/types/api/response";
import { redirect } from "next/navigation";

export default async function Mixtape(props: MixtapeProps) {
  const { code } = props.searchParams;

  if (code) {
    console.log(code);
  } else {
    const authorization = await getAuthorization(null);
    if (!authorization.code && authorization.url) {
      redirect(authorization.url);
    }
  }

  return (
    <div className="container">
      <div className="row float-end">
        <Navbar />
      </div>
      <div className="row container-fluid">
        <h1>Mixtape!!</h1>
      </div>
    </div>
  );
}

interface MixtapeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

async function getAuthorization(code: string | null) {
  const defaultAuthorization = {
    code: null,
    url: "",
  };

  try {
    let authorizationResponse = await getAuthorizationUrl();

    if ("error" in authorizationResponse) {
      return defaultAuthorization;
    } else {
      authorizationResponse = authorizationResponse as AuthorizationUrlResponse;
    }

    const { url } = authorizationResponse;

    if (!code && url) {
      return {
        code: null,
        url,
      };
    }

    return {
      code,
      url: "",
    };
  } catch (err) {
    console.error("There was a problem!", err);
    return defaultAuthorization;
  }
}
