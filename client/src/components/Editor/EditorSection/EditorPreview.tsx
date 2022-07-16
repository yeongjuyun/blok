import styled from 'styled-components';
const NAV_WIDTH = 72;
const SIDETAB_WIDTH = 440;
const Container = styled.div`
  position: fixed;
  top: 60px;
  padding: 32px 64px;
  width: calc(100% - ${NAV_WIDTH + SIDETAB_WIDTH}px);
  height: 100%;
  box-sizing: border-box;
`;
const SiteBlockContainer = styled.div`
  width: 100%;
  background: white;
  height: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 4px;
`;
export default Preview;
function Preview() {
  return (
    <Container>
      <SiteBlockContainer />
    </Container>
  );
}
