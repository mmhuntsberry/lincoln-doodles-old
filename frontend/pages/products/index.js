import { useRouter } from "next/router";
import styled from "styled-components";
import Pagination from "../../components/Pagination";
import Products from "../../components/Products";

const GridStyles = styled.div`
  display: grid;
`;

export default function OrderPage() {
  const { query } = useRouter();
  const page = +query.page;

  return (
    <GridStyles>
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </GridStyles>
  );
}
