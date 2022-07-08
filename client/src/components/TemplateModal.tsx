import styled from "styled-components";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 73px;
  width: 100vw;
  height: 100vh;
  background-color: lightgray;

  button {
  }

  @media screen and (max-width: 780px) {
    top: 53px;
    left: 0;
  }
`;

export default function TemplateModal() {
  const dispatch = useDispatch();

  const closeModalHandler = () => {
    dispatch({ type: "MODAL_OFF" });
  };
  return (
    <ModalContainer>
      <button onClick={closeModalHandler}>
        <CgClose size={30} color={"gray"} />
      </button>
    </ModalContainer>
  );
}
