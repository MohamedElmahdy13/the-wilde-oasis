import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
// import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled, { css } from 'styled-components';
import { useOutsideClick } from '../hooks/useOutside';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  color: var(--color-grey-700);

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}
  &:hover {
    background-color: var(--color-grey-100);
    color: var(--color-grey-700);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: inherit;

    ${(props) =>
      props.active &&
      css`
        color: inherit;
      `}
  }
`;

const StyledList = styled.ul`
  position: absolute;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  z-index: 10;
  width: 18rem;
  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 2rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState('');
  const close = () => setOpenId('');
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{
        openId,
        open,
        close,
        position,
        setPosition,
      }}
    >
      <div>{children}</div>
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);
  // const [isActive, setActive] = useState(false);
  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest('button').getBoundingClientRect();

    const tableRect = e.target
      .closest('[role = table]')
      .getBoundingClientRect();

    setPosition({
      x: rect.x - tableRect.right + rect.width,
      y: 32 + 8,
    });
    // setPosition({
    //   x: window.innerWidth - rect.width - rect.x,
    //   y: rect.y + rect.height + 8,
    // });
    // console.log(rect);

    openId === '' || openId !== id ? open(id) : close();
  }

  return (
    <StyledToggle active={openId === id} onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}
function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close, false);
  if (openId !== id) return null;
  return (
    <StyledList ref={ref} position={position}>
      {children}
    </StyledList>
  );
  // return createPortal(
  //   <StyledList position={position}>{children}</StyledList>,
  //   document.body
  // );
}
function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);
  function handleClick() {
    onClick?.();
    close();
  }
  return (
    <li>
      <StyledButton onClick={handleClick}>
        <span>{icon}</span>
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.List = List;
Menus.Toggle = Toggle;
Menus.Button = Button;
export default Menus;
