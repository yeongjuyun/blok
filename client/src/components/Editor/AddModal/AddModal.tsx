import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import BlockItem from './BlockItem';
import * as icons from '../../../icons';
import * as blockConfig from '../../Blocks/block.config.json';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalBox = styled.div`
  background-color: white;
  width: 440px;
  padding: 64px 56px;
  box-sizing: border-box;
  border-radius: 12px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 48px;
`;
const HeaderText = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
`;
const CloseIcon = styled.img`
  width: 18px;
  hegiht: 18px;
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;
const BlockItemList = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
`;
const AddButton = styled.button`
  padding: 10px 48px;
  letter-spacing: 1.2px;
  background: #000000;
  border-radius: 5px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;
interface ModalProps {
  theme: string;
}

// const getBlocksByTheme(theme: string){
//   blockConfig.blocks.map();
//   return
// }

export default function AddModal(props: ModalProps) {
  const dispatch = useDispatch();
  const renderBlockList = () => {};
  const closeModal = () => {
    dispatch({
      type: 'ADD/MODAL_OFF',
    });
  };
  console.log(blockConfig);
  return (
    <Background>
      <ModalBox>
        <Header>
          <HeaderText>블록 선택</HeaderText>
          <CloseButton onClick={closeModal}>
            <CloseIcon src={icons.Close} />
          </CloseButton>
        </Header>
        <BlockItemList>
          <BlockItem
            icon={icons.BlockNav}
            label='네비게이션바'
            onClick={() => {}}
          ></BlockItem>
          <BlockItem
            icon={icons.BlockFooter}
            label='푸터'
            onClick={() => {}}
          ></BlockItem>
          <BlockItem
            icon={icons.BlockHome}
            label='메인화면'
            onClick={() => {}}
          ></BlockItem>
          <BlockItem
            icon={icons.BlockFeature}
            label='이미지+텍스트'
            onClick={() => {}}
          ></BlockItem>
          <BlockItem
            icon={icons.BlockFeature}
            label='이미지+텍스트'
            onClick={() => {}}
          ></BlockItem>
        </BlockItemList>
      </ModalBox>
    </Background>
  );
}
