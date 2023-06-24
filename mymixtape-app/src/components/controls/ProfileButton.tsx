import { Profile } from "@/types/models";
import Link from "next/link";
import Loader from "../shared/Loader";

export default function ProfileButton(props: ProfileButtonProps) {
  const { profile, isLoading } = props;

  const profileImage = profile.images[0].url;
  const profileName = profile.name;

  return (
    <div className="dropdown">
      <button
        type="button"
        className="btn dropdown-toggle border-0 rounded-pill profile-dropdown"
        data-bs-toggle="dropdown"
        disabled={isLoading}
      >
        <img
          className="img-fluid me-2 rounded-circle"
          src={profileImage}
          height="30"
          width="30"
        />
        <span className="align-middle">
          {!isLoading && profileName}
          {isLoading && <Loader isSmall />}
        </span>
      </button>
      <ul className="dropdown-menu">
        <li>
          <Link href="/" className="dropdown-item">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

interface ProfileButtonProps {
  profile: Profile;
  isLoading: boolean;
}
