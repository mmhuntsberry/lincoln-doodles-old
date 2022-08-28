import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

const ButtonStyles = styled.button`
  border: 0;
  background: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DELETE_CART_ITEM_MUTATION = gql`
  mutation DELETE_CART_ITEM_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function DeleteCartItem({ id, children }) {
  console.log(id);
  const [deleteCartItem, { loading, error, data }] = useMutation(
    DELETE_CART_ITEM_MUTATION,
    {
      variables: {
        id,
      },
      update,
    }
  );

  console.log({ data });
  return (
    <ButtonStyles
      title="Remove item from cart"
      disabled={loading}
      onClick={deleteCartItem}
    >
      {children}
    </ButtonStyles>
  );
}
