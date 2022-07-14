import styled from 'styled-components';
import Navbar from '../components/Blocks/Simple/Nav/SettingBlock';
import Hero from '../components/Blocks/Simple/Hero/SettingBlock';
import Feature from '../components/Blocks/Simple/Feature/SettingBlock';
import Footer from '../components/Blocks/Simple/Footer/SettingBlock';

const Container = styled.div`
  padding-top: 50px;
  background-color: #f7f7f9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  font-family: 'Inter';
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
`;

function Test() {
  return (
    <Container>
      <Navbar></Navbar>
      <Hero></Hero>
      <Feature></Feature>
      <Footer></Footer>
    </Container>
  );
}

export default Test;
