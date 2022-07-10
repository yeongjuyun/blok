import { useState, useEffect } from "react";
import styled from "styled-components";
import Alert from "../../Alert";

// 나중에 수정
const domain = "domain/name";

const Container = styled.div`
  padding: 0 20px;
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftSideContainer = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyPage = styled.div`
  font-weight: 650;
  margin-right: 5px;
`;

const Domain = styled.a`
  color: black;
  text-decoration: none;
`;

const CopyButton = styled.button`
  background-color: white;
  border: 1px solid #d9d9d9;
  padding: 5px 7px;
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
  padding: 5px 10px;
  border-radius: 40px / 40px;

  font-weight: 600;
  color: white;
  font-size: 16px;

  :hover {
    cursor: pointer;
  }
`;

export default PublishBar;
function PublishBar() {
  const [copy, setCopy] = useState(false);

  useEffect(() => {
      copyHandler();
  }, [copy]);
  
  async function copyHandler() {
    try {
      await navigator.clipboard.writeText(domain);
      setTimeout(() => {
        setCopy(false);
      }, 600);
    } catch (err) {
      alert("잠시 후 시도해주세요.");
    }
  }

  return (
    <Container>
      <LeftSideContainer>
        <MyPage>My Page:</MyPage>
        <Domain href={domain}>{domain}</Domain>
        <CopyButton onClick={() => setCopy(true)}>Copy</CopyButton>
        {copy == true && <Alert msg="클립보드에 복사되었습니다." />}
      </LeftSideContainer>
      <SaveButton>Save</SaveButton>
    </Container>
  );
}
