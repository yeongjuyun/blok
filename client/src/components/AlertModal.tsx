import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";

const ModalBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #202020;
  opacity: 0.55;
  overflow: hidden;
  z-index: 2;
`;

const ModalContainer = styled.div`
  flex-direction: column;
  position: fixed;
  background-color: #fff;
  width: 230px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -75%);
  border-radius: 0.3rem;
  padding: 1rem;
  z-index: 5;

  .alertTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #E5E5E5;
  }

  .alertText {
    display: flex;
    color: black;
    margin: 1rem 0 2rem;
    text-align: center;
    line-height: 2rem;
    font-size: 1.1rem;
  }

  .buttonContainer {
    display: flex;
    margin-top: auto;
    justify-content: flex-end;
  }

  .confirmButton,
  .cancelButton {
    display: inline-flex;
    background-color: #9747ff;
    color: white;
    padding: 0.7rem 1.4rem;
    border: none;
    border-radius: 0.3rem;
    font-size: 1rem;
  }

  .cancelButton {
    background-color: #f0f1f3;
    color: black;
    margin-right: 0.5rem;
  }

  .confirmButton:hover {
    background-color: #a561ff;
    cursor: pointer;
  }

  .cancelButton:hover {
    background-color: #e3e4e6;
    cursor: pointer;
  }
`;

interface IMyProps {
  alertData: any;
}

export default function AlertModal(props: IMyProps) {
  const dispatch = useDispatch();
  const closeModalHandler = () => {
    dispatch({ type: "ALERT/MODAL_OFF" });
  };

  const conFirmHandler = () => {
    console.log("confirm!!!");
  };

  return (
    <>
      <ModalContainer>
        <div className="alertTop">
          <div className="alertTitle">{props.alertData.title}</div>
          <div className="closeButton" onClick={closeModalHandler}>
            <CgClose size={23} color={"gray"} />
          </div>
        </div>
        <div className="alertText">{props.alertData.msg}</div>
        <div className="buttonContainer">
          <button className="cancelButton" onClick={closeModalHandler}>
            취소
          </button>
          <button className="confirmButton" onClick={conFirmHandler}>
            확인
          </button>
        </div>
      </ModalContainer>
      <ModalBackground />
    </>
  );
}
