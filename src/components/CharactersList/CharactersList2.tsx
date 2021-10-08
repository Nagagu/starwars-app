import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useQuery, gql, QueryResult } from "@apollo/client";
import { Link } from "react-router-dom";
import People from "../../types/Character";
import AllPepopleResponse, { PageInfo } from "../../types/AllPepopleResponse";
import {
  NEXT_CHARACTERS_QUERY,
  PREVIOUS_CHARACTERS_QUERY,
  CURSORS_QUERY,
} from "../../Queries.tsx/queries";
import Cursor from "../../types/Cursor";

export const CharactersList = ({ charactersPerPage = 10 }) => {
  const cursorsQueryResult = useQuery<Cursor>(CURSORS_QUERY);

  const { data, fetchMore, loading, error } = useQuery<AllPepopleResponse>(
    NEXT_CHARACTERS_QUERY,
    {
      variables: { after: "", first: charactersPerPage },
    }
  );

  const firstCursor = cursorsQueryResult.data?.firstCursor.edges[0].cursor;
  const lastCursor = cursorsQueryResult.data?.lastCursor.edges[0].cursor;
  const hasPrevious = !data?.allPeople.edges.some(
    (o) => o.cursor == firstCursor
  );
  const hasNext = !data?.allPeople.edges.some((o) => o.cursor == lastCursor);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const charactersList = data?.allPeople?.edges ?? [];
  const items = charactersList.map((o: any) => o.node);

  return (
    <Container>
      <ListContainer>
        <ItemsList>
          {items.map((o: People) => (
            <ul>
              <li>
                <Link to={`${o.id}`}>
                  <Title>{o.name}</Title>
                </Link>
              </li>
            </ul>
          ))}
        </ItemsList>
        <ButtonsPagination>
          {hasPrevious && (
            <Button
              onClick={() =>
                fetchMore({
                  query: PREVIOUS_CHARACTERS_QUERY,
                  variables: {
                    before: data?.allPeople.pageInfo.startCursor,
                    last: charactersPerPage,
                  },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult) {
                      return previousResult;
                    }
                    const fetchMoreEdges = fetchMoreResult.allPeople.edges;

                    fetchMoreResult.allPeople.edges = [...fetchMoreEdges];
                    return { ...fetchMoreResult };
                  },
                })
              }
            >
              Prev
            </Button>
          )}

          {/* {data?.allPeople.pageInfo.hasNextPage && ( */}
          {hasNext && (
            <Button
              onClick={() =>
                fetchMore({
                  variables: {
                    after: data?.allPeople.pageInfo.endCursor,
                    first: charactersPerPage,
                  },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    if (!fetchMoreResult) {
                      return previousResult;
                    }
                    const fetchMoreEdges = fetchMoreResult.allPeople.edges;

                    fetchMoreResult.allPeople.edges = [...fetchMoreEdges];

                    return { ...fetchMoreResult };
                  },
                })
              }
            >
              Next
            </Button>
          )}
        </ButtonsPagination>
      </ListContainer>
    </Container>
  );
};

// CharactersList.propTypes = { charactersPerPage: number };

const Container = styled.div`
  width: 100%;
  height: 100%;
  font-family: "Lato", sans-serif;
  padding: 0px;
  /* margin-left: 15vw; */
  background-image: url("./img/nave.jpg");
  background-position: center;
  background-size: contain;
`;
const ItemsList = styled.div``;
const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  font-size: 1.3vh;
  background-color: #0b202894;
  padding: 4vh 0px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 1em 0 0 0;
  letter-spacing: 0.8px;
  color: #f7fb08;
  text-shadow: 2px 2px 2px #0b0c42;
`;

const ButtonsPagination = styled.div``;

const Button = styled.button`
  padding: 1vh 3vw;
  width: 9vw;
  margin: 8vh 2vw 0px;
  text-align: center;
  margin-right: 2vw;
  font-family: Arial;
  background-color: #aeb5b4;
  font-size: 1.8em;
  border-radius: 45px;
  font-weight: bold;
  cursor: pointer;
`;
