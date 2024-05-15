/* eslint-disable react/prop-types */
import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import ButtonGroup from '../../ui/ButtonGroup';
import { useCreateCabin } from './useCreateCabin';
import Modal from './../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Spinner from './../../ui/Spinner';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(0);
  /* height: 100%; */
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const {
    image,
    maxCapacity,
    regularPrice,
    discount,
    name,
    id: cabinId,
    description,
  } = cabin;

  const { isDeleting, deleteCabin } = useDeleteCabin();

  const { isCreating, createCabin } = useCreateCabin();
  // if (isDeleting) return <Spinner type="cabin" />;

  function handleDuplicateCabin() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  if (isCreating) return <Spinner type="cabin" />;
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>-</span>
        )}
        <ButtonGroup>
          {/* <ButtonIcon onClick={handleDuplicateCabin}>
            <HiSquare2Stack />
          </ButtonIcon> */}

          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.Button
                  icon={<HiSquare2Stack />}
                  onClick={handleDuplicateCabin}
                >
                  Duplicate
                </Menus.Button>

                <Modal.Open
                  openWindowName="edit"
                  renderButton={(open) => (
                    <Menus.Button
                      disabled={isCreating}
                      icon={<HiPencil />}
                      onClick={open}
                    >
                      Edit
                    </Menus.Button>
                  )}
                />

                <Modal.Open
                  openWindowName="delete"
                  renderButton={(open) => (
                    <Menus.Button
                      disabled={isDeleting}
                      onClick={open}
                      icon={<HiTrash />}
                    >
                      Delete
                    </Menus.Button>
                  )}
                />
                {/* <Modal.Open
                  openWindowName="delete"
                  renderButton={(open) => (
                    <ButtonIcon disabled={isDeleting} onClick={open}>
                      <HiTrash />
                    </ButtonIcon>
                  )}
                /> */}
                {/* <Modal.Open
                  openWindowName="edit"
                  renderButton={(open) => (
                    <ButtonIcon onClick={open}>
                      <HiPencil />
                    </ButtonIcon>
                  )}
                /> */}
              </Menus.List>
            </Menus.Menu>

            <Modal.Window
              name="edit"
              onCloseRender={(close) => (
                <CreateCabinForm onCloseModal={close} cabinToEdit={cabin} />
              )}
            />

            <Modal.Window
              name="delete"
              onCloseRender={(close) => (
                <ConfirmDelete
                  onCloseModal={close}
                  onConfirm={() => deleteCabin(cabinId)}
                  resourceName="cabins"
                  disabled={isDeleting}
                />
              )}
            />
          </Modal>
          {/* <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleDuplicateCabin}
              >
                Duplicate
              </Menus.Button>
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Menus.List>
          </Menus.Menu> */}
        </ButtonGroup>
      </Table.Row>
    </>
  );
}

export default CabinRow;
