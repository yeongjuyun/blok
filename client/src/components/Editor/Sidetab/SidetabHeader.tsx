import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../reducers/hooks';

const unclicked = '#999999';
const clicked = '#000000';

const Container = styled.div`
  width: 440px;
  height: 60px;
  min-height: 60px;
  background-color: white;
  display: flex;
  align-items: center;
  position: fixed;
  border-bottom: 1px solid #d1d1d1;
  box-sizing: border-box;
  top: 0;
  z-index: 1;
  box-shadow: 0 4px 2px -2px #f5f5f5;

  @media screen and (max-width: 1120px) {
    position: fixed;
    width: 100%;
    top: 112px;
    left: 0;
  }
`;

export default function SidetabHeader() {
  const dispatch = useAppDispatch();
  const now = useAppSelector((state) => state.sidetabReducer);
  const toolList = ['Block', 'Appearance', 'Setting'];
  const itemWidth = 100 / toolList.length;

  const Item = styled.div`
    width: ${itemWidth}%;
    text-align: center;
    font-weight: 650;

    :hover {
      cursor: pointer;
    }
  `;

  function Items() {
    let items = [];
    for (let i = 0; i < toolList.length; i++) {
      items.push(
        <Item
          key={toolList[i]}
          id={toolList[i]}
          style={{ color: toolList[i] === now ? clicked : unclicked }}
          onClick={() => dispatch({ type: toolList[i] })}
        >
          {toolList[i]}
        </Item>
      );
    }
    return items;
  }

  return <Container>{Items()}</Container>;
}
