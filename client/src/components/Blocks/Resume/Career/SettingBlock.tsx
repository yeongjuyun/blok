import { useState } from 'react';
import { TextInput, CustomSelect, ArrInput } from '../../../Input';
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
import styled from 'styled-components';
import * as icons from '../../../../icons';
const Skill = styled.div`
  box-sizing: border-box;
  padding: 5px 8px;
  background-color: #f0f1f3;
  margin: 0 4px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px !important;
`;
const Intro = styled.span`
  font-size: 1rem;
  color: black;
  width: 80%;
  display: flex;
  flex-wrap: wrap;
`;
const Del = styled.img`
  width: 8px;
  height: 8px;
  padding: 3px;
  margin-left: 2px;
  cursor: pointer;
`;

function SettingBlock({ blockId, onRemove }: SettingBlockProps) {
  const { id, template, data, isCardOpened } = useSelector((state: RootState) =>
    selectBlockById(state, blockId)
  );
  const styleOptions = getStyleOptions(template);
  const currentStyle = getCurrentStyleOption(template);
  const dispatch = useDispatch();
  const [style, setStyle] = useState(currentStyle);
  const [title, setTitle] = useState(data.title?.value);
  const [intros, setIntros] = useState('');
  const [arr, setArr] = useState(data.arrText?.value);
  const [projectTitle, setProjectTitle] = useState(data.leftText?.value);
  const [term, setTerm] = useState(data.caption?.value);
  const [role, setRole] = useState(data.rightText?.value);
  const [body, setbody] = useState(data.body?.value);
  const [projectUrl, setProjectUrl] = useState(data.button?.url);
  const [navTitle, setNavTitle] = useState(data.navTitle);
  const skills = (data: Array<string> | undefined) => {
    const arr = [];
    if (!data) {
      return;
    }
    for (let i = 0; i < data.length; i++) {
      arr.push(
        <Skill key={`${data}-${i}`}>
          {data[i]}
          <Del
            src={icons.x}
            onClick={() => {
              setArr((res) => {
                if (!res) {
                  return;
                }
                const newarr = res.filter((value, index) => index !== i);
                dispatch(
                  updateBlockData({
                    blockId: id,
                    field: 'arrText',
                    value: { value: newarr },
                  })
                );
                return [...newarr];
              });
            }}
          />
        </Skill>
      );
    }
    return arr;
  };
  return (
    <>
      <Card
        title='Career'
        onRemove={onRemove}
        icon={icons.Career}
        isCardOpened={isCardOpened}
        blockId={blockId}
      >
        <TextInput
          title='?????????'
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
          guideline='??????????????? ?????? ????????? ???????????? ???????????????.'
          value={navTitle}
        ></TextInput>
        <CustomSelect
          title='?????????'
          required={true}
          guideline='???????????? ??????????????????.'
          placeholder='????????? ???????????? ??????????????????'
          options={styleOptions}
          onChange={(e: StyleData) => {
            setStyle(e);
            dispatch(updateTemplate({ blockId: id, newTemplate: e.value }));
          }}
          value={style}
        />
        <TextInput
          title='?????????'
          required={true}
          guideline='???????????? ??????????????????'
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
          title='Career'
          required={true}
          guideline='???????????? ??????????????????'
          value={projectTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProjectTitle(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'leftText',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title='?????? ??????'
          required={false}
          guideline='???????????? ??????????????????'
          value={role}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRole(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'rightText',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <TextInput
          title='??????'
          required={false}
          guideline='???????????? ??????????????????'
          value={term}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTerm(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'caption',
                value: { value: e.target.value },
              })
            );
          }}
        ></TextInput>
        <ArrInput
          title='?????? ??????'
          required={false}
          guideline='?????? ????????? ??????????????????'
          key={'skillset'}
          value={intros}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIntros(e.target.value);
          }}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            setArr((res) => {
              if (!res) {
                return;
              }
              return [...res, intros];
            });
            setIntros(() => '');

            dispatch(
              updateBlockData({
                blockId: id,
                field: 'arrText',
                value: { value: arr },
              })
            );
          }}
          arr={<Intro>{skills(arr)}</Intro>}
        ></ArrInput>
        <TextInput
          title='???????????? ??????'
          required={false}
          guideline='???????????? ??????????????????'
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
        <TextInput
          title='url'
          required={false}
          guideline='???????????? ??????????????????'
          value={projectUrl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setProjectUrl(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'button',
                value: { url: e.target.value },
              })
            );
          }}
        ></TextInput>
      </Card>
    </>
  );
}

export default SettingBlock;
