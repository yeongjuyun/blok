import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../../../reducers';

const Container = styled.div`
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  padding: 24px;
  border-bottom: 1px solid #d1d1d1;

  background-color: white;
  /* box-shadow: 0 4px 2px -2px #f5f5f5; */
  box-sizing: border-box;
  z-index: 10;

  @media screen and (max-width: 1120px) {
    width: 100%;
    position: fixed;
    top: 52px;
    left: 0;
  }
`;

const DomainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyPage = styled.div`
  font-weight: 650;
  margin-right: 5px;
`;

const Domain = styled.div`
  color: black;
  text-decoration: none;
`;

const CopyButton = styled.button`
  background-color: white;
  border: 1px solid #d9d9d9;
  padding: 5px 10px;
  border-radius: 40px / 40px;
  margin-left: 10px;
  font-weight: 600;

  :hover {
    cursor: pointer;
  }
`;

const SaveButton = styled.button`
  background-color: black;
  border: 1px solid black;
  padding: 6px 16px;
  border-radius: 40px;

  font-weight: 600;
  color: white;
  font-size: 16px;

  :hover {
    cursor: pointer;
  }
`;

export default function PublishBar() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.site);
  const [domain, setDomain] = useState(data.domain);
  let msg = '';
  const { siteId } = useParams();

  async function saveHandler() {
    try {
      await axios.patch(`/api/site/${siteId}`, data);
      msg = '페이지가 저장되었습니다.';
      dispatch({
        type: 'alertOn',
        payload: { msg: msg, link: domain, time: 2000 },
      });
    } catch (e) {
      console.log(e);
      dispatch({ type: 'alertOn', payload: { msg: '잠시 후 시도해주세요.' } });
    }
  }

  async function copyHandler() {
    try {
      await navigator.clipboard.writeText('block.com/' + domain);
      msg = '클립보드에 복사되었습니다.';
    } catch (e) {
      console.log(e);
      msg = '잠시 후 시도해주세요.';
    }
    dispatch({ type: 'alertOn', payload: { msg: msg } });
  }

  useEffect(() => {
    setDomain(data.domain);
  }, [data]);

  return (
    <Container>
      <DomainContainer>
        <MyPage>도메인:</MyPage>
        <Domain>block.com/{domain}</Domain>
        <CopyButton onClick={copyHandler}>복사</CopyButton>
      </DomainContainer>
      <SaveButton onClick={saveHandler}>저장</SaveButton>
    </Container>
  );
}
