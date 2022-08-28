import { Form } from "./styles/components/FormStyles";
import useForm from "../lib/useForm";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import DisplayError from "./Error";
import { useRouter } from "next/router";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const router = useRouter();

  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    // refetch the current user
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const error =
    data?.authenticateUserWithPassword.__typename ===
    "UserAuthenticationWithPasswordFailure"
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form
      method="POST"
      onSubmit={async (e) => {
        e.preventDefault();
        // Send email and password to gql api
        const res = await signin();
        resetForm();

        if (res?.data?.authenticateUserWithPassword?.item?.id) {
          router.push("/");
        }
      }}
    >
      <h2>Sign in!</h2>
      <DisplayError error={error} />
      <fieldset>
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
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="password"
            placeholder="Your Password Here..."
            onChange={handleChange}
            value={inputs.password}
            required
          />
        </label>
        <button type="submit">Sign In</button>
      </fieldset>
    </Form>
  );
}
