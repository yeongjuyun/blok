import styled from "styled-components";
import { useSelector } from "react-redux";
import Block from "./InsideTool/Block";
import Appearance from "./InsideTool/Appearance";
import Setting from "./InsideTool/Setting";

const Container = styled.div`
  width: 500px;
  margin-left: 74px;
  border-right: 1px solid #d1d1d1;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
`;

export default function ToolArticle() {
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
