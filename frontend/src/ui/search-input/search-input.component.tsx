import styled from 'styled-components';
import { Input, IInputProps } from '../../ui/input';

const Container = styled.div`
  display: inline-block;
  position: relative;

  & > input {
    padding-right: 40px;
  }

  &::after {
    content: '';
    display: block;
    width: 23px;
    height: 23px;
    background: transparent url('../../assets/icons/search.svg');
    position: absolute;
    top: 10px;
    right: 12px;
    z-index: 1;
  }
`;

const StyledInput = styled(Input)``;

interface SearchInputProps extends IInputProps {}

export const SearchInput = (props: SearchInputProps) => {
  return (
    <Container>
      <StyledInput {...props} />
    </Container>
  );
};
