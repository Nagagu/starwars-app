interface Character {
  id: string;
  name: string;
  gender: string;
  height: number;
  birthyear: string;
  homeworld: {
    name: string;
  };
  filmConnection: {
    films: [
      {
        title: string;
      }
    ];
  };
}
export default Character;
