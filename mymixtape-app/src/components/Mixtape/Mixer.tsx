"use client";
import { useState } from "react";
import Form from "./Mixer/Form";
import Playlists from "./Playlist/Playlists";
import { Playlist } from "@/types/models";

const image =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/SMPTE_Color_Bars.svg/1200px-SMPTE_Color_Bars.svg.png";

const playlists: Playlist[] = [
  {
    id: "1",
    name: "Playlist",
    images: [{ url: image, height: 0, width: 0 }],
  },
  {
    id: "2",
    name: "Playlist",
    images: [{ url: image, height: 0, width: 0 }],
  },
  {
    id: "3",
    name: "Playlist",
    images: [{ url: image, height: 0, width: 0 }],
  },
  {
    id: "4",
    name: "Playlist",
    images: [{ url: image, height: 0, width: 0 }],
  },
  {
    id: "5",
    name: "Playlist",
    images: [{ url: image, height: 0, width: 0 }],
  },
  {
    id: "6",
    name: "Playlist",
    images: [{ url: image, height: 0, width: 0 }],
  },
];

export function Mixer(props: MixerProps) {
  const { token } = props;

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
          <Playlists playlists={playlists} />
        </div>
        <div className="col-lg-5">
          <Form />
        </div>
      </div>
    </div>
  );
}

interface MixerProps {
  token: string;
}
