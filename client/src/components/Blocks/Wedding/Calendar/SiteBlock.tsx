import styled from 'styled-components';
import { SiteBlockProps, ColorSet } from '../../blockValidator';
import { SiteBlockByType } from '../../../../reducers/HostReducer';
import { dataFomatting } from '../Main/SiteBlock';
import { useAppSelector } from '../../../../reducers';
import Calendar from 'react-calendar';
import './Calendar.css';

const RemtoVw = (px: number, rem: number) => {
  return (rem * 100 * px) / 550 + 'vw';
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

const DateText = styled.div<{ colorSet: ColorSet }>`
  font-size: 3rem;
  font-weight: 800;
  color: ${(props) => props.colorSet.secondary};
  margin-bottom: 1rem;
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1.8)};
    margin-bottom: ${RemtoVw(REM, 1)};
  }
`;

const DayText = styled.div<{ colorSet: ColorSet }>`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${(props) => props.colorSet.secondary};
  text-align: center;
  margin-top: 0.5rem;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1.8)};
    margin-top: ${RemtoVw(REM, 0.5)};
  }
`;

const ExtraText = styled.div<{ colorSet: ColorSet }>`
  color: ${(props) => props.colorSet.surface};
  font-size: 1.5rem;
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1.5)};
  }
`;

export default function SiteBlock(props: SiteBlockProps) {
  const { blockId, type } = props;
  const { colorSet, font, data, blocks } = SiteBlockByType({ blockId, type });
  const unformattedDate = blocks[0].data.date.value;

  return (
    <>
      <Container colorSet={colorSet} font={font} id={data.navTitle ?? ''}>
        {data.header?.value && (
          <MainTitle colorSet={colorSet}>{data.header.value}</MainTitle>
        )}
        <TextContainer>
          {unformattedDate && (
            <DateText colorSet={colorSet}>
              {dataFomatting(new Date(unformattedDate)).substring(6, 8)}/
              {dataFomatting(new Date(unformattedDate)).substring(10, 12)}
              <DayText colorSet={colorSet}>
                {dataFomatting(new Date(unformattedDate)).substring(14)}
              </DayText>
            </DateText>
          )}
          {data.body?.value && (
            <ExtraText colorSet={colorSet}>{data.body.value}</ExtraText>
          )}
        </TextContainer>
        {unformattedDate && <Calendar value={new Date(unformattedDate)} />}
      </Container>
    </>
  );
}
