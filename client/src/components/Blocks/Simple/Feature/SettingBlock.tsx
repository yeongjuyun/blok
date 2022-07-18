import { useState } from 'react';
import { TextInput, CustomSelect, ImgInput } from '../../../Input';
import { Card } from '../../../Card/Card';
import { NavBlock } from '../../blockValidator';
import { getStyleOptions } from '../../blockHelper';

import { useDispatch } from 'react-redux';
import { updateBlockData } from '../../../../reducers/SiteReducer';

interface Feature {
  block: NavBlock;
  onRemove: (event: React.MouseEvent<HTMLElement>) => void;
}

function Feature({ block, onRemove }: Feature) {
  const dispatch = useDispatch();
  const data = block.data;
  const blockType = block.template.blockType;
  let styleOptions = getStyleOptions(blockType);

  const [input, setInput] = useState('');
  const [selectinput, setSelectInput] = useState({
    label: data.style.value,
    value: data.style.value,
  });

  return (
    <>
      <Card title="Feature" onRemove={onRemove}>
        <TextInput
          title="메뉴명"
          required={true}
          onChange={(e: any) => {
            console.log(e.target.value);
            // dispatch(
            //   updateBlockData({
            //     blockId: block.id,
            //     field: 'navTitle',
            //     value: e.target.value,
            //   })
            // );
          }}
          guideline="네비게이션 바에 입력될 메뉴명을 입력하세요."
          value={data.navTitle}
        ></TextInput>
        <CustomSelect
          title="스타일"
          required={true}
          guideline="스타일를 선택해주세요."
          placeholder="원하는 선택지를 선택해주세요"
          options={styleOptions}
          onChange={(e: any) => {
            setSelectInput(e);
          }}
          value={selectinput}
        />
        <ImgInput
          title="이미지"
          guideline="헤드라인 내용 중에서 강조할 텍스트를 입력하세요"
          src={data.image?.src}
          alt={data.image?.alt}
        />
        <TextInput
          title="캡션"
          required={false}
          guideline="캡션에 표시될 내용을 입력하세요."
          value={data.caption?.value}
        ></TextInput>
        <TextInput
          title="헤드라인"
          required={false}
          guideline="헤드라인에 표시될 내용을 입력하세요."
          value={data.header?.value}
        ></TextInput>
        <TextInput
          title="헤드라인 강조 테스트"
          required={false}
          guideline="헤드라인 내용 중에서 강조할 텍스트를 입력하세요"
          value={data.headerHighlight?.value}
        ></TextInput>
        <TextInput
          title="설명"
          required={false}
          guideline="설명에 표시될 내용을 입력하세요"
          value={data.body?.value}
        ></TextInput>
        <TextInput
          title="버튼 텍스트"
          required={false}
          guideline="비워둘 경우 버튼이 나타나지 않습니다."
          value={data.button?.title}
        ></TextInput>
        <TextInput
          title="버튼 URL"
          required={false}
          guideline="버튼 클릭시 이동될 url을 입력하세요"
          value={data.button?.url}
        ></TextInput>
      </Card>
    </>
  );
}

export default Feature;
