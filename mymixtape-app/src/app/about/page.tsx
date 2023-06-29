import { api } from "@/api/mixtape.api";

export default async function About() {
  const response = await getCount();

  return (
    <div className="container py-5 text-center">
      <h1>🎶</h1>
      <h1 className="display-5 fw-bold text-body-emphasis logo mb-4">
        MyMixtape
      </h1>
      <p className="col-lg-8 mx-auto lead">
        Unite your playlists, amplify your vibes.
      </p>
      <p>
        Easily combine your favorite music into a single playlist for your
        enjoyment!
      </p>
      <h1>Count: {response.count}</h1>
    </div>
  );
}

async function getCount() {
  return await api
    .getCount()
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
      return { count: 0 };
    });

  //return await api.getCount();
}
