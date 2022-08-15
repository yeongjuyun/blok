import styled from 'styled-components';
import { ControlButton } from './DashboardBox';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../Button';
import { MainTitle } from './MyInfo';
import { useAppDispatch, useAppSelector } from '../../reducers';
import { useNavigate } from 'react-router-dom';
import { CustomSelect } from './UserTable';
import { SiteData } from './DataTypes';

const Container = styled.div`
  .controlBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  .pagenationControlBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;

    .perPageBox,
    .pagenationBox,
    .div {
      flex: 1;
    }

    .pagenationBox {
      text-align: center;
    }

    .pageText {
      padding: 0 1rem;
    }
  }

  @media screen and (max-width: 780px) {
    .title {
      margin-top: 102px;
    }
  }

  @media screen and (max-width: 1120px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  width: 300px;
  height: 38px;
  border: 1px solid #ececec;
  box-sizing: border-box;
  padding: 0 10px;
  border-radius: 5px;
  margin-right: 0.5rem;
`;

const TableContainer = styled.div`
  width: 1200px;
  height: 580px;
  overflow: scroll;
  background-color: #fff;
  border-radius: 10px;
`;

const Table = styled.table`
  border-spacing: 0;
  border-collapse: collapse;
  border-bottom: 1px solid #e5e5e5;
  font-size: 0.9rem;
  margin: auto;
  margin-bottom: 1rem;
  width: 1100px;
  word-wrap: break-word;

  caption {
    color: black;
    font-size: 1rem;
    font-weight: bold;
    padding: 1rem;
    text-align: left;
  }

  &,
  th,
  td {
    text-align: center;
    min-width: 120px;
    border-top: 1px solid #e5e5e5;
  }

  th {
    padding: 10px 0;
  }

  td {
    padding: 8px 0;
  }
`;

export default function SiteTable() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState<SiteData[]>([]);
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [option, setOption] = useState({ value: 'name', label: '사이트명' });
  const options = [
    { value: 'name', label: '사이트명' },
    { value: 'domain', label: '도메인' },
    { value: 'user.userName', label: '소유자' },
  ];

  const user = useAppSelector((state) => state.loginCheckReducer.loginData);

  // 관리자만 페이지 접속 가능
  if (user.role !== 'admin') {
    dispatch({
      type: 'alertOn',
      payload: { msg: `관리자만 이용 가능합니다.` },
    });
    navigate('/login');
  }

  const getSites = async () => {
    try {
      const res = await axios.get(
        `/api/admin/site?page=${page}&perPage=${perPage}&searchKey=${option.value}&searchValue=${query}`
      );
      setData(res.data.sites);
      setTotalCount(res.data.totalCount);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getSites();
  }, [query, page, perPage]);

  const handleDelete = async (siteId: string) => {
    try {
      await axios.delete(`/api/admin/site/${siteId}`);
      dispatch({
        type: 'alertOn',
        payload: { msg: '사이트가 삭제되었습니다.' },
      });
      // 삭제 후 재랜더링
      getSites();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(text);
    setText('');
  };

  const handleChangePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerpage(parseInt(e.target.value, 10));
    setPage(1);
  };

  const handleReset = () => {
    setText('');
    setQuery('');
    setOption({ value: 'name', label: '사이트명' });
    setPage(1);
  };

  return (
    <Container>
      <MainTitle className='title'>Site Management</MainTitle>

      <div className='controlBox'>
        <div>
          <CustomSelect
            name='Searchfilter'
            value={option}
            options={options}
            onChange={(e: any) => setOption(() => e)}
          ></CustomSelect>
        </div>
        <div>
          <form onSubmit={handleSearch} className='searchForm'>
            <label htmlFor='search-query'>Search: </label>
            <SearchInput
              value={text}
              onChange={(e) => setText(e.target.value)}
              type='text'
              name='search-query'
              placeholder='검색어를 입력하세요'
            />
            <Button type='submit' size='medium'>
              Search
            </Button>
            <Button onClick={() => handleReset()} size='medium'>
              Reset
            </Button>
          </form>
        </div>
      </div>
      <TableContainer>
        <Table>
          <caption>검색된 사이트</caption>
          <thead>
            <tr>
              <th>목록</th>
              <th>사이트명</th>
              <th>도메인</th>
              <th>개설일</th>
              <th>소유자</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* {data.length > 0 ? (
              data.map((e, idx) => (
                <tr key={e._id}>
                  <td>{(page - 1) * perPage + idx + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.domain}</td>
                  <td>{e.createdAt.slice(0, 10)}</td>
                  <td>{e.user[0]?.userName}</td>
                  <td>
                    <ControlButton
                      className={'deleteButton'}
                      onClick={() => handleDelete(e._id)}
                      color='gray'
                      rounding
                    >
                      Delete
                    </ControlButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className='noSite' colSpan={7}>
                  사이트가 존재하지 않습니다.
                </td>
              </tr>
            )} */}
          </tbody>
        </Table>
      </TableContainer>
      <div className='pagenationControlBox'>
        <div className='perPageBox'>
          <span>Rows per page: </span>
          <select onChange={handleChangePerPage}>
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className='pagenationBox'>
          <Button
            outline
            rounding
            className='border rounded p-1'
            onClick={() => setPage(page - 1)}
            disabled={page === 1 ? true : false}
          >
            {'<'}
          </Button>
          <span className='pageText'>
            <strong>{page}</strong> / {Math.ceil(totalCount / perPage)} of{' '}
            {totalCount}
          </span>
          <Button
            outline
            rounding
            className='border rounded p-1'
            onClick={() => setPage(page + 1)}
            disabled={page === Math.ceil(totalCount / perPage) ? true : false}
          >
            {'>'}
          </Button>
        </div>
        <div className='div'></div>
      </div>
    </Container>
  );
}
