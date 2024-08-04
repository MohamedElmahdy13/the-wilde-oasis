import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import { useOutsideClick } from './../hooks/useOutside';

const StyledModal = styled.div`
  max-width: 125rem;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.25);
  position: absolute;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  top: 50%;
  left: 50%;

  @media (max-width: 1145px) {
    display: block;
    top: 0;
    left: 0;
    position: relative;
    transform: translate(0);
  }
`;

const StyledModalRoot = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;
const StyledModalContainer = styled.div`
  height: 100%;
  outline: 0;
  overflow-x: hidden;
  overflow-y: scroll;
  text-align: center;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  transition: all 0.5s;
  /* position: fixed;
  inset: 0;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s; */
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = (value) => setOpenName(value);
  return (
    <ModalContext.Provider
      value={{
        open,
        close,
        openName,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

function Open({ openWindowName, renderButton }) {
  const { open } = useContext(ModalContext);
  return renderButton(() => open(openWindowName));
}
function Window({ name, onCloseRender }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);
  if (name !== openName) return null;
  return createPortal(
    <StyledModalRoot>
      <Overlay>
        <StyledModalContainer>
          <StyledModal ref={ref}>
            <Button onClick={close}>
              <HiXMark />
            </Button>
            <div>{onCloseRender(close)}</div>
          </StyledModal>
        </StyledModalContainer>
      </Overlay>
    </StyledModalRoot>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
export default Modal;
