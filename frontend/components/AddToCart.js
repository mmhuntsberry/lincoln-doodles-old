import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";
import { CURRENT_USER_QUERY } from "../components/User";
import { useCart } from "../lib/CartState";

const AddToCartStyles = styled.button`
  background: var(--green-500);
  color: var(--white);
  border: none;
  padding: 1rem;
  width: 90%;
  margin: 0 auto 1rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: var(--fs-300);
  text-transform: uppercase;

  &:disabled {
    opacity: 0.75;
  }
`;

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
      quantity
      product {
        name
      }
    }
  }
`;
export default function AddToCart({ id }) {
  const { toggleOpen, isOpen } = useCart();
  const [addToCart, { data, error, loading }] = useMutation(
    ADD_TO_CART_MUTATION,
    {
      variables: {
        id,
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  return (
    <AddToCartStyles
      disabled={loading}
      type="button"
      onClick={() => {
        addToCart();

        if (!isOpen) {
          toggleOpen();
        }
      }}
    >
      Add{loading && "ing"} To Cart
    </AddToCartStyles>
  );
}
