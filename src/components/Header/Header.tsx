import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { SearchBar } from "../SearchBar/SearchBar";
import { LastVisits } from "../LastVisits/LastVisits";
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
            <Logo></Logo>
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
            <LastVisits />
          </NavLink>
        </NavLinkContainer>
        <NavLinkContainer>
          <NavLink
            activeClassName="active"
            className="nav-item nav-link"
            exact
            to="/list"
          >
            Characters
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
const Logo = styled.div`
  width: 5vw;
  height: 8vh;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("./img/logo.png");
`;

const NavLinkContainer = styled.div`
  padding: 1vh 3vw;
  align-self: center;
`;
