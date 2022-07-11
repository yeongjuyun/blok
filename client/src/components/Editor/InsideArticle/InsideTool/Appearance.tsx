import styled from "styled-components";
import ColorComb from "./InsideAppearance/ColorComb";
import Font from "./InsideAppearance/Font";
import Theme from "./InsideAppearance/Theme";

const Container = styled.div`
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export default function Appearance() {
  return <Container>
    <ColorComb/>
    <Font/>
    <Theme/>
  </Container>;
}
