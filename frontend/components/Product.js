import Link from "next/link";
import { useEffect } from "react";

import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import AddToCart from "./AddToCart";
import DeleteProduct from "./DeleteProduct";
// import "@nielsen-media/gds-icons/lib/src/index";

const ProductsItemStyle = styled.li`
  list-style: none;
  background: white;
  border: 1px solid var(--gray-100);
  box-shadow: var(--shadow-200);
  position: relative;
  display: flex;
  flex-direction: column;

  p {
    line-height: var() (--lh-200);
    font-weight: var(--weight-100);
    flex-grow: 1;
    padding: 0 var(--spacing-800);
    font-size: var(--fs-400);
  }

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  h3 {
    margin: 0 var(--spacing-400);
    text-align: center;
    transform: skew(-5deg) rotate(-1deg);
    margin-top: 0;
    text-shadow: 4px 4px 0 rgba(0, 0, 0, 0.1);

    a {
      background: var(--green-500);
      display: inline;
      font-size: var(--fs-600);
      text-align: center;
      color: white;
      padding: 0 1rem;
    }
  }
`;

const ProductsImageStyle = styled.img`
  height: 200px;
`;

const ProductsPriceStyle = styled.span`
  background: var(--green-500);
  transform: rotate(3deg);
  color: var(--white);
  font-weight: var(--weight-200);
  padding: var(--spacing-200);
  line-height: var(--lh-0);
  font-size: var(--fs-700);
  display: inline-block;
  position: absolute;
  top: -3px;
  right: -3px;
`;

const ButtonGroupStyles = styled.div`
  position: absolute;
  margin: 1rem;
`;
export default function Product({ product }) {
  useEffect(() => {
    // if (product.photo.image) return;

    import("@nielsen-media/gds-icons/lib/src/index");
  }, []);

  return (
    <ProductsItemStyle>
      <ProductsImageStyle
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <h3>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </h3>
      <ProductsPriceStyle>{formatMoney(product.price)}</ProductsPriceStyle>
      <p>{product.description}</p>
      <ButtonGroupStyles>
        <Link
          href={{
            pathname: "/update",
            query: {
              id: product.id,
            },
          }}
        >
          <gds-icon
            icon="edit"
            outlined="true"
            background="gray"
            background-level="100"
            foreground="green"
            foreground-level="700"
            size="40"
          ></gds-icon>
        </Link>
        <DeleteProduct id={product.id}>
          <gds-icon
            icon="delete"
            outlined="true"
            background="gray"
            background-level="100"
            foreground="green"
            foreground-level="700"
            size="40"
          ></gds-icon>
        </DeleteProduct>
      </ButtonGroupStyles>
      <AddToCart id={product.id} />
    </ProductsItemStyle>
  );
}
