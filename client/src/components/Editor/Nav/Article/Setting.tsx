import styled from 'styled-components';

const Container = styled.div`
    min-width: 560px;
    height: 100%;
    border-right: 1px solid #D1D1D1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

const InnerContainer = styled.div`
    margin-top: 120px;
    width: 80%;
`;

export default EditArticle;
function EditArticle() {
    return <Container>
        <InnerContainer>
        </InnerContainer>
    </Container>
}