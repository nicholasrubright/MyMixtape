"use client";
import CombineButton from "@/components/controls/CombineButton";
import FormLayout from "@/components/layouts/FormLayout";
import NameField from "./Fields/NameField";
import DescriptionField from "./Fields/DescriptionField";
import { useContext, useState } from "react";
import { PlaylistContext } from "@/context/PlaylistContext";

type NameField = {
  value: string;
  hasError: boolean;
};

type DescriptionField = {
  value: string;
  hasError: boolean;
};

export default function CombineForm() {
  const context: any = useContext(PlaylistContext);

  const { combinePlaylists } = context;

  const [name, setName] = useState<NameField>({
    value: "",
    hasError: false,
  });
  const [description, setDescription] = useState<DescriptionField>({
    value: "",
    hasError: false,
  });

  const handleName = (e: any) => {
    setName({
      ...name,
      value: e.target.value,
    });
  };

  const handleDescription = (e: any) => {
    setDescription({ ...description, value: e.target.value });
  };

  const handleCombineButton = (e: any) => {
    e.preventDefault();

    let invalid = false;

    if (name.value.length === 0) {
      console.log("Please enter name");
      invalid = true;
      setName({
        ...name,
        hasError: true,
      });
    } else {
      setName({
        ...name,
        hasError: false,
      });
    }

    if (description.value.length === 0) {
      console.log("please enter description");
      invalid = true;
      setDescription({
        ...description,
        hasError: true,
      });
    } else {
      setDescription({
        ...description,
        hasError: false,
      });
    }

    if (!invalid) {
      console.log("Combine Playlist!");
      combinePlaylists(name.value, description.value);
    }
  };

  return (
    <FormLayout
      submitButton={<CombineButton handleCombineButton={handleCombineButton} />}
    >
      <NameField
        name={name.value}
        hasError={name.hasError}
        handleName={handleName}
      />
      <DescriptionField
        description={description.value}
        hasError={description.hasError}
        handleDescription={handleDescription}
      />
    </FormLayout>
  );
}
