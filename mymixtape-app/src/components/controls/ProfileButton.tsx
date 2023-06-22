import { Image } from "@/types/models";
import Link from "next/link";

export default function ProfileButton(props: ProfileButtonProps) {
  const { name, images } = props;

  return (
    <div className="dropdown">
      <button
        type="button"
        className="btn dropdown-toggle border-0 rounded-pill profile-dropdown"
        data-bs-toggle="dropdown"
      >
        <img
          className="img-fluid me-2 rounded-circle"
          src={images.length > 0 ? images[0].url : ""}
          height="30"
          width="30"
        />
        <span className="align-middle">{name}</span>
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
  name: string;
  images: Image[];
}
