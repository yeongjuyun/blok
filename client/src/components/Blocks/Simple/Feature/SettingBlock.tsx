import { useState } from 'react';
import { TextInput, CustomSelect, ImgInput } from '../../../Input';
import { Card } from '../../../Card/Card';
import { getStyleOptions } from '../../blockHelper';
import { useSelector, useDispatch } from 'react-redux';
import { updateBlockData } from '../../../../reducers/SiteReducer';
import type { RootState } from '../../../../reducers/store';

interface Feature {
  blockId: number;
  onRemove: (event: React.MouseEvent<HTMLElement>) => void;
}

function Feature({ blockId, onRemove }: Feature) {
  const {
    id,
    template: { blockType },
    data,
  } = useSelector((state: RootState) => {
    const block = state.site.blocks.find((block) => block.id === blockId);
    if (typeof block === 'undefined') {
      throw new Error('Feature: No block found');
    }
    return block;
  });
  let styleOptions = getStyleOptions(blockType);
  const dispatch = useDispatch();

  //Input
  const [navTitle, setNavTitle] = useState(data.navTitle);
  const [style, setStyle] = useState({
    label: data.style?.value,
    value: data.style?.value,
  });
  const [caption, setCaption] = useState(data.caption?.value);
  const [header, setHeader] = useState(data.header?.value);
  const [headerHighlight, setHeaderHighlight] = useState(
    data.headerHighlight?.value
  );
  const [body, setBody] = useState(data.body?.value);
  const [buttonTitle, setButtonTitle] = useState(data.button?.title);
  const [buttonUrl, setButtonUrl] = useState(data.button?.url);
  const [imageSrc, setImageSrc] = useState(data.image?.src);
  const [imageAlt, setImageAlt] = useState(data.image?.alt);

  return (
    <>
      <Card title="Feature" onRemove={onRemove}>
        <TextInput
          title="메뉴명"
          required={true}
          onChange={(e: any) => {
            setNavTitle(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'navTitle',
                value: e.target.value,
              })
            );
          }}
          guideline="네비게이션 바에 입력될 메뉴명을 입력하세요."
          value={navTitle}
        ></TextInput>
        <CustomSelect
          title="스타일"
          required={true}
          guideline="스타일를 선택해주세요."
          placeholder="원하는 선택지를 선택해주세요"
          options={styleOptions}
          onChange={(e: any) => {
            setStyle(e);
            dispatch(
              updateBlockData({ blockId: id, field: 'style', value: e })
            );
          }}
          value={style}
        />
        <ImgInput
          title="이미지"
          guideline="사이트에 표시할 이미지를 업로드하세요"
          src={imageSrc}
          alt={imageAlt}
        />
        <TextInput
          title="캡션"
          required={false}
          guideline="캡션에 표시될 내용을 입력하세요."
          value={caption}
          onChange={(e: any) => {
            setCaption(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'caption',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="헤드라인"
          required={false}
          guideline="헤드라인에 표시될 내용을 입력하세요."
          value={header}
          onChange={(e: any) => {
            setHeader(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'header',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="헤드라인 강조 테스트"
          required={false}
          guideline="헤드라인 내용 중에서 강조할 텍스트를 입력하세요"
          value={headerHighlight}
          onChange={(e: any) => {
            setHeaderHighlight(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'headerHighlight',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="설명"
          required={false}
          guideline="설명에 표시될 내용을 입력하세요"
          value={body}
          onChange={(e: any) => {
            setBody(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'body',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="버튼 텍스트"
          required={false}
          guideline="비워둘 경우 버튼이 나타나지 않습니다."
          value={buttonTitle}
          onChange={(e: any) => {
            setButtonTitle(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'button',
                value: { title: e.target.value, url: buttonUrl },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="버튼 URL"
          required={false}
          guideline="버튼 클릭시 이동될 url을 입력하세요"
          value={buttonUrl}
          onChange={(e: any) => {
            setButtonUrl(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'button',
                value: { title: buttonTitle, url: e.target.value },
              })
            );
          }}
        ></TextInput>
      </Card>
    </>
  );
}

export default Feature;
