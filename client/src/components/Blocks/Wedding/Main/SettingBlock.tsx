import { useState } from 'react';
import { TextInput, CustomSelect, ImgInput } from '../../../Input';
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
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { Width100, Label, Required, Guideline } from '../../../Input';

const DateTitle = styled.div`
  display: flex;
`;

export const Calendar = styled(DatePicker)`
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
  const dispatch = useDispatch();

  //Input
  const [style, setStyle] = useState(currentStyle);
  const [venue, setVenue] = useState(data.venue?.value);
  const [header, setHeader] = useState(data.header?.value);
  const [body, setBody] = useState(data.body?.value);
  const [groomParent, setGroomParent] = useState(data.groomParent?.value);
  const [brideParent, setBrideParent] = useState(data.brideParent?.value);
  const [image, setImage] = useState(data.image);
  const [date, setDate] = useState(new Date());

  const imgHandler = async (data: any) => {
    const formData = new FormData();
    formData.append('file', data);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const result = await axios.post('/api/site/image', formData, config);

    setImage(result.data);
    dispatch(
      updateBlockData({
        blockId: id,
        field: 'image',
        value: {
          src: result.data,
          alt: result.data,
        },
      })
    );
  };

  return (
    <>
      <Card
        title='Main'
        onRemove={onRemove}
        icon={icon.Home}
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
          title='신랑/신부 이름'
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
        <ImgInput
          title='이미지'
          guideline='사이트에 표시할 이미지를 업로드하세요'
          src={image?.src}
          alt={image?.alt}
          placeholder={image?.src}
          onChange={imgHandler}
        />
        <Width100>
          <DateTitle>
            <Label>결혼 날짜</Label>
            <Required>*</Required>
          </DateTitle>
          <Calendar
            selected={date}
            onChange={(e: Date) => {
              setDate(e);
              dispatch(
                updateBlockData({
                  blockId: id,
                  field: 'date',
                  value: { value: e.toString() },
                })
              );
            }}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='time'
            dateFormat='MMMM d, yyyy h:mm aa'
          />
          <Guideline>결혼 날짜를 선택해주세요</Guideline>
        </Width100>
        <TextInput
          title='결혼 장소'
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
        ></TextInput>
        <TextInput
          title='신랑 아버지/어머니 성함'
          guideline='부모님 이름을 입력해주세요'
          value={groomParent}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setGroomParent(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'groomParent',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title='신부 아버지/어머니 성함'
          guideline='부모님 이름을 입력해주세요'
          value={brideParent}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBrideParent(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'brideParent',
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
