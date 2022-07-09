import styled from "styled-components";
import * as DashboardBox from "../components/DashboardBox";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import TemplateModal from "../components/TemplateModal";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7f7f9;
`;

export default function Dashboard() {
  const modalState = useSelector((state: any) => state.modalReducer.isModal);

  return (
    <Container>
      <Sidebar />
      <DashboardBox.DashboardInfo></DashboardBox.DashboardInfo>
      <DashboardBox.TemplateList></DashboardBox.TemplateList>
      {modalState && <TemplateModal />}
    </Container>
  );
}
