import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { TextInput, SelectBox, CustomSelect } from '../components/Input';
import { Card } from '../components/Card/Card';

const Container = styled.div`
  padding-top: 50px;
  background-color: #f7f7f9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  font-family: 'Inter';
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
`;

function Test() {
  const [input, setInput] = useState('');
  const [selectinput, setSelectInput] = useState('');
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const customStyles = useMemo(
    () => ({
      option: (provided: any, state: any) => ({
        ...provided,

        color: state.data.color,
        opacity: 0.8,
        padding: 20,
      }),
      control: (provided: any) => ({
        ...provided,
        border: '1px solid #ececec',
        height: 48,
      }),
      singleValue: (provided: any, state: any) => ({
        ...provided,
        color: state.data.color,
      }),
    }),
    []
  );
  return (
    <Container>
      <div></div>

      <div>입력값 : {input}</div>
      <div>선택값 : {selectinput}</div>

      <Card title='Navbar'>
        <CustomSelect
          title='스타일'
          required={true}
          guideline='스타일를 선택해주세요.'
          placeholder='원하는 선택지를 선택해주세요'
          options={options}
          onChange={(e: any) => {
            setSelectInput(e.value);
          }}
        />
        <TextInput
          title='TextInput'
          required={false}
          onChange={setInput}
          guideline='여기에 가이드라인을 적으세요'
        ></TextInput>

        <TextInput
          title='로고 텍스트'
          required={true}
          onChange={setInput}
          guideline='로고이미지가 없을시 입력될 로고 텍스트를 입력하세요.'
        ></TextInput>
      </Card>
      <Card title='Footer'>
        <CustomSelect
          title='스타일'
          required={true}
          guideline='스타일를 선택해주세요.'
          placeholder='원하는 선택지를 선택해주세요'
          options={options}
          onChange={(e: any) => {
            setSelectInput(e.value);
          }}
        />
        <TextInput
          title='TextInput'
          required={false}
          onChange={setInput}
          guideline='여기에 가이드라인을 적으세요'
        ></TextInput>

        <TextInput
          title='로고 텍스트'
          required={true}
          onChange={setInput}
          guideline='로고이미지가 없을시 입력될 로고 텍스트를 입력하세요.'
        ></TextInput>
      </Card>
    </Container>
  );
}

export default Test;
