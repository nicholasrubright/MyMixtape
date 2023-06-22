"use client";
import { useEffect, useState } from "react";
import Form from "./Mixer/Form";
import Playlists from "./Playlist/Playlists";
import { Playlist, PlaylistMapping } from "@/types/models";
import { api } from "@/api/mixtape.api";
import {
  createPlaylistMapping,
  getSelectedPlaylists,
  remapPlaylistMapping,
} from "@/utils/playlists";
import { useMixtapeContext } from "@/context/mixtape";
import Alert from "../shared/Alert";

export function Mixer(props: MixerProps) {
  const { token } = props;

  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");
  const [newPlaylistDescription, setNewPlaylistDescription] =
    useState<string>("");
  const [selectedPlaylists, setSelectedPlaylists] = useState<PlaylistMapping>(
    {}
  );
  const [userId, setUserId] = useState<string>("");
  const [maxPlaylists, setMaxPlaylists] = useState(-1);
  const [isCombining, setIsCombining] = useState<boolean>(false);

  const { combineAlert, setCombineAlert } = useMixtapeContext();

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

      await api.combinePlaylist(
        {
          playlist_ids: ids,
          name: newPlaylistName,
          description: newPlaylistDescription,
          user_id: userId,
        },
        token
      );
      setIsCombining(false);
      setCombineAlert(true);

      setTimeout(() => {
        setCombineAlert(false);
      }, 8000);
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
      const userPlaylistsResponse = await api.getUserPlaylists(token, 0, 20);
      const tempPlaylists: Playlist[] = [];
      userPlaylistsResponse.items.forEach((item) => {
        tempPlaylists.push({
          id: item.id,
          name: item.name,
          images: item.images,
        });
      });

      setMaxPlaylists(userPlaylistsResponse.total);

      setPlaylists(tempPlaylists);
      setMapping();

      const userProfileResponse = await api.getUserProfile(token);
      setUserId(userProfileResponse.id);
    };

    getData();
  }, [token]);

  const getMoreData = async (offset: number, limit: number) => {
    const response = await api.getUserPlaylists(token, offset, limit);
    setPlaylists([...playlists, ...response.items]);
    setMapping();
  };

  return (
    <div className="container px-4 py-5">
      {combineAlert && (
        <div className="row">
          <Alert message={"Playlist has been created."} />
        </div>
      )}
      <div className="row">
        <div className="col-lg-7">
          <Playlists
            playlists={playlists}
            selectedPlaylists={selectedPlaylists}
            selectPlaylist={selectPlaylist}
            getMoreData={getMoreData}
            maxPlaylists={maxPlaylists}
          />
        </div>
        <div className="col-lg-5">
          <Form
            newPlaylistName={newPlaylistName}
            newPlaylistDescription={newPlaylistDescription}
            handleNewPlaylistName={handleNewPlaylistName}
            handleNewPlaylistDescription={handleNewPlaylistDescription}
            createNewPlaylist={createNewPlaylist}
            isCombining={isCombining}
          />
        </div>
      </div>
    </div>
  );
}

interface MixerProps {
  token: string;
}
