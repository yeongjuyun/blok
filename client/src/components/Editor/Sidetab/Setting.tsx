import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../../Button";
import { TextInput } from "../../Input";

const ButtonContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Container = styled.div`
  padding: 0.01px 20px 20px 20px;
  background-color: white;
  margin: 0 auto 40px auto;
  border-radius: 5px;
`;

export default function Setting() {
  const dispatch = useDispatch();
  const [domain, setDomain] = useState<any>([]);

  async function getDomainInfo() {
    try {
      const res = await axios.get("/site/2");
      const data = res.data.sites[0];
      setDomain(data.domain);
    } catch (e) {
      console.log(e);
    }
  }

  function deleteHandler() {
    dispatch({
      type: "CONFIRM/MODAL_ON",
      payload: {
        title: "삭제",
        msg: `${domain} 페이지를 정말 삭제하시겠습니까?`,
      },
    });
  }

  useEffect(() => {
    getDomainInfo();
  }, []);

  return (
    <>
      <Container>
        <TextInput
          title="도메인"
          required={true}
          value={domain}
          guideline="도메인을 변경할 수 있습니다."
          onChange={(e: any) => setDomain(e.target.value)}
        ></TextInput>
      </Container>
      <ButtonContainer>
        <Button
          onClick={deleteHandler}
          color="black"
          size="large"
          rounding
          fullWidth
        >
          페이지 삭제
        </Button>
      </ButtonContainer>
    </>
  );
}
