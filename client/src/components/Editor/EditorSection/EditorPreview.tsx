import React, { Suspense } from 'react';
import styled, { css } from 'styled-components';
import { useAppSelector } from '../../../reducers';
import PageLoading from './PageLoading';
import ErrorBoundary from '../ErrorBoundary';
import {
  selectBlocks,
  blockDataUpdateChecker,
} from '../../../reducers/SiteReducer';
import type { PreviewProps } from './index';

const NAV_WIDTH = 72;
const SIDETAB_WIDTH = 440;
const Container = styled.div<{ preview: boolean }>`
  position: fixed;
  top: 60px;
  padding: 32px 64px;
  width: calc(100% - ${NAV_WIDTH + SIDETAB_WIDTH}px);
  height: calc(100% - 60px);
  box-sizing: border-box;
  overflow-y: scroll;

  @media screen and (max-width: 1120px) {
    display: ${(props) => (props.preview ? 'block' : 'none')};
    width: 100%;
    height: 100vh;
    /* top: 104px; */
    left: 0;
    padding: 0;
  }
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
const SiteBlockContainer = styled.div<{ theme: any }>`
  div {
    :last-child {
      border-bottom: none;
    }
  }
  ${(props) =>
    props.theme === 'Simple' &&
    css`
      padding: 8px 40px 0 40px;
    `}
`;

export default function EditorPreview(props: PreviewProps) {
  const colorSet = useAppSelector((state) => state.site.colorSet);
  const font = useAppSelector((state) => state.site.font);
  const blocks = useAppSelector(selectBlocks, blockDataUpdateChecker);

  const siteBlocks = blocks.map((block) => {
    const {
      template: { theme, blockType, layout },
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
    <Container preview={props.preview}>
      <SiteBlockList blockCount={blocks.length}>
        <ErrorBoundary>
          <SiteBlockContainer theme={blocks[0]?.template.theme}>
            <Suspense fallback={<PageLoading />}>{siteBlocks}</Suspense>
          </SiteBlockContainer>
        </ErrorBoundary>
      </SiteBlockList>
    </Container>
  );
}
