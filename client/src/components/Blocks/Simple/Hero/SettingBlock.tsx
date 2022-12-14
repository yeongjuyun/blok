import { useState } from 'react';
import { TextInput, CustomSelect } from '../../../Input';
import { Card } from '../../../Card/Card';
import * as icon from '../../../../icons';
import { getStyleOptions, getCurrentStyleOption } from '../../blockHelper';
import { useAppSelector, useAppDispatch } from '../../../../reducers';
import {
  updateBlockData,
  updateTemplate,
  selectBlockById,
} from '../../../../reducers/SiteReducer';
import type { RootState } from '../../../../reducers/store';
import { SettingBlockProps, StyleData } from '../../blockValidator';

function Hero({ blockId, onRemove }: SettingBlockProps) {
  const { id, template, data, isCardOpened } = useAppSelector(
    (state: RootState) => selectBlockById(state, blockId)
  );
  let styleOptions = getStyleOptions(template);
  let currentStyle = getCurrentStyleOption(template);
  const dispatch = useAppDispatch();
  const [navTitle, setNavTitle] = useState(data.navTitle);
  const [caption, setCaption] = useState(data.caption?.value);
  const [header, setHeader] = useState(data.header?.value);
  const [body, setBody] = useState(data.body?.value);
  const [button, setButton] = useState(data.button);
  const [style, setStyle] = useState(currentStyle);
  return (
    <>
      <Card
        title="Hero"
        onRemove={onRemove}
        icon={icon.Hero}
        isCardOpened={isCardOpened}
        pinned
        blockId={blockId}
      >
        <TextInput
          title="메뉴명"
          required={false}
          value={navTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
        ></TextInput>{' '}
        <CustomSelect
          title="스타일"
          required
          guideline="스타일를 선택해주세요."
          placeholder="원하는 선택지를 선택해주세요"
          options={styleOptions}
          onChange={(e: StyleData) => {
            setStyle(e);
            dispatch(updateTemplate({ blockId: id, newTemplate: e.value }));
          }}
          value={style}
        />
        <TextInput
          title="캡션"
          required={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCaption(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'caption',
                value: { value: e.target.value },
              })
            );
          }}
          guideline="캡션에 표시될 내용을 입력하세요."
          value={caption}
        ></TextInput>
        <TextInput
          title="헤드라인"
          required={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setHeader(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'header',
                value: { value: e.target.value },
              })
            );
          }}
          guideline="캡션에 표시될 내용을 입력하세요."
          value={header}
        ></TextInput>
        <TextInput
          title="설명"
          required={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBody(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'body',
                value: { value: e.target.value },
              })
            );
          }}
          guideline="설명에 표시될 내용을 입력하세요"
          value={body}
        ></TextInput>
        <TextInput
          title="버튼 텍스트"
          required={false}
          guideline="비워둘 경우 버튼이 나타나지 않습니다."
          value={button?.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setButton({ ...button, title: e.target.value });
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'button',
                value: { ...button, title: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="버튼 URL"
          required={false}
          guideline="버튼 클릭시 이동될 url을 입력하세요"
          value={button?.url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setButton({ ...button, url: e.target.value });
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'button',
                value: { title: button?.title, url: e.target.value },
              })
            );
          }}
        ></TextInput>
      </Card>
    </>
  );
}
export default Hero;
