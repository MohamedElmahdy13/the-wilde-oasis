import styled from 'styled-components';

const StyledCheckbox = styled.input`
  &[type='checkbox'] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-brand-600);
  }

  &[type='checkbox']:disabled {
    accent-color: var(--color-brand-600);
  }
`;

export default StyledCheckbox;
