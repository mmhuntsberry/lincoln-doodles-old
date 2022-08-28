import styled from "styled-components";

export const SideNavStyles = styled.ul`
  grid-area: sidenav;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-self: start;
  justify-content: center;
  /* align-items: center; */
  margin-right: var(--fs-200);
  gap: var(--spacing-100);
  font-size: var(--fs-300);
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

    /* @media (max-width: 700px) {
         font-size: 10px;
       } */

    @media (max-width: 1312px) {
      font-size: var(--fs-200);
    }

    /* &:before {
      content: "";
      width: 2px;
      background: var(--green-500);
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
    }

    &:after {
      content: "";
      height: 2px;
      background: var(--green-500);
      height: 100%;
      width: 0;
      position: absolute;
      left: 0%;
      transform: translateX(-100%);
      transition: width 0.15s;
      transform: skew(-20deg);
      transition-timing-function: ease-in-out;

      /* top: 0; */
    }

    &:hover,
    &:focus {
      outline: none;
      color: var(--white);
      &:after {
        width: calc(100%);
        z-index: -1;
      }
      @media (max-width: 700px) {
        width: calc(100% - 10px);
      }
    }
  }
`;
