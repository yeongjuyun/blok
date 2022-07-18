import styled from 'styled-components';
import Button from '../Button';
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MainTitle } from './MyInfo';
import { useAppDispatch } from '../../reducers';
import { ImgInput, TextInput, CustomSelect } from '../Input';

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
  width: 500px;
  height: 600px;
  padding: 40px 80px;
  border: 1px solid black;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;

  .editTitle {
    font-size: 28px;
    text-align: center;
  }

  .updateButton {
    margin-top: 20px;
  }

  @media screen and (max-width: 580px) {
    width: 100%;
  }
`;

export const InputDiv = styled.div`
  display: flex;
  margin-bottom: 18px;
`;

export const InputTitle = styled.label`
  font-size: 16px;
  line-height: 36px;
  margin-right: 12px;
  flex: 1;

  @media screen and (max-width: 500px) {
    width: 90%;
    font-size: 14px;
  }
`;

export const Input = styled.input`
  flex: 2;
  width: 100%;
  height: 38px;
  font-size: 16px;
  line-height: 40px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  box-sizing: border-box;
  padding: 12px;

  @media screen and (max-width: 500px) {
    width: 90%;
    font-size: 14px;
  }
`;

const EmailDiv = styled.div`
  font-size: 18px;
  text-align: center;
  margin: 10px 0 32px 0;
`;
interface IUser {
  createdAt: string;
  email: string;
  oauth: string;
  password: string;
  passwordReset: boolean;
  plan: string;
  profileImage: string;
  role: string;
  sites: [];
  updatedAt: string;
  userName: string;
  __v: number;
  _id: string;
}

export default function User() {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const [data, setData] = useState<IUser>({
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
  });

  const profileImage = useRef<HTMLInputElement>(null);
  const userName = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [role, setRole] = useState({ value: data.role, label: data.role });
  const [plan, setPlan] = useState({ value: data.plan, label: data.plan });

  const roleOptions = [
    { value: 'basic', label: 'basic' },
    { value: 'admin', label: 'admin' },
  ];
  const planOptions = [
    { value: 'free', label: 'free' },
    { value: 'paid', label: 'paid' },
  ];

  const userNameHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (
      userName.current!.value.length < 2 &&
      userName.current!.value.length >= 1
    ) {
      setUserNameError(true);
    } else {
      setUserNameError(false);
    }
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (
      password.current!.value.length < 6 &&
      password.current!.value.length >= 1
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const getUserInfo = async () => {
    const res = await axios.get(`/api/admin/user/${userId}`);
    await setData(() => res.data);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await axios.get(`/api/admin/user/${userId}`);
      console.log(11111, res.data);
      await setData(() => res.data);
      // await setRole({ value: data.role, label: data.role });
      // await setPlan({ value: data.plan, label: data.plan });
    };
    getUserInfo();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(1111, userName.current!.value);
    console.log(2222, profileImage.current!.value);
    console.log(3333, plan.value);

    const userToPatch = {
      userName: userName.current!.value,
      password: password.current!.value,
      profileImage: profileImage.current!.value,
      plan: plan.value,
      role: role.value,
    };

    console.log('patchData', userToPatch);

    await axios
      .patch(`/api/admin/user/${userId}`, userToPatch)
      .catch((error) => console.log('Error: ', error));

    dispatch({
      type: 'alertOn',
      payload: { msg: '회원정보 수정 되었습니다.' },
    });
    password.current!.value = '';
  };

  getUserInfo();

  return (
    <Container>
      <MainTitle className="title">User Infomation</MainTitle>
      <UserContainer>
        <UserUpdate>
          <div className="editTitle">회원정보 수정</div>
          <div>
            <EmailDiv>{data.email}</EmailDiv>
          </div>
          <form className="userUpdateForm" onSubmit={handleSubmit}>
            <div className="userUpdateItem">
              <InputDiv>
                <TextInput
                  key={data.userName}
                  ref={userName}
                  title="이름"
                  onChange={userNameHandler}
                  defaultValue={data.userName}
                  // value={data.userName}
                  // placeholder="elice"
                />
                {userNameError && '2글자 이상 입력해주세요'}
              </InputDiv>
              <InputDiv>
                <TextInput
                  title="비밀번호"
                  ref={password}
                  placeholder=" "
                  onChange={passwordHandler}
                  key={`${data.userName}/1`}
                  defaultValue=" "
                />
                {passwordError && '비밀번호는 6자리 이상이여야 합니다.'}
              </InputDiv>
              <InputDiv>
                <ImgInput
                  key={data.profileImage}
                  title="프로필 이미지"
                  ref={profileImage}
                  defaultValue={data.profileImage}
                />
              </InputDiv>
              <InputDiv>
                <CustomSelect
                  key={data.role}
                  title="분류"
                  options={roleOptions}
                  onChange={(e: any) => setRole(e)}
                  value={role}
                  defaultValue={{ value: 'basic', label: 'basic' }}
                />
              </InputDiv>
              <InputDiv>
                <CustomSelect
                  key={data.plan}
                  title="플랜"
                  options={planOptions}
                  value={plan}
                  onChange={(e: any) => setPlan(() => e)}
                  defaultValue={{ value: 'free', label: 'free' }}
                />
              </InputDiv>
              <Button
                className="updateButton"
                type="submit"
                size="large"
                fullWidth
                disabled={userNameError || passwordError}
              >
                Update
              </Button>
            </div>
          </form>
        </UserUpdate>
      </UserContainer>
    </Container>
  );
}
