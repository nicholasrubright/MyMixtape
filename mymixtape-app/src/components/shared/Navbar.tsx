"use client";
import { useContext, useEffect } from "react";
import ProfileButton from "../controls/ProfileButton";
import {
  AlertContext,
  AlertContextType,
  UserContext,
  UserContextType,
  MixerContext,
  MixerContextType,
} from "@/context";
import { AlertType } from "@/types/models";

export default function Navbar() {
  const { mixerState } = useContext(MixerContext) as MixerContextType;
  const { token } = mixerState;

  const { setAlert } = useContext(AlertContext) as AlertContextType;

  const { userState, getProfile } = useContext(UserContext) as UserContextType;

  const { profile, isLoading, error } = userState;

  useEffect(() => {
    const getData = async () => {
      try {
        await getProfile(token as string);
      } catch (error) {
        setAlert(AlertType.ERROR, String(error));
      }
    };

    if (token !== null) {
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
