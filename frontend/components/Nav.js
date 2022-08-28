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

  return (
    <NavStyles>
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
          <button type="button" onClick={toggleOpen}>
            Cart
            <CartCount
              count={user.cart.reduce((acc, curr) => acc + curr.quantity, 0)}
            />
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
};

export default Nav;
