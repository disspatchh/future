import { css } from 'styled-components';
import {
  BORDER_COLOR,
  ACCENT_COLOR,
  DARK_COLOR,
  PLACEHOLDER_COLOR,
} from '../constants/colors';
import { BORDER_RADIUS, BACKDROP } from '../constants/margins';

export const inputCss = css`
  font-size: 16px;

  padding: 0 12px;
  background: ${DARK_COLOR};
  border: 1px solid ${BORDER_COLOR};
  border-radius: ${BORDER_RADIUS};
  box-shadow: none;
  outline: none;
  color: ${ACCENT_COLOR};

  &:focus {
    border: 1px solid ${ACCENT_COLOR};
  }

  &::placeholder {
    color: ${PLACEHOLDER_COLOR};
  }
`;

export const GLASS_BACKGROUND = 'rgb(80 94 118 / 60%)';
export const GLASS_BORDER = '1px solid #4d5968';
export const GLASS_BOX_SHADOW = '0px 6px 4px rgba(19, 19, 19, 0.1)';

export const glassCss = css`
  background: ${GLASS_BACKGROUND};
  border: ${GLASS_BORDER};
  border-radius: ${BORDER_RADIUS};
  backdrop-filter: blur(${BACKDROP});
  box-shadow: ${GLASS_BOX_SHADOW};
`;
