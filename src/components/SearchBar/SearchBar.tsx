import React from "react";
import styled from "styled-components";
// import { SearchIcon } from "@heroicons/react/outline";

export const SearchBar = () => {
  return (
    <>
      <Container>
        <Input type="text" placeholder="Character Name" />
        <SearchIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </SearchIcon>
      </Container>
    </>
  );
};

const Container = styled.div`
  color: white;
`;
const Input = styled.input`
  font-size: 0.8vw;
  padding: 10px;
  margin: 10px;
  background: #cbdbf3;
  border: none;
  border-radius: 3px;
  ::placeholder {
    color: #3230ac;
  }
`;

const SearchIcon = styled.div`
  color: white;
  padding-left: 1vw;
  cursor: pointer;
  width: 1.3vw;
  display: inline-block;
  vertical-align: middle;
`;
