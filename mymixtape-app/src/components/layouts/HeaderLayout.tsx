export default function HeaderLayout(props: HeaderLayoutProps) {
  const [profileImage, profileName] = props.children;

  return (
    <div>
      <div className="row justify-content-center mb-3">
        <div className="col-auto">{profileImage}</div>
      </div>
      <div className="row justify-content-center text-center">
        <div className="col-4">{profileName}</div>
      </div>
    </div>
  );
}

interface HeaderLayoutProps {
  children: React.ReactNode[];
}
