import React, { Suspense } from 'react';
import styled from 'styled-components';
import Button from '../../Button';
import { useSelector } from 'react-redux';
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
`;

export default function Block() {
  const { blocks } = useSelector((state: RootState) => state.site);

  //Set settinbBlocks dynamically.
  const settingBlocks = blocks.map((block) => {
    const { template, data } = block;
    const { theme, blockType, layout } = template;

    const SettingBlock = React.lazy(
      () =>
        import(
          `../../Blocks/${theme}/${blockType}/${
            layout ? layout + '/' : ''
          }SettingBlock`
        )
    );
    console.log(SettingBlock);
    return (
      <Suspense fallback={<CardLoading />}>
        <SettingBlock data={data}></SettingBlock>
      </Suspense>
    );
  });

  return (
    <Container>
      <Button color='black' size='large' rounding fullWidth>
        블록 추가하기
      </Button>
      <SettingBlockList>{settingBlocks}</SettingBlockList>
      <CardLoading />
    </Container>
  );
}
