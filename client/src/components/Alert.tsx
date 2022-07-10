import { useDispatch } from "react-redux";
import styled from "styled-components";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlertBox = styled.div`
  background-color: white;
  opacity: 1;
  padding: 15px 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-weight: 550;
`;

type MyProps = {
  msg: string;
};

export default function Alert({ msg }: MyProps) {
  const dispatch = useDispatch();

  setTimeout(() => {
    dispatch({ type: "off" });
  }, 600);

  return (
    <Background>
      <AlertBox id="alert">{msg}</AlertBox>
    </Background>
  );
}
