"use client";
import { useContext, useEffect } from "react";
import ProfileButton from "../controls/ProfileButton";
import { UserContext } from "@/context/User/UserContext";
import { UserContextType } from "@/context/User/types";

export default function Navbar(props: NavbarProps) {
  const { token } = props;

  const { user, getProfile } = useContext(UserContext) as UserContextType;

  const { profile, isLoading, error } = user;

  useEffect(() => {
    const getData = async () => {
      await getProfile(token);
    };

    getData();
  }, [token]);

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="d-flex">
          <ProfileButton profile={profile} isLoading={isLoading} />
        </div>
      </div>
    </nav>
  );
}

interface NavbarProps {
  token: string;
}
