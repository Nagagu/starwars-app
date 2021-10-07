import { gql } from "@apollo/client";

export const NEXT_CHARACTERS_QUERY = gql`
  query GetCharacterList($first: Int, $after: String!) {
    allPeople(first: $first, after: $after) {
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
        cursor
      }
    }
  }
`;
export const PREVIOUS_CHARACTERS_QUERY = gql`
  query GetCharacterList($last: Int, $before: String!) {
    allPeople(last: $last, before: $before) {
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
        cursor
      }
    }
  }
`;
export const CURSORS_QUERY = gql`
  {
    firstCursor: allPeople(first: 1) {
      edges {
        cursor
      }
    }
    lastCursor: allPeople(last: 1) {
      edges {
        cursor
      }
    }
  }
`;
