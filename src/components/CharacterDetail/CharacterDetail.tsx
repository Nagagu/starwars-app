import React from "react";
import { RouteComponentProps } from "react-router";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import Character from "../../types/Character";
import CharacterItem from "../../types/CharacterItem";

type TParams = { id: string };

interface CharacterDetail {
  person: Character;
}

const GET_CHARACTERDETAIL = gql`
  query GetCharacterDetail($characterId: ID!) {
    person(id: $characterId) {
      name
      id
      gender
      height
      birthYear
      homeworld {
        name
      }
      filmConnection {
        films {
          title
        }
      }
    }
  }
`;

export const CharacterDetail: React.FC<RouteComponentProps<TParams>> = ({
  match,
}) => {
  const { data, error, loading } = useQuery<CharacterDetail>(
    GET_CHARACTERDETAIL,
    {
      variables: {
        characterId: match.params.id,
      },
    }
  );
  const person = data?.person;
  //Only save lastCharacters when character exists
  if (person !== undefined) {
    const lastCharactersAsJson = localStorage.getItem("lastCharacters") ?? "[]";
    let lastCharacters: CharacterItem[] = JSON.parse(lastCharactersAsJson);

    // !lastCharacters.includes(match.params.id) && lastCharacters.length < 3 ? lastCharacters.push(match.params.id) : "HH"
    if (lastCharacters.length >= 3) {
      if (lastCharacters.some((o) => o.id == person.id)) {
        lastCharacters = lastCharacters.filter((o) => o.id != match.params.id);
      } else {
        lastCharacters.shift();
      }
    }
    if (!lastCharacters.some((o) => o.id == person.id)) {
      const newPerson: CharacterItem = {
        id: person.id,
        name: person.name,
      };

      lastCharacters.push(newPerson);
    }
    var json = JSON.stringify(lastCharacters);
    localStorage.setItem("lastCharacters", json);
    console.log(lastCharacters);
  }
  return (
    <Container>
      <ItemDetail>
        {person && (
          <>
            <Title>{person.name}</Title>
            <Description>
              <ul>
                <li>Gender: {person.gender}</li>
                <li>Height: {person.height}</li>
                <li>BirthYear: {person.birthyear}</li>
                <li>Homeworld: {person.homeworld.name}</li>
                <li>
                  Films:{" "}
                  {person.filmConnection.films.map((p) => p.title + ". ")}
                </li>
              </ul>
            </Description>
          </>
        )}
      </ItemDetail>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  font-family: "Lato", sans-serif;

  background-image: url("./img/nave.jpg");
  background-position: center;
  background-size: contain;
`;

const ItemDetail = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #0b202894;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  width: 30%;
  font-size: 8vh;
  padding: 2vh 10vw;
  letter-spacing: 0.8px;
  color: #f7fb08;
  text-shadow: 2px 2px 2px #0b0c42;
`;

const Description = styled.div`
  font-size: 3vh;
  line-height: 4em;
  padding: 2vh 10vw;
  letter-spacing: 0.8px;
  color: #f7fb08;
  text-shadow: 2px 2px 2px #0b0c42;
`;
