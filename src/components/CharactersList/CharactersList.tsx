import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import People from "../../types/Character";
import AllPepopleResponse, { PageInfo } from "../../types/AllPepopleResponse";

const CHARACTERS_QUERY = gql`
  query GetCharacterList($endcursor: String!, $startcursor: String!) {
    allPeople(first: 10, after: $endcursor, before: $startcursor) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
      edges {
        node {
          name
          id
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
  const initialPaginationObject: PageInfo = {
    hasNextPage: false,
    hasPreviousPage: false,
    startCursor: "",
    endCursor: "",
  };
  debugger;
  const [pageInfo, setPageInfo] = useState(initialPaginationObject);
  const { data, error, loading, fetchMore } = useQuery<AllPepopleResponse>(
    CHARACTERS_QUERY,
    {
      variables: {
        endcursor: pageInfo.endCursor,
        startcursor: pageInfo.startCursor,
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!! </p>;

  const charactersList = data?.allPeople?.edges ?? [];

  const items = charactersList.map((o: any) => o.node);

  const handleNextButton = () => {
    setPageInfo(data?.allPeople?.pageInfo ?? initialPaginationObject);
  };

  return (
    <Container>
      {items.map((o: People) => (
        <ul>
          <li>
            <Link to={`${o.id}`}>
              <Title>{o.name}</Title>
            </Link>
          </li>
        </ul>
      ))}
      {data?.allPeople.pageInfo.hasNextPage && (
        <NextButton
          onClick={() => {
            fetchMore({
              variables: {
                cursor: data.allPeople.pageInfo.endCursor,
              },
              updateQuery: (prev, { fetchMoreResult }) => {
                debugger;
                return fetchMoreResult ?? prev;
              },
            });
          }}
        >
          Next
        </NextButton>
      )}
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

const NextButton = styled.button`
  background-color: white;
`;
