"use client";
import { api } from "@/api/mixtape.api";
import Loader from "@/components/shared/Loader";
import { UserProfileResponse } from "@/types/api/response";
import { Profile } from "@/types/models";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";

const font = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const defaultProfile: Profile = {
  id: "0",
  name: "",
  images: [
    {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png",
      height: 0,
      width: 0,
    },
  ],
};

export default function Header(props: HeaderProps) {
  const { profileResponse } = props;

  const [profile, setProfile] = useState<Profile>(defaultProfile);

  useEffect(() => {
    setProfile(profileResponse as Profile);
  }, [profileResponse]);

  const getUserProfileImage = () => {
    if (profile.images.length > 0) {
      return profile.images[0].url;
    }

    return "";
  };

  return (
    <div>
      <div className="row justify-content-center mb-3">
        <div className="col-auto">
          <img
            src={getUserProfileImage()}
            className="rounded-circle shadow border border-3"
            height="100px"
            width="100px"
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto">
          <h3 className={font.className}>
            Welcome, <span className="logo">{profile.name}</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

interface HeaderProps {
  profileResponse: UserProfileResponse;
}
