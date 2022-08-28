import { Form } from "./styles/components/FormStyles";
import useForm from "../lib/useForm";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { CURRENT_USER_QUERY } from "./User";
import DisplayError from "./Error";
import { useRouter } from "next/router";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    createUser(data: { email: $email, name: $name, password: $password }) {
      id
      name
      email
    }
  }
`;

export default function SignUp() {
  const router = useRouter();

  const { inputs, handleChange, resetForm } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [signup, { data, loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
  });

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
      <h2>Sign up!</h2>
      <DisplayError error={error} />
      {data?.createUser ? (
        <p>
          Signed up with {data.createUser.email} - Please Go Ahead and Sign in!
        </p>
      ) : (
        <fieldset>
          <label htmlFor="name">
            Name
            <input
              type="name"
              name="name"
              id="name"
              placeholder="Your Name Here..."
              autoComplete="name"
              onChange={handleChange}
              value={inputs.name}
              required
            />
          </label>
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
      )}
    </Form>
  );
}
