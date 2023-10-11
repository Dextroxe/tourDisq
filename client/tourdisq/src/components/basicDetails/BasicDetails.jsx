import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";
import { Group, Select, TextInput, Button, Box, Textarea, NumberInput } from "@mantine/core"

const BasicDetails = ({
  propertyDetails,
  setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const form = useForm({
    initialValues: {
      country: propertyDetails?.title,
      city: propertyDetails?.description,
      address: propertyDetails?.price,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) => (value < 1000 ? "Must be greater than 999" : null),
    },
  });

  const { title, description, price } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({ ...prev, title, description, price }));
      nextStep();
    }
  };

  return (
    <Box maw="50%" mx="auto" my="md">
    <form  onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}>
      <TextInput
        withAsterisk
        label="Title"
        placeholder="Property Name"
        {...form.getInputProps("title")}
      />
      <Textarea
        placeholder="Description"
        label="Description"
        withAsterisk
        {...form.getInputProps("description")}
      />
      <NumberInput
        withAsterisk
        label="Budget"
        placeholder="1000"
        min={0}
        {...form.getInputProps("price")}
      />
      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit">
          Next step
        </Button>
      </Group>
    </form>
  </Box>
  );
};

export default BasicDetails;
