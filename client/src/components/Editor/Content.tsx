import styled from 'styled-components';
import Nav from './Nav/Nav';
import Preview from './Preview';

const Container = styled.div`
    width: 1920px;
    height: 1080px;
    display: flex;
`;

export default Content;
function Content() {
    return <Container>
        <Nav />
        <Preview />
    </Container>
}