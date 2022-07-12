import styled from "styled-components";

const Container = styled.div`
  width: 400px;
  padding: 20px;
  background-color: white;
  margin: 0 auto 40px auto;
  border-radius: 5px;
`;

export default function Appearance() {
  return (
    <>
      <Container></Container>
      <Container></Container>
      <Container></Container>
    </>
  );
}
