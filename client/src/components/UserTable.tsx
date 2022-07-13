import styled from "styled-components";
import { ControlButton } from "./DashboardBox";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Container = styled.div`
  .controlBox {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
`;

const TableContainer = styled.div`
  width: 1200px;
  // min-height: 500px;
  height: 500px;
  overflow: scroll;
  background-color: #fff;
`;

const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  border-bottom: 1px solid #e5e5e5;
  font-size: 0.9rem;
  margin: auto;

  caption {
    color: black;
    font-size: 1rem;
    font-weight: bold;
    padding: 1rem;
    text-align: left;
  }

  .noSite {
    // display: inline-block; 안먹음
    // align-items: center;
  }

  &,
  th,
  td {
    border-top: 1px solid #e5e5e5;
  }

  th,
  td {
    text-align: center;
    padding: 12px;
    min-width: 120px;
  }

  th {
    padding: 10px;
    border-: 1px solid #e5e5e5;
  }
`;

export default function UserTable() {
  const [query, setQuery] = useState("");
  const [option, setOption] = useState("");
  const [data, setData] = useState<any[]>([]);

  let keys = ["name", "template", "domain", "plan", "startDate"];

  if (option) {
    keys = keys.filter((key) => key === option);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/users?q=${query}`);
      setData(res.data);
    };
    fetchUsers();
  }, [query]);

  const handleReset = () => setQuery("");

  const handleDelete = (id: any) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <Container>
      <div className="controlBox">
        <select
          name="filter"
          value={option}
          onChange={(e) => setOption(e.target.value)}
        >
          <option value="">모든 카테고리</option>
          <option value="template">템플릿</option>
          <option value="domain">도메인</option>
          <option value="plan">플랜</option>
          <option value="startDate">개설일</option>
          <option value="name">소유자</option>
        </select>
        <div>
          <label htmlFor="search-query">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            name="search-query"
            placeholder="검색어를 입력하시오."
          />
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
      <TableContainer>
        <Table>
          <caption>검색된 사이트</caption>
          <thead>
            <tr>
              <th>목록</th>
              <th>템플릿</th>
              <th>도메인</th>
              <th>플랜</th>
              <th>개설일</th>
              <th>소유자</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data
                .filter((item) => keys.some((key) => item[key].includes(query)))
                // .filter((item) => item[option].includes(query))
                .map((e, idx) => (
                  <tr key={e.id}>
                    <td>{idx + 1}</td>
                    <td>{e.template}</td>
                    <td>{e.domain}</td>
                    <td>{e.plan}</td>
                    <td>{e.startDate}</td>
                    <td>{e.name}</td>
                    <td>
                      <Link to={"/user/" + e.id}>
                        <ControlButton
                          className={"editButton"}
                          rounding
                          color="white"
                        >
                          Edit
                        </ControlButton>
                      </Link>
                      <ControlButton
                        className={"deleteButton"}
                        onClick={() => handleDelete(e.id)}
                        color="gray"
                        rounding
                      >
                        Delete
                      </ControlButton>
                    </td>
                  </tr>
                ))
            ) : (
              <span className="noSite">사이트가 존재하지 않습니다.</span>
            )}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
}
