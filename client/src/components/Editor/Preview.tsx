import styled from 'styled-components';

// 나중에 수정
const domain = 'domain/name';

const Container = styled.div`
    width: 1360px;
    height: 100%;
    position: fixed;
    left: 561px; 
`;

const Header = styled.div`
    width: 595px;
    height: 80px;
    background-color: white;
    position: fixed;
    top: 0;

    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const InnerContainer = styled.div`
    height: 80px;
    align-items: center;
    display: flex;
    align-items: center;
`;

const MyPage = styled.div`
    font-weight: 700;
    margin-right: 5px;
`;

const Domain = styled.a`
    color: black;
    text-decoration: none;
`;

const CopyButton = styled.button`
    background-color: white;
    border: 1px solid #D9D9D9;
    padding: 5px 7px;
    border-radius: 40px / 40px;
    margin-left: 10px;

    font-weight: 600;

    :hover {
        cursor: pointer;
    }
`;

const SaveButton = styled.button`
    background-color: black;
    border: 1px solid black;
    padding: 5px 10px;
    border-radius: 40px / 40px;

    font-weight: 600;
    color: white;
    font-size: 16px;

    :hover {
        cursor: pointer;
    }
`;

const Article = styled.div`
    height: 100vh;
`

async function copyHandler() {
    try {
        await navigator.clipboard.writeText(domain);
        alert('클립보드에 복사되었습니다.');
    } 
    catch (err) {
        alert('잠시 후 시도해주세요.');
    }
}

export default PreviewBar;
function PreviewBar() {
    return <Container>
        <Header>
            <InnerContainer>
                <MyPage>My Page:</MyPage>
                <Domain href={domain}>{domain}</Domain>
                <CopyButton onClick={() => copyHandler()}>Copy</CopyButton>
            </InnerContainer>
            <SaveButton>Save</SaveButton>
        </Header>
        <Article />
    </Container>
}