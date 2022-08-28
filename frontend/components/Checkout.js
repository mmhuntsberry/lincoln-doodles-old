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

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log("We gots some work to do!");

    nProgress.start();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    console.log(paymentMethod);

    if (error) {
      setError(error);
    }

    setLoading(false);
    nProgress.done();
  }
  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: "20px" }}>{error.message}</p>}
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
