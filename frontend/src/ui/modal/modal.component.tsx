import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { BORDER_RADIUS, BACKDROP } from '../../constants/margins';
import { glassCss } from '../common-styles';

const Shadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: rgb(9 19 30 / 56%);
  opacity: 0.7;
  z-index: 4;
`;

const Container = styled.div`
  ${glassCss}

  position: fixed;
  top: 30%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;

  display: flex;
  flex-direction: column;
  width: fit-content;
  max-width: 500px;
  padding: 6px;

  color: #acb7cf;
  font-size: 15px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px;
  font-size: 18px;
  font-weight: 600;
`;

export const Content = styled.div`
  overflow: auto;
  padding: 0px 40px;
`;

export const Footer = styled.div`
  display: flex;
  padding: 8px;
  justify-content: space-around;
  padding: 16px;
`;

export interface IModalProps {
  isOpen?: boolean;
  toggle: () => void;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}

export const Modal = ({
  isOpen = false,
  toggle,
  title,
  footer,
  children,
}: IModalProps) => {
  return (
    isOpen &&
    ReactDOM.createPortal(
      <>
        <Shadow onClick={toggle} />
        <Container>
          {title && <Title>{title}</Title>}
          {children && <Content>{children}</Content>}
          {footer && <Footer>{footer}</Footer>}
        </Container>
      </>,
      document.getElementById('root')
    )
  );
};
