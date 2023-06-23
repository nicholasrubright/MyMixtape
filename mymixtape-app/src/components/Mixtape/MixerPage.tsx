"use client";

import { useContext, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Mixer } from "./Mixer";
import { MixerContext } from "@/context/Mixer/MixerContext";
import { MixerContextType } from "@/context/Mixer/types";
import { AlertContextType } from "@/context/Alert/types";
import { AlertContext } from "@/context/Alert/AlertContext";
import Alert from "../shared/Alert";

export default function MixerPage(props: MixerPageProps) {
  const { accessToken } = props;

  const { setToken } = useContext(MixerContext) as MixerContextType;
  const { alertState, setAlert } = useContext(AlertContext) as AlertContextType;

  const { alert } = alertState;

  useEffect(() => {
    setToken(accessToken);
  }, [accessToken]);

  return (
    <div className="container">
      <div className="row float-end mb-3">
        <Navbar />
      </div>
      <div className="row container-fluid">
        {alert && (
          <div>
            <Alert message={alert.message} type={alert.type} />
          </div>
        )}
        <div className="">
          <Mixer />
        </div>
      </div>
    </div>
  );
}

interface MixerPageProps {
  accessToken: string;
}
