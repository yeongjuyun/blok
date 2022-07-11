import styled from "styled-components";
import EditorHeader from "./EditorSection/EditorHeader";
import EditorPreivew from "./EditorSection/EditorPreview";

const Container = styled.div`
  flex-grow: 1;
  background-color: #f5f5f8;
  display: flex;
`;

export default Article;
function Article() {
  return (
    <Container>
      <EditorHeader />
      <EditorPreivew />
    </Container>
  );
}
