import styled from 'styled-components';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import * as LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import * as vaildation from '../../utils/validation';
import { useAppDispatch } from '../../reducers';

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 49px 39px 51px 39px;
  box-sizing: border-box;
  width: 478px;

  /* shadow-m */
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.12);
  border-radius: 7px;
  @media screen and (max-width: 1120px) {
    width: 100%;
    padding: 39px 62px 30px 60px;
  }
`;
const Button = styled(LoginForm.Button)`
  margin: 32px 0;
`;

function FindPasswordfield() {
  const regEmail = vaildation.regEmail;
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [btnError, setbtnError] = useState<boolean>(true);
  const btnactive = emailError === true || btnError === true;
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (
      regEmail.test(emailRef.current!.value) !== true &&
      emailRef.current!.value.length >= 1
    ) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
    if (emailRef.current!.value.length === 0) {
      setbtnError(true);
    } else {
      setbtnError(false);
    }
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (nameRef.current!.value.length === 1) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (emailRef.current!.value.length === 0) {
      setbtnError(true);
    } else {
      setbtnError(false);
    }
  };
  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const data = {
      userName: nameRef.current!.value,
      email: emailRef.current!.value,
    };
    try {
      await axios.post('/api/user/reset-password/', data);
      dispatch({
        type: 'alertOn',
        payload: { msg: '??????????????? ????????? ??????????????????.' },
      });
      nav('/login');
    } catch (e: any) {
      console.log(e);
      dispatch({
        type: 'alertOn',
        payload: { msg: `${e.response.data.reason}` },
      });
    }
  };

  const toLoginClick = (
    e: React.MouseEvent<HTMLHyperlinkElementUtils, MouseEvent>
  ) => {
    nav('/login');
  };

  useEffect(() => {
    return () => {
      async function loginCheck() {
        const res = await axios.get('/api/user/logincheck');
        if (res.data) {
          console.log('?????? ????????? ??????????????????.');
          nav('/dashboard');
        }
      }
      loginCheck();
    };
  });
  return (
    <Container>
      <LoginForm.FindPswTitle>??????????????? ????????????????</LoginForm.FindPswTitle>
      <LoginForm.InputDiv>
        <LoginForm.InputTitle error={false}>??????</LoginForm.InputTitle>
        <LoginForm.ErrorSpan>
          {nameError && '???????????? ?????? ???????????????.'}
        </LoginForm.ErrorSpan>
      </LoginForm.InputDiv>
      <LoginForm.Input
        onChange={handleNameChange}
        type='string'
        ref={nameRef}
        placeholder='????????? ????????? ??????????????????.'
        error={nameError}
      />

      <LoginForm.InputDiv>
        <LoginForm.InputTitle error={false}>?????????</LoginForm.InputTitle>
        <LoginForm.ErrorSpan>
          {emailError && '???????????? ?????? ????????? ???????????????.'}
        </LoginForm.ErrorSpan>
      </LoginForm.InputDiv>
      <LoginForm.Input
        onChange={handleEmailChange}
        type='string'
        ref={emailRef}
        placeholder='????????? ????????? ????????? ??????????????????.'
        error={emailError}
      />
      <Button onClick={handleClick} disabled={btnactive}>
        ???????????? ??? ???????????? ?????????
      </Button>
      <LoginForm.Graytext>
        <LoginForm.Atag onClick={toLoginClick}>
          ??????????????? ????????????
        </LoginForm.Atag>
      </LoginForm.Graytext>
    </Container>
  );
}

export default FindPasswordfield;
