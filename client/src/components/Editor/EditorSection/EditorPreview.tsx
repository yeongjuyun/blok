import React, { Suspense } from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../reducers/store';
import PageLoading from './PageLoading';
import ErrorBoundary from '../ErrorBoundary';
import Site from '../../Blocks/Simple/Feature/RightImg/SiteBlock';
import { Block as BlockType } from '../../Blocks/blockValidator';

const NAV_WIDTH = 72;
const SIDETAB_WIDTH = 440;
const Container = styled.div`
  position: fixed;
  top: 60px;
  padding: 32px 64px;
  width: calc(100% - ${NAV_WIDTH + SIDETAB_WIDTH}px);
  height: calc(100% - 60px);
  box-sizing: border-box;
  overflow-y: scroll;
`;
const SiteBlockList = styled.div<{ blockCount: number }>`
  width: 100%;
  background: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
  ${(props) =>
    props.blockCount === 0 &&
    css`
      min-height: 100%;
    `}
`;
const SiteBlockContainer = styled.div``;
const TestMessage = styled.div`
  padding: 24px;
`;

const blockDataUpdateChecker = (
  prevBlocks: BlockType[],
  currentBlocks: BlockType[]
) => {
  return true;
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
    if (prevBlocks[0].template.layout !== currentBlocks[0].template.layout) {
      return false;
    }
  }
  return true;
};
export default Preview;
function Preview() {
  const colorSet = useSelector((state: RootState) => state.site.colorSet);
  const font = useSelector((state: RootState) => state.site.font);
  const blocks = useSelector(
    (state: RootState) => state.site.blocks,
    blockDataUpdateChecker
  );

  const siteBlocks = blocks.map((block) => {
    const {
      template: { theme, blockType, layout },
      data,
      id,
    } = block;
    const SiteBlock = React.lazy(
      () =>
        import(
          `../../Blocks/${theme}/${blockType}/${
            layout ? layout + '/' : ''
          }SiteBlock`
        )
    );
    return (
      <SiteBlock
        key={id}
        blockId={id}
        colorSet={colorSet}
        font={font}
      ></SiteBlock>
    );
  });
  return (
    <Container>
      <SiteBlockList blockCount={blocks.length}>
        <ErrorBoundary>
          <SiteBlockContainer>
            <Suspense fallback={<PageLoading />}>{siteBlocks}</Suspense>
          </SiteBlockContainer>
        </ErrorBoundary>
      </SiteBlockList>
    </Container>
  );
}
