import styled from 'styled-components';
import FindPasswordbox from '../components/Login/FindPasswordbox';
export const Container = styled.div`
  background-color: #f7f7f9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  box-sizing: border-box;
  width: 1920px;
  height: 1080px;
`;

function FindPassword() {
  return (
    <Container>
      <FindPasswordbox></FindPasswordbox>
    </Container>
  );
}

export default FindPassword;
