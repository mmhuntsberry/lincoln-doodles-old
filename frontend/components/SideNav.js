import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useCart } from "../lib/CartState";
import CartCount from "./CartCount";
import SignOut from "./SignOut";
import { SideNavStyles } from "./styles/components/SideNavStyles";
import { useUser } from "./User";

const SideNav = () => {
  let user = useUser();
  const { toggleOpen } = useCart();

  const router = useRouter();

  // useEffect(() => {
  //   import("@nielsen-media/gds-action-icon/lib/src");
  // }, []);

  return (
    <SideNavStyles>
      <Link href="/home">Home</Link>
      <Link href="/about">About</Link>
      <Link href="/doodles">Doodles</Link>
      {/* <Link href="/products">Products</Link> */}
      {/* {process.env.NEXT_PUBLIC_STRIPE_KEY} */}
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </SideNavStyles>
  );
};

export default SideNav;
