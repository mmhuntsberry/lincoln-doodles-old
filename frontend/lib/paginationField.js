import gql from "graphql-tag";
import { PAGINATION_QUERY } from "../components/Pagination";

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;

      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // If there are items
      // there aren't enough items to satisfy how many were requested
      // and we are on the last page
      // just send it.
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We don't have any items, we must go to the network
        return false;
      }

      // If there are items return them from the cache.
      if (items.length) {
        return items;
      }

      return false; // Fallback to network

      // First thing it does is asks the read function for those items
      // We can either do one of two things:
      // First thing we can do is return the items because they are already in the cache
      // The other thing we can do is to return false from here, (network request)
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the apollo client comes back from the network with our products.

      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; i++) {
        merged[i] = incoming[i - skip];
      }

      return merged;
    },
  };
}
