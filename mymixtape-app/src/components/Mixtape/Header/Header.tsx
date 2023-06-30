"use client";
import { useContext, useEffect } from "react";
import {
  AlertContext,
  AlertContextType,
  UserContext,
  UserContextType,
  MixerContext,
  MixerContextType,
} from "@/context";
import { AlertType } from "@/types/models";
import Loader from "@/components/shared/Loader";

export default function Header() {
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

  const { name, images } = profile;

  if (isLoading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="row justify-content-center mb-3">
        <div className="col-auto">
          <img
            src={images[0].url}
            className="rounded-circle shadow border border-3"
            height="100px"
            width="100px"
          />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto">
          <h3>{name}</h3>
        </div>
      </div>
    </div>
  );
}
