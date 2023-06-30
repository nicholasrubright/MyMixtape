"use client";
import { useContext, useEffect } from "react";
import { Mixer } from "./Mixer";
import { MixerContext } from "@/context/Mixer/MixerContext";
import { MixerContextType } from "@/context/Mixer/types";
import { AlertContextType } from "@/context/Alert/types";
import { AlertContext } from "@/context/Alert/AlertContext";
import Alert from "../shared/Alert";
import Header from "./Header/Header";

export default function MixerPage(props: MixerPageProps) {
  const { accessToken } = props;

  const { setToken } = useContext(MixerContext) as MixerContextType;
  const { alertState } = useContext(AlertContext) as AlertContextType;

  const { alerts } = alertState;

  useEffect(() => {
    setToken(accessToken);
  }, [accessToken]);

  useEffect(() => {}, [alerts]);

  return (
    <div className="container py-5 px-3 bg-light mt-5 rounded-5 bg-opacity-10 shadow-lg">
      <div className="row mb-3">
        <Header />
      </div>
      <div className="row p-0">
        {alerts.length > 0 && (
          <div>
            <Alert alerts={alertState.alerts} />
          </div>
        )}
        <div>
          <Mixer />
        </div>
      </div>
    </div>
  );
}

interface MixerPageProps {
  accessToken: string;
}
