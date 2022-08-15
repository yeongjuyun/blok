import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../reducers';

const Container = styled.div`
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  padding: 24px;
  border-bottom: 1px solid #d1d1d1;
  background-color: white;
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

const ButtonContainer = styled.div`
  display: flex;
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

const PreviewButton = styled.button`
  display: none;
  background-color: black;
  border: 1px solid black;
  padding: 6px 16px;
  border-radius: 40px;
  margin-right: 5px;

  font-weight: 600;
  color: white;
  font-size: 16px;

  @media screen and (max-width: 1120px) {
    display: block;
  }
`;
export default function PublishBar(props: {
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.site);
  const [domain, setDomain] = useState(data.domain);
  let msg = '';
  const { siteId } = useParams();

  async function saveHandler() {
    try {
      const res = await axios.patch(
        `http://3.37.187.24:8080/api/site/${siteId}/`,
        data
      );
      console.log(33333, res);
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
        <Domain>blok.com/{domain}</Domain>
        <CopyButton onClick={copyHandler}>복사</CopyButton>
      </DomainContainer>
      <ButtonContainer>
        <PreviewButton
          onClick={() => props.setPreview((prev: boolean) => !prev)}
        >
          미리보기
        </PreviewButton>
        <SaveButton onClick={saveHandler}>저장</SaveButton>
      </ButtonContainer>
    </Container>
  );
}
