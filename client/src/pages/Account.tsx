import styled from "styled-components";
import MyInfo from "../components/MyInfo";
import Sidebar from "../components/Sidebar";

const Container = styled.div`
  background-color: #f7f7f9;
  display: flex;
  justify-content: center;
  min-height: 100vh;

  @media screen and (max-width: 780px) {
    position: fiexed;
    top: 72;
  }
`;

export default function Account() {
  return (
    <Container>
      <Sidebar />
      <MyInfo />
    </Container>
  );
}
