import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import useForm from "../lib/useForm";
import DisplayError from "./Error";
import { ALL_PRODUCTS_QUERY } from "./Doodles";
import { Form } from "./styles/components/FormStyles";
import { useRouter } from "next/router";

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # Which variables are getting passed in
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      name
      price
      description
    }
  }
`;

export default function CreateProduct() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: "",
    image: "",
    price: 0,
    description: "",
  });

  const [createProduct, { data, error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  const router = useRouter();

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // submit inputs to backend
        const res = await createProduct();
        clearForm();

        // Go to product page
        router.push({
          pathname: `/doodle/${res.data.createProduct.id}`,
        });
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
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
        <label htmlFor="image">
          Photo
          <input
            type="file"
            name="image"
            id="image"
            required
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ Add doodle</button>
      </fieldset>
    </Form>
  );
}
