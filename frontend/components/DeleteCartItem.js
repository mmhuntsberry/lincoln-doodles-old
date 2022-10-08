import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

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

  return (
    <gds-action-icon
      icon="delete"
      outlined="true"
      background-level="700"
      foreground="gray"
      foreground-level="900"
      size="40"
      onClick={deleteCartItem}
    ></gds-action-icon>
  );
}
