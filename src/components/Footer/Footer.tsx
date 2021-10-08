import React from "react";
import styled from "styled-components";

export const Footer = () => (
  <Container>
    <Logo></Logo>
    <Copyright>Natalia Garrido 2021 ©</Copyright>
  </Container>
);

const Container = styled.div`
  padding: 10px;
  margin-bottom: 0;
  color: white;
  padding: 1vh 2vw;
  background-color: grey;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  font-family: "Lato", sans-serif;
`;

const Logo = styled.div`
  width: 3vw;
  height: 6vh;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  background-image: url("./img/logo.png");
`;

const Copyright = styled.p`
  align-self: center;
`;
