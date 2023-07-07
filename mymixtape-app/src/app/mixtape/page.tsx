import { api } from "@/api/mixtape.api";
import MixerPage from "@/components/Mixtape/MixerPage";
import { redirect } from "next/navigation";

export default async function Mixtape(props: MixtapeProps) {
  const { code } = props.searchParams;

  if (!code) {
    const { url } = await getAuthorizationUrl();
    if (url) {
      redirect(url);
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

async function getAuthorizationUrl() {
  return await api.getAuthorizationUrl();
}

async function initAuthentication(code: string) {
  return await fetch("http://localhost:3000/api/mixtape", {
    method: "POST",
    body: JSON.stringify({ code }),
    cache: "no-cache",
  });
}
