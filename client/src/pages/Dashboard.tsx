import styled from "styled-components";
import * as DashboardBox from "../components/DashboardBox";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import TemplateModal from "../components/TemplateModal";
import AlertModal from "../components/AlertModal";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f7f9;
`;

export default function Dashboard() {
  const templateModalState = useSelector(
    (state: any) => state.modalReducer.isTemplateModal
  );
  const alertModalState = useSelector(
    (state: any) => state.modalReducer.isAlertModal
  );
  const alertData = useSelector((state: any) => state.modalReducer.alertData);

  return (
    <Container>
      <Sidebar />
      <DashboardBox.DashboardInfo></DashboardBox.DashboardInfo>
      <DashboardBox.TemplateList></DashboardBox.TemplateList>
      {templateModalState && <TemplateModal />}
      {alertModalState && <AlertModal alertData={alertData} />}
    </Container>
  );
}
