"use client";
import CombineButton from "@/components/controls/CombineButton";
import DescriptionField from "./Fields/DescriptionField";
import NameField from "./Fields/NameField";
import FormLayout from "@/components/layouts/FormLayout";

export default function CombineFormSkeleton() {
  return (
    <FormLayout
      submitButton={<CombineButton isLoading handleCombineButton={() => {}} />}
    >
      <NameField name={""} handleName={() => {}} isLoading />
      <DescriptionField
        description={""}
        handleDescription={() => {}}
        isLoading
      />
    </FormLayout>
  );
}
