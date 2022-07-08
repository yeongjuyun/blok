import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const MainContainer = styled.div`
  padding: 100px;
`;

const Container = styled.div`
  margin-bottom: 50px;
`;

export const MainTitle = styled.div`
  font-weight: 600;
  font-size: 32px;
  text-align: center;
  margin-bottom: 70px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 32px;
`;

const ContentDiv = styled.div`
  display: flex;
`;

const ContentTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  width: 100px;
  text-align: center;
  margin-right: 43px;
`;

const Content = styled.div`
  font-size: 18px;
  margin-bottom: 24px;
  width: 300px;
  height: 1.5rem;
  background-color: #fff;
`;

const ResetButton = styled.button`
  border: 1px solid #d9d9d9;
  border-radius: 30px;
  background-color: #ffffff;
  color: black;
  width: 212px;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 20px;
`;

const DeleteButton = styled.button`
  border: 1px solid #d9d9d9;
  border-radius: 30px;
  background-color: #9747ff;
  color: #ffffff;
  width: 212px;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export default function MyInfo() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [plan, setPlan] = useState<string>("");

  const getUserInfo = async () => {
    axios.get("/user").then((res): void => {
      const user = res.data;
      setName(user.name);
      setEmail(user.email);
      setPlan(user.plan);
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <MainContainer>
      <MainTitle>Account</MainTitle>
      <Container>
        <Title>My Infomation</Title>
        <ContentDiv>
          <ContentTitle>Name</ContentTitle>
          <Content>{name}</Content>
        </ContentDiv>
        <ContentDiv>
          <ContentTitle>Email</ContentTitle>
          <Content>{email}</Content>
        </ContentDiv>
        <ContentDiv>
          <ContentTitle>Plan</ContentTitle>
          <Content>{plan}</Content>
        </ContentDiv>
      </Container>
      <Container>
        <Title>Manage Account</Title>
        <ResetButton>Reset Password</ResetButton>
        <DeleteButton>Delete Account</DeleteButton>
      </Container>
    </MainContainer>
  );
}
