import { useState } from 'react';
import { TextInput, CustomSelect } from '../../../Input';
import { Card } from '../../../Card/Card';
import { getStyleOptions, getCurrentStyleOption } from '../../blockHelper';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateBlockData,
  selectBlockById,
  updateTemplate,
} from '../../../../reducers/SiteReducer';
import type { RootState } from '../../../../reducers/store';
import { SettingBlockProps, StyleData } from '../../blockValidator';
import * as icons from '../../../../icons';

function SettingBlock({ blockId, onRemove }: SettingBlockProps) {
  const { id, template, data, isCardOpened } = useSelector((state: RootState) =>
    selectBlockById(state, blockId)
  );
  const styleOptions = getStyleOptions(template);
  const currentStyle = getCurrentStyleOption(template);
  const dispatch = useDispatch();

  const [style, setStyle] = useState(currentStyle);
  const [title, setTitle] = useState(data.title?.value);
  const [body, setbody] = useState(data.body?.value);
  const [navTitle, setNavTitle] = useState(data.navTitle);

  return (
    <>
      <Card
        title="Introduce"
        onRemove={onRemove}
        icon={icons.Introduce}
        isCardOpened={isCardOpened}
        blockId={blockId}
      >
        <TextInput
          title="메뉴명"
          required={false}
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
          value={navTitle}
        ></TextInput>
        <CustomSelect
          title="스타일"
          required={true}
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
          title="타이틀"
          required={true}
          guideline="텍스트를 입력해주세요"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'title',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title="소개글"
          required={true}
          guideline="텍스트를 입력해주세요"
          value={body}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setbody(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'body',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
      </Card>
    </>
  );
}

export default SettingBlock;
