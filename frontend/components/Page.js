import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import Header from "./Header";

const GlobalStyles = createGlobalStyle`
@font-face {
  font-family: 'radnika_next';
  src: url('/public/static/radnikanext-medium-webfont.woff2')
  format('woff2')
  font-weight: normal;
  font-style: normal;
}
  :root {
    --maxWidth: 1000px;

    box-sizing: border-box;
    *, *::before, *::after {
      box-sizing: inherit;
    }
  }

  body {
    font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    font-size: var(--fs-400);
    line-height: var(--lh-4);
  }

  a {
    text-decoration: none;
    color: var(--green-500);;
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const InnerStyles = styled.div`
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-700);
`;

export default function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <Header />
      <InnerStyles>{children}</InnerStyles>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
