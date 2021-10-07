import React from "react";
import CharacterItem from "../../types/CharacterItem";
import styled from "styled-components";
import { Link } from "react-router-dom";

export const LastVisits = () => {
  const lastCharactersAsJson = localStorage.getItem("lastCharacters") ?? "[]";
  let lastCharacters: CharacterItem[] = JSON.parse(lastCharactersAsJson);
  return (
    <Container>
      {/* {lastCharacters.map((o) => (
        <ul>
          <li>{o.name}</li>
        </ul>
      ))} */}
      <ol>
        {lastCharacters.map((o, i) => (
          <li>
            <Link to={`${o.id}`}>{o.name}</Link>
          </li>
        ))}
      </ol>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  font-family: "Lato", sans-serif;
  margin: 2vh 0px;
`;
