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
  font-size: 1.5rem;
  font-weight: 600;
  /* color: ${(props) => props.colorSet.primary}; */
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1.5)};
  }
`;

const Address = styled.div<{ colorSet: ColorSet }>`
  font-size: 1.5rem;
  font-weight: 600;
  /* color: ${(props) => props.colorSet.primary}; */
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1.5)};
  }
`;

const Contact = styled.div<{ colorSet: ColorSet }>`
  font-size: 1.5rem;
  font-weight: 600;
  /* color: ${(props) => props.colorSet.primary}; */
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1.5)};
  }
`;

const MapImage = styled.img<{ colorSet: ColorSet }>`
  width: 1.2rem;
  height: 1.2rem;
  padding-right: 0.5rem;
  color: ${(props) => props.colorSet.primary};
  filter: opacity(0.5) drop-shadow(0 0 0 gray);

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

const ExtraText = styled.div<{ colorSet: ColorSet }>`
  color: ${(props) => props.colorSet.surface};
  font-size: 1rem;
  text-align: center;
  padding-top: 1rem;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1)};
  }
`;

export default function SiteBlock(props: SiteBlockProps) {
  const { blockId, type } = props;
  const { colorSet, font, data } = SiteBlockByType({ blockId, type });

  const venue = useAppSelector(
    (state) => state.site.blocks[0].data.venue?.value
  );
  console.log(venue);

  return (
    <>
      <Container colorSet={colorSet} font={font} id={data.navTitle ?? ''}>
        {data.header?.value && (
          <MainTitle colorSet={colorSet}>{data.header.value}</MainTitle>
        )}
        {data.body?.value && (
          <ExtraText colorSet={colorSet}>{data.body.value}</ExtraText>
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
              <MapImage src={icons.Contact} colorSet={colorSet} />
              {data.contact.value}
            </Contact>
          )}
        </TextContainer>
        <MapWidth100>
          <Map props={data.address} />
        </MapWidth100>
      </Container>
    </>
  );
}
