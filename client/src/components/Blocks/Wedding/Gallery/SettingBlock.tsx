import { useState } from 'react';
import {
  TextInput,
  CustomSelect,
  ImgInput,
  MultiImgInput,
} from '../../../Input';
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { Width100, Label, Required, Guideline } from '../../../Input';
import { useAppDispatch, useAppSelector } from '../../../../reducers';
import axios from 'axios';
import ImageUploader from '../../../ImageUploader';

const DateTitle = styled.div`
  display: flex;
`;

const Calendar = styled(DatePicker)`
  font-size: 16px;
  line-height: 19px;
  width: 100%;
  height: 48px;
  border: 1px solid #ececec;
  box-sizing: border-box;
  padding: 15px 19px;
  border-radius: 5px;
`;

function SettingBlock({ blockId, onRemove }: SettingBlockProps) {
  const { id, template, data, isCardOpened } = useSelector((state: RootState) =>
    selectBlockById(state, blockId)
  );
  const styleOptions = getStyleOptions(template);
  const currentStyle = getCurrentStyleOption(template);
  const dispatch = useAppDispatch();

  //Input
  const [style, setStyle] = useState(currentStyle);
  const [body, setBody] = useState(data.body?.value);
  const [header, setHeader] = useState(data.header?.value);

  const imgHandler = async (data: any) => {
    const formData = new FormData();
    for (let i = 0; i < data.length; i++) {
      formData.append('file', data[i]);
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const result = await axios.post('/api/site/images', formData, config);

    console.log(data);

    dispatch(
      updateBlockData({
        blockId: id,
        field: 'images',
        value: data,
      })
    );
  };
  return (
    <>
      <Card
        title='Gallery'
        onRemove={onRemove}
        icon={icon.Gallery}
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

        <MultiImgInput
          title='이미지'
          guideline='사이트에 표시할 이미지를 업로드하세요'
          onChange={imgHandler}
        />
        <ImageUploader id={id} />
      </Card>
    </>
  );
}

export default SettingBlock;
