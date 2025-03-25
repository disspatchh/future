import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { routes } from '../../routes/routes';
import { STANDARD_PADDING } from '../../constants/margins';
import { HeaderItem } from './header-item';

const Nav = styled.nav`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  top: 0;
  right: 0;
  padding: ${STANDARD_PADDING};
`;

const HeaderItemList = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style-type: none;
  margin: 0;
`;

export const HeaderComponent = () => {
  const { pathname } = useLocation();
  return (
    <Nav>
      <HeaderItemList>
        {routes
          .filter((it) => it.name)
          .map((route) => (
            <HeaderItem
              key={route.path}
              isCurrentRoute={pathname.startsWith(route.path)}
              {...route}
            />
          ))}
      </HeaderItemList>
    </Nav>
  );
};
