import { useRouter } from "next/router";
import styled from "styled-components";
// import Pagination from "../../components/Pagination";
import Home from "../components/Home";

const GridStyles = styled.div`
  height: calc(100vh - 64px);
  padding: 0;
  /* display: grid; */
`;

export default function HomePage() {
  // const { query } = useRouter();
  // const page = +query.page;

  return (
    <GridStyles>
      <Home />
    </GridStyles>
  );
}
