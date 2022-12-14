import styled from 'styled-components';
import { CgClose } from 'react-icons/cg';
import { TemplateCard } from './TemplateCard';
import Button from '../Button';
import { useState, useRef, useEffect } from 'react';
import { templateCardData } from './TemplateData';
import templateListData from './TemplateData';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../reducers';
import type { SiteData } from './DataTypes';

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #202020;
  opacity: 0.55;
  overflow: hidden;
  z-index: 15;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 660px;
  border-radius: 10px;
  background-color: #fff;
  padding: 3rem;
  z-index: 20;
  overflow: hidden;

  .closeButton {
    position: absolute;
    top: 5px;
    right: 5px;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.7;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 780px) {
    position: absolute;
    width: 80%;
    height: 90%;
    padding: 30px 0;
    flex-direction: column;
    overflow-y: scroll;
    box-sizing: border-box;
  }
`;

const TemplateListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  .selectedCard {
    border: 5px solid #dfdfdf;
    box-sizing: border-box;
  }

  @media screen and (max-width: 780px) {
    flex-direction: column;
  }
`;

const TemplateCardCustom = styled(TemplateCard)`
  :hover {
    background-color: lightgray;
  }
  :active {
    background-color: gray;
  }
`;

const DomainContainer = styled.div`
  padding: 0 150px;
  margin-bottom: 40px;

  .inputBox {
    height: 120px;
    position: relative;

    .domainInput {
      padding-left: 98px;
    }

    p {
      position: absolute;
      font-size: 18px;
      font-weight: 600;
      bottom: 5px;
      left: 12px;
    }
  }

  .validationText {
    display: block;
    font-size: 12px;
    margin: 8px 3px 0 3px;
    color: #949494;
  }

  .siteDescription {
    border: 1px solid #ececec;
    font-size: 18px;
    height: 80px;
  }
  @media screen and (max-width: 780px) {
    padding: 0 60px;
  }
  @media screen and (max-width: 500px) {
    padding: 0 40px;
  }
`;

const CustomInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 18px;

  .inputBox {
    height: 60px;
  }
`;
const CustomInput = styled.input`
  width: 100%;
  height: 50px;
  font-size: 18px;
  line-height: 40px;
  border: 1px solid #ececec;
  box-sizing: border-box;
  padding: 12px;

  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;

const CustomInputTitle = styled.label`
  font-size: 18px;
  line-height: 36px;

  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;

const MainTitle = styled.div`
  font-weight: 600;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 30px;
`;

const ButtonPadiing = styled(Button)`
  padding: 0 5rem;
  display: block;
  margin: auto;
