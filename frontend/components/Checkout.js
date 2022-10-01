import { useState } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import CheckoutButtonStyles from "./styles/components/CheckoutButtonStyles";
import nProgress from "nprogress";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useCart } from "../lib/CartState";
import { CURRENT_USER_QUERY } from "./User";

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    checkout(token: $token) {
      id
      charge
      total
      items {
        id
        name
      }
    }
  }
`;

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  padding: var(--spacing-400);
  display: grid;
  grid-gap: var(--spacing-400);
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  const router = useRouter();
  const { closeOpen } = useCart();

  async function handleSubmit(e) {
    // Stop form from submitting
    e.preventDefault();

    // Turn loader on
    setLoading(true);

    // Start page transition
    nProgress.start();

    // Create payment method via stripe (token come back if successful)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    console.log(paymentMethod);

    // Handle any errors from stripe
    if (error) {
      setError(error);
      nProgress.done();
      return; // Stop checkout from happening
    }

    // Send token from to keystone server via custom mutation
    const order = await checkout({
      variables: {
        token: paymentMethod.id,
      },
    });
    console.log("Finished with the order");
    console.log(order);
    // chage page to view orders
    router.push({
      pathname: `/order/[id]`,
      query: {
        id: order.data.checkout.id,
      },
    });
    // Close cart
    closeOpen();
    // Turn loader off
    setLoading(false);
    nProgress.done();
  }
  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && (
        <p style={{ fontSize: "24px", color: "red", fontWeight: "bold" }}>
          {error.message}
        </p>
      )}
      {graphQLError && (
        <p style={{ fontSize: "24px", color: "red", fontWeight: "bold" }}>
          {graphQLError.message}
        </p>
      )}
      <CardElement></CardElement>
      <CheckoutButtonStyles>Checkout!</CheckoutButtonStyles>
    </CheckoutFormStyles>
  );
}

export default function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}
