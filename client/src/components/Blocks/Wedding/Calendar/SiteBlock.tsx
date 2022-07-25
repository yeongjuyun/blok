import styled from 'styled-components';
import { SiteBlockProps, ColorSet } from '../../blockValidator';
import { useState } from 'react';
import { SiteBlockByType } from '../../../../reducers/HostReducer';
import { dataFomatting } from '../Main/SiteBlock';
import { useAppSelector, useAppDispatch } from '../../../../reducers';
import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import DatePicker from 'react-datepicker';
import {
  updateBlockData,
  selectBlockById,
} from '../../../../reducers/SiteReducer';

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

export const ImgDiv = styled.div`
  width: 100%;
  background-color: #efefef;
  text-align: center;
  line-height: 200px;
  @media screen and (max-width: 550px) {
    width: 400px;
    padding-right: 0;
  }
`;

const TextContainer = styled.div`
  vertical-align: middle;
  padding: 3rem;
  @media screen and (max-width: 550px) {
    padding: ${RemtoVw(REM, 3)};
  }
`;

const MainDate = styled.div<{ colorSet: ColorSet }>`
  font-size: 5rem;
  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 5)};
  }
`;

const DateTest = styled.div<{ colorSet: ColorSet }>`
  font-size: 1.8rem;
  font-weight: 600;
  /* color: ${(props) => props.colorSet.primary}; */
  margin-bottom: 0.5rem;
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1.8)};
    margin-bottom: ${RemtoVw(REM, 0.5)};
  }
`;

const ExtraText = styled.div<{ colorSet: ColorSet }>`
  color: ${(props) => props.colorSet.surface};
  font-size: 1rem;
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1)};
  }
`;

export default function SiteBlock(props: SiteBlockProps) {
  const { blockId, type } = props;
  const { colorSet, font, data } = SiteBlockByType({ blockId, type });
  const unformattedDate = useAppSelector(
    (state) => state.site.blocks[0].data.date?.value
  );

  return (
    <>
      <Container colorSet={colorSet} font={font} id={data.navTitle ?? ''}>
        <MainDate colorSet={colorSet}>Wedding Day</MainDate>
        <TextContainer>
          {unformattedDate && (
            <DateTest colorSet={colorSet}>
              {dataFomatting(new Date(unformattedDate)).substring(6, 8)}/
              {dataFomatting(new Date(unformattedDate)).substring(10, 12)}
              {data.body?.value && (
                <ExtraText colorSet={colorSet}>
                  {dataFomatting(new Date(unformattedDate)).substring(14)}
                </ExtraText>
              )}
            </DateTest>
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
