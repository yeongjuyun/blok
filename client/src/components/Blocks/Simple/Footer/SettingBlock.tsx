import { useState } from 'react';
import { TextInput } from '../../../Input';
import { Card } from '../../../Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateBlockData,
  selectBlockById,
} from '../../../../reducers/SiteReducer';
import type { RootState } from '../../../../reducers/store';
import { SettingBlockProps } from '../../blockValidator';
import { getStyleOptions } from '../../blockHelper';

function SettingBlock({ blockId, onRemove }: SettingBlockProps) {
  const {
    id,
    template: { blockType },
    data,
  } = useSelector((state: RootState) => selectBlockById(state, blockId));
  let styleOptions = getStyleOptions(blockType);
  const dispatch = useDispatch();
  //Input
  const [leftText, setLeftText] = useState(data.leftText?.value);
  const [rightText, setRightText] = useState(data.rightText?.value);

  return (
    <>
      <Card title="Footer" onRemove={onRemove}>
        <TextInput
          title="왼쪽 텍스트"
          required
          placeholder="©2022 Block Inc. All rights reserved"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setLeftText(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'leftText',
                value: e.target.value,
              })
            );
          }}
          guideline="푸터 왼쪽에 들어갈 문구를 입력하세요"
          value={leftText}
        ></TextInput>
        <TextInput
          title="오른쪽 텍스트"
          required
          placeholder="블록"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setRightText(e.target.value);
            dispatch(
              updateBlockData({
                blockId: id,
                field: 'rightText',
                value: e.target.value,
              })
            );
          }}
          guideline="푸터 오른쪽에 들어갈 문구를 입력하세요."
          value={rightText}
        ></TextInput>
      </Card>
    </>
  );
}

export default SettingBlock;
