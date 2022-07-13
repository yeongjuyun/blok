import styled from 'styled-components';
import Sidebar from '../components/Sidebar';
import Sidetab from '../components/Editor/Sidetab';
import EditorSection from '../components/Editor/EditorSection';
import { useSelector } from 'react-redux';
import ConfirmModal from '../components/ConfirmModal';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #f7f7f9;
    display: flex;
`;

export default function Editor() {
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
            {ConfirmModalState && <ConfirmModal confirmData={confirmData} />}
        </Container>
    );
}
