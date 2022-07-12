import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../../Button";

const Container = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export default function Setting() {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch({
      type: "CONFIRM/MODAL_ON",
      payload: {
        title: "삭제",
        msg: "정말 삭제하시겠습니까?",
      },
    });
  };

  return (
    <Container>
      <Button onClick={deleteHandler} color="black" size="large" rounding fullWidth>
        페이지 삭제
      </Button>
    </Container>
  );
}
