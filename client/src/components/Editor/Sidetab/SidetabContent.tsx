import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Block from './Block';
import Appearance from './Appearance';
import Setting from './Setting';

const Container = styled.div`
  box-sizing: border-box;
  width: 440px;
  padding: 24px 24px;
  background-color: #f5f5f8;
  position: relative;
  top: 60px;
  height: calc(100% - 60px);
  overflow-y: scroll;
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: red;
  }
`;

export default function SidetabHeader() {
  const now = useSelector((state: any) => state.sidetabReducer);
  const tools = ['Block', 'Appearance', 'Setting'];

  return (
    <Container>
      {now === tools[0] ? <Block /> : ''}
      {now === tools[1] ? <Appearance /> : ''}
      {now === tools[2] ? <Setting /> : ''}
    </Container>
  );
}
