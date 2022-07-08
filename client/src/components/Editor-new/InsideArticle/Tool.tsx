import styled from "styled-components";
// import Block from './InsideSetting/Block';
// import Appearance from './InsideSetting/Appearance';
// import Settings from './InsideSetting/Settings';

const Container = styled.div`
  width: 500px;
  margin-left: 74px;
  border-right: 1px solid #D1D1D1;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
`;

export default Setting;
function Setting() {
  return (
    <Container>
        {/* <Block />
        <Appearance />
        <Settings /> */}
    </Container>
  );
}
