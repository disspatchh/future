import { ReactNode } from 'react';
import styled from 'styled-components';
import {
  CARD_COLOR,
  CARD_FONT_COLOR,
  BORDER_COLOR,
  BORDER_HOVER_COLOR,
} from '../../constants/colors';
import { BORDER_RADIUS } from '../../constants/margins';
import { glassCss } from '../common-styles';
import { UnstyledLink } from '../common';

const Box = styled.div`
  position: relative;

  background: ${CARD_COLOR};
  padding: 20px;
  border: 1px solid ${BORDER_COLOR};
  border-radius: ${BORDER_RADIUS};
  color: ${CARD_FONT_COLOR};
  font-size: 16px;
  box-shadow: 0px 2px 4px rgba(17, 17, 17, 0.3);

  overflow: hidden;

  &:hover > nav {
    visibility: visible;
    transform: translate(0, 0px);
    opacity: 1;
  }
`;

export const CardTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 16px 0;
`;

export const CardBody = styled.p``;

const CardMenu = styled.nav`
  ${glassCss}

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row-reverse;

  padding: 8px;
  margin: 16px;
  position: absolute;
  top: 0;
  right: 0;

  transform: translate(80px, 0);
  transition: all 0.15s ease-in-out;
  opacity: 0;
  visibility: hidden;

  & > *:not(:last-child) {
    margin-left: 8px;
  }
`;

interface IBasicCardProps {
  title?: string;
  prefix?: React.ReactNode;
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  menu?: React.ReactNode;
}

export const BasicCard = (props: IBasicCardProps) => {
  const { title, prefix, children, menu, ...rest } = props;
  return (
    <Box {...rest}>
      {menu && (
        <CardMenu
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {menu}
        </CardMenu>
      )}
      {prefix}
      {title && <CardTitle>{title}</CardTitle>}
      <CardBody>{children}</CardBody>
    </Box>
  );
};

const StyledInteractiveCard = styled(BasicCard)`
  cursor: pointer;

  &:hover {
    border: 1px solid ${BORDER_HOVER_COLOR};
  }
`;

interface ICardProps extends IBasicCardProps {
  to?: string;
}

export const Card = ({ to, ...rest }: ICardProps) => {
  return (
    <UnstyledLink to={to ?? ''}>
      <StyledInteractiveCard {...rest} />
    </UnstyledLink>
  );
};
