import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import styled from "styled-components";

const ButtonStyles = styled.button`
  background: var(--white);
  color: var(--black);
  border: 4px solid var(--black);
  padding: 1rem;
  width: 90%;
  border-radius: 50px;
  cursor: pointer;
  font-size: var(--fs-400);
  font-weight: var(--weight-300);
  text-transform: uppercase;
  text-decoration: none;

  a:hover {
    text-decoration: none;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteProduct, { loading, error }] = useMutation(
    DELETE_PRODUCT_MUTATION,
    {
      variables: {
        id,
      },
      update,
    }
  );
  return (
    <ButtonStyles
      disabled={loading}
      onClick={() => {
        if (confirm("Are you sure you want to delete this item?")) {
          // delete item
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </ButtonStyles>
  );
}
