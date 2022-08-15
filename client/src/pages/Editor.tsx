import React from 'react';
import styled from 'styled-components';
import Sidetab from '../components/Editor/Sidetab';
import EditorSection from '../components/Editor/EditorSection';
import AddModal from '../components/Editor/AddModal/AddModal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { testSite } from '../reducers/SiteReducer';
import { useAppDispatch, useAppSelector } from '../reducers/hooks';
import type { Site } from '../components/Blocks/blockValidator';

interface SiteApi extends Omit<Site, 'blocks'> {
  block_set: [];
}

const DesktopContainer = styled.div`
  width: calc(100% - 64px);
  height: 100%;
  position: fixed;
  top: 0;
  left: 64px;
  display: flex;
  /* z-index: 100; */
  @media screen and (max-width: 1120px) {
    flex-direction: column;
  }
`;

export default function Editor() {
  const dispatch = useAppDispatch();
  const AddModalState = useAppSelector(
    (state) => state.modalReducer.isAddModal
  );

  const { siteId } = useParams();
  const [data, setData] = useState<SiteApi>({
    id: '',
    name: '',
    domain: '',
    theme: '',
    font: '',
    colorSet: {
      primary: '',
      secondary: '',
      background: '',
      surface: '',
    },
    block_set: [],
  });

  console.log(data);

  useEffect(() => {
    const getSiteInfo = async () => {
      const res = await axios.get(
        `http://3.37.187.24:8080/api/site?id=${siteId}`
      );
      setData(res.data[0]);
    };
    getSiteInfo();
  }, []);

  useEffect(() => {
    dispatch({
      type: 'site/getSite',
      payload: {
        id: '',
        name: data.name,
        domain: data.domain,
        theme: data.theme,
        font: data.font,
        colorSet: data.colorSet,
        blocks: data.block_set,
      },
    });
  }, [data]);

  return (
    <>
      <DesktopContainer>
        <Sidetab />
        <EditorSection />
        {AddModalState && <AddModal theme='Simple' />}
      </DesktopContainer>
    </>
  );
}
