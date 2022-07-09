import styled from "styled-components";
import * as DashboardBox from "../components/DashboardBox";
import Sidebar from "../components/Sidebar";
import { MainTitle } from "../components/MyInfo";
import { useSelector, useDispatch } from "react-redux";
import TemplateModal from "../components/TemplateModal";

const Container = styled.div`
  background-color: #f7f7f9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
`;

export default function Dashboard() {
  const modalState = useSelector((state: any) => state.modalReducer.isModal);

  return (
    <Container>
      <Sidebar />
      <MainTitle>Dashboard</MainTitle>
      <DashboardBox.DashboardInfo></DashboardBox.DashboardInfo>
      <DashboardBox.templateList></DashboardBox.templateList>
      {modalState && <TemplateModal />}
    </Container>
  );
}
