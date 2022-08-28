import styled, { keyframes } from "styled-components";

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate 360deg; */
  }
`;

export const Form = styled.form`
  box-shadow: var(--shadow-200);
  background: var(--gray-100);
  border: var(--spacing-100);
  padding: var(--spacing-500);
  font-size: var(--fs-300);

  label {
    display: block;
    margin-bottom: var(--spacing-400);
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: var(--spacing-200);
    font-size: var(--fs-200);
    border: 1px solid var(--black);

    &:focus {
      outline: 0;
      border-color: var(--green-500);
    }
  }

  button,
  input[type="submit"] {
    cursor: pointer;
    width: auto;
    background: var(--green-500);
    color: var(--white);
    border: 0;
    font-size: var(--fs-500);
    font-weight: var(--weight-200);
    padding: var(--spacing-200) var(--spacing-500);
  }

  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }

    &::before {
      height: 10px;
      content: "";
      display: block;
      background-image: linear-gradient(
        to right,
        var(--green-500) ; 0%,
        var(--gray-200) 50%,
        var(--green-500) ; 100%
      );
    }
    &[aria-busy="true"]::before {
      background-size: 50% auto;
      animation: ${loading} 1.5s linear infinite;
    }
  }
`;
