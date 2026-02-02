import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  padding: 2.5rem 1.5rem;

  @media (min-width: 768px) {
    padding: 3.5rem 4rem;
  }

  @media (min-width: 1024px) {
    padding: 5rem 15rem; /* px-60 py-20 approx */
  }

  @media (min-width: 1440px) {
    max-width: 1400px;
    margin: 0 auto;
  }
`;

export default function DefaultLayout() {
  return (
    <div className="w-full">
      <Navbar />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </div>
  );
}
