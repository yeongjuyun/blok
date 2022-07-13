import axios from "axios";
import { useEffect, useState } from "react";
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
  const [domain, setDomain] = useState('');

  const getDomainInfo = async () => {
    axios.get("/site/2").then((res): void => {
      const domain = res.data.sites[0].domain;
      setDomain(domain);
    });
  };

  useEffect(() => {
    getDomainInfo();
  }, []);

  const deleteHandler = () => {
    dispatch({
      type: "CONFIRM/MODAL_ON",
      payload: {
        title: "삭제",
        msg: `${domain} 페이지를 정말 삭제하시겠습니까?`,
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
