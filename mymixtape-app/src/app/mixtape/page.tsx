import { api } from "@/api/mixtape.api";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";

export default async function Mixtape(props: MixtapeProps) {
  const { code } = props.searchParams;

  if (code) {
    const { token, expires_in } = await getAccessToken(code as string);
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
    const authorizationResponse = await api.getAuthorizationUrl();

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

async function getAccessToken(code: string) {
  try {
    const { token, expires_in } = await api.getAccessToken(code);

    return { token, expires_in };
  } catch (err) {
    console.error("There was a problem!", err);
    return { token: "", expires_in: 0 };
  }
}
