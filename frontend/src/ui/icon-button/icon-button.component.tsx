import styled from 'styled-components';
import { ACCENT_COLOR, ACCENT_HOVER_COLOR } from '../../constants/colors';
import { glassCss } from '../common-styles';

export enum ButtonDesign {
  primary = 'primary',
  secondary = 'secondary',
  danger = 'danger',
}

export type ButtonType = 'default' | 'contained';

interface IStyledButtonProps {
  color?: keyof typeof ButtonDesign;
}

const Container = styled.div`
  ${glassCss}
  border-radius: 50%;
`;

const StyledButton = styled.button<IStyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  padding: 8px;
  margin: 0;
  outline: none;
  border: none;
  background: transparent;

  &:focus,
  &:active {
    outline: none;
  }

  svg {
    color: ${({ color }) =>
      color === ButtonDesign.danger ? '#a05657' : ACCENT_COLOR};
  }

  &:hover {
    svg {
      color: ${({ color }) =>
        color === ButtonDesign.danger ? '#cf4547' : ACCENT_HOVER_COLOR};
    }
  }
`;

interface IIconButtonProps extends IStyledButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: ButtonType;
}

export const IconButton = ({
  onClick,
  children,
  type,
  ...rest
}: IIconButtonProps) => {
  const iconBtn = (
    <StyledButton onClick={onClick} {...rest}>
      {children}
    </StyledButton>
  );

  return type === 'contained' ? <Container>{iconBtn}</Container> : iconBtn;
};
