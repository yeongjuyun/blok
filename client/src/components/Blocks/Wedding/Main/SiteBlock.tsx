import styled from 'styled-components';
import { SiteBlockProps, ColorSet } from '../../blockValidator';
import { SiteBlockByType } from '../../../../reducers/HostReducer';

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

const MainDate = styled.div<{ colorSet: ColorSet }>`
  font-size: 8rem;
  margin-top: 3rem;
  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 8)};
    margin-top: ${RemtoVw(REM, 3)};
  }
`;

const TextContainer = styled.div`
  vertical-align: middle;
  padding: 3rem;
  @media screen and (max-width: 550px) {
    padding: ${RemtoVw(REM, 3)};
  }
`;

const Name = styled.span<{ colorSet: ColorSet }>`
  font-size: 3rem;
  font-weight: 700;
  color: ${(props) => props.colorSet.primary};

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 2)};
  }
`;

const ExtraText = styled.div<{ colorSet: ColorSet }>`
  color: ${(props) => props.colorSet.surface};
  font-size: 1.5rem;
  margin-top: 1rem;
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1)};
    margin-top: ${RemtoVw(REM, 1)};
  }
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

const Img = styled.img`
  max-width: 500px;
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

const DateTest = styled.div<{ colorSet: ColorSet }>`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${(props) => props.colorSet.surface};
  margin-bottom: 0.5rem;
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1.8)};
    margin-bottom: ${RemtoVw(REM, 0.5)};
  }
`;

const Venue = styled.div<{ colorSet: ColorSet }>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.colorSet.surface};
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1.5)};
  }
`;

export const dataFomatting = (e: Date) => {
  let dayArr = ['일', '월', '화', '수', '목', '금', '토'];
  let day = dayArr[e.getDay()];
  let yyyy = e.getFullYear().toString();
  let MM = e.getMonth() < 10 ? `0${e.getMonth() + 1}` : e.getMonth() + 1;
  let dd = e.getDate() < 10 ? `0${e.getDate()}` : e.getDate();
  let hh = e.getHours();
  hh = hh % 12;
  hh = hh ? hh : 12;
  let h = e.getHours() < 12 ? '오전' : '오후';
  let mm = e.getMinutes() === 0 ? '' : e.getMinutes().toString() + '분';

  return `${yyyy}년 ${MM}월 ${dd}일 ${day}요일 ${h} ${hh}시` + ` ${mm}`;
};

export default function SiteBlock(props: SiteBlockProps) {
  const { blockId, type } = props;
  const { colorSet, font, data } = SiteBlockByType({ blockId, type });

  return (
    <>
      <Container colorSet={colorSet} font={font} id={data.navTitle ?? ''}>
        <MainDate colorSet={colorSet}>
          {dataFomatting(new Date(data.date.value)).slice(5, 8)}/
          {dataFomatting(new Date(data.date.value)).slice(10, 12)}
        </MainDate>
        <TextContainer>
          {data.header?.value && (
            <Name colorSet={colorSet}>{data.header.value}</Name>
          )}
          {data.body?.value && (
            <ExtraText colorSet={colorSet}>{data.body.value}</ExtraText>
          )}
        </TextContainer>
        {data.image?.src ? (
          <Img src={data.image.src} alt={data.image.alt ?? ''} />
        ) : (
          <ImgDiv style={{ marginRight: '20px' }}>
            여기에 이미지가 보여집니다.
          </ImgDiv>
        )}
        <TextContainer>
          {data.date?.value && (
            <DateTest colorSet={colorSet}>
              {dataFomatting(new Date(data.date.value))}
            </DateTest>
          )}

          {data.venue?.value && (
            <Venue colorSet={colorSet}>{data.venue.value}</Venue>
          )}
        </TextContainer>
      </Container>
    </>
  );
}
