import { useRouter } from "next/router";
import styled from "styled-components";
// import Pagination from "../../components/Pagination";
import About from "../components/About";

const GridStyles = styled.div`
  height: calc(100vh - 64px);
  padding: 0;
  /* display: grid; */
`;

export default function AboutPage() {
  // const { query } = useRouter();
  // const page = +query.page;

  return (
    <GridStyles>
      <About />
    </GridStyles>
  );
}
