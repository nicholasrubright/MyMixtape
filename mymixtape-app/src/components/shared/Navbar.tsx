"use client";
import { useEffect, useState } from "react";
import ProfileButton from "../controls/ProfileButton";
import { api } from "@/api/mixtape.api";
import { Profile } from "@/types/models";

const testImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png";

export default function Navbar(props: NavbarProps) {
  const { code } = props;

  const [profile, setProfile] = useState<Profile>({
    id: "",
    name: "",
    images: [],
  });

  useEffect(() => {
    const getData = async () => {
      if (!localStorage.getItem("token")) {
        const response = await api.getAccessToken(code);
        console.log(response);
        localStorage.setItem("token", response.token);
      } else {
        // testing
        setProfile({
          id: "test",
          name: "Bob Bobertin",
          images: [{ url: testImage, height: 0, width: 0 }],
        });
      }
    };

    getData();
  }, [code]);

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
  code: string;
}
