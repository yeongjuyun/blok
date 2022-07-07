import styled from 'styled-components';
import EditArticle from './EditArticle';
import PreviewArticle from './PreviewArticle'

export default Article;
function Article() {
    const Container = styled.div`
        min-width: 560px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    return <Container>
        <EditArticle />
        <PreviewArticle />
    </Container>
}