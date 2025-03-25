import { useEffect } from 'react';
import styled from 'styled-components';
import { Page } from '../../components/page/page.component';
import { Button } from '../../ui/button';
import { routes } from '../../routes/routes';
import { Snow } from './snow';
import SnowImage from '../../assets/images/snow.png';
import { MAIN_TITLE_COLOR, DESCRIPTION_COLOR } from '../../constants/colors';

const CenterBox = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

const Title = styled.div`
  font-size: 82px;
  text-align: center;
  color: ${MAIN_TITLE_COLOR};
  margin-top: 7%;
  font-family: 'Antarctic';
`;

const Description = styled.div`
  font-size: 15px;
  text-align: center;
  color: ${DESCRIPTION_COLOR};
  max-width: 860px;
  margin-top: -12px;
`;

const StyledPageBox = styled(Page)`
  background-image: url(${SnowImage});
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const TitlePage = () => {
  useEffect(() => {
    Snow(document.getElementById('snow'), 150, { color: '#758091' });
  }, []);
  return (
    <StyledPageBox menu={null}>
      <CenterBox>
        <Title>Залог будущего</Title>
        <Description>
          осознание уникальности текущего момента, нашего краткого присутствия
          «здесь и теперь»
        </Description>
        <Button to={routes[1].path} style={{ marginTop: '25px' }}>
          к проектам
        </Button>
      </CenterBox>
      <canvas
        id='snow'
        style={{
          height: '80%',
          position: 'absolute',
          width: '100%',
          marginLeft: -100,
        }}
      ></canvas>
    </StyledPageBox>
  );
};
