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
    const response = await initAuthentication(code);

    const newSession = response.headers.getSetCookie()[0].concat(";Path=/;");

    return (
      <>
        <MixerPage newSession={newSession} />
      </>
    );
  }

  return redirect("/error");
}

interface MixtapeProps {
  searchParams: { [key: string]: string | undefined };
}
async function initAuthentication(code: string) {
  const sessionCookie = cookies().get("mysession")?.value;

  return await fetch("http://localhost:3000/api/mixtape", {
    method: "POST",
    body: JSON.stringify({ code }),
    cache: "no-cache",
    headers: {
      Cookie: `mysession=${sessionCookie}`,
    },
  });
}
