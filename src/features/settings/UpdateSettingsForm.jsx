import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSettings } from "./useEditSettings";
import { useSettings } from "./useSettings";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { updateSettings, isUpdating } = useEditSettings();

  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;

    updateSettings({
      [field]: value,
    });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          disabled={isUpdating}
          defaultValue={minBookingLength}
          id="min-nights"
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          id="max-nights"
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          id="max-guests"
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          id="breakfast-price"
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
