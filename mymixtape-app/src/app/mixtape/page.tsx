import { api } from "@/api/mixtape.api";
import { Mixer } from "@/components/Mixtape/Mixer";
import Navbar from "@/components/shared/Navbar";
import { MixerContext } from "@/context/Mixer/MixerState";
import { redirect } from "next/navigation";
import { useContext } from "react";

export default async function Mixtape(props: MixtapeProps) {
  const { code } = props.searchParams;

  const mixerContext = useContext(MixerContext);

  const { token, isLoading, error, fetchAccessToken } = mixerContext;

  if (!code) {
    const { url, valid_token } = await getAuthorization();
    if (url && !valid_token) {
      redirect(url);
    }
  } else {
    // const accessTokenResponse = await getAccessToken(code);
    if (fetchAccessToken) {
      await fetchAccessToken(code);
    }
    if (!isLoading) {
      if (token !== null) {
        return (
          <div className="container">
            <div className="row float-end">
              <Navbar token={token} />
            </div>
            <div className="row container-fluid">
              <Mixer token={token} />
            </div>
          </div>
        );
      } else {
        return redirect("/error");
      }
    }
  }

  //return redirect("/error");
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
