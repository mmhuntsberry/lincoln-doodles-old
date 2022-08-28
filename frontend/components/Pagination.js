import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import DisplayError from "./Error";
import PaginationStyles from "./styles/components/PaginationStyles";
import { perPage } from "../config";

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>
          Link Draws - Page {page} of {pageCount}
        </title>
      </Head>
      <Link href={`/doodles/${page - 1}`}>
        <a href="" aria-disabled={page <= 1}>
          &larr; Prev
        </a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/doodles/${page + 1}`}>
        <a href="" aria-disabled={page >= pageCount}>
          Next &rarr;
        </a>
      </Link>
    </PaginationStyles>
  );
}
