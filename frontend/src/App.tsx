import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes as _routes, flattenSubroutes } from './routes/routes';
import { HeaderComponent } from './components/header';
import styled from 'styled-components';
import { MAIN_COLOR } from './constants/colors';
import { Logo } from './components/logo';
import './App.css';

const routes = flattenSubroutes(_routes);

const StyledLogo = styled(Logo)`
  position: absolute;
  top: 40px;
  left: 40px;
`;

const MainBox = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background-color: ${MAIN_COLOR};
  background: linear-gradient(
    70deg,
    #1d2530 0%,
    #212d3e 17%,
    #1d2530 29%,
    #1d2530 64%,
    #212d3e 82%,
    #1d2530 100%
  );
`;

function App() {
  return (
    <MainBox>
      <Router>
        <HeaderComponent />
        <StyledLogo />
        <Routes>
          {routes.map((it) => {
            return (
              <Route path={it.path} Component={it.Component} key={it.path} />
            );
          })}
        </Routes>
      </Router>
    </MainBox>
  );
}

export default App;
