import { api } from "@/api/mixtape.api";
import MixerPage from "@/components/Mixtape/MixerPage";
import { redirect } from "next/navigation";

export default async function Mixtape(props: MixtapeProps) {
  const { code } = props.searchParams;

  if (process.env.NEXT_PUBLIC_DEBUG === "DEV")
    return <MixerPage accessToken={"test"} />;

  if (!code) {
    const { url } = await getAuthorization();
    if (url) {
      redirect(url);
    }
  } else {
    const accessTokenResponse = await getAccessToken(code);

    return <MixerPage accessToken={accessTokenResponse.token} />;
  }

  return redirect("/error");
}

interface MixtapeProps {
  searchParams: { [key: string]: string | undefined };
}

async function getAuthorization(
  code: string | null = null
): Promise<{ url: string | null }> {
  return await api
    .getAuthorizationUrl()
    .then((response) => {
      const { url } = response;
      return !code && url ? { url } : { url: null };
    })
    .catch((error) => {
      console.error(
        "There was a problem getting the authorization url: ",
        error
      );
      return { url: null };
    });
}

async function getAccessToken(code: string) {
  return await api.getAccessToken(code);
}
