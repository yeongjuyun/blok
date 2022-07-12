import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Alert from "../../Alert";

// 나중에 수정
const domain = "domain/name";
let msg = "";

const Container = styled.div`
  padding: 0 20px;
  height: 60px;
  flex-grow: 1;
  position: sticky;
  top: 0;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

export default function PublishBar() {
  const alert = useSelector((state: any) => state.alertReducer);
  const dispatch = useDispatch();

  async function copyHandler() {
    try {
      await navigator.clipboard.writeText(domain);
      msg = "클립보드에 복사되었습니다.";
    } catch (err) {
      console.log(err);
      msg = "잠시 후 시도해주세요.";
    }
    dispatch({ type: "alertOn" });
  }

  return (
    <Container>
      <DomainContainer>
        <MyPage>마이페이지:</MyPage>
        <Domain href={domain}>{domain}</Domain>
        <CopyButton onClick={copyHandler}>복사</CopyButton>
        {alert && <Alert msg={msg} />}
      </DomainContainer>
      <SaveButton>저장</SaveButton>
    </Container>
  );
}
