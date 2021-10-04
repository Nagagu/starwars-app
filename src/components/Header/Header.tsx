import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { SearchBar } from "../SearchBar/SearchBar";
// import logo from "../img/logo.png";

export const Header = () => {
  return (
    <>
      <Container>
        <NavLinkContainer>
          <NavLink
            activeClassName="active"
            className="nav-item nav-link"
            exact
            to="/home"
          >
            {/* <Logo src={logo}></Logo> */}
          </NavLink>
        </NavLinkContainer>
        <NavLinkContainer>
          <SearchBar />
        </NavLinkContainer>
        <NavLinkContainer>
          <NavLink
            activeClassName="active"
            className="nav-item nav-link"
            exact
            to="/home"
          >
            Last views
          </NavLink>
        </NavLinkContainer>
        <NavLinkContainer>
          <NavLink
            activeClassName="active"
            className="nav-item nav-link"
            exact
            to="/characterslist"
          >
            Characters List
          </NavLink>
        </NavLinkContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  /* background-color: #04010cab; */
  padding: 0px;
`;
const Logo = styled.img`
  /* background-image: url(${"img/logo.png"}); */
`;

const NavLinkContainer = styled.div`
  padding: 2vh 3vw;
  align-self: center;
`;