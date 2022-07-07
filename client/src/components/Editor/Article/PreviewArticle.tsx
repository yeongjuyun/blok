import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height: 100%;
    left: 560px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;

const InnerContainer = styled.div`
    margin-top: 120px;
    width: 80%;
`;

export default PreviewArticle;
function PreviewArticle() {
    return <Container>
        <InnerContainer>
            
        </InnerContainer>
    </Container>
}