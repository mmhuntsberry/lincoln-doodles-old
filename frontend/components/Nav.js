import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useCart } from "../lib/CartState";
import CartCount from "./CartCount";
import SignOut from "./SignOut";
import { NavStyles } from "./styles/components/NavStyles";
import { useUser } from "./User";

const NavCartDisplayStyles = styled.div`
  span {
    position: absolute;
    top: 0px;
    right: 12px;
    font-size: 20px;
  }
`;

const Nav = () => {
  let user = useUser();
  const { toggleOpen } = useCart();

  const router = useRouter();
  console.log({ user });

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
          <NavCartDisplayStyles>
            <gds-action-icon
              icon="shopping-purchase"
              onClick={toggleOpen}
              background="green"
              background-level="700"
              foreground="gray"
              foreground-level="900"
              size="40"
              outlined="true"
            ></gds-action-icon>
            <span>{user.cart.length}</span>
          </NavCartDisplayStyles>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
