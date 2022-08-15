import styled from 'styled-components';
import axios from 'axios';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../reducers';
import { useEffect, useState, useRef, useCallback } from 'react';
import default_profile from '../../imgs/profileImage.png';

const MainContainer = styled.div`
  margin: 100px;
`;

const Container = styled.div`
  margin-bottom: 70px;
`;

export const MainTitle = styled.div`
  font-weight: 600;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 50px;
  user-select: none;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 1.5rem;
  margin-bottom: 32px;
  user-select: none;
`;

export const ContentDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const ContentTitle = styled.div`
  flex: 1;
  font-size: 18px;
  text-align: center;
  margin-right: 28px;
  user-select: none;
`;

export const Content = styled.div`
  font-size: 18px;
  width: 100%;
  height: 42px;
  line-height: 44px;
  border: 1px solid #ececec;
  box-sizing: border-box;
  border-radius: 8px;
  padding-left: 18px;
  flex: 5;
  color: #111111;
  background-color: #fff;
`;

const ControlButton = styled(Button)`
  padding: 0 3.2rem;
  & + & {
    margin-left: 1rem;
  }

  @media screen and (max-width: 780px) {
    width: 100%;
    margin-bottom: 10px;
    justify-content: center;

    & + & {
      margin-left: 0;
    }
  }
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
`;

export default function MyInfo() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.loginCheckReducer.loginData);

  // 이미지 로더
  const fileInput = useRef<HTMLInputElement>(null);
  const handleButtonClick = (e: any) => {
    fileInput.current?.click();
  };
  const changeProfileImage = async (e: any) => {
    const formData = new FormData();
    formData.append('profileImage', e.target.files[0]);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const res = await axios.patch(
      `/api/user/change-profileImage/${user.userId}`,
      formData,
      config
    );
    dispatch({
      type: 'USER/LOGIN',
      payload: {
        // profileImage: res.data.profileImage,
        userId: user.userId,
        email: user.email,
        userName: user.userName,
        // plan: user.plan,
      },
    });
    setTimeout(
      () =>
        dispatch({
          type: 'alertOn',
          payload: { msg: '프로필 이미지가 수정되었습니다.', time: 1000 },
        }),
      400
    );
  };

  const onErrorImg = (e: any) => {
    e.target.src = default_profile;
  };

  const deleteHandler = () => {
    dispatch({
      type: 'CONFIRM/MODAL_ON',
      payload: {
        title: '계정탈퇴',
        msg: '정말 탈퇴하시겠습니까?',
        onConfirm: deleteUser,
      },
    });
  };

  const deleteUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = {
        userId: user.userId,
      };
      await axios.delete(`http://3.37.187.24:8080/api/user/deactivate/`, {
        data,
      });
      dispatch({ type: 'CONFIRM/MODAL_OFF' });
      dispatch({
        type: 'alertOn',
        payload: { msg: '회원탈퇴 처리 되었습니다.' },
      });
      navigate('/login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <MainContainer>
      <MainTitle className='title'>Account</MainTitle>
      <Container>
        <ContentDiv>
          <ProfileImage
            src={user.profileImage}
            alt='profileImg'
            onError={onErrorImg}
            onClick={handleButtonClick}
          ></ProfileImage>
          <input
            type='file'
            ref={fileInput}
            onChange={changeProfileImage}
            style={{ display: 'none' }}
          />
        </ContentDiv>
        <Title>내 정보</Title>
        <ContentDiv className='content'>
          <ContentTitle>이름</ContentTitle>
          <Content>{user.userName}</Content>
        </ContentDiv>
        <ContentDiv className='content'>
          <ContentTitle>이메일</ContentTitle>
          <Content>{user.email}</Content>
        </ContentDiv>
        <ContentDiv>
          <ContentTitle>플랜</ContentTitle>
          <Content>{user.plan}</Content>
        </ContentDiv>
      </Container>
      <Container>
        <Title>계정 관리</Title>
        <ControlButton
          onClick={() => navigate('/ChangePassword')}
          size='large'
          color='white'
          rounding
        >
          Change Password
        </ControlButton>
        <ControlButton onClick={deleteHandler} size='large' rounding>
          Delete Account
        </ControlButton>
      </Container>
    </MainContainer>
  );
}
