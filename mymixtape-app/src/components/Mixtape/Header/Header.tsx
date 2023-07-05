"use client";
import ProfileImage from "@/components/controls/ProfileImage";
import ProfileName from "@/components/controls/ProfileName";
import HeaderLayout from "@/components/layouts/HeaderLayout";
import { UserProfileResponse } from "@/types/api/response";
import { Profile } from "@/types/models";
import { useEffect, useState } from "react";

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
    <HeaderLayout>
      <ProfileImage image={getUserProfileImage()} isLoading={false} />
      <ProfileName name={profile.name} isLoading={false} />
    </HeaderLayout>
  );
}

interface HeaderProps {
  profileResponse: UserProfileResponse;
}
