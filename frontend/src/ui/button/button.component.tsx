import styled from 'styled-components';
import { SVGProps } from 'react';
import {
  ACCENT_COLOR,
  ACCENT_COLOR_FONT,
  ACCENT_HOVER_COLOR,
  ACCENT_HOVER_COLOR_FONT,
  SECONDARY_COLOR,
  SECONDARY_HOVER_COLOR,
  SECONDARY_COLOR_FONT,
  DANGER_COLOR,
  DANGER_HOVER_COLOR,
  DANGER_COLOR_FONT,
} from '../../constants/colors';
import { BORDER_RADIUS } from '../../constants/margins';
import { UnstyledLink } from '../common';

export enum ButtonDesign {
  primary = 'primary',
  secondary = 'secondary',
  danger = 'danger',
}

const LETTER_SPACING = '5px';

interface IStyledButtonProps {
  design: ButtonDesign;
}

const StyledButton = styled.button`
  display: flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  padding: 10px 15px;
  letter-spacing: ${LETTER_SPACING};
  text-indent: ${LETTER_SPACING}; // необходимо для центрирования (letter-spacing сдвигает текст)
  border: none;
  border-radius: ${BORDER_RADIUS};
  box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.25);
  text-transform: lowercase;

  background: ${({ design }) =>
    design === ButtonDesign.secondary
      ? `${SECONDARY_COLOR}`
      : design === ButtonDesign.danger
      ? `${DANGER_COLOR}`
      : `${ACCENT_COLOR}`};
  color: ${({ design }) =>
    design === ButtonDesign.secondary
      ? `${SECONDARY_COLOR_FONT}`
      : design === ButtonDesign.danger
      ? `${DANGER_COLOR_FONT}`
      : `${ACCENT_COLOR_FONT}`};

  &:hover {
    color: ${({ design }) =>
      design === ButtonDesign.secondary
        ? `${SECONDARY_COLOR_FONT}`
        : design === ButtonDesign.danger
        ? `${DANGER_COLOR_FONT}`
        : `${ACCENT_HOVER_COLOR_FONT}`};

    background: ${({ design }) =>
      design === ButtonDesign.secondary
        ? `${SECONDARY_HOVER_COLOR}`
        : design === ButtonDesign.danger
        ? `${DANGER_HOVER_COLOR}`
        : `${ACCENT_HOVER_COLOR}`};
  }

  &:focus,
  &:active {
    outline: none;
  }

  > svg {
    margin-left: 4px;
  }
`;

type TSVGElementProps = React.ReactNode & SVGProps<SVGSVGElement>;

interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
  design?: keyof typeof ButtonDesign;
  to?: string;

  children?: React.ReactNode;
  style?: React.CSSProperties;
  icon?: TSVGElementProps;
}

export const Button = (props: IButtonProps) => {
  const { design, children, to, icon, ...rest } = props;
  const btn = (
    <StyledButton design={design ?? ButtonDesign.primary} {...rest}>
      {children}
      {icon ? <>{icon}</> : null}
    </StyledButton>
  );
  return to ? <UnstyledLink to={to}>{btn}</UnstyledLink> : btn;
};