`;

// type SiteData = {
//   userId: string;
//   name: string;
//   domain: string;
//   theme: string;
//   font: string;
//   colorSet: {
//     primary: string;
//     secondary: string;
//     background: string;
//     surface: string;
//   };
//   blocks: [];
// };

type UserSite = Omit<SiteData, 'createdAt' | '_id' | 'user'>;

export default function TemplateModal() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.loginCheckReducer.loginData);
  const directTemplate = useAppSelector(
    (state) => state.modalReducer.templateData
  );
  const siteName = useRef<HTMLInputElement>(null);
  const domain = useRef<HTMLInputElement>(null);
  const siteDesc = useRef<HTMLTextAreaElement>(null);
  const [siteNameError, setSiteNameError] = useState(false);
  const [domainError, setDomainError] = useState(false);
  const [template, setTemplate] = useState<any | null>(null);
  const [data, setData] = useState<UserSite>({
    userId: userData.userId,
    id: null,
    name: '',
    domain: '',
    theme: '',
    font: '',
    colorSet: {
      primary: '',
      secondary: '',
      background: '',
      surface: '',
    },
    blocks: [],
  });

  // ?????????????????? ?????? ????????? ????????? ???????????? ??????, ?????? ????????? ????????? ????????? ????????????
  useEffect(() => {
    if (directTemplate !== '') {
      setTemplate(directTemplate);
    }
  }, [directTemplate]);

  const onSelectHandler = (title: string) => {
    setTemplate(title);
  };

  const selectTemplateHandler = () => {
    // ????????? ?????? ???, ?????? ?????? colorSet, font, theme ??? ??????
    let selectedTemplate = {};
    switch (template) {
      case '???????????????':
        selectedTemplate = templateListData().landingPage;
        break;
      case '?????????':
        selectedTemplate = templateListData().portfolio;
        break;
      case '????????? ?????????':
        selectedTemplate = templateListData().weddingInvitation;
        break;
      case '?????? ????????????':
        selectedTemplate = templateListData().basicWeb;
        break;
      default:
        alert('?????? ????????? ????????? ?????? ????????????.');
    }

    setData((prev) => {
      return {
        ...prev,
        ...selectedTemplate,
      };
    });
  };

  // ????????????, ????????? ?????? ??????
  const validation = !siteNameError && !domainError;
  const checkEnga = /[a-z]/;
  const checkSpace = /[\s]/g;
  const specialPattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

  const changeDomainHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (
      checkEnga.test(domain.current!.value) !== true ||
      checkSpace.test(domain.current!.value) === true ||
      specialPattern.test(domain.current!.value) === true ||
      domain.current!.value.length <= 1
    ) {
      setDomainError(true);
    } else {
      setDomainError(false);
      setData((prev) => {
        return {
          ...prev,
          domain: domain.current!.value,
        };
      });
    }
  };

  const changeSiteHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (siteName.current!.value.length <= 1) {
      setSiteNameError(true);
    } else {
      setSiteNameError(false);
      setData((prev) => {
        return {
          ...prev,
          name: siteName.current!.value,
        };
      });
    }
  };

  const createSiteHandler = async () => {
    try {
      // ????????? DB ??????, ??????
      const res = await axios.post(`/api/site`, data);
      console.log('POST ?????? - ??????????????? : ', res.data);
      dispatch({ type: 'alertOn', payload: { msg: '????????? ?????????????????????.' } });
      dispatch({ type: 'TEMPLATE/MODAL_OFF' });

      // ????????? ???????????? ??????
      navigate(`/editor/${res.data._id}`);
    } catch (err: any) {
      console.log(err.response.data);
      dispatch({
        type: 'alertOn',
        payload: { msg: err.response.data.reason, time: 1000 },
      });
    }
  };

  const closeModalHandler = () => {
    dispatch({ type: 'TEMPLATE/MODAL_OFF' });
  };

  return (
    <>
      <ModalContainer>
        <MainTitle>
          {data.theme === '' ? '????????? ??????' : '????????? ??????'}
        </MainTitle>
        {data.theme === '' ? (
          <TemplateListContainer>
            {templateCardData.map((card) => (
              <TemplateCardCustom
                key={card.title}
                className={card.title === template ? 'selectedCard' : 'card'}
                onClick={() => onSelectHandler(card.title)}
                title={card.title}
                description={card.description}
                color1={card.color1}
                color2={card.color2}
              />
            ))}
          </TemplateListContainer>
        ) : (
          <DomainContainer>
            <CustomInputDiv>
              <CustomInputTitle htmlFor=''>????????????</CustomInputTitle>
              <div className='inputBox'>
                <CustomInput
                  type='text'
                  placeholder='??????????????? ???????????????'
                  ref={siteName}
                  onChange={(e) => {
                    changeSiteHandler(e);
                  }}
                />
                <span className='validationText'>
                  {siteNameError && '???????????? ?????? ???????????? ?????????.'}
                </span>
              </div>
            </CustomInputDiv>
            <CustomInputDiv>
              <CustomInputTitle htmlFor=''>????????? ??????</CustomInputTitle>
              <div className='inputBox'>
                <p>blok.com/</p>
                <CustomInput
                  className='domainInput'
                  type='text'
                  placeholder='????????? ??????'
                  ref={domain}
                  onInput={(e) => {
                    changeDomainHandler(e);
                  }}
                />
                <span className='validationText'>
                  {domainError && '???????????? ?????? ????????? ?????????.'}
                </span>
              </div>
            </CustomInputDiv>
            <CustomInputDiv>
              <CustomInputTitle htmlFor=''>????????? ??????</CustomInputTitle>
              <textarea
                className='siteDescription'
                placeholder='????????? ???????????? ??????????????????'
                ref={siteDesc}
              />
            </CustomInputDiv>
          </DomainContainer>
        )}

        <div className='closeButton' onClick={closeModalHandler}>
          <CgClose size={30} color={'gray'} />
        </div>
        {data.theme === '' ? (
          <ButtonPadiing
            className='createButton'
            size='large'
            onClick={selectTemplateHandler}
          >
            ??????
          </ButtonPadiing>
        ) : (
          <ButtonPadiing
            className='createButton'
            size='large'
            onClick={createSiteHandler}
            disabled={!validation}
          >
            ????????? ?????????
          </ButtonPadiing>
        )}
      </ModalContainer>
      <ModalBackground />
    </>
  );
}
