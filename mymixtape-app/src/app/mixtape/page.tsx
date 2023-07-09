import { getAuthorizationUrl } from "@/api/api";
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
    const newSessionCookie = await initAuthentication(code);
    console.log(newSessionCookie);

    console.log(
      "same session?: ",
      cookies().get("mysession")?.value === newSessionCookie
    );

    return (
      <>
        <MixerPage newSessionCookie={newSessionCookie} />
      </>
    );
  }

  return redirect("/error");
}

interface MixtapeProps {
  searchParams: { [key: string]: string | undefined };
}
async function initAuthentication(code: string): Promise<string> {
  const sessionCookie = cookies().get("mysession")?.value;

  const apiResponse = await fetch("http://localhost:3000/api/mixtape", {
    method: "POST",
    body: JSON.stringify({ code }),
    cache: "no-cache",
    headers: {
      Cookie: `mysession=${sessionCookie}`,
    },
  });

  return apiResponse.headers.getSetCookie()[0].concat(";Path=/;");
}
