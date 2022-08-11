import styled from 'styled-components';
import { ControlButton } from './DashboardBox';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../Button';
import { MainTitle } from './MyInfo';
import { useAppDispatch, useAppSelector } from '../../reducers';
import ReactSelect from 'react-select';
import type { User } from './SiteTable';

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

// input 컴포넌트에서 Select 가져와서 스타일 따로 지정
export const CustomSelect = (props: any) => {
  const customStyles = useMemo(
    () => ({
      option: (provided: any, state: any) => ({
        ...provided,
        width: '100%',
        color: state.data.color,
        opacity: 0.8,
      }),
      control: (provided: any) => ({
        ...provided,
        border: '1px solid #ececec',
        height: 24,
        width: 240,
      }),
      singleValue: (provided: any, state: any) => ({
        ...provided,
        color: state.data.color,
        width: '100%',
      }),
    }),
    []
  );
  return (
    <ReactSelect
      placeholder={props.placeholder}
      value={props.value}
      options={props.options}
      styles={customStyles}
      onChange={props.onChange}
      key={props.key}
      defaultValue={props.defaultValue}
    />
  );
};

export default function UserTable() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [text, setText] = useState('');
  const [data, setData] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerpage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [option, setOption] = useState({ value: 'userName', label: '이름' });
  const options = [
    { value: 'userName', label: '이름' },
    { value: 'email', label: '이메일' },
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

  const getUsers = async () => {
    try {
      const res = await axios.get(
        `/api/admin/user?page=${page}&perPage=${perPage}&searchKey=${option.value}&searchValue=${query}`
      );
      setData(res.data.users);
      setTotalCount(res.data.totalCount);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUsers();
  }, [page, perPage, query]);

  const handleDelete = async (userId: string) => {
    console.log('delete user : ', userId);
    await axios.delete(`/api/admin/user/${userId}`);
    dispatch({
      type: 'alertOn',
      payload: { msg: '회원정보가 삭제되었습니다.' },
    });
    getUsers();
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(text);
    setText('');
  };

  const handleChangeperPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerpage(parseInt(e.target.value, 10));
    setPage(1);
  };

  const handleReset = () => {
    setText('');
    setQuery('');
    setPage(1);
  };

  return (
    <Container>
      <MainTitle className='title'>User Management</MainTitle>
      <div className='controlBox'>
        <div>
          <CustomSelect
            name='Searchfilter'
            value={option}
            options={options}
            onChange={(e: any) => setOption(e)}
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
            <Button size='medium' onClick={() => handleReset()}>
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
              <th>이름</th>
              <th>이메일</th>
              <th>플랜</th>
              <th>개설일</th>
              <th>소셜가입자</th>
              <th>관리자</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((e, idx) => (
                <tr key={e.userId}>
                  <td>{(page - 1) * perPage + idx + 1}</td>
                  <td>{e.userName}</td>
                  <td>{e.email}</td>
                  <td>{e.plan}</td>
                  <td>{e.createdAt.slice(0, 10)}</td>
                  <td>{e.oauth}</td>
                  <td>{e.role}</td>
                  <td>
                    <Link
                      to={'/admin/user/' + e.userId}
                      style={{ textDecoration: 'none' }}
                    >
                      <ControlButton
                        className={'editButton'}
                        rounding
                        color='white'
                      >
                        Update
                      </ControlButton>
                    </Link>
                    <ControlButton
                      className={'deleteButton'}
                      onClick={() => handleDelete(e.userId)}
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
                  조회된 유저가 존재하지 않습니다.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
      <div className='pagenationControlBox'>
        <div className='perPageBox'>
          <span>Rows per page: </span>
          <select onChange={handleChangeperPage}>
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
