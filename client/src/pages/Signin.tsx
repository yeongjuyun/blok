import styled from 'styled-components';
import Signinbox from '../components/Login/Signinbox';
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

function Signin() {
  return (
    <Container>
      <Signinbox></Signinbox>
    </Container>
  );
}

export default Signin;
