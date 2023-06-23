"use client";
import { useContext, useEffect } from "react";
import ProfileButton from "../controls/ProfileButton";
import { UserContext } from "@/context/User/UserContext";
import { UserContextType } from "@/context/User/types";
import { MixerContext } from "@/context/Mixer/MixerContext";
import { MixerContextType } from "@/context/Mixer/types";

export default function Navbar() {
  const { mixerState } = useContext(MixerContext) as MixerContextType;
  const { token } = mixerState;

  const { userState, getProfile } = useContext(UserContext) as UserContextType;

  const { profile, isLoading, error } = userState;

  useEffect(() => {
    const getData = async () => {
      await getProfile(token);
    };

    if (token !== "") {
      getData();
    }
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
