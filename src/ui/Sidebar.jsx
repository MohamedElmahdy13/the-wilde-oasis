import styled from 'styled-components';
import Logo from './Logo';
import MainNav from './MainNav';
import { AiOutlineMenu } from 'react-icons/ai';
import ButtonIcon from './ButtonIcon';
import { useState } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  overflow: hidden;
  height: 100%;
  transition: all 400ms;
  @media (max-width: 769px) {
    /* display: none; */
    ${(props) => props.type === 'closed' && 'height: 110px'}
  }
`;

const HeaderWapperMini = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & button {
    display: none;

    @media (max-width: 769px) {
      display: block;
    }
  }
`;

function Sidebar() {
  const [isCollapse, setIsCollaps] = useState(true);

  return (
    <StyledSidebar type={isCollapse ? 'closed' : 'opened'}>
      <HeaderWapperMini>
        <Logo />
        <ButtonIcon onClick={() => setIsCollaps((val) => !val)}>
          {isCollapse ? <AiOutlineMenu /> : <HiOutlineXMark />}
        </ButtonIcon>
      </HeaderWapperMini>
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
/*
Extra small	None	<576px
Small	sm	≥576px
Medium	md	≥768px
Large	lg	≥992px
Extra large	xl	≥1200px
Extra extra large	xxl	≥1400px
*/
