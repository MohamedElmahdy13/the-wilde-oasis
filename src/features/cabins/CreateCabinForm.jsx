import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import { Textarea } from '../../ui/Textarea';
import FormRow from './../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editID, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editID);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isWorking = isCreating || isEditing;

  function onFormSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image['0'];
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editID },
        { onSuccess: () => onCloseModal?.() },
        { onError: reset() }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }
  function onFormError(err) {
    // console.log(err);
  }

  return (
    <Form
      type={onCloseModal ? 'modal' : 'regular'}
      onSubmit={handleSubmit(onFormSubmit, onFormError)}
    >
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is requierd',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is requierd',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is requierd',
            min: { value: 1, message: 'Capacity should be at least 1' },
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="Discount"
          {...register('discount', {
            required: 'This field is requierd',
            min: { value: 0 },
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              'Discount should be less than regular price',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is requierd',
          })}
          disabled={isWorking}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors?.description?.message}>
        <FileInput
          accept="image/*"
          id="image"
          type="file"
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        <Button
          onClick={() => onCloseModal?.()}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
