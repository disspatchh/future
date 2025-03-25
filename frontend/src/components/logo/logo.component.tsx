import styled from 'styled-components';
import LogoSvg from '../../assets/icons/logo.svg?react';
import { UnstyledLink } from '../../ui/common';

const StyledLogo = styled(LogoSvg)`
  width: 60px;
  height: 60px;
`;

interface ILogoProps {
  className?: string;
}

export const Logo = ({ className }: ILogoProps) => {
  return (
    <UnstyledLink to='/' className={className}>
      <StyledLogo />
    </UnstyledLink>
  );
};
