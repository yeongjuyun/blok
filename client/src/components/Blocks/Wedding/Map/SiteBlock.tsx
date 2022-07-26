import styled from 'styled-components';
import { SiteBlockProps, ColorSet } from '../../blockValidator';
import { SiteBlockByType } from '../../../../reducers/HostReducer';
import Map from '../../../Map';
import { useAppSelector } from '../../../../reducers';
import * as icons from '../../../../icons';

const RemtoVw = (px: number, rem: number) => {
  return (rem * 100 * px) / 550 + 'vw';
};

export const PxVw = (px: number) => {
  return (100 * px) / 550 + 'vw';
};

const REM = 16;
const Container = styled.div<{ colorSet: ColorSet; font: string }>`
  background-color: ${(props) => props.colorSet.background};
  font-family: ${(props) => props.font};
  color: ${(props) => props.colorSet.surface};

  max-width: 550px;
  padding: 50px 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainTitle = styled.div<{ colorSet: ColorSet }>`
  color: ${(props) => props.colorSet.primary};
  font-size: 5rem;
  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 5)};
  }
`;

const TextContainer = styled.div`
  vertical-align: middle;
  padding: 3rem;
  @media screen and (max-width: 550px) {
    padding: ${RemtoVw(REM, 3)};
  }
`;

const Venue = styled.div<{ colorSet: ColorSet }>`
  font-size: 2rem;
  font-weight: 600;
  color: ${(props) => props.colorSet.secondary};
  text-align: center;
  margin-bottom: 1rem;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 2)};
    margin-bottom: ${RemtoVw(REM, 1)};
  }
`;

const Address = styled.div<{ colorSet: ColorSet }>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.colorSet.surface};
  text-align: center;
  margin-bottom: 0.3rem;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1.5)};
    margin-bottom: ${RemtoVw(REM, 0.3)};
  }
`;

const Contact = styled.div<{ colorSet: ColorSet }>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.colorSet.surface};
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1.5)};
  }
`;

const PhoneIcon = styled.img<{ colorSet: ColorSet }>`
  width: 1.2rem;
  height: 1.2rem;
  padding-right: 0.5rem;
  filter: opacity(0.5) drop-shadow(0 0 0 #ececec);

  @media screen and (max-width: 550px) {
    width: ${RemtoVw(REM, 1.2)};
    height: ${RemtoVw(REM, 1.2)};
    padding-right: ${RemtoVw(REM, 0.5)};
  }
`;

const MapWidth100 = styled.div`
  width: 500px;
  height: 350px;
  @media screen and (max-width: 550px) {
    width: ${PxVw(500)};
    height: ${PxVw(350)};
  }
`;

export default function SiteBlock(props: SiteBlockProps) {
  const { blockId, type } = props;
  const { colorSet, font, data } = SiteBlockByType({ blockId, type });

  return (
    <>
      <Container colorSet={colorSet} font={font} id={data.navTitle ?? ''}>
        {data.header?.value && (
          <MainTitle colorSet={colorSet}>{data.header.value}</MainTitle>
        )}
        <TextContainer>
          {data.venue?.value && (
            <Venue colorSet={colorSet}>{data.venue.value}</Venue>
          )}
          {data.address?.value && (
            <Address colorSet={colorSet}>{data.address.value}</Address>
          )}
          {data.contact?.value && (
            <Contact colorSet={colorSet}>
              <PhoneIcon src={icons.Contact} colorSet={colorSet} />
              {data.contact.value}
            </Contact>
          )}
        </TextContainer>
        <MapWidth100>
          <Map props={data.address} />
        </MapWidth100>
        <TextContainer>
          {data.body?.value && (
            <Contact colorSet={colorSet}>{data.body.value}</Contact>
          )}
        </TextContainer>
      </Container>
    </>
  );
}
