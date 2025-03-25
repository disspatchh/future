import styled from 'styled-components';
import { UnstyledLink } from '../common';
import {
  ACCENT_COLOR,
  ACCENT_HOVER_COLOR,
  ACCENT_COLOR_FONT,
} from '../../constants/colors';

const StyledButton = styled.button`
  margin: 0;
  padding: 0;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.25);
  border-radius: 50%;
  background: ${ACCENT_COLOR};
  outline: none;
  border: none;
  color: ${ACCENT_COLOR_FONT};

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${ACCENT_HOVER_COLOR};
  }

  svg {
    width: 25px;
  }
`;

interface IRoundedButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEventHandler<HTMLInputElement>) => void;
  to?: string;
  title?: string; // html tooltip
}

export const RoundedButton = ({
  children,
  onClick,
  to,
  ...rest
}: IRoundedButtonProps) => {
  return (
    <UnstyledLink to={to ?? ''}>
      <StyledButton onClick={onClick} {...rest}>
        {children}
      </StyledButton>
    </UnstyledLink>
  );
};
