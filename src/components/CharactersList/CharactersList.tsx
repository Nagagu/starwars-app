import React from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

interface People {
  name: string;
}

interface AllPeople {}

const CHARACTERS_QUERY = gql`
  {
    allPeople(first: 10) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          name
          gender
          homeworld {
            name
          }
        }
      }
    }
  }
`;
export const CharactersList = () => {
  const { data, error, loading } = useQuery(CHARACTERS_QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!! </p>;

  const items = data.allPeople.edges.map((o: any) => o.node);

  return (
    <Container>
      {items.map((o: People) => (
        <ul>
          <li>
            <Link className="nav-item nav-link" to={`${o.name}`}>
              <Title>{o.name}</Title>
            </Link>
          </li>
        </ul>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 10px;
  background-color: #6b8581;
  font-family: "Lato", sans-serif;
`;

const Title = styled.h1`
  margin: 1em 0 0 0;
  letter-spacing: 0.8px;
`;

const Description = styled.p`
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
`;
