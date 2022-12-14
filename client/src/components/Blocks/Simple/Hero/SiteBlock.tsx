import styled from 'styled-components';
import { RemtoVw } from '../../../../utils/cssconvert';
import { SiteBlockProps, ColorSet } from '../../blockValidator';
import { SiteBlockByType } from '../../../../reducers/HostReducer';

const Container = styled.div<{ colorSet: ColorSet; font: string }>`
  background-color: ${(props) => props.colorSet.background};
  font-family: ${(props) => props.font};
  color: ${(props) => props.colorSet.surface};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  margin-top: 56px;
  padding: 7rem 2rem;
`;

const HeroMenuName = styled.div<{ colorSet: ColorSet }>`
  color: ${(props) => props.colorSet.primary};
  font-weight: 900;
  font-size: 1.2rem;
  line-height: 1.7rem;
  @media screen and (max-width: 1120px) {
    font-size: ${RemtoVw(16, 1.2)};
    line-height: ${RemtoVw(16, 1.7)};
  }
`;

const HeadLine = styled.div`
  color: #000000;
  font-weight: 700;
  font-size: 2.7rem;
  margin-top: 1.3rem;
  text-align: center;
  @media screen and (max-width: 1120px) {
    margin-top: ${RemtoVw(16, 1.3)};
    font-size: ${RemtoVw(16, 2.7)};
    line-height: ${RemtoVw(16, 5)};
  }
`;
const HeadLineText = styled.div<{ colorSet: ColorSet }>`
  font-weight: 500;
  font-size: 1.2rem;
  line-height: 1.5rem;
  color: ${(props) => props.colorSet.surface};
  padding: 0 10%;
  margin-top: 1.3rem;
  @media screen and (max-width: 1120px) {
    font-size: ${RemtoVw(16, 1.2)};
    line-height: ${RemtoVw(16, 1.5)};
    margin-top: ${RemtoVw(16, 1.3)};
  }
`;
const Button = styled.a<{ colorSet: ColorSet }>`
  background: ${(props) => props.colorSet?.primary};
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  line-height: 1.2rem;
  letter-spacing: 0.04em;
  text-decoration: none;
  color: #ffffff;
  transition: color 0.5s;
  cursor: pointer;
  :hover {
    color: wheat;
  }
  margin-top: 1.3rem;
  @media screen and (max-width: 1120px) {
    font-size: ${RemtoVw(16, 1)};
    border-radius: ${RemtoVw(16, 0.5)};
    padding: ${RemtoVw(16, 1)} ${RemtoVw(16, 1.5)};
    margin-top: ${RemtoVw(16, 1.3)};
  }
`;

export default function SiteBox(props: SiteBlockProps) {
  const { blockId, type } = props;
  const { colorSet, font, data } = SiteBlockByType({ blockId, type });

  return (
    <>
      <Container colorSet={colorSet} font={font}>
        <HeroMenuName colorSet={colorSet}>{data.caption?.value}</HeroMenuName>
        <HeadLine>{data.header?.value}</HeadLine>
        <HeadLineText colorSet={colorSet}>{data.body?.value}</HeadLineText>
        <Button colorSet={colorSet} href={data.button?.url}>
          {data.button?.title}
        </Button>
      </Container>
    </>
  );
}
