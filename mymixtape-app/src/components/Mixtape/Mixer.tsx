"use client";
import { useEffect, useState } from "react";
import Form from "./Mixer/Form";
import Playlists from "./Playlist/Playlists";
import { Playlist, PlaylistMapping } from "@/types/models";
import { api } from "@/api/mixtape.api";
import { getPlaylistMapping, getSelectedPlaylists } from "@/utils/playlists";

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

  const handleNewPlaylistName = (e: any) => {
    setNewPlaylistName(e.target.value);
  };

  const handleNewPlaylistDescription = (e: any) => {
    setNewPlaylistDescription(e.target.value);
  };

  const createNewPlaylist = async (e: any) => {
    console.log(newPlaylistName, newPlaylistDescription);

    const ids = getSelectedPlaylists(playlists, selectedPlaylists);
    console.log(ids);

    // Client validation for now
    if (newPlaylistName !== "" && newPlaylistDescription !== "") {
      await api.combinePlaylist(
        {
          playlist_ids: ids,
          name: newPlaylistName,
          description: newPlaylistDescription,
          user_id: userId,
        },
        token
      );
    }

    setNewPlaylistName("");
    setNewPlaylistDescription("");
    const mapping = getPlaylistMapping(playlists);
    setSelectedPlaylists({ ...mapping });
  };

  const selectPlaylist = (e: any, index: string): void => {
    const updatedSelectedPlaylists = selectedPlaylists;
    updatedSelectedPlaylists[index] = !updatedSelectedPlaylists[index];
    setSelectedPlaylists({ ...updatedSelectedPlaylists });
  };

  useEffect(() => {
    const getPlaylists = async () => {
      const response = await api.getUserPlaylists(token);
      const tempPlaylists: Playlist[] = [];
      response.items.forEach((item) => {
        tempPlaylists.push({
          id: item.id,
          name: item.name,
          images: item.images,
        });
      });

      setPlaylists(tempPlaylists);
      const mapping = getPlaylistMapping(playlists);
      setSelectedPlaylists({ ...mapping });
    };

    const getUserProfile = async () => {
      const response = await api.getUserProfile(token);
      setUserId(response.id);
    };

    getPlaylists();
    getUserProfile();
  }, [token]);

  return (
    <div className="container px-4 py-5">
      <div className="row">
        <div className="col-lg-7">
          <Playlists
            playlists={playlists}
            selectedPlaylists={selectedPlaylists}
            selectPlaylist={selectPlaylist}
          />
        </div>
        <div className="col-lg-5">
          <Form
            newPlaylistName={newPlaylistName}
            newPlaylistDescription={newPlaylistDescription}
            handleNewPlaylistName={handleNewPlaylistName}
            handleNewPlaylistDescription={handleNewPlaylistDescription}
            createNewPlaylist={createNewPlaylist}
          />
        </div>
      </div>
    </div>
  );
}

interface MixerProps {
  token: string;
}
