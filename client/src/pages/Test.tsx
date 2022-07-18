import styled from 'styled-components';
import React, { useState, useRef } from 'react';
import { HeroSite, NavBar } from '../components/Sitebox';
import { CustomSelect, TextInput } from '../components/Input';

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
const data = 'Roboto';
const colorSet = {
  primary: '#482924',
  secondary: '#123456',
  background: '#123456',
  surface: '#123456',
};

const options = [
  { value: '스타일1', label: '스타일1' },
  { value: '스타일2', label: '스타일2' },
  { value: '스타일3', label: '스타일3' },
];
function Test() {
  const [select, setSelect] = useState();
  const Input = useRef<HTMLInputElement>(null);
  return (
    <>
      {/* <CustomSelect
        key={'123213'}
        options={options}
        onChange={(e: any) => {
          console.log(e);
          setSelect(e);
        }}
        value={select}
        defaultValue={{ value: '스타일1', label: '스타일1' }}
      ></CustomSelect> */}
      <TextInput
        ref={Input}
        onChange={(e: any) => {
          console.log(Input.current!.value);
        }}
      ></TextInput>
      <HeroSite></HeroSite>
    </>
  );
}

export default Test;
