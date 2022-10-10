import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import Link from "next/link";
import styled from "styled-components";
import { CURRENT_USER_QUERY, useUser } from "../components/User";
import { useCart } from "../lib/CartState";
import SignIn from "./SignIn";

const AddToCartStyles = styled.button`
  background: var(--white);
  color: var(--black);
  border: 4px solid var(--black);
  padding: 1rem;
  width: 100%;
  margin: 0 auto 1rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: var(--fs-400);
  font-weight: var(--weight-300);
  text-transform: uppercase;

  &:disabled {
    opacity: 0.75;
  }
`;

const AddToCartSignedOutStyles = styled.a`
  background: var(--white);
  color: var(--black);
  border: 4px solid var(--black);
  padding: 1rem;
  width: 100%;
  margin: 0 auto 1rem;
  border-radius: 50px;
  cursor: pointer;
  font-size: var(--fs-400);
  font-weight: var(--weight-300);
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
  const me = useUser();
  const [addToCart, { data, error, loading }] = useMutation(
    ADD_TO_CART_MUTATION,
    {
      variables: {
        id,
      },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  if (!me)
    return (
      <AddToCartSignedOutStyles href="/signin">
        Add to kart
      </AddToCartSignedOutStyles>
    );
  return (
    <AddToCartStyles
      disabled={loading}
      type="button"
      onClick={() => {
        addToCart();
      }}
    >
      Add{loading && "ing"} To Kart
    </AddToCartStyles>
  );
}
