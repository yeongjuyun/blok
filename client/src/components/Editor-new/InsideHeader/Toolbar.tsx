import styled from "styled-components";

const unclicked = "#999999";

const Container = styled.div`
  width: 500px;
  margin-left: 74px;
  border-right: 1px solid #d1d1d1;
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

const Item = styled.div`
  width: 33.3%;
  text-align: center;
  font-weight: 650;
  color: ${unclicked};

  :hover {
    cursor: pointer;
  }
`;

export default Toolbar;
function Toolbar() {
  return (
    <Container>
      <Item>
        Block
      </Item>
      <Item>
        Appearance
      </Item>
      <Item>
        Setting
      </Item>
    </Container>
  );
}