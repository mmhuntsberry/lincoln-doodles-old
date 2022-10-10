import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import Doodle from "./Doodle";
import { perPage } from "../config";

export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      description
      price
      photo {
        image {
          id
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductsListStyle = styled.ul`
  display: grid;
  /* grid-template-columns: 350px 350px 350px; */
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-template-rows: 350px;
  grid-gap: 8px;
  padding: 0;
  justify-content: center;
  li {
    list-style: none;
  }
  /* 
  background: url(/underwater.png) no-repeat;
  background-position: bottom right;
  background-size: 40%; */
`;

export default function Doodles({ page }) {
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <ProductsListStyle>
      {data.allProducts.map((d) => (
        <Doodle key={d.id} product={d} />
      ))}
    </ProductsListStyle>
  );
}
