import Button from '../../ui/Button';
import Modal from './../../ui/Modal';
import CreateBookingForm from './CreateBookingForm';
function AddBooking() {
  return (
    <Modal>
      <Modal.Open
        openWindowName="booking-form"
        renderButton={(open) => <Button onClick={open}>Add new Booking</Button>}
      ></Modal.Open>
      <Modal.Window
        name="booking-form"
        onCloseRender={(close) => <CreateBookingForm onCloseModal={close} />}
      ></Modal.Window>
    </Modal>
  );
}

export default AddBooking;
