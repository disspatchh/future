import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePopper } from 'react-popper';
import styled from 'styled-components';
import { IRoute } from '../../../routes/routes';
import { ACCENT_COLOR, ACCENT_HOVER_COLOR } from '../../../constants/colors';
import { BORDER_RADIUS } from '../../../constants/margins';
import { HeaderItemOption } from './header-item-option';
import { glassCss } from '../../../ui/common-styles';

interface IStyledLinkProps {
  isCurrentRoute: boolean;
}

const StyledLink = styled(Link)<IStyledLinkProps>`
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: ${(p) =>
    p.isCurrentRoute ? `${ACCENT_HOVER_COLOR}` : `${ACCENT_COLOR}`};

  &:hover {
    color: inherit;
  }
`;

const StyledHeaderItem = styled.li`
  margin-left: 40px;
  color: ${ACCENT_COLOR};

  & > a:hover {
    color: ${ACCENT_HOVER_COLOR};
  }
`;

const Dropdown = styled.div`
  ${glassCss}

  visibility: hidden; // key prop!

  position: relative;
  box-sizing: border-box;
  padding: ${BORDER_RADIUS} 0;
  max-width: 240px;
  z-index: 9;

  font-size: 15px;
  text-align: left;

  &[data-show='true'] {
    visibility: visible;
  }
`;

interface IHeaderItemProps extends Omit<IRoute, 'Component'> {
  isCurrentRoute: boolean;
  children?: React.ReactNode;
}

export const HeaderItem = (props: IHeaderItemProps) => {
  const { isCurrentRoute, name, path, subroutes: subs } = props;

  const [referenceEl, setReferenceEl] = useState<HTMLElement | null>(null);
  const [popperEl, setPopperEl] = useState<HTMLElement | null>(null);
  const { styles, attributes } = usePopper(referenceEl, popperEl, {
    placement: 'bottom',
  });

  const showTooltip = () => {
    popperEl?.setAttribute('data-show', 'true');
  };

  const hideTooltip = () => {
    popperEl?.removeAttribute('data-show');
  };

  const subroutes = subs?.filter((route) => !!route.name);
  const showPopper = !!subroutes?.length;
  const itemProps = showPopper
    ? {
        ref: setReferenceEl,
        onMouseEnter: showTooltip,
        onMouseLeave: hideTooltip,
      }
    : null;

  return (
    <StyledHeaderItem {...itemProps}>
      <StyledLink to={path} isCurrentRoute={isCurrentRoute}>
        {name}
      </StyledLink>
      {showPopper && (
        <Dropdown
          ref={setPopperEl}
          style={styles.popper}
          {...attributes.popper}
        >
          {subroutes?.map((route) => (
            <HeaderItemOption {...route} key={route.path} />
          ))}
        </Dropdown>
      )}
    </StyledHeaderItem>
  );
};
