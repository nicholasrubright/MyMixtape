"use client";
import { useEffect, useState } from "react";
import Form from "./Mixer/Form";
import Playlists from "./Playlist/Playlists";
import { Playlist, PlaylistMapping } from "@/types/models";
import {
  createPlaylistMapping,
  getSelectedPlaylists,
  remapPlaylistMapping,
} from "@/utils/playlists";

import { UserPlaylistsResponse } from "@/types/api/response";
import MixerLayout from "../layouts/MixerLayout";

export function Mixer(props: MixerProps) {
  const { userPlaylistResponse } = props;

  const [playlists, setPlaylists] = useState<Playlist[]>([]);

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
    e.preventDefault();
    const ids = getSelectedPlaylists(playlists, selectedPlaylists);

    // Client validation for now
    if (newPlaylistName !== "" && newPlaylistDescription !== "") {
      setIsCombining(true);

      // try {
      //   if (token !== null) {
      //     // await api.combinePlaylist({ ids, newPlaylistName, newPlaylistDescription, profile.id}, token);
      //     // await api.combinePlaylist(
      //     //   token,
      //     //   {ids,
      //     //   newPlaylistName,
      //     //   newPlaylistDescription,
      //     //   profile.id}
      //     // );
      //   }
      // } catch (error) {}

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
    setPlaylists(userPlaylistResponse.items as Playlist[]);
  }, [userPlaylistResponse]);

  const getMoreData = async (offset: number, limit: number) => {
    //const response = await api.getUserPlaylists(token, offset, limit);
    //setPlaylists([...playlists, ...response.items]);
    setMapping();
  };

  return (
    <MixerLayout>
      <Playlists
        playlists={playlists}
        selectedPlaylists={selectedPlaylists}
        selectPlaylist={selectPlaylist}
        getMoreData={getMoreData}
        maxPlaylists={maxPlaylists}
        isLoading={false}
      />
      <Form
        newPlaylistName={newPlaylistName}
        newPlaylistDescription={newPlaylistDescription}
        handleNewPlaylistName={handleNewPlaylistName}
        handleNewPlaylistDescription={handleNewPlaylistDescription}
        createNewPlaylist={createNewPlaylist}
        isDisabled={isCombining || false}
        isCombining={isCombining}
      />
    </MixerLayout>
  );
}

interface MixerProps {
  userPlaylistResponse: UserPlaylistsResponse;
}
