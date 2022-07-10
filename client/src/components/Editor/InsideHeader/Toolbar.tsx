import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const unclicked = "#999999";
const clicked = '#000000';

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
  const dispatch = useDispatch();
  const now = useSelector((state: any) => state.toolReducer);
  const tools = ['Block', 'Appearance', 'Setting'];

  useEffect(() => {
    for (let i = 0; i < tools.length; i++) {
      const target = document.getElementById(tools[i]);
      if (target) {
        target.style.color = unclicked;
      }
    }
    const clickedOne = document.getElementById(now);
    if (clickedOne) {
      clickedOne.style.color = clicked;
    }
  }, [now]);

  return (
    <Container>
      <Item id={tools[0]} onClick={() => dispatch({type: tools[0]})}>{tools[0]}</Item>
      <Item id={tools[1]} onClick={() => dispatch({type: tools[1]})}>{tools[1]}</Item>
      <Item id={tools[2]} onClick={() => dispatch({type: tools[2]})}>{tools[2]}</Item>
    </Container>
  );
}