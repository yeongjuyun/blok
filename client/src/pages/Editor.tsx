import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Sidetab from '../components/Editor/Sidetab';
import EditorSection from '../components/Editor/EditorSection';
import { useSelector } from 'react-redux';
import AlertModal from '../components/AlertModal';
import ConfirmModal from '../components/ConfirmModal';
import '../components/Editor/Font.css'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f7f7f9;
    display: flex;
`;

export default function Editor() {
    const AlertModalState = useSelector(
        (state: any) => state.alertReducer.state
    );

    const alertData = useSelector(
        (state: any) => state.alertReducer.alertData
    );

    const ConfirmModalState = useSelector(
        (state: any) => state.modalReducer.isConfirmModal
    );

    const confirmData = useSelector(
        (state: any) => state.modalReducer.confirmData
    );

    return (
        <Container>
            <Sidebar />
            <Sidetab />
            <EditorSection />
            {AlertModalState && <AlertModal alertData={alertData} />}
            {ConfirmModalState && <ConfirmModal confirmData={confirmData} />}
        </Container>
    );
}
