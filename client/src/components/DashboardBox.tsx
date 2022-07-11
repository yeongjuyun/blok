import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { MainTitle } from "./MyInfo";
import Button from "./Button";
import { TemplateCard } from "./TemplateCard";

const Container = styled.div`
  margin-bottom: 10px;

  .newButton {
    float: right;
    margin-top: 22px;
  }

  @media screen and (max-width: 780px) {
    .title {
      margin-top: 102px;
    }
  }
`;

const Table = styled.table`
  border-bottom: 1px solid #e5e5e5;
  border-collapse: separate;

  th {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
  }

  td {
    padding: 1rem 4.8rem;
    text-align: center;
    transition: 0.2s ease-out;
  }

  @media screen and (max-width: 780px) {
    td {
      padding: 1rem;
    }
  }
`;

const TemplateBox = styled.div`
  display: flex;
  width: 783px;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 780px) {
    flex-direction: column;
  }
`;

const ControlButton = styled(Button)`
  pointer-events: auto;
  pointer: cursor;

  @media screen and (max-width: 780px) {
    margin-right: 0;
    margin-bottom: 0.3rem;
    justify-content: center;
  }
`;

const AddButton = styled(Button)`
  float: right;
  margin-top: 22px;

  @media screen and (max-width: 780px) {
    width: 100%;
    margin-right: 0;
    justify-content: center;
  }
`;

export function TemplateList() {
  return (
    <Container>
      <MainTitle className="title">Template</MainTitle>
      <TemplateBox>
        <TemplateCard
          title="랜딩페이지"
          description="회사 웹사이트 템플릿 입니다."
        />
        <TemplateCard
          title="이력서"
          description="이력서 템플릿 입니다."
          color1="#2B9D67"
          color2="#CEF0E2"
        />
        <TemplateCard
          title="기업소개 웹사이트"
          description="기업소개 템플릿 입니다."
          color1="#F5E44C"
          color2="#CEA9D3"
        />
      </TemplateBox>
    </Container>
  );
}

export function DashboardInfo() {
  const [domain, setDomain] = useState([]);
  const dispatch = useDispatch();

  const getUserInfo = async () => {
    axios.get("/user").then((res): void => {
      const data = res.data.domain;
      setDomain(data);
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const showModalHandler = () => {
    dispatch({ type: "TEMPLATE/MODAL_ON" });
  };

  const deleteHandler = () => {
    dispatch({
      type: "CONFIRM/MODAL_ON",
      payload: {
        title: "삭제",
        msg: "정말 삭제하시겠습니까?",
      },
    });
  };

  return (
    <Container>
      <MainTitle className="title">Dashboard</MainTitle>
      <div className="tableBox">
        <Table>
          <thead>
            <tr>
              <th>웹 사이트</th>
              <th>플랜</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {domain.map(({ doname, link }) => (
              <tr key={doname + link}>
                <td>
                  {doname}
                  <br />
                  <a href={link}>{link}</a>
                </td>
                <td>Free</td>
                <td>
                  <ControlButton className={"editButton"} rounding outline>
                    Edit
                  </ControlButton>
                  <ControlButton
                    className={"deleteButton"}
                    onClick={deleteHandler}
                    color="gray"
                    rounding
                  >
                    Delete
                  </ControlButton>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <AddButton
        className="newButton"
        onClick={showModalHandler}
        size="medium"
        rounding
      >
        사이트 추가
      </AddButton>
    </Container>
  );
}
