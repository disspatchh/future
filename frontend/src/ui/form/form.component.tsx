import styled from 'styled-components';
import { STANDARD_FORM_WIDTH } from '../../constants/margins';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${STANDARD_FORM_WIDTH}px;

  & > * {
    margin-bottom: 24px;
  }
`;

interface IFormProps {
  children?: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
}

export const Form = ({ children, onSubmit, ...rest }: IFormProps) => {
  return (
    <StyledForm onSubmit={onSubmit} {...rest}>
      {children}
    </StyledForm>
  );
};
