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

const NewBlockButton = styled.button`
    width: 100%;
    padding: 10px 20px;
    background-color: black;
    border: 1px solid black;
    border-radius: 40px / 40px;
    
    font-size: 20px;
    font-weight: 450;
    color: white;

    :hover {
        cursor: pointer;
    }
`;

export default EditArticle;
function EditArticle() {
    return <Container>
        <InnerContainer>
            <NewBlockButton>Add New Block</NewBlockButton>
        </InnerContainer>
    </Container>
}