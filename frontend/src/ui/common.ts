import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const UnstyledLink = styled(Link)`
  display: block;
  margin: 0;
  padding: 0;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
  }
`;
