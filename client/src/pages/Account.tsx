import styled from "styled-components";
import MyInfo from "../components/MyInfo";
import Sidebar from "../components/Sidebar";
import AlertModal from "../components/AlertModal";
import { useSelector } from "react-redux";

const Container = styled.div`
  background-color: #f7f7f9;
  display: flex;
  justify-content: center;
  min-height: 100vh;
`;

export default function Account() {
  const alertModalState = useSelector(
    (state: any) => state.modalReducer.isAlertModal
  );
  const alertData = useSelector((state: any) => state.modalReducer.alertData);

  return (
    <Container>
      <Sidebar />
      <MyInfo />
      {alertModalState && <AlertModal alertData={alertData} />}
    </Container>
  );
}
