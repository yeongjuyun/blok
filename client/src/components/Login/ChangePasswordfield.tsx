import styled from 'styled-components';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import * as LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../reducers';

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 39px 40px 39px;
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

function ChangePasswordfield() {
  const nav = useNavigate();
  const dispatch = useAppDispatch();
  const currentpswRef = useRef<HTMLInputElement>(null);
  const newPswRef = useRef<HTMLInputElement>(null);
  const newPscheckRef = useRef<HTMLInputElement>(null);
  const [currentpswError, setCurrentpswError] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  const [newpswError, setNewPswError] = useState<boolean>(false);
  const [newpswcheckError, setNewPswcheckError] = useState<boolean>(false);
  const [btnError, setbtnError] = useState<boolean>(true);

  const btnactive =
    currentpswError === true ||
    newpswcheckError === true ||
    newpswError === true ||
    btnError === true;
  const handleCPChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (
      currentpswRef.current!.value.length < 6 &&
      currentpswRef.current!.value.length >= 1
    ) {
      setCurrentpswError(true);
    } else {
      setCurrentpswError(false);
    }
    if (currentpswRef.current!.value.length === 0) {
      setbtnError(true);
    } else {
      setbtnError(false);
    }
  };
  const handleNPChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (
      newPswRef.current!.value.length < 6 &&
      newPswRef.current!.value.length >= 1
    ) {
      setNewPswError(true);
    } else {
      setNewPswError(false);
    }
    if (newPswRef.current!.value.length === 0) {
      setbtnError(true);
    } else {
      setbtnError(false);
    }
  };
  const handleNPCChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (
      newPscheckRef.current!.value.length < 6 &&
      newPscheckRef.current!.value.length >= 1
    ) {
      setNewPswcheckError(true);
    } else {
      setNewPswcheckError(false);
    }
    if (newPscheckRef.current!.value.length === 0) {
      setbtnError(true);
    } else {
      setbtnError(false);
    }
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const current = currentpswRef.current!.value;
    const newpsw = newPswRef.current!.value;
    const newpswcheck = newPscheckRef.current!.value;
    // current ???????????? ?????? ???
    if (newpsw !== newpswcheck) {
      console.log('??????????????? ???????????? ????????????.');
      newPscheckRef.current!.focus();
      setNewPswcheckError(true);
    } else {
      const data = {
        currentPassword: current,
        toEditPassword: newpsw,
      };
      try {
        await axios.patch(`/api/user/change-password/${userId}`, data);
        dispatch({
          type: 'alertOn',
          payload: { msg: '??????????????? ??????????????????.' },
        });
        nav('/login');
      } catch (e) {
        console.log(e);
      }
    }
  };

  const toLoginClick = (
    e: React.MouseEvent<HTMLHyperlinkElementUtils, MouseEvent>
  ) => {
    nav('/login');
  };

  useEffect(() => {
    async function loginCheck() {
      try {
        const res = await axios.get('/api/user/logincheck');

        if (res.data) {
          setUserId(() => res.data.userId);
        } else {
          nav('/login');
        }
      } catch (e) {
        nav('/login');
      }
    }
    loginCheck();
  });
  return (
    <Container>
      <LoginForm.Title>???????????? ??????</LoginForm.Title>
      <LoginForm.InputDiv>
        <LoginForm.InputTitle error={false}>?????? ????????????</LoginForm.InputTitle>
        <LoginForm.ErrorSpan>
          {currentpswError && '???????????? ?????? ???????????? ?????????.'}
        </LoginForm.ErrorSpan>
      </LoginForm.InputDiv>
      <LoginForm.Input
        onChange={handleCPChange}
        type='password'
        ref={currentpswRef}
        placeholder='?????? ??????????????? ???????????????.'
        error={currentpswError}
      />
      <LoginForm.InputDiv>
        <LoginForm.InputTitle error={false}>??? ????????????</LoginForm.InputTitle>
        <LoginForm.ErrorSpan>
          {newpswError && '???????????? ?????? ???????????? ?????????.'}
        </LoginForm.ErrorSpan>
      </LoginForm.InputDiv>
      <LoginForm.Input
        onChange={handleNPChange}
        type='password'
        ref={newPswRef}
        placeholder='????????? ??????????????? ???????????????.'
        error={newpswError}
      />
      <LoginForm.InputDiv>
        <LoginForm.InputTitle error={false}>
          ??? ???????????? ??????
        </LoginForm.InputTitle>
        <LoginForm.ErrorSpan>
          {newpswcheckError && '???????????? ?????? ???????????? ?????????.'}
        </LoginForm.ErrorSpan>
      </LoginForm.InputDiv>
      <LoginForm.Input
        onChange={handleNPCChange}
        type='password'
        ref={newPscheckRef}
        placeholder='??????????????? 6?????? ????????????????????????.'
        error={newpswcheckError}
      />

      <Button onClick={handleClick} disabled={btnactive}>
        ???????????? ??????
      </Button>

      <LoginForm.Graytext>
        ??????????????? ????????????
        <LoginForm.Atag onClick={toLoginClick}>???????????????</LoginForm.Atag>
      </LoginForm.Graytext>
    </Container>
  );
}

export default ChangePasswordfield;
