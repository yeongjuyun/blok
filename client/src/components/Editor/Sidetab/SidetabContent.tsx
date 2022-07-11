import styled from "styled-components";
import { useSelector } from "react-redux";
import Block from "./Block";
import Appearance from "./Appearance";
import Setting from "./Setting";

const Container = styled.div`
  width: 560px;
  background-color: #f5f5f8;
  position: fixed;
  top: 80px;
  top: 100px;
  display: flex;
  justify-content: center;
`;

export default function SidetabHeader() {
  const now = useSelector((state: any) => state.toolReducer);
  const tools = ["Block", "Appearance", "Setting"];

  return (
    <Container>
      {now === tools[0] ? <Block /> : ""}
      {now === tools[1] ? <Appearance /> : ""}
      {now === tools[2] ? <Setting /> : ""}
    </Container>
  );
}
