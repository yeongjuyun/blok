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
import styled from 'styled-components';

const AccountInput = styled(TextInput)`
  margin-top: 0;
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
  const [header, setHeader] = useState(data.header?.value);
  const [groom, setGroom] = useState(data.groom?.value);
  const [bride, setBride] = useState(data.bride?.value);
  const [groomAccount, setGroomAccount] = useState(data.groomAccount?.value);
  const [brideAccount, setBrideAccount] = useState(data.brideAccount?.value);
  const [body, setBody] = useState(data.body?.value);

  return (
    <>
      <Card
        title='Money'
        onRemove={onRemove}
        icon={icon.Money}
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
          title='신랑 측 계좌정보'
          required
          guideline='신랑 측 예금주를 입력해주세요'
          value={groom}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setGroom(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'groom',
                value: { value: e.target.value },
              })
            );
          }}
        />
        <AccountInput
          required
          guideline='은행과 계좌번호를 입력해주세요'
          value={groomAccount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setGroomAccount(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'groomAccount',
                value: { value: e.target.value },
              })
            );
          }}
        />
        <TextInput
          title='신부 측 계좌정보'
          required
          guideline='신부 측 예금주를 입력해주세요'
          value={bride}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBride(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'bride',
                value: { value: e.target.value },
              })
            );
          }}
        />
        <AccountInput
          required
          guideline='은행과 계좌번호를 입력해주세요'
          value={brideAccount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setBrideAccount(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'brideAccount',
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
