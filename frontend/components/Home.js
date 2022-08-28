// import { useQuery } from "@apollo/client";
// import gql from "graphql-tag";
import styled from "styled-components";
import Image from "next/image";

// import Image from "../assets/syd.png";
// import Product from "./Product";
// import { perPage } from "../config";

// export const ALL_PRODUCTS_QUERY = gql`
//   query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
//     allProducts(first: $first, skip: $skip) {
//       id
//       name
//       description
//       price
//       photo {
//         image {
//           id
//           publicUrlTransformed
//         }
//       }
//     }
//   }
// `;
const ContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  justify-content: end;
  height: 100%;
  align-items: center;
`;

const ImageStyles = styled(Image)`
  position: absolute;
  bottom: 0;
`;

const TitleStyles = styled.h2`
  margin: 0;
`;

export default function Home() {
  // const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
  //   variables: {
  //     skip: page * perPage - perPage,
  //     first: perPage,
  //   },
  // });
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
  return (
    <ContainerStyles>
      <TitleStyles>Lincoln Doodles</TitleStyles>
      <ImageStyles src="/syd.png" width={500} height={500} />
    </ContainerStyles>
  );
}
