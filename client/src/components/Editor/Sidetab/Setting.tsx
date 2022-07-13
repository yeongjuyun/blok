import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const [domain, setDomain] = useState([]);
  const now = useSelector((state: any) => state.modalReducer);

  const getUserInfo = async () => {
    axios.get("/user").then((res): void => {
      const data = res.data.domain;
      setDomain(data);
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const deleteHandler = () => {
    dispatch({
      type: "CONFIRM/MODAL_ON",
      payload: {
        title: "삭제",
        msg: "정말 삭제하시겠습니까?",
      },
    });

    // try-catch
    // 페이지 삭제 요청
    // alert 삭제되었습니다.
  };

  return (
    <Container>
      {/* 도메인 섹션 (Card, Input 컴포넌트 재사용) */}
      <Button onClick={deleteHandler} color="black" size="large" rounding fullWidth>
        페이지 삭제
      </Button>
    </Container>
  );
}
