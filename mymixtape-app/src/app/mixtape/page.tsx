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
    await getAccessToken(code);

    await getData();
  }

  return (
    <div className="container">
      <div className="row float-end">
        <Navbar code={code as string} />
      </div>
      <div className="row container-fluid">
        <Mixer code={code as string} />
      </div>
    </div>
  );
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
  await api.getAccessToken(code);
}

async function getData() {
  await api.getUserProfile();
}
