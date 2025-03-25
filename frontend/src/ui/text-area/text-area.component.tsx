import React from 'react';
import { css } from 'styled-components';
import styled from 'styled-components';
import { DANGER_COLOR } from '../../constants/colors';
import { inputCss } from '../common-styles';

interface IStyledInputProps {
  width?: number;
  error: boolean;
}

const StyledTextArea = styled.textarea<IStyledInputProps>`
  ${inputCss}
  min-height: 140px;
  padding-top: 10px;
  width: ${({ width }) => (width ? `${width}px` : '')};
  ${({ error }) => (error ? `border-color: ${DANGER_COLOR}` : '')}
`;

export interface ITextAreaProps
  extends Omit<JSX.IntrinsicElements['textarea'], 'ref'> {
  width?: number;
  className?: string;
  error?: string;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  ({ className, width, error, ...rest }, ref) => {
    return (
      <StyledTextArea
        width={width}
        error={Boolean(error)}
        ref={ref}
        {...rest}
      />
    );
  }
);
