import { useForm } from 'react-hook-form';
import Form from './../../ui/Form';
import FormRow from './../../ui/FormRow';
import Input from './../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from './../../ui/Spinner';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const { isLoading, error, settings = {} } = useSettings();

  const { id, created_at, ...rest } = settings;
  const values = { ...rest };

  const { register } = useForm({ values });

  const { isUpdating, updateSetting } = useUpdateSetting();
  if (isLoading) return <Spinner />;

  function handleUpdate(e) {
    const { value } = e.target;
    const { name: feild } = e.target;
    if (!value && feild) return;
    updateSetting({ [feild]: value });
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          name="minBookingLength"
          disabled={isUpdating}
          {...register('minBookingLength', {
            onBlur: handleUpdate,
          })}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          name="maxBookingLength"
          {...register('maxBookingLength', {
            onBlur: handleUpdate,
          })}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          name="maxGuestPerBooking"
          {...register('maxGuestPerBooking', {
            onBlur: handleUpdate,
          })}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          name="breakfastPrice"
          {...register('breakfastPrice', {
            onBlur: handleUpdate,
          })}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
