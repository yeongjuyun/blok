import styled from "styled-components";
import Setting from "./InsideArticle/Tool";
import Preview from "./InsideArticle/Preview";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f8;
  display: flex;
  margin-top: 60px;
`;

export default Article;
function Article() {
  return (
    <Container>
      <Setting />
      <Preview />
    </Container>
  );
}
