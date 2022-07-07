import styled from 'styled-components';
import MenuBar from './MenuBar';
import PreviewBar from './PreviewBar';

const Container = styled.div`
    width: 100%;
    height: 80px;
    background-color: #FFFFFF;
    position: fixed;
    top: 0;
    display: flex;
`;

export default Header;
function Header() {
    return <Container>
        <MenuBar />
        <PreviewBar />
    </Container>
}