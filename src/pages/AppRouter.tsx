import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Home } from "../pages/Home";
import { CharactersList } from "../components/CharactersList/CharactersList2";
import { Footer } from "../components/Footer/Footer";
import styled from "styled-components";
import GlobalStyle from "../GlobalStyles";
import { CarouselContent } from "../components/Carousel/CarouselContent";
import { CharacterDetail } from "../components/CharacterDetail/CharacterDetail";
import { Context } from "../Contexts/Context";
import { useState } from "react";

export const AppRouter = () => {
  const [lastCharacters, setLastCharacters] = useState(
    localStorage.getItem("lastCharacters") === "null"
      ? null
      : localStorage.getItem("lastCharacters")
  );

  return (
    <Context.Provider value={{ lastCharacters: lastCharacters }}>
      {/* <Menu menuIsOpen={menuIsOpen} /> */}
      <Router>
        <GlobalStyle />
        <div>
          <Container>
            <Header />

            <Switch>
              <Route path="/list" component={CharactersList} />
              <Route path="/:id" component={CharacterDetail} />
              <Route path="/" component={Home} />
            </Switch>
            {/* <CharactersList /> */}

            <Footer />
          </Container>
        </div>
      </Router>
    </Context.Provider>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  /* background-color: #04010cab; */
  padding: 0px;
`;
