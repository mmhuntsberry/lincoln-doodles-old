import { Form } from "./styles/components/FormStyles";
import useForm from "../lib/useForm";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import DisplayError from "./Error";
import { useRouter } from "next/router";

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const router = useRouter();

  const { inputs, handleChange, resetForm } = useForm({
    email: "",
  });

  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  return (
    <Form
      method="POST"
      onSubmit={async (e) => {
        e.preventDefault();
        // Send email and password to gql api
        const res = await signup().catch(console.error);
        resetForm();

        // router.push("/");
      }}
    >
      <h2>Forgot Password!</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link!</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email Here..."
            autoComplete="email"
            onChange={handleChange}
            value={inputs.email}
            required
          />
        </label>

        <button type="submit">Reset</button>
      </fieldset>
    </Form>
  );
}
