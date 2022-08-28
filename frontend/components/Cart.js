import { useEffect } from "react";
import styled from "styled-components";
import calcTotalPrice from "../lib/calcTotalPrice";
import { useCart } from "../lib/CartState";
import formatMoney from "../lib/formatMoney";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import CartStyles from "./styles/components/CartStyles";
import Supreme from "./styles/components/Supreme";
import { useUser } from "./User";

const HeaderStyles = styled.header`
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

const ButtonStyles = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;

export default function Cart() {
  const me = useUser();
  const { isOpen, toggleOpen } = useCart();

  useEffect(() => {
    import("@nielsen-media/gds-action-icon/lib/src");
  }, []);

  if (!me) return null;
  return (
    <CartStyles open={isOpen}>
      <HeaderStyles>
        <Supreme>{me.name.split(" ")[0]}'s Kart</Supreme>
        <ButtonStyles onClick={toggleOpen}>
          <gds-action-icon
            icon="close"
            background="green"
            background-level="700"
            foreground="gray"
            foreground-level="900"
            size="40"
          ></gds-action-icon>
        </ButtonStyles>
      </HeaderStyles>
      <ul>
        {me.cart.map((item) => (
          <CartItem cartItem={item} key={item.id} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalPrice(me.cart))}</p>
      </footer>
      <Checkout />
    </CartStyles>
  );
}
