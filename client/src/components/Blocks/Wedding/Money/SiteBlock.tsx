import styled from 'styled-components';
import { SiteBlockProps, ColorSet } from '../../blockValidator';
import { SiteBlockByType } from '../../../../reducers/HostReducer';
import Map from '../../../Map';
import { useAppSelector, useAppDispatch } from '../../../../reducers';
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

const AccountContainer = styled.div`
  vertical-align: middle;
  text-align: center;
  padding: 3rem;
  width: 100%;
  border: 0;
  border-radius: 7px;
  /* background-color: wheat; */
  @media screen and (max-width: 550px) {
    padding: ${RemtoVw(REM, 3)};
  }
`;

const TextContainer = styled.div`
  vertical-align: middle;
  text-align: center;
  padding: 3rem;
  @media screen and (max-width: 550px) {
    padding: ${RemtoVw(REM, 3)};
  }
`;

const Name = styled.div<{ colorSet: ColorSet }>`
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

const Account = styled.div<{ colorSet: ColorSet }>`
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

const CopyButton = styled.button<{ colorSet: ColorSet }>`
  background-color: ${(props) => props.colorSet.primary};
  color: white;
  padding: 10px 20px;
  border: 0;
  border-radius: 7px;
  font-size: 1rem;
  text-align: center;
  margin-top: 0.8rem;
  cursor: pointer;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1.4)};
    margin-top: ${RemtoVw(REM, 0.8)};
  }
`;

const ExtraText = styled.div<{ colorSet: ColorSet }>`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${(props) => props.colorSet.surface};
  text-align: center;

  @media screen and (max-width: 550px) {
    font-size: ${RemtoVw(REM, 1.5)};
  }
`;

export default function SiteBlock(props: SiteBlockProps) {
  const dispatch = useAppDispatch();
  const { blockId, type } = props;
  const { colorSet, font, data } = SiteBlockByType({ blockId, type });

  const onClickGroomAccount = () => {
    navigator.clipboard.writeText(data.groomAccount.value);
    dispatch({
      type: 'alertOn',
      payload: { msg: '계좌번호가 복사되었습니다.' },
    });
  };
  const onClickBrideAccount = () => {
    navigator.clipboard.writeText(data.brideAccount.value);
    dispatch({
      type: 'alertOn',
      payload: { msg: '계좌번호가 복사되었습니다.' },
    });
  };

  return (
    <>
      <Container colorSet={colorSet} font={font} id={data.navTitle ?? ''}>
        {data.header?.value && (
          <MainTitle colorSet={colorSet}>{data.header.value}</MainTitle>
        )}
        <AccountContainer>
          {data.groom?.value && (
            <Name colorSet={colorSet}>{data.groom.value}</Name>
          )}
          {data.groomAccount?.value && (
            <Account colorSet={colorSet}>{data.groomAccount.value}</Account>
          )}
          <CopyButton colorSet={colorSet} onClick={onClickGroomAccount}>
            계좌번호 복사
          </CopyButton>
        </AccountContainer>
        <AccountContainer>
          {data.bride?.value && (
            <Name colorSet={colorSet}>{data.bride.value}</Name>
          )}
          {data.brideAccount?.value && (
            <Account colorSet={colorSet}>{data.brideAccount.value}</Account>
          )}
          <CopyButton colorSet={colorSet} onClick={onClickBrideAccount}>
            계좌번호 복사
          </CopyButton>
        </AccountContainer>

        <TextContainer>
          {data.body?.value && (
            <ExtraText colorSet={colorSet}>{data.body.value}</ExtraText>
          )}
        </TextContainer>
      </Container>
    </>
  );
}
