"use client";
import CombineButton from "@/components/controls/CombineButton";
import FormLayout from "@/components/layouts/FormLayout";
import NameField from "./Fields/NameField";
import DescriptionField from "./Fields/DescriptionField";
import { useState } from "react";

export default function CombineForm() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleName = (e: any) => {
    setName(e.target.value);
  };

  const handleDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const handleCombineButton = (e: any) => {
    e.preventDefault();
    console.log("Name: ", name);
    console.log("Description: ", description);
  };

  return (
    <FormLayout
      submitButton={<CombineButton handleCombineButton={handleCombineButton} />}
    >
      <NameField name={name} handleName={handleName} />
      <DescriptionField
        description={description}
        handleDescription={handleDescription}
      />
    </FormLayout>
  );
}
