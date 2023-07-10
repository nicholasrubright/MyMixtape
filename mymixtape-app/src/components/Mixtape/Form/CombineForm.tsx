import CombineButton from "@/components/controls/CombineButton";
import FormLayout from "@/components/layouts/FormLayout";
import NameField from "./Fields/NameField";
import DescriptionField from "./Fields/DescriptionField";

export default function CombineForm(props: FormProps) {
  return (
    <FormLayout submitButton={<CombineButton />}>
      <NameField />
      <DescriptionField />
    </FormLayout>
  );
}

interface FormProps {}
