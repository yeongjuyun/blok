import React, { Suspense } from 'react';
import styled from 'styled-components';
import Button from '../../Button';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../../reducers/store';
import CardLoading from '../../Card/CardLoading';

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

export default function Block() {
  const dispatch = useDispatch();
  const { blocks } = useSelector((state: RootState) => state.site);

  const addBlockHandler = () => {
    dispatch({
      type: 'ADD/MODAL_ON',
    });
  };
  //Set settinbBlocks dynamically.
  const settingBlocks = blocks.map((block) => {
    const { template, data, id } = block;
    const { theme, blockType, layout } = template;

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
          <SettingBlock data={data}></SettingBlock>
        </Suspense>
      </SettingBlockContainer>
    );
  });
  return (
    <Container>
      <Button
        color='black'
        size='large'
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
