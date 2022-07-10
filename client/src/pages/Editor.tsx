import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Header from "../components/Editor/Header";
import Article from "../components/Editor/Article";

const Container = styled.div`
  background-color: #f7f7f9;
  display: flex;
  flex-wrap: wrap;
`;

export default Editor;
function Editor() {
  return (
    <Container>
      <Sidebar />
      <Header />
      <Article />
    </Container>
  );
}
