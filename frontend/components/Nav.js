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

  useEffect(() => {
    import("@nielsen-media/gds-action-icon/lib/src");
  }, []);

  return (
    <NavStyles>
      {user && (
        <>
          <gds-action-icon
            // onClick={toggleOpen}
            size="regular"
            outlined="false"
            icon="user-circle"
          ></gds-action-icon>
          <gds-action-icon
            onClick={toggleOpen}
            size="regular"
            outlined="false"
            icon="shopping-purchase"
          ></gds-action-icon>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
