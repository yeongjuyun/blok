import React, { Suspense, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../reducers';
import PageLoading from './EditorSection/PageLoading';
import styled, { css } from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorBoundary from './ErrorBoundary';

const Container = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  box-sizing: border-box;
  overflow-y: scroll;
  div:last-child {
    border-bottom: none;
  }
`;

const SiteBlockList = styled.div<{ blockCount: number }>`
  width: 100%;
  background: white;
  border-radius: 4px;
  ${(props) =>
    props.blockCount === 0 &&
    css`
      min-height: 100%;
    `}
`;

const SiteBlockContainer = styled.div``;

export default function Hosting() {
  const { domain } = useParams();
  const dispatch = useAppDispatch();
  const [data, setData] = useState({
    id: '',
    name: '',
    domain: '',
    theme: '',
    font: '',
    colorSet: {
      primary: '',
      secondary: '',
      surface: '',
      background: '',
    },
    block_set: [],
  });

  useEffect(() => {
    const getSiteInfo = async () => {
      const res = await axios.get(
        `http://3.37.187.24:8080/api/site?domain=${domain}`
      );
      setData(res.data[0]);
    };
    getSiteInfo();
  }, []);

  useEffect(() => {
    dispatch({
      type: 'host/getHostedSite',
      payload: {
        id: data.id,
        name: data.name,
        domain: data.domain,
        theme: data.theme,
        font: data.font,
        colorSet: data.colorSet,
        blocks: data.block_set,
      },
    });
  }, [data]);

  const colorSet = useAppSelector((state) => state.host.colorSet);
  const font = useAppSelector((state) => state.host.font);
  const blocks = useAppSelector((state) => state.host.blocks);

  console.log(444, blocks);

  const siteBlocks = blocks.map((block) => {
    const {
      template: { theme, blockType, layout },
      id,
    } = block;
    const SiteBlock = React.lazy(
      () =>
        import(
          `../Blocks/${theme}/${blockType}/${
            layout ? layout + '/' : ''
          }SiteBlock`
        )
    );

    return (
      <SiteBlock
        type='host'
        key={id}
        blockId={id}
        colorSet={colorSet}
        font={font}
      />
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
