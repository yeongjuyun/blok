import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Sidetab from "../components/Editor/Sidetab";
import EditorSection from "../components/Editor/EditorSection";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f7f7f9;
  display: flex;
`;

export default Editor;
function Editor() {
  return (
    <Container>
      <Sidebar />
      <Sidetab />
      <EditorSection />
    </Container>
  );
}
