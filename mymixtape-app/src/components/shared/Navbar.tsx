"use client";
import { useEffect, useState } from "react";
import ProfileButton from "../controls/ProfileButton";
import { api } from "@/api/mixtape.api";
import { Profile } from "@/types/models";

const testImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";

export default function Navbar(props: NavbarProps) {
  const { token } = props;

  const [profile, setProfile] = useState<Profile>({
    id: "",
    name: "",
    images: [],
  });

  useEffect(() => {
    const getProfile = async () => {
      const response = await api.getUserProfile(token);
      setProfile({
        id: response.id,
        name: response.name,
        images: response.images,
      });
    };

    getProfile();
  }, [token]);

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="d-flex">
          <ProfileButton name={profile.name} images={profile.images} />
        </div>
      </div>
    </nav>
  );
}

interface NavbarProps {
  token: string;
}
