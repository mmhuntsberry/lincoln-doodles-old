import styled from "styled-components";

const CheckoutButtonStyles = styled.button`
  background: var(--white);
  color: var(--black);
  border: 4px solid var(--black);
  padding: var(--spacing-200) var(--spacing-600);
  border-radius: 50px;
  cursor: pointer;
  font-size: var(--fs-400);
  font-weight: var(--weight-300);
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.5s;
  &[disabled] {
    opacity: 0.5;
  }
`;

export default CheckoutButtonStyles;
