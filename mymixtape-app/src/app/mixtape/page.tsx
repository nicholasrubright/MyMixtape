import { setAccessToken, getAuthorizationUrl } from "@/api/api";
import MixerPage from "@/components/Mixtape/MixerPage";
import { redirect } from "next/navigation";

export default async function Mixtape(props: MixtapeProps) {
  const { code } = props.searchParams;

  if (process.env.NEXT_PUBLIC_DEBUG === "DEV")
    return <MixerPage accessToken={"test"} />;

  if (!code) {
    const { data } = await getAuthorizationUrl();
    if (data.url) {
      redirect(data.url);
    }
  } else {
    const accessTokenResponse = await setAccessToken({ code });

    return <MixerPage accessToken={accessTokenResponse.data.token} />;
  }

  return redirect("/error");
}

interface MixtapeProps {
  searchParams: { [key: string]: string | undefined };
}
