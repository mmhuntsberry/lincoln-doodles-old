import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useCart } from "../lib/CartState";
import CartCount from "./CartCount";
import SignOut from "./SignOut";
import { NavStyles } from "./styles/components/NavStyles";
import { useUser } from "./User";

const Nav = () => {
  let user = useUser();
  const { toggleOpen } = useCart();

  const router = useRouter();
  console.log({ user });

  // useEffect(() => {
  //   import("@nielsen-media/gds-action-icon/lib/src");
  // }, []);

  return (
    <NavStyles>
      {user && (
        <>
          {/* <gds-action-icon
            icon="user-circle"
            background-level="700"
            foreground="gray"
            foreground-level="900"
            size="40"
            outlined="false"
            onClick={() => {}}
          ></gds-action-icon> */}
          {/* <gds-action-icon
            icon="shopping-purchase"
            onClick={toggleOpen}
            background="green"
            background-level="700"
            foreground="gray"
            foreground-level="900"
            size="40"
            outlined="false"
          ></gds-action-icon> */}
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
