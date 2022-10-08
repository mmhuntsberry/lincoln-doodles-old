import Link from "next/link";
import styled from "styled-components";
import Cart from "./Cart";
import Nav from "./Nav";
import Search from "./Search";
import { LogoStyles } from "./styles/components/LogoStyles";

const HeaderStyles = styled.header`
  grid-area: header;

  .bar {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 32px;
    justify-content: space-between;
    align-items: center;
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <LogoStyles>
          <Link href="/">Lincoln Doodles</Link>
        </LogoStyles>
        <Nav />
      </div>
      <div className="sub-bar">{/* <Search /> */}</div>
      <Cart />
    </HeaderStyles>
  );
}
