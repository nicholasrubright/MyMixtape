import { api } from "@/api/mixtape.api";
import Navbar from "@/components/Navbar";
import { redirect } from "next/navigation";

export default async function Mixtape(props: MixtapeProps) {
  const { code } = props.searchParams;

  if (code) {
    const { token, expires_in } = await getAccessToken(code);
    console.log(token, expires_in);
  } else {
    const { url } = await getAuthorization();

    if (url) {
      redirect(url);
    }
  }

  return (
    <div className="container">
      <div className="row float-end">
        <Navbar />
      </div>
      <div className="row container-fluid">
        <h1>Mixtape!!</h1>
      </div>
    </div>
  );
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
  try {
    const { token, expires_in } = await api.getAccessToken(code);

    return { token, expires_in };
  } catch (err) {
    console.error("There was a problem!", err);
    return { token: "", expires_in: 0 };
  }
}
