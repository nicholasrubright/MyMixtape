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
    let newSessionCookie: string;
    if (cookies().has("mysession")) {
      newSessionCookie = cookies().get("mysession")?.value as string;
    } else {
      newSessionCookie = await initAuthentication(code as string);
    }

    return (
      <>
        <MixerPage newSessionCookie={newSessionCookie} />
      </>
    );
  }

  return redirect("/error");
}

interface MixtapeProps {
  searchParams: { [key: string]: string | string[] | undefined };
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

  if (apiResponse.headers.getSetCookie()[0].includes("Path=/;")) {
    return apiResponse.headers.getSetCookie()[0];
  } else {
    return apiResponse.headers.getSetCookie()[0].concat(";Path=/;");
  }
}
