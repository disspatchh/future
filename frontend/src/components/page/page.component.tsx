import { styled } from 'styled-components';
import { Drawer, IDrawer } from '../../ui/drawer';
import { Feedback } from '../feedback';
import { MAIN_TITLE_COLOR } from '../../constants/colors';
import { STANDARD_PADDING } from '../../constants/margins';

const WIDTH = '240px';

const WithDrawer = styled.div`
  display: flex;
  > *:first-child {
    width: ${WIDTH};
  }
  > *:last-child {
    margin-left: ${WIDTH};
  }
`;

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type Align = 'center' | undefined;

interface IBoxProps {
  align?: Align;
  direction?: FlexDirection;
}

const Box = styled.div<IBoxProps>`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  margin-top: 120px;

  // center alignment
  align-items: ${({ direction, align }) =>
    direction === 'column' && align ? 'center' : ''};
`;

interface IPageBodyProps {
  direction?: FlexDirection;
  width?: number;
  align?: Align;
}

export const PageBody = styled.div<IPageBodyProps>`
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-direction: ${(props) => props.direction ?? 'row'};
  gap: 40px 40px;

  width: ${({ width }) => (width ? `${width}px` : '')};

  margin-bottom: 130px;
  padding: 0 100px;
`;

interface IPageTitleProps {
  title?: React.ReactNode;
  description?: string;
}

export const PageTitle = ({ title, description }: IPageTitleProps) => {
  return (
    <TitleBox>
      {typeof title === 'string' ? <Title>{title}</Title> : title}
      <Description>{description}</Description>
    </TitleBox>
  );
};

const MenuContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: ${STANDARD_PADDING};
  z-index: 2;
`;

interface IPageProps {
  drawer?: IDrawer;
  title?: React.ReactNode;
  description?: string;
  menu?: React.ReactNode | boolean;
  width?: number;

  className?: string;
  children?: React.ReactNode;
  direction?: FlexDirection;
  align?: Align;
}

export const Page = (props: IPageProps) => {
  const {
    drawer,
    title,
    description,
    menu,
    width,
    direction,
    align,
    children,
    ...rest
  } = props;
  const box = (
    <Box align={align} direction={direction} {...rest}>
      <PageTitle title={title} description={description} />
      <PageBody direction={direction} width={width}>
        {children}
      </PageBody>
      {menu === null ? undefined : (
        <MenuContainer>{menu ? menu : <Feedback />}</MenuContainer>
      )}
    </Box>
  );

  return drawer ? (
    <WithDrawer>
      <Drawer {...drawer} />
      {box}
    </WithDrawer>
  ) : (
    box
  );
};

const TitleBox = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;
  align-items: flex-start;
  max-width: 800px;
  padding: 0 100px;
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  text-align: left;
  color: ${MAIN_TITLE_COLOR};
  font-family: 'Antarctic';
`;

export const Description = styled.p`
  margin-top: -20px;
  margin-bottom: 40px;
  color: #8797ab;
  font-size: 15px;
  font-weight: 500;
`;
