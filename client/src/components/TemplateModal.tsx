import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { MainTitle } from "./MyInfo";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 74px;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  padding: 3rem;
  box-sizing: border-box;
  overflow: auto;

  .closeButton {
    position: fixed;
    top: 5px;
    right: 5px;
  }

  @media screen and (max-width: 780px) {
    top: 54px;
    left: 0;

    .closeButton {
      top: 59px;
    }
  }
`;

const TemplateListContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .templatebox {
    margin-right: 3rem;
  }

  @media screen and (max-width: 1080px) {
    flex-direction: column;

    .templatebox {
      margin-right: 0;
      margin-bottom: 3rem;
    }
  }
`;

const TemplateBox = styled.div`
  width: 25rem;
  height: 34rem;
  background-color: #d9d9d9;
`;

export default function TemplateModal() {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch({ type: "MODAL_OFF" });
  };
  return (
    <ModalContainer>
      <MainTitle>Template</MainTitle>
      <TemplateListContainer>
        <TemplateBox className="templatebox">1</TemplateBox>
        <TemplateBox className="templatebox">2</TemplateBox>
        <TemplateBox>3</TemplateBox>
      </TemplateListContainer>
      <div className="closeButton" onClick={closeModalHandler}>
        <CgClose size={30} color={"gray"} />
      </div>
    </ModalContainer>
  );
}
