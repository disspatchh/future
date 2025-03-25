import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { UnstyledLink } from '../common';
import {
  ACCENT_COLOR,
  ACCENT_COLOR_FONT,
  ACCENT_HOVER_COLOR,
  ACCENT_HOVER_COLOR_FONT,
  MAIN_TITLE_COLOR,
} from '../../constants/colors';
import { Links } from '../../components/links';

const PADDING = '10px';

export type IDrawerItem = {
  to: string;
  title?: React.ReactNode;
};

type IItemBoxProps = {
  selected?: boolean;
};

type IDrawerItemProps = IDrawerItem & IItemBoxProps;

const ItemBox = styled.div<IItemBoxProps>`
  width: 100%;
  padding: ${PADDING};
  box-sizing: border-box;
  font-size: 14px;

  background: ${(props) => (props.selected ? `${ACCENT_COLOR}` : 'inherit')};
  color: ${(props) =>
    props.selected ? `${ACCENT_COLOR_FONT}` : `${MAIN_TITLE_COLOR}`};
  font-weight: 500;
  box-shadow: ${(props) =>
    props.selected ? '-1px 2px 4px 0 rgba(0, 0, 0, 0.15)' : 'none'};

  &:hover {
    background: ${ACCENT_HOVER_COLOR};
    color: ${ACCENT_HOVER_COLOR_FONT};
  }
`;

const DrawerItem = (props: IDrawerItemProps) => {
  const { title, to, selected = false } = props;

  return (
    <UnstyledLink to={to}>
      <ItemBox selected={selected}>{title}</ItemBox>
    </UnstyledLink>
  );
};

export interface IDrawer {
  title?: string;
  items?: IDrawerItem[];
  to?: string;
}

const Box = styled.nav`
  position: fixed;
  height: 100vh;
  background: linear-gradient(-180deg, #212d3e 0%, #1d2530 100%);
  padding-top: 60px;
  font-weight: 500;
  box-sizing: border-box;
`;

const Title = styled.h4`
  font-size: 15px;
  color: ${MAIN_TITLE_COLOR};
  padding: ${PADDING};
  margin: 0 0 10px 0;
  overflow: hidden;
  transform: translate(-20px);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translate(0);
    color: ${ACCENT_HOVER_COLOR};

    & > span {
      opacity: 1;
    }
  }
`;

const Arrow = styled.span`
  opacity: 0;
  transition: all 0.2s ease-out;
`;

export const Drawer = (props: IDrawer) => {
  const { title, items, to } = props;
  const { pathname } = useLocation();
  return (
    <Box>
      {title && (
        <UnstyledLink
          to={to || pathname.substring(0, pathname.lastIndexOf('/'))}
        >
          <Title>
            <Arrow>←</Arrow> {title}
          </Title>
        </UnstyledLink>
      )}
      {items?.map((item) => (
        <DrawerItem {...item} key={item.to} />
      ))}
      <Links />
    </Box>
  );
};
