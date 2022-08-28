import { useMemo } from "react";
import { useLazyQuery } from "@apollo/client";
import { resetIdCounter, useCombobox } from "downshift";
import debounce from "lodash.debounce";
import gql from "graphql-tag";

import {
  DropDown,
  DropDownItem,
  SearchStyles,
} from "./styles/components/SearchStyles";
import { useRouter } from "next/router";

export const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search(params) {
  const router = useRouter();
  const [findItems, { loading, error, data }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: "no-cache",
    }
  );

  const items = data?.searchTerms || [];

  const findItemsButChill = useMemo(
    () => debounce(findItems, 350),
    [findItems]
  );

  resetIdCounter();
  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: items,
    onInputValueChange() {
      console.log("Input changes!");
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange({ selectedItem }) {
      router.push({
        pathname: `/product/${selectedItem.id}`,
      });
    },
    itemToString: (item) => item?.name || "",
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: "search",
            placeholder: "Search for an Item",
            id: "search",
            className: loading ? "loading" : null,
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        {console.log(highlightedIndex)}
        {isOpen &&
          items.map((item, index) => (
            <DropDownItem
              key={item.id}
              {...getItemProps({ item, index })}
              hightlighted={highlightedIndex === index}
            >
              {console.log(highlightedIndex === index)}
              {console.log({ highlightedIndex, index })}
              <img
                src={item.photo.image.publicUrlTransformed}
                alt={item.name}
                width={50}
              />
              {item.name}
            </DropDownItem>
          ))}
        {isOpen && !items.length && !loading && (
          <DropDownItem>Sorry, No items found for {inputValue}</DropDownItem>
        )}
      </DropDown>
    </SearchStyles>
  );
}
