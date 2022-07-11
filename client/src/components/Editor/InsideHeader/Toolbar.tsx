import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const unclicked = "#999999";
const clicked = "#000000";

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
  const tools = ["Block", "Appearance", "Setting"];

  useEffect(() => {
    for (let i = 0; i < tools.length; i++) {
      const target = document.getElementById(tools[i]);

      if (target) {
        if (tools[i] === now) {
          target.style.color = clicked;
        } else {
          target.style.color = unclicked;
        }
      }
    }
  }, [now]);

  function Items() {
    let items = [];
    for (let i = 0; i < tools.length; i++) {
      items.push(
        <Item
          key={tools[i]}
          id={tools[i]}
          onClick={() => dispatch({ type: tools[i] })}
        >
          {tools[i]}
        </Item>
      );
    }
    return items;
  }

  return <Container>{Items()}</Container>;
}
