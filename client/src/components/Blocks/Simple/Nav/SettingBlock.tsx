import React from 'react';
import { useState, useMemo } from 'react';
import { Card } from '../../../Card/Card';
import {
    TextInput,
    SelectBox,
    CustomSelect,
    ImageUploadModal,
} from '../../../Input';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

export default function SettingBlock() {
    const [input, setInput] = useState('');
    const [selectinput, setSelectInput] = useState('');
    return (
        <Card title="Navbar">
            <CustomSelect
                title="스타일"
                required={true}
                guideline="스타일를 선택해주세요."
                placeholder="원하는 선택지를 선택해주세요"
                options={options}
                onChange={(e: any) => {
                    setSelectInput(e.value);
                }}
            />
            <TextInput
                title="로고 이미지"
                required={false}
                onChange={setInput}
                guideline="나중에 파일 Input 으로 바꿀 것."
            ></TextInput>

            <TextInput
                title="로고 텍스트"
                required={true}
                onChange={setInput}
                guideline="로고이미지가 없을시 입력될 로고 텍스트를 입력하세요."
            ></TextInput>
        </Card>
    );
}
