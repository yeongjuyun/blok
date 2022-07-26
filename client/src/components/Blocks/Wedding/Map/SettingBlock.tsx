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
  const [address, setAddress] = useState(data.address?.value);
  const [contact, setContact] = useState(data.contact?.value);
  const [venue, setVenue] = useState(data.venue?.value);
  const [header, setHeader] = useState(data.header?.value);

  return (
    <>
      <Card
        title='Map'
        onRemove={onRemove}
        icon={icon.Map}
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
          title='결혼식 장소'
          required
          guideline='결혼식 장소를 입력해주세요'
          value={venue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setVenue(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'venue',
                value: { value: e.target.value },
              })
            );
          }}
        />
        <TextInput
          title='도로명 주소'
          required
          guideline='결혼식 장소를 도로명 주소로 입력해주세요'
          value={address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAddress(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'address',
                value: { value: e.target.value },
              })
            );
          }}
        />
        <TextInput
          title='결혼식장 연락처'
          required
          guideline='예식장 연락처를 02-0000-0000 형식으로 입력해주세요'
          value={contact}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setContact(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'contact',
                value: { value: e.target.value },
              })
            );
          }}
        />
      </Card>
    </>
  );
}

export default SettingBlock;
