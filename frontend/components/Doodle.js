import Link from "next/link";
import { useEffect } from "react";

import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import AddToCart from "./AddToCart";
import DeleteProduct from "./DeleteProduct";
// import "@nielsen-media/gds-icons/lib/src/index";

const ProductsItemStyle = styled.li`
  cursor: pointer;
  list-style: none;
  background: white;
  border: 1px solid var(--gray-100);
  box-shadow: var(--shadow-200);
  position: relative;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  transition: opacity 0.25s ease-in-out;

  &:hover img {
    opacity: 0.9;
    filter: blur(3px);
  }

  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    transition: opacity 0.25s ease-in-out;
  }
`;

const ProductsImageStyle = styled.img`
  /* height: 200px; */
`;

export const ProductsPriceStyle = styled.span`
  color: var(--white);
  font-weight: var(--weight-200);
  padding: var(--spacing-200);
  line-height: var(--lh-0);
  font-size: var(--fs-500);
`;

const OverlayStyles = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  grid-template-rows: min-content 1fr;
  justify-content: space-between;
  position: absolute;
  opacity: 0;
  height: 100%;
  width: 100%;
  padding: var(--spacing-400) var(--spacing-400);
  transition: opacity 0.25s ease-in-out;

  h3 {
    margin: 0;
    white-space: nowrap;
  }

  p {
    grid-column: 1 / -1;
    line-height: var(--lh-0);
    align-self: center;
  }

  &:hover {
    color: white;
    background-color: black;
    opacity: 0.5;
  }
`;

export default function Product({ product }) {
  useEffect(() => {
    // if (product.photo.image) return;
    // import("@nielsen-media/gds-icons/lib/src/index");
  }, []);

  return (
    <Link href={`/doodle/${product.id}`}>
      <ProductsItemStyle>
        <ProductsImageStyle
          src={product.photo.image.publicUrlTransformed}
          alt={product.name}
        />

        <OverlayStyles>
          <h3>{product.name}</h3>
          <ProductsPriceStyle>{formatMoney(product.price)}</ProductsPriceStyle>
          <p>{product.description}</p>
        </OverlayStyles>
      </ProductsItemStyle>
    </Link>
  );
  // return (
  //   <ProductsItemStyle>
  //     <ProductsImageStyle
  //       src={product.photo.image.publicUrlTransformed}
  //       alt={product.name}
  //     />
  //     <h3>
  //       <Link href={`/product/${product.id}`}>{product.name}</Link>
  //     </h3>
  //     <ProductsPriceStyle>{formatMoney(product.price)}</ProductsPriceStyle>
  //     <p>{product.description}</p>
  //     <ButtonGroupStyles>
  //       <Link
  //         href={{
  //           pathname: "/update",
  //           query: {
  //             id: product.id,
  //           },
  //         }}
  //       >
  //         <gds-icon
  //           icon="edit"
  //           outlined="true"
  //           background="gray"
  //           background-level="100"
  //           foreground="green"
  //           foreground-level="700"
  //           size="40"
  //         ></gds-icon>
  //       </Link>
  //       <DeleteProduct id={product.id}>
  //         <gds-icon
  //           icon="delete"
  //           outlined="true"
  //           background="gray"
  //           background-level="100"
  //           foreground="green"
  //           foreground-level="700"
  //           size="40"
  //         ></gds-icon>
  //       </DeleteProduct>
  //     </ButtonGroupStyles>
  //     <AddToCart id={product.id} />
  //   </ProductsItemStyle>
  // );
}
