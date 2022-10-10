import Link from "next/link";
import styled from "styled-components";
import Cart from "./Cart";
import Nav from "./Nav";
import Search from "./Search";
import { LogoStyles } from "./styles/components/LogoStyles";

const HeaderStyles = styled.header`
  margin: 0 var(--spacing-600) 0 var(--spacing-400);
  grid-area: header;

  gds-action-icon[icon="hamburger-menu"] {
    display: block;
  }

  .bar {
    display: grid;
    grid-template-columns: min-content auto 1fr;
    justify-content: space-between;
    align-items: center;
  }

  @media (min-width: 768px) {
    .bar {
      grid-template-columns: auto 1fr;
    }

    gds-action-icon[icon="hamburger-menu"] {
      display: none;
    }
  }
`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <gds-action-icon icon="hamburger-menu" size="jumbo"></gds-action-icon>

        <LogoStyles>
          <Link href="/">Lincoln Doodles</Link>
        </LogoStyles>
        <Nav />
      </div>
      <Cart />
    </HeaderStyles>
  );
}
