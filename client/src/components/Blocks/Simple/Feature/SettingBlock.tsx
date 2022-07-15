import { useState } from 'react';

import { TextInput, CustomSelect, ImgInput } from '../../../Input';
import { Card } from '../../../Card/Card';

function Feature() {
  const [input, setInput] = useState('');
  const [selectinput, setSelectInput] = useState('');
  const options = [
    { value: '스타일1', label: '스타일1' },
    { value: '스타일2', label: '스타일2' },
    { value: '스타일3', label: '스타일3' },
  ];

  return (
    <>
      <Card title="Feature">
        <TextInput
          title="메뉴명"
          required={true}
<<<<<<< HEAD:client/src/components/Blocks/Simple/Feature/SettingBlock.tsx
          onChange={setInput}
          guideline="네비게이션 바에 입력될 메뉴명을 입력하세요."
=======
          onChange={(e: any) => {
            setInput(e.target.value);
          }}
          guideline='네비게이션 바에 입력될 메뉴명을 입력하세요.'
>>>>>>> 3cd92281f3d98ec7603932455e09d4e730370673:client/src/components/SettingBox/Feature.tsx
        ></TextInput>
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
        <ImgInput
          title="이미지"
          guideline="헤드라인 내용 중에서 강조할 텍스트를 입력하세요"
        />
        <TextInput
          title="캡션"
          required={false}
<<<<<<< HEAD:client/src/components/Blocks/Simple/Feature/SettingBlock.tsx
          onChange={setInput}
          guideline="캡션에 표시될 내용을 입력하세요."
=======
          guideline='캡션에 표시될 내용을 입력하세요.'
>>>>>>> 3cd92281f3d98ec7603932455e09d4e730370673:client/src/components/SettingBox/Feature.tsx
        ></TextInput>
        <TextInput
          title="헤드라인"
          required={false}
<<<<<<< HEAD:client/src/components/Blocks/Simple/Feature/SettingBlock.tsx
          onChange={setInput}
          guideline="캡션에 표시될 내용을 입력하세요."
=======
          guideline='캡션에 표시될 내용을 입력하세요.'
>>>>>>> 3cd92281f3d98ec7603932455e09d4e730370673:client/src/components/SettingBox/Feature.tsx
        ></TextInput>
        <TextInput
          title="헤드라인 강조 테스트"
          required={false}
<<<<<<< HEAD:client/src/components/Blocks/Simple/Feature/SettingBlock.tsx
          onChange={setInput}
          guideline="헤드라인 내용 중에서 강조할 텍스트를 입력하세요"
=======
          guideline='헤드라인 내용 중에서 강조할 텍스트를 입력하세요'
>>>>>>> 3cd92281f3d98ec7603932455e09d4e730370673:client/src/components/SettingBox/Feature.tsx
        ></TextInput>
        <TextInput
          title="설명"
          required={false}
<<<<<<< HEAD:client/src/components/Blocks/Simple/Feature/SettingBlock.tsx
          onChange={setInput}
          guideline="설명에 표시될 내용을 입력하세요"
=======
          guideline='설명에 표시될 내용을 입력하세요'
>>>>>>> 3cd92281f3d98ec7603932455e09d4e730370673:client/src/components/SettingBox/Feature.tsx
        ></TextInput>
        <TextInput
          title="버튼 텍스트"
          required={false}
<<<<<<< HEAD:client/src/components/Blocks/Simple/Feature/SettingBlock.tsx
          onChange={setInput}
          guideline="비워둘 경우 버튼이 나타나지 않습니다."
=======
          guideline='비워둘 경우 버튼이 나타나지 않습니다.'
>>>>>>> 3cd92281f3d98ec7603932455e09d4e730370673:client/src/components/SettingBox/Feature.tsx
        ></TextInput>
        <TextInput
          title="버튼 URL"
          required={false}
<<<<<<< HEAD:client/src/components/Blocks/Simple/Feature/SettingBlock.tsx
          onChange={setInput}
          guideline="버튼 클릭시 이동될 url을 입력하세요"
=======
          guideline='버튼 클릭시 이동될 url을 입력하세요'
>>>>>>> 3cd92281f3d98ec7603932455e09d4e730370673:client/src/components/SettingBox/Feature.tsx
        ></TextInput>
      </Card>
    </>
  );
}

export default Feature;
