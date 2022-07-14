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
        <Card title="Footer">
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
                title="왼쪽 텍스트"
                required={false}
                onChange={setInput}
                guideline="푸터 왼쪽에 들어갈 문구를 입력하세요"
                placeholder="©2022 Block Inc. All rights reserved"
            ></TextInput>
            <TextInput
                title="오른쪽 텍스트"
                required={false}
                onChange={setInput}
                placeholder="Block Inc."
                guideline="푸터 오른쪽에 들어갈 문구를 입력하세요."
            ></TextInput>
        </Card>
    );
}
