import styled from 'styled-components';
import { SiteBlockProps, ColorSet } from '../../blockValidator';
import { SiteBlockByType } from '../../../../reducers/HostReducer';

const RemtoVw = (px: number, rem: number) => {
  return (rem * 100 * px) / 550 + 'vw';
};
const PxVw = (px: number) => {
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

const ExtraText = styled.div<{ colorSet: ColorSet }>`
  color: ${(props) => props.colorSet.surface};
  font-size: 1.5rem;
  padding: 1rem 0 3rem 0;
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1.5)};
    padding: ${RemtoVw(REM, 1)} 0 ${RemtoVw(REM, 3)} 0;
  }
`;

const ImageContainer = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 550px) {
    width: ${PxVw(500)};
  }
`;

const ImageRow = styled.div`
  width: 250px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  img:not(:first-child) {
    margin-left: 0.5rem;
  }

  @media screen and (max-width: 550px) {
    width: ${PxVw(250)};
  }
`;

const ImageRowThree = styled.div`
  width: 166.6667px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  img:not(:first-child) {
    margin-left: 0.5rem;
  }

  @media screen and (max-width: 550px) {
    width: ${PxVw(166.6667)};
  }
`;

const Img = styled.img`
  max-width: 100%;
  margin-bottom: 0.5rem;
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;

export const ImgDiv = styled.div`
  width: 500px;
  height: 500px;
  background-color: #efefef;
  text-align: center;
  line-height: 500px;
  @media screen and (max-width: 550px) {
    width: ${PxVw(500)};
    padding-right: 0;
  }
`;

const ImageLayout = (data: any) => {
  const imageCount = data.data.images.length;
  const images = data.data.images;
  switch (imageCount) {
    case 1:
      return (
        <ImageContainer>
          <Img src={images[0]} alt={images[0]} />
        </ImageContainer>
      );
    case 2:
      return (
        <ImageContainer>
          <ImageRow>
            <Img src={images[0]} alt={images[0]} />
            <Img src={images[1]} alt={images[1]} />
          </ImageRow>
        </ImageContainer>
      );
    case 3:
      return (
        <ImageContainer>
          <Img src={images[0]} alt={images[0]} />
          <ImageRow>
            <Img src={images[1]} alt={images[1]} />
            <Img src={images[2]} alt={images[2]} />
          </ImageRow>
        </ImageContainer>
      );
    case 4:
      return (
        <ImageContainer>
          <ImageRow>
            <Img src={images[0]} alt={images[0]} />
            <Img src={images[1]} alt={images[1]} />
          </ImageRow>
          <ImageRow>
            <Img src={images[2]} alt={images[2]} />
            <Img src={images[3]} alt={images[3]} />
          </ImageRow>
        </ImageContainer>
      );
    case 5:
      return (
        <ImageContainer>
          <ImageRow>
            <Img src={images[0]} alt={images[0]} />
            <Img src={images[1]} alt={images[1]} />
          </ImageRow>
          <Img src={images[2]} alt={images[2]} />
          <ImageRow>
            <Img src={images[3]} alt={images[3]} />
            <Img src={images[4]} alt={images[4]} />
          </ImageRow>
        </ImageContainer>
      );
    case 6:
      return (
        <ImageContainer>
          <ImageRow>
            <Img src={images[0]} alt={images[0]} />
            <Img src={images[1]} alt={images[1]} />
          </ImageRow>
          <Img src={images[2]} alt={images[2]} />
          <ImageRowThree>
            <Img src={images[3]} alt={images[3]} />
            <Img src={images[4]} alt={images[4]} />
            <Img src={images[5]} alt={images[5]} />
          </ImageRowThree>
        </ImageContainer>
      );
    case 7:
      return (
        <ImageContainer>
          <Img src={images[0]} alt={images[0]} />
          <ImageRow>
            <Img src={images[1]} alt={images[1]} />
            <Img src={images[2]} alt={images[2]} />
          </ImageRow>
          <Img src={images[3]} alt={images[3]} />
          <ImageRowThree>
            <Img src={images[4]} alt={images[4]} />
            <Img src={images[5]} alt={images[5]} />
            <Img src={images[6]} alt={images[6]} />
          </ImageRowThree>
        </ImageContainer>
      );
    case 8:
      return (
        <ImageContainer>
          <ImageRowThree>
            <Img src={images[0]} alt={images[0]} />
            <Img src={images[1]} alt={images[1]} />
            <Img src={images[2]} alt={images[2]} />
          </ImageRowThree>
          <Img src={images[3]} alt={images[3]} />
          <ImageRow>
            <Img src={images[4]} alt={images[4]} />
            <Img src={images[5]} alt={images[5]} />
          </ImageRow>
          <ImageRow>
            <Img src={images[6]} alt={images[6]} />
            <Img src={images[7]} alt={images[7]} />
          </ImageRow>
        </ImageContainer>
      );
    case 9:
      return (
        <ImageContainer>
          <ImageRowThree>
            <Img src={images[0]} alt={images[0]} />
            <Img src={images[1]} alt={images[1]} />
            <Img src={images[2]} alt={images[2]} />
          </ImageRowThree>
          <ImageRowThree>
            <Img src={images[3]} alt={images[3]} />
            <Img src={images[4]} alt={images[4]} />
            <Img src={images[5]} alt={images[5]} />
          </ImageRowThree>
          <ImageRowThree>
            <Img src={images[6]} alt={images[6]} />
            <Img src={images[7]} alt={images[7]} />
            <Img src={images[8]} alt={images[8]} />
          </ImageRowThree>
        </ImageContainer>
      );
    default:
      return <ImgDiv>여기에 이미지가 보여집니다.</ImgDiv>;
  }
};

export default function SiteBlock(props: SiteBlockProps) {
  const { blockId, type } = props;
  const { colorSet, font, data } = SiteBlockByType({ blockId, type });

  return (
    <>
      <Container colorSet={colorSet} font={font} id={data.navTitle ?? ''}>
        {data.header?.value && (
          <MainTitle colorSet={colorSet}>{data.header.value}</MainTitle>
        )}
        {data.body?.value && (
          <ExtraText colorSet={colorSet}>{data.body.value}</ExtraText>
        )}
        <ImageLayout data={data} />
      </Container>
    </>
  );
}
