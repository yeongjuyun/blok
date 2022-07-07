import styled from 'styled-components';
import Content from '../components/Editor/Content';

const Container = styled.div`
    min-width: 1920px;
    width: auto;
    min-height: 100vh;
    height: auto;
    background-color: #F7F7F9;
    display: flex;
    flex-wrap: wrap;
`;

export default Editor;
function Editor() {
  return (
    <Container>
      <Content />
    </Container>
  );
}
