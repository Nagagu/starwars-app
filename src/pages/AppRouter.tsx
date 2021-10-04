import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/Header/Header";
import { Home } from "../pages/Home";
import { CharactersList } from "../components/CharactersList/CharactersList";
import { Footer } from "../components/Footer/Footer";
import styled from "styled-components";
import GlobalStyle from "../GlobalStyles";
import { CarouselContent } from "../components/Carousel/CarouselContent";

export const AppRouter = () => {
  return (
    <div>
      {/* <Menu menuIsOpen={menuIsOpen} /> */}
      <Router>
        <GlobalStyle />
        <div>
          <div className="navbar">
            <Header />
            <CarouselContent />
            <CharactersList />
            <Footer />
          </div>

          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/list">
              <CharactersList />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};
