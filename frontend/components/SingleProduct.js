import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import Head from "next/head";
import DisplayError from "./Error";
import styled from "styled-components";

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--max-width);
  align-items: top;
  grid-gap: var(--spacing-400);

  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      id
      photo {
        id
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct() {
  const { query } = useRouter();

  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id: query.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { name, price, description, photo } = data?.Product;
  console.log({ name, price, description, photo });
  return (
    <ProductStyles>
      <Head>
        <title>Link draws | {name}</title>
      </Head>
      <img src={photo.image.publicUrlTransformed} alt={photo.altText} />
      <div className="details">
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </ProductStyles>
  );
}
