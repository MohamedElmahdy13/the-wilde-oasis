import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import { Textarea } from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import FormRow from './../../ui/FormRow';

function CreateCabinForm({ cabinToEdit }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries({ queryKey: ['cabins'] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onFormSubmit(data) {
    mutate({ ...data, image: data.image['0'] });
  }
  function onFormError(err) {
    // console.log(err);
  }
  return (
    <Form onSubmit={handleSubmit(onFormSubmit, onFormError)}>
      <FormRow label={'Cabin name'} error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register('name', {
            required: 'This field is requierd',
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register('maxCapacity', {
            required: 'This field is requierd',
            min: { value: 1 },
            message: 'Capacity should be at least 1',
          })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register('regularPrice', {
            required: 'This field is requierd',
            min: { value: 1 },
            message: 'Capacity should be at least 1',
          })}
          disabled={isCreating}
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
          disabled={isCreating}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          id="description"
          defaultValue=""
          {...register('description', {
            required: 'This field is requierd',
          })}
          disabled={isCreating}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors?.description?.message}>
        <FileInput
          accept="image/*"
          id="image"
          type="file"
          {...register('image', {
            required: 'This field is required',
          })}
          disabled={isCreating}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
