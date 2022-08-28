import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import Head from "next/head";
import DisplayError from "./Error";
import styled from "styled-components";
import AddToCart from "./AddToCart";
import Link from "next/link";
import DeleteProduct from "./DeleteProduct";
import formatMoney from "../lib/formatMoney";

const ProductStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  grid-auto-flow: column;
  max-width: var(--max-width);
  align-items: top;
  grid-gap: var(--spacing-800);

  img {
    width: 100%;
    object-fit: contain;
  }

  h2 {
    margin: 0;
  }

  p {
    line-height: normal;
    margin-top: 0;
  }
`;

const ButtonGroupStyles = styled.div`
  display: flex;
  gap: 8px;
  /* grid-template-columns: max-content max-content; */
`;

const LinkStyles = styled.a`
  background: var(--white);
  color: var(--black);
  border: 4px solid var(--black);
  padding: var(--spacing-200) var(--spacing-600);
  border-radius: 50px;
  cursor: pointer;
  font-size: var(--fs-400);
  font-weight: var(--weight-300);
  text-transform: uppercase;
  text-decoration: none;

  a:hover {
    text-decoration: none;
  }
  /* &:disabled {
    opacity: 0.75;
  } */
`;

export const ProductsPriceStyle = styled.span`
  color: var(--black);
  font-weight: var(--weight-200);
  line-height: var(--lh-0);
  font-size: var(--fs-500);
`;

const DetailsHeaderStyles = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

  const { id, name, price, description, photo } = data?.Product;
  console.log({ id });
  return (
    <ProductStyles>
      <Head>
        <title>Link draws | {name}</title>
      </Head>
      <img src={photo.image.publicUrlTransformed} alt={photo.altText} />
      <div className="details">
        <DetailsHeaderStyles>
          <h2>{name}</h2>
          <ProductsPriceStyle>{formatMoney(price)}</ProductsPriceStyle>
        </DetailsHeaderStyles>
        <p>{description}</p>
        <AddToCart id={id} />
        <ButtonGroupStyles>
          <Link
            href={{
              pathname: "/update",
              query: {
                id: id,
              },
            }}
          >
            <LinkStyles>Edit</LinkStyles>
          </Link>
          <DeleteProduct id={id}>Delete</DeleteProduct>
        </ButtonGroupStyles>
      </div>
    </ProductStyles>
  );
}
