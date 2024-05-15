import styled from 'styled-components';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.5rem 2rem;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  & input,
  & textarea {
    ${(props) => props.isValid && `border: 1px solid var(--color-red-700)`}
  }
  /* & input,
  & textarea {
    ${(props) => props.isValid === undefined && `border: 1px solid green`}
  } */
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.p`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
function FormRow({ label, error, children }) {
  return (
    <StyledFormRow isValid={error}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;