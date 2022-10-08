import {
  integer,
  select,
  text,
  relationship,
  virtual,
} from "@keystone-next/fields";
import { list } from "@keystone-next/keystone/schema";
import formatMoney from "../lib/formatMoney";

export const Order = list({
  fields: {
    label: virtual({
      graphQLReturnType: "String",
      resolver(item) {
        return `${formatMoney(item.total)}`;
      },
    }),
    date: virtual({
      graphQLReturnType: "String",
      resolver() {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        // This arrangement can be altered based on how we want the date's format to appear.
        return `${month}/${day}/${year}`;
        // return `${formatMoney(item.total)}`;
      },
    }),
    total: integer(),
    items: relationship({ ref: "OrderItem.order", many: true }),
    user: relationship({ ref: "User.orders" }),
    charge: text(),
  },
});
