import React, { Suspense } from 'react';
import styled from 'styled-components';
import Button from '../../Button';
import { useSelector, useDispatch } from 'react-redux';
import CardLoading from '../../Card/CardLoading';
import {
  removeBlock,
  selectBlocks,
  blockDataUpdateChecker,
  moveBlock,
} from '../../../reducers/SiteReducer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
const SettingBlockList = styled.div`
  width: 100%;
  margin-top: 16px;
`;
const SettingBlockContainer = styled.div`
  margin: 8px 0;
`;

export default function Block() {
  const blocks = useSelector(selectBlocks, blockDataUpdateChecker);
  const dispatch = useDispatch();

  const addBlockHandler = () => {
    dispatch({
      type: 'ADD/MODAL_ON',
    });
  };
  const removeBlockHandler = (index: number) => {
    dispatch(removeBlock(index));
  };

  const draggableChecker = (blockType: string) => {
    const notDraggable = ['Nav', 'Footer', 'Hero'];
    return notDraggable.includes(blockType);
  };

  //Set settigBlocks dynamically.
  const settingBlocks = blocks.map((block, index) => {
    const {
      id,
      template: { theme, blockType, layout },
    } = block;
    const SettingBlock = React.lazy(
      () =>
        import(
          `../../Blocks/${theme}/${blockType}/${
            layout ? layout + '/' : ''
          }SettingBlock`
        )
    );
    return (
      <Draggable
        key={id.toString()}
        draggableId={id.toString()}
        index={index}
        isDragDisabled={draggableChecker(blockType)}
      >
        {(provided) => {
          return (
            <SettingBlockContainer
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <Suspense fallback={<CardLoading />}>
                <SettingBlock
                  blockId={id}
                  onRemove={() => removeBlockHandler(index)}
                ></SettingBlock>
              </Suspense>
            </SettingBlockContainer>
          );
        }}
      </Draggable>
    );
  });
  const handleOnDragEnd = (result: any) => {
    console.log(result);
    dispatch(
      moveBlock({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      })
    );
  };
  return (
    <Container>
      <Button
        color="black"
        size="large"
        rounding
        fullWidth
        onClick={addBlockHandler}
      >
        블록 추가하기
      </Button>
      <SettingBlockList>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="settingBlocks">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {settingBlocks}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </SettingBlockList>
    </Container>
  );
}
