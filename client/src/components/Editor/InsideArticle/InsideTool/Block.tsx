import styled from "styled-components";

const Container = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const NewBlockButton = styled.button`
  width: 450px;
  padding: 10px 20px;
  background-color: black;
  border: 1px solid black;
  border-radius: 40px / 40px;

  font-size: 20px;
  font-weight: 450;
  color: white;

  :hover {
    cursor: pointer;
  }
`;

export default function Block() {
  return (
    <Container>
      <NewBlockButton>블록 추가하기</NewBlockButton>
    </Container>
  );
}
