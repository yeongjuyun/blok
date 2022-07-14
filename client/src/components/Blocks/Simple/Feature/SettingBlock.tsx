import React from 'react';
import { useState, useMemo } from 'react';
import { Card } from '../../../Card/Card';
import { TextInput, SelectBox, CustomSelect } from '../../../Input';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function SettingBlock() {
  const [input, setInput] = useState('');
  const [selectinput, setSelectInput] = useState('');
  return (
    <Card title="Feature">
      <TextInput
        title="메뉴명"
        required={true}
        onChange={setInput}
        guideline="네비게이션 바에 입력될  메뉴명을 입력하세요."
      ></TextInput>
      <CustomSelect
        title="스타일"
        required={true}
        guideline="스타일를 선택해주세요."
        placeholder="원하는 스타일을 선택해주세요"
        options={options}
        onChange={(e: any) => {
          setSelectInput(e.value);
        }}
      />
      <TextInput
        title="헤드라인"
        required={false}
        onChange={setInput}
        guideline="헤드라인에 표시될 내용을 입력하세요"
      ></TextInput>
      <TextInput
        title="헤드라인 강조 텍스트"
        required={false}
        onChange={setInput}
        guideline="헤드라인 내용 중에 강조 표시될 내용을 입력하세요"
      ></TextInput>
      <TextInput
        title="설명"
        required={false}
        onChange={setInput}
        guideline="설명에 표시될 내용을 입력하세요"
      ></TextInput>
      <TextInput
        title="버튼 텍스트"
        required={false}
        onChange={setInput}
        guideline="비워둘 경우 버튼이 나타나지 않습니다. "
      ></TextInput>
      <TextInput
        title="버튼 URL"
        required={false}
        onChange={setInput}
        guideline="버튼 클릭시 이동될 url을 입력하세요"
      ></TextInput>
    </Card>
  );
}
