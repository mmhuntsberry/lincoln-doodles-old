import styled from "styled-components";

export const SideNavStyles = styled.ul`
  display: none;
  @media (min-width: 768px) {
    grid-area: sidenav;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-self: start;
    justify-content: center;
    margin-right: var(--fs-200);
    gap: var(--spacing-100);
    font-size: var(--fs-400);
    height: calc(100vh - 64px);

    a,
    button {
      padding-left: var(--spacing-400);
      display: flex;
      align-items: center;
      position: relative;
      text-transform: lowercase;
      font-weight: var(--weight-100);
      font-size: 1em;
      background: none;
      border: 0;
      cursor: pointer;
      transition: color 0.15s ease-in-out;
      white-space: nowrap;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  &:hover,
  &:focus {
    outline: none;
    color: var(--white);
    &:after {
      width: calc(100%);
      z-index: -1;
    }
    @media (max-width: 768px) {
      width: calc(100% - 10px);
    }
  }
`;
