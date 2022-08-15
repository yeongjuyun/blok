import styled from 'styled-components';
import Button from '../Button';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MainTitle } from './MyInfo';
import { useAppDispatch, useAppSelector } from '../../reducers';
import { useNavigate } from 'react-router-dom';
import { ImgInput, TextInputWidth90, CustomSelectWidth90 } from '../Input';
import type { User } from './DataTypes';

const Container = styled.div`
  margin-bottom: 10px;

  @media screen and (max-width: 780px) {
    .title {
      margin-top: 102px;
    }
  }
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`;

const UserUpdate = styled.div`
  width: 700px;
  padding: 40px 80px;
  border: 1px solid black;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;

  .editTitle {
    font-size: 28px;
    text-align: center;
  }

  .userUpdateInputBox {
    display: flex;
    flex-direction: column;

    .inputBox {
      display: flex;
      width: 100%;

      .input {
        width: 100%;
      }
    }
  }

  .updateButton {
    margin-top: 40px;
  }

  @media screen and (max-width: 580px) {
    width: 100%;
  }
`;

const ValidationText = styled.span`
  font-size: 14px;
  color: #c8c8c8;
  padding-left: 5px;
`;

const EmailDiv = styled.div`
  font-size: 18px;
  text-align: center;
  margin: 10px 0 32px 0;
`;

const InitUser = {
  createdAt: '',
  email: '',
  oauth: '',
  password: '',
  passwordReset: false,
  plan: '',
  profileImage: '',
  role: '',
  sites: [],
  updatedAt: '',
  userName: '',
  __v: 0,
  _id: '',
};

// type UserUpdate = Pick<
//   User,
//   'userName' | 'profileImage' | 'plan' | 'role' | 'password'
// >;

export default function UpateUser() {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.loginCheckReducer.loginData);
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const profileImage = useRef<HTMLInputElement>(null);
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  // const [data, setData] = useState<User>(InitUser);
  // const [role, setRole] = useState({ value: data.role, label: data.role });
  // const [plan, setPlan] = useState({ value: data.plan, label: data.plan });
  const roleOptions = [
    { value: 'basic', label: 'basic' },
    { value: 'admin', label: 'admin' },
  ];
  const planOptions = [
    { value: 'free', label: 'free' },
    { value: 'paid', label: 'paid' },
  ];

  if (userData.role !== 'admin') {
    dispatch({
      type: 'alertOn',
      payload: { msg: `관리자만 이용 가능합니다.` },
    });
    navigate('/login');
  }

  // userId로 userData 불러오기
  const getUserInfo = async () => {
    try {
      const res = await axios.get(`/api/admin/user/${userId}`);
      // setData(() => res.data);
      // setRole({ value: res.data.role, label: res.data.role });
      // setPlan({ value: res.data.plan, label: res.data.plan });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const ChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      userName.current!.value.length < 2 &&
      userName.current!.value.length >= 1
    ) {
      setUserNameError(true);
    } else {
      setUserNameError(false);
    }
  };

  const ChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      password.current!.value.length < 6 &&
      password.current!.value.length >= 1
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      let userToPatch: any = {
        userName: userName.current!.value,
        profileImage: profileImage.current!.value,
        // plan: plan.value,
        // role: role.value,
      };

      if (password.current!.value === '') {
        console.log('비번인풋없음');
      } else {
        userToPatch.password = password.current!.value;
      }

      const res = await axios.patch(`/api/admin/user/${userId}`, userToPatch);
      console.log(res);

      dispatch({
        type: 'alertOn',
        payload: { msg: '회원정보 수정 되었습니다.' },
      });
      password.current!.value = '';
      getUserInfo();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <MainTitle className='title'>User Infomation</MainTitle>
      <UserContainer>
        <UserUpdate>
          <div className='editTitle'>회원정보 수정</div>
          <div>{/* <EmailDiv>{data.email}</EmailDiv> */}</div>
          <form onSubmit={handleSubmit}>
            <div className='userUpdateInputBox'>
              <div className='inputBox'>
                <div className='input'>
                  <TextInputWidth90
                    // key={data.userName}
                    title='이름'
                    ref={userName}
                    onChange={ChangeUserName}
                    // defaultValue={data.userName}
                    placeholder='이름을 입력해주세요'
                  />
                  <ValidationText>
                    {userNameError && '2글자 이상 입력해주세요'}
                  </ValidationText>
                </div>
                <div className='input'>
                  <TextInputWidth90
                    // key={`${data.userName}/password`}
                    title='비밀번호'
                    ref={password}
                    placeholder=' '
                    onChange={ChangePassword}
                    type='password'
                  />
                  <ValidationText>
                    {passwordError && '비밀번호는 6자리 이상이여야 합니다.'}
                  </ValidationText>
                </div>
              </div>
              <div className='inputBox'>
                <CustomSelectWidth90
                  title='분류'
                  options={roleOptions}
                  // onChange={(e: any) => setRole(() => e)}
                  // value={role}
                />
                <CustomSelectWidth90
                  title='플랜'
                  options={planOptions}
                  // onChange={(e: any) => setPlan(() => e)}
                  // value={plan}
                />
              </div>
            </div>
            <ImgInput
              // key={data.profileImage}
              title='프로필 이미지'
              ref={profileImage}
              // defaultValue={data.profileImage}
            />
            <Button
              className='updateButton'
              type='submit'
              size='large'
              fullWidth
              disabled={userNameError || passwordError}
            >
              Update
            </Button>
          </form>
        </UserUpdate>
      </UserContainer>
    </Container>
  );
}
