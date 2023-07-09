import { setAccessToken, getAuthorizationUrl } from "@/api/api";
import MixerPage from "@/components/Mixtape/MixerPage";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Mixtape(props: MixtapeProps) {
  const { code } = props.searchParams;

  if (!code) {
    const { data } = await getAuthorizationUrl();
    if (data.url) {
      redirect(data.url);
    }
  } else {
    await initAuthentication(code);

    return (
      <>
        <MixerPage />
      </>
    );
  }

  return redirect("/error");
}

interface MixtapeProps {
  searchParams: { [key: string]: string | undefined };
}
async function initAuthentication(code: string) {
  return await fetch("http://localhost:3000/api/mixtape", {
    method: "POST",
    body: JSON.stringify({ code }),
    cache: "no-cache",
    headers: {
      Cookie: `mysession=${cookies().get("mysession")?.value}`,
    },
  });
