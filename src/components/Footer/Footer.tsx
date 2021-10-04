import React from "react";
import styled from "styled-components";

export const Footer = () => (
  <Container>
    <Logo>LOGO</Logo>
    <p>Natalia Garrido 2021 ©</p>
  </Container>
);

const Container = styled.div`
  padding: 10px;
  color: white;
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  font-family: "Lato", sans-serif;
`;

const Logo = styled.div`
  color: white;
  margin: 1em 0 0 0;
  letter-spacing: 0.8px;
`;
