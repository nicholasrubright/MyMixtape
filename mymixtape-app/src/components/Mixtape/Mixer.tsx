"use client";
import { useContext, useEffect, useState } from "react";
import Form from "./Mixer/Form";
import Playlists from "./Playlist/Playlists";
import { AlertType, PlaylistMapping } from "@/types/models";
import {
  createPlaylistMapping,
  getSelectedPlaylists,
  remapPlaylistMapping,
} from "@/utils/playlists";

import {
  AlertContext,
  MixerContext,
  PlaylistContext,
  PlaylistContextType,
  MixerContextType,
  AlertContextType,
  UserContext,
  UserContextType,
} from "@/context";
import { Work_Sans } from "next/font/google";

const font = Work_Sans({
  weight: "400",
  subsets: ["latin"],
});

export function Mixer() {
  const { mixerState } = useContext(MixerContext) as MixerContextType;
  const { token } = mixerState;

  const { setAlert } = useContext(AlertContext) as AlertContextType;

  const { playlistState, getPlaylists, combinePlaylists } = useContext(
    PlaylistContext
  ) as PlaylistContextType;

  const { playlists, isLoading } = playlistState;

  const { userState } = useContext(UserContext) as UserContextType;

  const { profile } = userState;

  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [newPlaylistDescription, setNewPlaylistDescription] =
    useState<string>("");
  const [selectedPlaylists, setSelectedPlaylists] = useState<PlaylistMapping>(
    {}
  );
  const [maxPlaylists, setMaxPlaylists] = useState(-1);
  const [isCombining, setIsCombining] = useState<boolean>(false);

  const handleNewPlaylistName = (e: any) => {
    setNewPlaylistName(e.target.value);
  };

  const handleNewPlaylistDescription = (e: any) => {
    setNewPlaylistDescription(e.target.value);
  };

  const createNewPlaylist = async (e: any) => {
    const ids = getSelectedPlaylists(playlists, selectedPlaylists);

    // Client validation for now
    if (newPlaylistName !== "" && newPlaylistDescription !== "") {
      setIsCombining(true);

      try {
        if (token !== null) {
          await combinePlaylists(
            token,
            ids,
            newPlaylistName,
            newPlaylistDescription,
            profile.id
          );

          setAlert(AlertType.SUCCESS, "Successfully created playlist!");
        }
      } catch (error) {
        setAlert(AlertType.ERROR, String(error));
      }

      setIsCombining(false);
    }

    setNewPlaylistName("");
    setNewPlaylistDescription("");
    const mapping = createPlaylistMapping(playlists);
    setSelectedPlaylists({ ...mapping });
  };

  const selectPlaylist = (e: any, index: string): void => {
    const updatedSelectedPlaylists = selectedPlaylists;
    updatedSelectedPlaylists[index] = !updatedSelectedPlaylists[index];
    setSelectedPlaylists({ ...updatedSelectedPlaylists });
  };

  const setMapping = () => {
    const mapping = remapPlaylistMapping(playlists, selectedPlaylists);

    setSelectedPlaylists({ ...mapping });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        await getPlaylists(token as string);
      } catch (error) {
        setAlert(AlertType.ERROR, String(error));
      }

      // const userPlaylistsResponse = await api.getUserPlaylists(token, 0, 20);
      // const tempPlaylists: Playlist[] = [];
      // userPlaylistsResponse.items.forEach((item) => {
      //   tempPlaylists.push({
      //     id: item.id,
      //     name: item.name,
      //     images: item.images,
      //   });
      // });

      // setMaxPlaylists(userPlaylistsResponse.total);

      // //setPlaylists(tempPlaylists);
      // setMapping();

      // const userProfileResponse = await api.getUserProfile(token);
      // setUserId(userProfileResponse.id);
    };

    if (token !== null) {
      getData();
    }
  }, [token]);

  const getMoreData = async (offset: number, limit: number) => {
    //const response = await api.getUserPlaylists(token, offset, limit);
    //setPlaylists([...playlists, ...response.items]);
    setMapping();
  };

  return (
    <div className={`container px-4 py-5 ${font.className}`}>
      <div className="row">
        <div className="col-lg-7">
          <Playlists
            playlists={playlists}
            selectedPlaylists={selectedPlaylists}
            selectPlaylist={selectPlaylist}
            getMoreData={getMoreData}
            maxPlaylists={maxPlaylists}
            isLoading={isLoading}
          />
        </div>
        <div className="col-lg-5">
          <Form
            newPlaylistName={newPlaylistName}
            newPlaylistDescription={newPlaylistDescription}
            handleNewPlaylistName={handleNewPlaylistName}
            handleNewPlaylistDescription={handleNewPlaylistDescription}
            createNewPlaylist={createNewPlaylist}
            isDisabled={isCombining || isLoading}
            isCombining={isCombining}
          />
        </div>
      </div>
    </div>
  );
}
