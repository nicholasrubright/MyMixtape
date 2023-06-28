import { Profile } from "@/types/models";
import ProfileButton from "../controls/ProfileButton";

export default function Navbar(props: NavbarProps) {
  const { profile } = props;

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="d-flex">
          <ProfileButton profile={profile} isLoading={false} />
        </div>
      </div>
    </nav>
  );
}

interface NavbarProps {
  profile: Profile;
}
