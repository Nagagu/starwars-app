interface Cursor {
  firstCursor: {
    edges: [
      {
        cursor: String;
      }
    ];
  };
  lastCursor: {
    edges: [
      {
        cursor: String;
      }
    ];
  };
}

export default Cursor;
