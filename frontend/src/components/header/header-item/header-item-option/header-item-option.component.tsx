import styled from 'styled-components';
import { IRoute } from '../../../../routes/routes';
import { UnstyledLink } from '../../../../ui/common';
import {
  ACCENT_HOVER_COLOR,
  ACCENT_HOVER_COLOR_FONT,
} from '../../../../constants/colors';

const StyledHeaderItemOption = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;

  color: #afb7c5;
  font-weight: 500;
  font-size: 15px;

  &:hover {
    background: ${ACCENT_HOVER_COLOR};
    color: ${ACCENT_HOVER_COLOR_FONT};
  }
`;

interface IHeaderItemOptionProps extends Omit<IRoute, 'Component'> {}

export const HeaderItemOption = ({ path, name }: IHeaderItemOptionProps) => {
  return (
    <UnstyledLink to={path}>
      <StyledHeaderItemOption>{name}</StyledHeaderItemOption>
    </UnstyledLink>
  );
};
