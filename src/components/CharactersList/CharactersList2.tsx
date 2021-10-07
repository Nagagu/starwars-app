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
        {hasPrevious && (
          <button
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
            Previous
          </button>
        )}

        {/* {data?.allPeople.pageInfo.hasNextPage && ( */}
        {hasNext && (
          <button
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
          </button>
        )}
      </ItemsList>
    </Container>
  );
};

// CharactersList.propTypes = { charactersPerPage: number };

const Container = styled.div`
  width: 100%;
  font-family: "Lato", sans-serif;
  margin: 2vh 0px;
  padding: 0px;
`;

const ItemsList = styled.div`
  width: 70%;
  margin-left: 15vw;
  background-color: #6b8581;
`;

const Title = styled.h1`
  margin: 1em 0 0 0;
  letter-spacing: 0.8px;
`;

const NextButton = styled.button`
  background-color: white;
`;
