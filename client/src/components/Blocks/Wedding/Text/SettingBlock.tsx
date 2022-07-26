import { useState } from 'react';
import { TextInput, CustomSelect } from '../../../Input';
import { Card } from '../../../Card/Card';
import { getCurrentStyleOption, getStyleOptions } from '../../blockHelper';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateBlockData,
  selectBlockById,
  updateTemplate,
} from '../../../../reducers/SiteReducer';
import type { RootState } from '../../../../reducers/store';
import * as icon from '../../../../icons';
import { SettingBlockProps, StyleData } from '../../blockValidator';

function SettingBlock({ blockId, onRemove }: SettingBlockProps) {
  const { id, template, data, isCardOpened } = useSelector((state: RootState) =>
    selectBlockById(state, blockId)
  );
  const styleOptions = getStyleOptions(template);
  const currentStyle = getCurrentStyleOption(template);
  const dispatch = useDispatch();

  //Input
  const [style, setStyle] = useState(currentStyle);
  const [header, setHeader] = useState(data.header?.value);
  const [text, setText] = useState(data.text?.value);
  const [desc, setDesc] = useState(data.desc?.value);
  const [body, setBody] = useState(data.body?.value);

  return (
    <>
      <Card
        title='Text'
        onRemove={onRemove}
        icon={icon.Text}
        isCardOpened={isCardOpened}
        blockId={blockId}
      >
        <CustomSelect
          title='스타일'
          required
          guideline='스타일를 선택해주세요.'
          placeholder='원하는 선택지를 선택해주세요'
          options={styleOptions}
          onChange={(e: StyleData) => {
            setStyle(e);
            dispatch(updateTemplate({ blockId: id, newTemplate: e.value }));
          }}
          value={style}
        />
        <TextInput
          title='타이틀'
          required
          guideline='헤드라인에 표시될 내용을 입력하세요.'
          value={header}
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
        ></TextInput>
        <TextInput
          title='텍스트'
          required
          guideline='텍스트를 입력해주세요'
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'text',
                value: { value: e.target.value },
              })
            );
          }}
        />
        <TextInput
          title='설명'
          required
          guideline='결혼식 장소를 도로명 주소로 입력해주세요'
          value={desc}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setDesc(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'desc',
                value: { value: e.target.value },
              })
            );
          }}
        />

        <TextInput
          title='추가 문구'
          required={false}
          guideline='설명에 표시될 내용을 입력하세요'
          value={body}
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
        ></TextInput>
      </Card>
    </>
  );
}

export default SettingBlock;
