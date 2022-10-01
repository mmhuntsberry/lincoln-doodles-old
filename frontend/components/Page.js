import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";
import SideNav from "./SideNav";

const GlobalStyles = createGlobalStyle`

  :root {
    --max-width: 1000px;

    box-sizing: border-box;
    *, *::before, *::after {
      box-sizing: inherit;
    }
  }

  body {
    font-family: var(--font-family-primary);
    padding: 0;
    margin: 0;
    font-size: var(--fs-400);
    line-height: var(--lh-4);
    font-weight: var(--weight-100);
  }
  
  a {
    text-decoration: none;
    color: var(--black);
  }



  button {
    font-family: var(--font-family-primary);
  }
`;

const PageStyles = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  /* grid-template-rows: min-content calc(1fr - 64px); */
  grid-template-areas:
    "header header"
    "sidenav content";
`;

const InnerStyles = styled.div`
  grid-area: content;
  display: grid;
  max-width: var(--max-width);
  width: 90%;
  align-content: center;
  margin: 0 auto;
  /* padding: var(--spacing-700); */
`;

export default function Page({ children }) {
  return (
    <PageStyles>
      <GlobalStyles />
      <Header />
      <SideNav />
      <InnerStyles>{children}</InnerStyles>
    </PageStyles>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
