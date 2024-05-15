import CreateCabinForm from './CreateCabinForm';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CabinTable from './CabinTable';

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <Row>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </Row>
//   );
// }

// export default AddCabin;

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open
          openWindowName="cabin-form"
          renderButton={(open) => <Button onClick={open}>Add new Cabin</Button>}
        ></Modal.Open>
        <Modal.Window
          name="cabin-form"
          onCloseRender={(close) => <CreateCabinForm onCloseModal={close} />}
        ></Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
