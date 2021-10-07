import React from "react";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export const CarouselContent = () => {
  // const slides = [
  //   "img/starwarscomic1.jpg",
  //   "img/starwarscomic2.jpg",
  //   "img/starwarscomic3.jpg"
  // ]
  return (
    <Container>
      <Carousel
        autoPlay
        infiniteLoop={true}
        interval={4000}
        showThumbs={false}
        showStatus={false}
      >
        <Slide>
          <img src="./img/starwarscomic1.jpg" />
        </Slide>
        <Slide>
          <img src="./img/starwarscomic2.jpg" />
        </Slide>
        <Slide>
          <img src="./img/starwarscomic3.jpg" />
        </Slide>
      </Carousel>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  font-family: "Lato", sans-serif;
  margin: 2vh 0px;
  padding: 0px;
  /* background-color: #04010cab; */
`;

const Slide = styled.div`
  width: 70%;
  margin-left: 15vw;
`;
