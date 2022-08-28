import styled, { keyframes } from "styled-components";

export const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 2px solid var(--green-500);
`;

export const DropDownItem = styled.div`
  border-bottom: 1px solid var(--green-500);
  background: ${(props) => (props.highlighted ? "#f7f7f7" : "white")};
  padding: 1rem;
  transition: all 0.2s;
  ${(props) => (props.highlighted ? "padding-left: 2rem;" : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid ${(props) => (props.highlighted ? "blue" : "white")};
  img {
    margin-right: 10px;
  }
`;

export const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

export const SearchStyles = styled.div`
  position: relative;
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    font-size: 2rem;
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
`;
