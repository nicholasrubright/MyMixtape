import { api } from "@/api/mixtape.api";
import { Mixer } from "@/components/Mixtape/Mixer";
import Navbar from "@/components/shared/Navbar";
import { redirect } from "next/navigation";

export default async function Mixtape(props: MixtapeProps) {
  const { code } = props.searchParams;

  if (!code) {
    const { url, valid_token } = await getAuthorization();
    if (url && !valid_token) {
      redirect(url);
    }
  } else {
    const accessTokenResponse = await getAccessToken(code);
    return (
      <div className="container">
        <div className="row float-end">
          <Navbar token={accessTokenResponse.token} />
        </div>
        <div className="row container-fluid">
          <Mixer token={accessTokenResponse.token} />
        </div>
      </div>
    );
  }

  return redirect("/error");
}

interface MixtapeProps {
  searchParams: { [key: string]: string | undefined };
}

async function getAuthorization(
  code: string | null = null
): Promise<{ url: string | null; valid_token: boolean }> {
  return await api
    .getAuthorizationUrl()
    .then((response) => {
      const { url, valid_token } = response;
      return !code && url
        ? { url, valid_token }
        : { url: null, valid_token: false };
    })
    .catch((error) => {
      console.error(
        "There was a problem getting the authorization url: ",
        error
      );
      return { url: null, valid_token: false };
    });
}

async function getAccessToken(code: string) {
  return await api.getAccessToken(code);
}
