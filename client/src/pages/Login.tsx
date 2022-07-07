import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import * as LoginForm from '../components/LoginForm';

import axios from 'axios';

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
    const data = { email: email, password: password };
    const logindata = JSON.stringify(data);
    localStorage.setItem('login', logindata);
  };
  useEffect(() => {
    const data = localStorage.getItem('login');
    console.log(
      `${data ? '로그인정보 이미 있습니다.' : '로그인 정보가 없습니다.'}`
    );
  }, []);
  useEffect(() => {
    axios.get('/123').then((res): void => console.log(res));
  }, []);
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
