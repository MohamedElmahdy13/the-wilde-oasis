import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { PAGE_SIZE } from '../utils/constants';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Count = styled.p`
  color: var(--color-grey-50);
  border-radius: 50%;
  background: var(--color-brand-600);
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
`;

const Buttons = styled.div`
  flex-basis: 30%;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;
function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currntPage = !searchParams.get('page') ? 1 : +searchParams.get('page');

  const pagesCount = Math.ceil(count / PAGE_SIZE);
  const handleNext = () => {
    if (currntPage !== pagesCount) searchParams.set('page', currntPage + 1);
    setSearchParams(searchParams);
  };
  const handlePrev = () => {
    if (currntPage > 1) searchParams.set('page', currntPage - 1);
    setSearchParams(searchParams);
  };

  if (pagesCount <= 1) return;
  return (
    <StyledPagination>
      <P>
        Showing <span>{(currntPage - 1) * PAGE_SIZE}</span> to{' '}
        <span>{currntPage * PAGE_SIZE > count || count}</span> of{' '}
        <span>{count}</span> results
      </P>
      <Buttons>
        <PaginationButton disabled={currntPage === 1} onClick={handlePrev}>
          <HiChevronLeft />
          <span>Prev</span>
        </PaginationButton>
        <Count>{currntPage}</Count>
        <PaginationButton
          disabled={currntPage === pagesCount || currntPage > pagesCount}
          onClick={handleNext}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
