export default function ProfileLayout(props: ProfileLayoutProps) {
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

interface ProfileLayoutProps {
  children: React.ReactNode[];
}
