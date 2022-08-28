import { ApolloProvider } from "@apollo/client";
/* eslint-disable react/jsx-props-no-spreading */
import Nprogress from "nprogress";
import Router from "next/router";
import Page from "../components/Page";
import wtihData from "../lib/wtihData";

import "../components/styles/nprogress.css";
import "../components/styles/index.css";
import { CartStateProvider } from "../lib/CartState";

Router.events.on("routeChangeStart", () => Nprogress.start());

Router.events.on("routeChangeComplete", () => Nprogress.done());
Router.events.on("routeChangeError", () => Nprogress.done());

// eslint-disable-next-line react/prop-types
function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}

App.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps.query = ctx.query;
  return pageProps;
};

export default wtihData(App);
