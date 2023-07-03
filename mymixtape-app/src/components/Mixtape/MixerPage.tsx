import { Mixer } from "./Mixer";
import Header from "./Header/Header";

export default function MixerPage(props: MixerPageProps) {
  const { accessToken } = props;

  return (
    <div className="container py-5 px-3 bg-light mt-5 rounded-5 bg-opacity-10 shadow-lg">
      <div className="row mb-3">
        <Header token={accessToken} />
      </div>
      <div className="row p-0">
        <div>
          <Mixer token={accessToken} />
        </div>
      </div>
    </div>
  );
}

interface MixerPageProps {
  accessToken: string;
}
