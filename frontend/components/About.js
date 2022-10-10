// import { useQuery } from "@apollo/client";
// import gql from "graphql-tag";
import styled from "styled-components";
import Image from "next/image";

const ContainerStyles = styled.div`
  display: grid;
  grid-gap: 16px;
  justify-content: center;
  padding: 32px 0 32px;

  @media (min-width: 1024px) {
    grid-gap: 24px;
    grid-template-columns: max-content 480px;
    /* width: 100%; */
    justify-content: center;
    height: 100%;
    align-items: start;
    padding-top: 128px;
    background: url(/sleog.png) no-repeat;
    background-position: bottom right;
    background-size: 400px;
  }
`;

const ImageStyles = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  @media (min-width: 768px) {
    height: 600px;
  }
`;

const TextStyles = styled.p`
  margin: 0;
  line-height: normal;
  max-width: 480px;
`;

export default function Home() {
  return (
    <>
      <ContainerStyles>
        <ImageStyles src="/lincoln.png" alt="Link Huntsberry" />
        <TextStyles>
          Hi I'm Lincoln! Thank you for stopping by and showing your support.
          For those of you that are not familiar with the term “Neurodiverse”,
          my goal is to help spread awareness as well as establish a culture
          that empowers neurodiverse individuals within the art community. This
          platform is designed to be a safe place that will help strengthen and
          nurture my identity.
        </TextStyles>
      </ContainerStyles>
      {/* <ImageStyles src="/sleog.png" width="400" height="500" /> */}
    </>
  );
}
