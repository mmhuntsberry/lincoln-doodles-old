import styled from "styled-components";

export const LogoStyles = styled.h1`
  font-size: var(--fs-500);
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  background-color: var(--green-500);
  transform: skew(-7deg);
  white-space: nowrap;

  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 1312px) {
    font-size: 2rem;
    margin-left: 2rem;
    position: relative;
    z-index: 2;
    background-color: var(--green-500);
    transform: skew(-7deg);
  }
`;
