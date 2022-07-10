import styled from "styled-components";

const Container = styled.div`
  padding: 0 20px;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default Preview;
function Preview() {
  return <Container></Container>;
}
