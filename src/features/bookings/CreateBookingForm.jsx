import Form from '../../ui/Form';
import Input from './../../ui/Input';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import { useCabins } from '../cabins/useCabins';
import { useGetGuests } from './useGetGuests';
import Spinner from './../../ui/Spinner';
import { useForm, useWatch } from 'react-hook-form';
import StyledSelect from './../../ui/UnControlledSelect';
import StyledCheckbox from '../../ui/UnControledCheckBox';
import { subtractDates } from '../../utils/helpers';
import { useSettings } from '../settings/useSettings';
import { useCreateBooking } from './useCreateBooking';
import { FormGroup } from './../../ui/FormGroup';

function CreateBookingForm({ onCloseModal }) {
  const { cabins: totalCabins, isLoading } = useCabins();
  const { guests: totalGuests, isLoading2 } = useGetGuests();
  const { settings, isLoading: isLoading3 } = useSettings();
  const { isCreating, createBooking } = useCreateBooking();
  const defaultInDate = new Date(Date.now()).toISOString().split('T')[0];
  const defaultOutDate = new Date(Date.now() + 24 * 60 * 60 * 1000 * 3)
    .toISOString()
    .split('T')[0];
  const values = {
    cabinId: totalCabins?.at(0).id,
    guestId: totalGuests?.at(0).id,
    startDate: defaultInDate,
    endDate: defaultOutDate,
    numGuests: 1,
    numNights: subtractDates(defaultOutDate, defaultInDate),
    hasBreakfast: false,
    cabinPrice: 0,
    extrasPrice: 0,
    addDiscount: 0,
    totalPrice: 0,
    status: false,
  };
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setValue,
    control,
    reset,
  } = useForm({
    values,
  });

  // const [total, setTotal] = useState(0);
  const findCabin = (id) => totalCabins.find((c) => c.id === id);
  const [
    cabinsState,
    numNightsState,
    extrasPriceState,
    numGuestsState,
    breakfastState,
    discountState,
  ] = useWatch({
    control,
    name: [
      'cabinId',
      'numNights',
      'test',
      'numGuests',
      'hasBreakfast',
      'addDiscount',
    ],
  });

  const { errors } = formState;
  if (isLoading2 || isLoading || isLoading3) return <Spinner />;

  const guestsOptions = totalGuests.map((g) => ({
    email: g.email,
    id: g.id,
    fullName: g.fullName,
  }));
  const cabinsOptions = totalCabins.map((c) => ({
    name: c.name,
    id: c.id,
  }));

  const { breakfastPrice, minBookingLength, maxBookingLength } = settings;

  const calcCabinPrice =
    +numNightsState * findCabin(+cabinsState)?.regularPrice;
  setValue('cabinPrice', calcCabinPrice);

  // setValue('extrasPrice', calcextrasPrice);

  const calcExtras =
    (breakfastState ? breakfastPrice : 0) * (+numGuestsState * +numNightsState);
  setValue('extrasPrice', calcExtras);
  const total = calcCabinPrice - +discountState + calcExtras;
  setValue('totalPrice', total);

  function handleCreateBooking(data) {
    const { status, addDiscount, ...rest } = data;

    const booking = {
      ...rest,
      status: status || 'unconfirmed',
    };

    createBooking(booking, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
  }
  function handleCreateBookingErrors(error) {
    console.log(errors);
  }

  return (
    <Form
      onSubmit={handleSubmit(handleCreateBooking, handleCreateBookingErrors)}
    >
      <FormGroup>
        <FormRow label="Select guest" error={errors?.guestId?.message}>
          <StyledSelect
            id="guestId"
            {...register('guestId', {
              required: true,
            })}
          >
            {guestsOptions.map(({ id, email, fullName }) => (
              <option key={id} value={id}>
                {email}
              </option>
            ))}
          </StyledSelect>
        </FormRow>
        <FormRow label="Select cabin" error={errors?.cabins?.message}>
          <StyledSelect
            id="cabinId"
            {...register('cabinId', {
              onChange: (e) => {
                // totalPrice(e);
              },
            })}
          >
            {cabinsOptions.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </StyledSelect>
        </FormRow>
      </FormGroup>
      <FormRow label="Arriving date" error={errors?.startDate?.message}>
        <Input
          aria-label="Date"
          type="date"
          id="startDate"
          {...register('startDate', {
            required: 'This field is required',
            min: {
              value: defaultInDate,
              message: 'Date should be after today',
            },
          })}
        />
      </FormRow>
      <FormRow label="Leaving date" error={errors?.endDate?.message}>
        <Input
          aria-label="Date"
          type="date"
          id="endDate"
          {...register('endDate', {
            required: 'This field is required',

            validate: (value) => {
              const numOfDays = subtractDates(value, getValues().startDate);
              return (
                (numOfDays >= minBookingLength &&
                  numOfDays <= maxBookingLength) ||
                `Minmum reservation 2 nights and max is ${maxBookingLength}`
              );
            },
            onChange: () => {
              setValue(
                'numNights',
                subtractDates(getValues().endDate, getValues().startDate)
              );
            },
          })}
        />
      </FormRow>
      <FormGroup>
        <FormRow label="Number of guests" error={errors?.numGuests?.message}>
          <Input
            type="number"
            id="numGuests"
            {...register('numGuests', {
              // validate: (value) => {
              //   const { maxCapacity } = findCabin(+getValues().cabinId);
              //   return (
              //     +value <= maxCapacity ||
              //     `Number of Guests should be less than ${maxCapacity}
              //   `
              //   );
              // },
              min: { value: 1, message: `Should be greater than 1` },
              max: {
                value: findCabin(+getValues().cabinId).maxCapacity,
                message: `Max Capacity is ${
                  findCabin(+getValues().cabinId).maxCapacity
                }`,
              },
            })}
          />
        </FormRow>
        <FormRow label="Number of nights" error={errors?.numNights?.message}>
          <Input
            type="number"
            id="numNights"
            disabled
            {...register('numNights', {
              required: 'This field is requierd',
              min: { value: 2, message: 'Capacity should be at least 2' },
            })}
          />
          {/* callc automatically */}
        </FormRow>
      </FormGroup>
      <FormRow label="Add breakfast" error={errors?.hasBreakfast?.message}>
        <StyledCheckbox
          type="checkbox"
          id="breakfast"
          {...register('hasBreakfast')}
        />
      </FormRow>

      <FormRow label="Cabin price" error={errors?.cabinPrice?.message}>
        <Input
          type="number"
          id="cabinPrice"
          disabled
          defaultValue={1}
          {...register('cabinPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormGroup>
        <FormRow label="ExtrasPrice" error={errors?.extrasPrice?.message}>
          <Input
            type="number"
            id="extrasPrice"
            disabled
            defaultValue={1}
            {...register('extrasPrice', {
              required: 'This field is required',
            })}
          />
        </FormRow>
        <FormRow
          label="Add Discount 50% max"
          error={errors?.addDiscount?.message}
        >
          <Input
            defaultValue={0}
            type="number"
            id="addDiscount"
            {...register('addDiscount', {
              min: { value: 0, message: 'Value should be greater than 1' },
              validate: (value) =>
                +value <= +getValues().cabinPrice / 2 ||
                'Discount should be less than half regular price',
            })}
          />
        </FormRow>
      </FormGroup>

      <FormRow label="Total Amount" error={errors?.totalPrice?.message}>
        <Input
          type="number"
          id="totalPrice"
          disabled
          {...register('totalPrice', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormGroup>
        <FormRow label="Checked in" error={errors?.totalPrice?.message}>
          <StyledCheckbox
            type="checkbox"
            id="status"
            name="status"
            value="checked-in"
            {...register('status', {})}
          />
        </FormRow>
        <FormRow label="Payment" error={errors?.isPaid?.message}>
          <StyledCheckbox type="checkbox" id="isPaid" {...register('isPaid')} />
        </FormRow>
      </FormGroup>
      <FormRow type="buttons">
        <Button
          onClick={() => onCloseModal?.()}
          variation="secondary"
          type="reset"
        >
          Cancel
        </Button>
        <Button>Create new booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
// const Book = {
//   id: 382,
//   created_at: '2024-05-09T12:15:32.659+00:00',
//   startDate: '2024-06-25T00:00:00',
//   endDate: '2024-07-05T00:00:00',
//   numNights: 10,
//   numGuests: 7,
//   status: 'unconfirmed',
//   totalPrice: 6050,
//   cabins: { name: '007' },
//   guests: { email: 'nina@hotmail.com', fullName: 'Nina Williams' },
// };
