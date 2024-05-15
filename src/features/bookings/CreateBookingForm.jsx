import Form from '../../ui/Form';
import Input from './../../ui/Input';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import Select from '../../ui/Select';

function CreateBookingForm({ onCloseModal }) {
  /**
   * {"id":302,"created_at":"2024-05-06T13:56:12.049+00:00","startDate":"2024-05-27T00:00:00","endDate":"2024-05-28T00:00:00","numNights":1,"numGuests":1,"status":"checked-out","totalPrice":450,"cabins":{"name":"004"},"guests":{"email":"maria@example.com","fullName":"Maria Gomez"}}
   *
   */

  const options = [
    { label: 'mohamed', value: 'mohamed' },
    { label: 'ahmed', value: 'ahmed' },
  ];
  return (
    <Form>
      <FormRow label="Select guest">
        <Select type="white" id="chooseGuest" options={options} />
      </FormRow>

      <FormRow label="Maximum capacity">
        <Input type="number" id="maxCapacity" />
      </FormRow>
      <FormRow label="Regular price">
        <Input type="number" id="regularPrice" />
      </FormRow>
      <FormRow label="Add Discount">
        <Input type="number" id="addDiscount" />
      </FormRow>
      <FormRow label="Total Amount">
        <Input type="number" id="totalAmount" />
      </FormRow>

      <FormRow>
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
