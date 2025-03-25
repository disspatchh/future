import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { inputCss } from '../common-styles';
import { DANGER_COLOR } from '../../constants/colors';

interface IStyledInputProps {
  width?: number;
  error: boolean;
}

const StyledInput = styled.input<IStyledInputProps>`
  ${inputCss}
  height: 40px;
  width: ${({ width }) => (width ? `${width}px` : '')};
  ${({ error }) => (error ? `border-color: ${DANGER_COLOR}` : '')}
`;

export interface IInputProps
  extends Omit<JSX.IntrinsicElements['input'], 'ref'> {
  width?: number;
  className?: string;
  error?: string;
}

// <HTMLInputElement, Omit<JSX.IntrinsicElements['input'], 'ref'>>

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ width, error, ...rest }, ref) => {
    return (
      <StyledInput ref={ref} error={Boolean(error)} width={width} {...rest} />
    );
  }
);
