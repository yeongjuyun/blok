import styled from "styled-components";
import ColorSetExample from "../../ColorSetExample";

const Container = styled.div`
  width: 400px;
  padding: 20px;
  background-color: white;
  margin: 0 auto 40px auto;
  border-radius: 5px;
  display: flex;
  justify-content: center;
`;

const colorSet = {
  "primary": "#5754DE",
  "secondary": "#ABA9FF",
  "background": "#FFFFFF",
  "surface": "#E2E2E2"
}

export default function Appearance() {
  return (
    <>
      <Container><ColorSetExample colorSet={colorSet}/></Container>
      <Container></Container>
      <Container></Container>
    </>
  );
}
