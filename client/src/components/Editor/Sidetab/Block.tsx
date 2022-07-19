import React, { Suspense } from 'react';
import styled from 'styled-components';
import Button from '../../Button';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { RootState, store } from '../../../reducers/store';
import CardLoading from '../../Card/CardLoading';
import { removeBlock } from '../../../reducers/SiteReducer';
import { createSelector } from 'reselect';
import { Block as BlockType } from '../../Blocks/blockValidator';

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const SettingBlockList = styled.div`
  width: 100%;
  margin-top: 16px;
`;
const SettingBlockContainer = styled.div`
  margin: 8px 0;
`;

const selectBlocks = (state: RootState) => state.site.blocks;

export default function Block() {
  const blocksWithoutData = useSelector(
    selectBlocks,
    (prevBlocks, currentBlocks) => {
      //1. length 가 다름 -> 추가,삭제 등으로 블록 수가 변경되었을 때
      if (prevBlocks.length !== currentBlocks.length) {
        return false;
      }
      //2. id,style -> 블록 순서(id)나 style 이 변경되었을 때
      for (let i = 0; i < prevBlocks.length; i++) {
        if (prevBlocks[i].id !== currentBlocks[i].id) {
          return false;
        }
        if (prevBlocks[0].template.theme !== currentBlocks[0].template.theme) {
          return false;
        }
        if (
          prevBlocks[0].template.layout !== currentBlocks[0].template.layout
        ) {
          return false;
        }
      }
      return true;
    }
  );
  const dispatch = useDispatch();

  const addBlockHandler = () => {
    dispatch({
      type: 'ADD/MODAL_ON',
    });
  };
  const removeBlockHandler = (index: number) => {
    dispatch(removeBlock(index));
  };

  //Set settigBlocks dynamically.
  const settingBlocks = blocksWithoutData.map((block, index) => {
    const {
      id,
      template: { theme, blockType, layout },
    } = block;

    const SettingBlock = React.lazy(
      () =>
        import(
          `../../Blocks/${theme}/${blockType}/${
            layout ? layout + '/' : ''
          }SettingBlock`
        )
    );
    return (
      <SettingBlockContainer key={id}>
        <Suspense fallback={<CardLoading />}>
          <SettingBlock
            blockId={id}
            onRemove={() => removeBlockHandler(index)}
          ></SettingBlock>
        </Suspense>
      </SettingBlockContainer>
    );
  });
  return (
    <Container>
      <Button
        color="black"
        size="large"
        rounding
        fullWidth
        onClick={addBlockHandler}
      >
        블록 추가하기
      </Button>
      <SettingBlockList>{settingBlocks}</SettingBlockList>
    </Container>
  );
}
