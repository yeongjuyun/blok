import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../reducers';
import { SiteBlockProps, ColorSet } from '../../blockValidator';
import { selectBlockById } from '../../../../reducers/SiteReducer';

const Container = styled.div<{ colorSet: ColorSet; font: string }>`
  background-color: ${(props) => props.colorSet.background};
  font-family: ${(props) => props.font};
  color: ${(props) => props.colorSet.surface};

  padding: 100px 40px;
  margin: 0 auto;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const TextContainer = styled.div`
  vertical-align: middle;
  padding-top: 30px;

  @media screen and (max-width: 1120px) {
    width: 400px;
  }
`;
const Img = styled.img`
  width: 400px;
  padding-right: 20px;
  padding-top: 30px;

  @media screen and (max-width: 1120px) {
    width: 400px;
    padding-rigtht: 0;
  }
`;
const Caption = styled.div<{ colorSet: ColorSet }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => props.colorSet.primary};
  margin-bottom: 10px;

  @media screen and (max-width: 1120px) {
    font-size: 1.4vw;
  }
`;
const Header = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: black;
  margin-bottom: 10px;

  @media screen and (max-width: 1120px) {
    font-size: 2.8vw;
  }
`;
const Body = styled.div<{ colorSet: ColorSet }>`
  color: ${(props) => props.colorSet.surface};

  @media screen and (max-width: 1120px) {
    font-size: 1.4vw;
  }
`;
const Button = styled.button<{ colorSet: ColorSet }>`
  background-color: ${(props) => props.colorSet.primary};
  color: white;
  padding: 10px 20px;
  border: 0;
  border-radius: 7px;
  font-size: 1rem;
  margin-top: 20px;

  :hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1120px) {
    font-size: 1.4vw;
    padding: 1vw 2vw;
  }
`;

export default function SiteBlock(props: SiteBlockProps) {
  const { blockId } = props;

  const { data } = useSelector((state: RootState) =>
    selectBlockById(state, blockId)
  );
  const colorSet = useSelector((state: RootState) => state.site.colorSet);
  const font = useSelector((state: RootState) => state.site.font);

  function buttonHandler() {
    window.location.href = data.button?.url ? data.button.url : '';
  }

  return (
    <>
      <Container
        colorSet={colorSet}
        font={font}
        id={data.navTitle !== null ? data.navTitle : ''}
      >
        {data.image?.src && (
          <Img
            src={data.image.src}
            alt={data.image.alt ? data.image.alt : ''}
          />
        )}
        <TextContainer>
          {data.caption?.value && (
            <Caption colorSet={colorSet}>{data.caption.value}</Caption>
          )}
          {data.header?.value && <Header>{data.header.value}</Header>}
          {data.body?.value && (
            <Body colorSet={colorSet}>{data.body.value}</Body>
          )}
          {data.button?.title && (
            <Button
              colorSet={colorSet}
              color={colorSet.primary}
              onClick={buttonHandler}
            >
              {data.button.title}
            </Button>
          )}
        </TextContainer>
      </Container>
    </>
  );
}
