import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import BlockItem from './BlockItem';
import * as icons from '../../../icons';
import * as blockIcons from '../../../icons/blockCreation';
import blockConfig from '../../Blocks/block.config.json';

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
  box-sizing: border-box;
  border-radius: 12px;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 64px 56px 0 56px;
  align-items: center;
`;
const HeaderText = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
const Content = styled.div`
  padding: 48px 0;
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
  max-height: 500px;
  padding: 8px 40px;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
    position: relative;
    left: 10px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #dfdfdf;
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
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

const getBlocksByTheme = (blocks: any, theme: string): any => {
  const arr = blockConfig.blocks.filter((block) => {
    return block.template.theme === theme;
  });
  return arr;
};

export default function AddModal(props: ModalProps) {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch({
      type: 'ADD/MODAL_OFF',
    });
  };
  const renderBlockItem = () => {
    const blocks = getBlocksByTheme(blockConfig.blocks, 'Simple');
    const blockItemList = blocks.map(
      (block: { creationData: { icon: string; title: string } }) => {
        const { icon, title } = block.creationData;
        return (
          <BlockItem
            //icon={blockIcons[icon]}
            icon=''
            label={title}
            onClick={() => {}}
          ></BlockItem>
        );
      }
    );
    return blockItemList;
  };
  return (
    <Background>
      <ModalBox>
        <Header>
          <HeaderText>블록 선택</HeaderText>
          <CloseButton onClick={closeModal}>
            <CloseIcon src={icons.Close} />
          </CloseButton>
        </Header>
        <Content>
          <BlockItemList>{renderBlockItem()}</BlockItemList>
        </Content>
      </ModalBox>
    </Background>
  );
}
