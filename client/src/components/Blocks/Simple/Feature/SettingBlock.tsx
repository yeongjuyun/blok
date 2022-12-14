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

function SettingBlock({ blockId, onRemove }: SettingBlockProps) {
  const { id, template, data, isCardOpened } = useSelector((state: RootState) =>
    selectBlockById(state, blockId)
  );
  const styleOptions = getStyleOptions(template);
  const currentStyle = getCurrentStyleOption(template);
  const dispatch = useDispatch();

  //Input
  const [navTitle, setNavTitle] = useState(data.navTitle);
  const [style, setStyle] = useState(currentStyle);
  const [caption, setCaption] = useState(data.caption?.value);
  const [header, setHeader] = useState(data.header?.value);
  const [headerHighlight, setHeaderHighlight] = useState(
    data.headerHighlight?.value
  );
  const [body, setBody] = useState(data.body?.value);
  const [button, setButton] = useState(data.button);
  const [image, setImage] = useState(data.image);

  async function imgHandler(data: any) {
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
  }

  return (
    <>
      <Card
        title="Feature"
        onRemove={onRemove}
        icon={icon.Feature}
        isCardOpened={isCardOpened}
        blockId={blockId}
      >
        <TextInput
          title="?????????"
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
          guideline="??????????????? ?????? ????????? ???????????? ???????????????."
          value={navTitle}
        ></TextInput>
        <CustomSelect
          title="?????????"
          required
          guideline="???????????? ??????????????????."
          placeholder="????????? ???????????? ??????????????????"
          options={styleOptions}
          onChange={(e: StyleData) => {
            setStyle(e);
            dispatch(updateTemplate({ blockId: id, newTemplate: e.value }));
          }}
          value={style}
        />
        <ImgInput
          title="?????????"
          guideline="???????????? ????????? ???????????? ??????????????????"
          src={image?.src}
          alt={image?.alt}
          placeholder={image?.src}
          onChange={imgHandler}
        />
        <TextInput
          title="??????"
          required={false}
          guideline="????????? ????????? ????????? ???????????????."
          value={caption}
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
        ></TextInput>
        <TextInput
          title="????????????"
          required
          guideline="??????????????? ????????? ????????? ???????????????."
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
          title="???????????? ?????? ?????????"
          required={false}
          guideline="???????????? ?????? ????????? ????????? ???????????? ???????????????"
          value={headerHighlight}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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
          title="??????"
          required={false}
          guideline="????????? ????????? ????????? ???????????????"
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
        <TextInput
          title="?????? ?????????"
          required={false}
          guideline="????????? ?????? ????????? ???????????? ????????????."
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
          title="?????? URL"
          required={false}
          guideline="?????? ????????? ????????? url??? ???????????????"
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

export default SettingBlock;
