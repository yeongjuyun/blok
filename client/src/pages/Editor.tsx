import styled from 'styled-components';
import Sidetab from '../components/Editor/Sidetab';
import EditorSection from '../components/Editor/EditorSection';
import AddModal from '../components/Editor/AddModal/AddModal';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../reducers/hooks';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { testSite } from '../reducers/SiteReducer';

const DesktopContainer = styled.div`
  width: calc(100% - 64px);
  height: 100%;
  position: fixed;
  top: 0;
  left: 64px;
  display: flex;
  z-index: 12;
  @media screen and (max-width: 1120px) {
    flex-direction: column;
  }
`;

export default function Editor() {
  const dispatch = useAppDispatch();
  const { siteId } = useParams();
  const [data, setData] = useState(testSite);
  const AddModalState = useAppSelector(
    (state) => state.modalReducer.isAddModal
  );

  useEffect(() => {
    const getSiteInfo = async () => {
      const res = await axios.get(`/api/site/${siteId}`);
      setData(res.data);
    };
    getSiteInfo();
  }, []);

  useEffect(() => {
    dispatch({
      type: 'site/getSite',
      payload: {
        id: null,
        name: data.name,
        domain: data.domain,
        theme: data.theme,
        font: data.font,
        colorSet: data.colorSet,
        blocks: data.blocks,
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
