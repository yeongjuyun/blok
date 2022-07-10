import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { MainTitle } from "./MyInfo";

const Container = styled.div`
  margin-bottom: 10px;

  .newButton {
    background-color: #9747ff;
    color: #ffffff;
    float: right;
    margin-top: 22px;
  }

  @media screen and (max-width: 780px) {
    .newButton {
      width: 100%;
      margin-right: 0;
    }
    .title {
      margin-top: 102px;
    }
  }
`;

const Table = styled.table`
  border-bottom: 1px solid #e5e5e5;
  border-collapse: separate;
  border-spacing: 5rem 0;

  th {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #e5e5e5;
  }

  td {
    padding: 15px;
    text-align: center;
  }

  .deleteButton {
    background-color: #e0e0ed;
    color: #ffffff;
  }

  @media screen and (max-width: 780px) {
    border-spacing: 0;
  }
`;

const Button = styled.button`
  border: 1px solid #d9d9d9;
  border-radius: 30px;
  background-color: #ffffff;
  color: black;
  width: 5.25rem;
  height: 2.2375rem;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  margin-right: 10px;
  margin-bottom: 0.25rem;
`;

const TemplateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    width: 15rem;
    height: 10.625rem;
    background-color: #d9d9d9;
    text-align: center;
    margin: 0 40px 10px 0;
  }

  @media screen and (max-width: 780px) {
    flex-direction: column;

    div {
      width: 20rem;
    }
  }
`;

const ContentBox = styled.div``;

export function TemplateList() {
  return (
    <Container>
      <MainTitle className="title">Template</MainTitle>
      <TemplateBox>
        <ContentBox>
          <div>
            <span>포트폴리오 3분 기적</span>
          </div>
        </ContentBox>
        <ContentBox>
          <div>
            <span>포트폴리오 3분 기적</span>
          </div>
        </ContentBox>
        <ContentBox>
          <div>
            <span>포트폴리오 3분 기적</span>
          </div>
        </ContentBox>
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
      type: "ALERT/MODAL_ON",
      payload: {
        title: "삭제",
        msg: "정말 삭제하시겠습니까?",
      },
    });
  };

  return (
    <Container>
      <MainTitle className="title">Dashboard</MainTitle>
      <Table>
        <thead>
          <tr>
            <th>Web Site</th>
            <th>Plan</th>
            <th>Manage</th>
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
                <Button className={"editButton"}>Edit</Button>
                <Button className={"deleteButton"} onClick={deleteHandler}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button className={"newButton"} onClick={showModalHandler}>
        New
      </Button>
    </Container>
  );
}
