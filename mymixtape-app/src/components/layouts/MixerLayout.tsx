export default function MixerLayout(props: MixerLayoutProps) {
  const [playlists, form] = props.children;

  return (
    <div className="container px-4 py-5">
      <div className="row">
        <div className="col-lg-7">{playlists}</div>
        <div className="col-lg-5">{form}</div>
      </div>
    </div>
  );
}

interface MixerLayoutProps {
  children: React.ReactNode[];
}
