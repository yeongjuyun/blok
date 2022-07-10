import styled from "styled-components";
import Toolbar from "./InsideHeader/Toolbar";
import Publishbar from "./InsideHeader/Publishbar";

const Container = styled.div`
  width: 100vw;
  height: 60px;
  position: fixed;
  top: 0;
  background-color: white;
  display: flex;
`;

export default Header;
function Header() {
  return (
    <Container>
      <Toolbar />
      <Publishbar />
    </Container>
  );
}