"use client";

import { useContext, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Mixer } from "./Mixer";
import { MixerContext } from "@/context/Mixer/MixerContext";
import { MixerContextType } from "@/context/Mixer/types";

export default function MixerPage(props: MixerPageProps) {
  const { accessToken } = props;

  const { setToken } = useContext(MixerContext) as MixerContextType;

  useEffect(() => {
    setToken(accessToken);
  }, [accessToken]);

  return (
    <div className="container">
      <div className="row float-end">
        <Navbar />
      </div>
      <div className="row container-fluid">
        <Mixer />
      </div>
    </div>
  );
}

interface MixerPageProps {
  accessToken: string;
}
