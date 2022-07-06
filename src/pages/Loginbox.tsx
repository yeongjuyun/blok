import styled from 'styled-components';
import React, { useState } from 'react';
import * as LoginForm from '../components/LoginForm';

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 49px 72px 25px 70px;
  box-sizing: border-box;
  width: 645px;
  border: 1px solid black;
`;

export default Login;
function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(`email: ${email}, password: ${password} `);
  };

  return (
    <Container>
      <LoginForm.Title>로그인</LoginForm.Title>
      <LoginForm.InputBox
        title={'이메일'}
        handleChange={handleEmailChange}
        value={email}
      ></LoginForm.InputBox>
      <LoginForm.InputBox
        title={'비밀번호'}
        handleChange={handlePasswordChange}
        value={password}
      ></LoginForm.InputBox>
      <LoginForm.FindPasswordtag>비밀번호 찾기</LoginForm.FindPasswordtag>
      <LoginForm.Button onClick={handleClick}>로그인 버튼</LoginForm.Button>
    </Container>
  );
}
