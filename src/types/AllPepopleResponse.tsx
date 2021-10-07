interface AllPepopleResponse {
  allPeople: {
    pageInfo: PageInfo;
    edges: [
      {
        node: {
          name: String;
          id: String;
          gender: String;
          homeworld: {
            name: String;
          };
        };
        cursor: String;
      }
    ];
  };
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor: String;
  endCursor: String;
}
export default AllPepopleResponse;
