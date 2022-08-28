import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import useForm from "../lib/useForm";
import DisplayError from "./Error";
import { Form } from "./styles/components/FormStyles";

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct() {
  const router = useRouter();
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id: router.query.id,
    },
  });

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  const { inputs, handleChange, clearForm, resetForm } = useForm(
    data?.Product || {
      name: "",
      description: "",
      price: "",
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id: router.query.id,
            name: inputs.name,
            price: inputs.price,
            description: inputs.description,
          },
        });
        // submit inputs to backend
        // const res = await createProduct();
        // clearForm();

        // // Go to product page
        // router.push({
        //   pathname: `/product/${res.data.createProduct.id}`,
        // });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            placeholder="Name"
            value={inputs.name}
            required
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            onChange={handleChange}
            placeholder="Price"
            value={+inputs.price}
            required
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="Enter a product description..."
            onChange={handleChange}
            value={inputs.description}
          ></textarea>
        </label>

        <button type="submit">Update product</button>
      </fieldset>
    </Form>
  );
}
