import { api } from "@/api/mixtape.api";
import MixerPage from "@/components/Mixtape/MixerPage";
import { redirect } from "next/navigation";

export default async function Mixtape(props: MixtapeProps) {
  const { code } = props.searchParams;

  if (process.env.NEXT_PUBLIC_DEBUG === "DEV")
    return <MixerPage accessToken={"test"} />;

  if (!code) {
    const { url } = await getAuthorizationUrl();
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

async function getAuthorizationUrl() {
  return await api.getAuthorizationUrl();
}

async function getAccessToken(code: string) {
  return await api.getAccessToken(code);
}
