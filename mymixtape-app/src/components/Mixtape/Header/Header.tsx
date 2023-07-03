"use client";
import { api } from "@/api/mixtape.api";
import Loader from "@/components/shared/Loader";
import { Profile } from "@/types/models";
import { Poppins } from "next/font/google";
import { useEffect, useState } from "react";

const font = Poppins({
  weight: "500",
  subsets: ["latin"],
});

export default function Header(props: HeaderProps) {
  const { token } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>({
    id: "0",
    name: "Test User",
    images: [],
  });

  useEffect(() => {
    const getData = async () => {
      const response = await api.getUserProfile(token);

      setProfile(response);
    };

    setIsLoading(true);
    getData();
    setIsLoading(false);
  }, [token]);

  if (isLoading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

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
  token: string;
}
