/// <reference types="vite-plugin-svgr/client" />

import styled from 'styled-components';
import TgIcon from '../../assets/icons/tg-circle.svg?react';
import VkIcon from '../../assets/icons/vk.svg?react';
import DzenIcon from '../../assets/icons/dzen.svg?react';
import { ACCENT_COLOR, ACCENT_HOVER_COLOR } from '../../constants/colors';
import { STANDARD_PADDING } from '../../constants/margins';

const IMAGE_WIDTH = '30px';

const Box = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 30px;
  left: 30px;
  right: ${STANDARD_PADDING};
  z-index: 1;

  a {
    display: inline-block;
    margin-right: 20px;
  }

  svg {
    width: ${IMAGE_WIDTH};
    fill: ${ACCENT_COLOR};

    :hover {
      fill: ${ACCENT_HOVER_COLOR};
    }
  }
`;

interface ILinksProps {
  className?: string;
}

export const Links = ({ className }: ILinksProps) => {
  return (
    <Box className={className}>
      <a href='https://t.me/paideuma' target='_blank'>
        <TgIcon />
      </a>
      <a href='https://vk.com/club221565186' target='_blank'>
        <VkIcon />
      </a>
      <a href='https://dzen.ru/id/661bfd21a8e5ee6a9abdcce1' target='_blank'>
        <DzenIcon />
      </a>
    </Box>
  );
};
