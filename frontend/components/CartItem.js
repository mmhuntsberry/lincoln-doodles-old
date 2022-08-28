import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import DeleteCartItem from "./DeleteCartItem";

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--green-500);
  display: grid;
  grid-template-columns: auto 1fr min-content;

  img {
    margin-right: 1rem;
    /* height: 100px; */
    width: 100px;
  }

  h3,
  p {
    margin: 0;
    line-height: 1;
  }

  p {
    font-size: var(--fs-200);
    font-style: italic;
    color: var(--gray-600);
  }
`;

export default function CartItem({ cartItem: item }) {
  if (!item.product) return null;
  return (
    <CartItemStyles>
      <img
        src={item.product?.photo.image.publicUrlTransformed}
        alt={item.product?.photo.image.name}
      />

      <div>
        <h3>{item.product?.name}</h3>
        <p>
          {formatMoney(item.product?.price * item.quantity)} -
          <em> &times; {formatMoney(item.product?.price) + " each"}</em>
        </p>
      </div>

      <DeleteCartItem id={item.id}>
        <gds-icon
          icon="delete"
          outlined="true"
          background="green"
          background-level="700"
          foreground="gray"
          foreground-level="100"
          size="32"
        ></gds-icon>
      </DeleteCartItem>
    </CartItemStyles>
  );
}
