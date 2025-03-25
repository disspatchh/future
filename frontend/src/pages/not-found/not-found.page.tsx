import styled from 'styled-components';
import { DESCRIPTION_COLOR } from '../../constants/colors';
import NotFoundImage from '../../assets/images/not-found.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotFoundBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 50%;
`;

const Sign = styled.h3`
  font-family: Antarctic;
  font-size: 80px;
  color: ${DESCRIPTION_COLOR};
  margin: -20px;
`;

const Image = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 50%;
  height: 100vh;
  background-image: url(${NotFoundImage});
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 65%;
`;

export const NotFoundPage = () => {
  return (
    <Container>
      <NotFoundBox>
        <Sign>404</Sign>
      </NotFoundBox>
      <Image />
    </Container>
  );
};
