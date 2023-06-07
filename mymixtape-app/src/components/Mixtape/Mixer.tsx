"use client";
import { useEffect, useState } from "react";
import Form from "./Mixer/Form";
import Playlists from "./Playlist/Playlists";

export default function Mixer(props: MixerProps) {
  const { code } = props;

  const [alert, setAlert] = useState({ hasAlert: false, message: "" });

  //   useEffect(() => {
  //     const setAccessToken = async () => {
  //       if (!localStorage.getItem("code")) {
  //         await getAccessToken(code);
  //         localStorage.setItem("code", code);
  //       }
  //     };

  //     setAccessToken();
  //   }, [code]);

  return (
    <div className="container px-4 py-5">
      <div className="row">
        <div className="col-lg-7">
          <Playlists />
        </div>
        <div className="col-lg-5">
          <Form />
        </div>
      </div>
    </div>
  );
}

interface MixerProps {
  code: string;
}
