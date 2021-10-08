// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    backdrop-filter: grayscale(100%) brightness(60%) blur(1px);
    
    background: #04010cab;
    background-image: url("img/stars-background.jpg");
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  a{
    text-decoration: none;
    color: white;
   
  }

  ul{
    list-style:none;
    padding: 0px;
    margin: 0px;

  }
`;

export default GlobalStyle;
