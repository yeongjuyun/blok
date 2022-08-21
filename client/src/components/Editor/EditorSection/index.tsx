import { useState } from 'react';
import styled from 'styled-components';
import EditorHeader from './EditorHeader';
import EditorPreivew from './EditorPreview';

const Container = styled.div`
  min-width: 345px;
  flex-grow: 1;
  background-color: #f5f5f8;
  display: flex;
  box-sizing: border-box;
  height: 100%;

  @media screen and (max-width: 1120px) {
    border-right: none;
    min-width: 0;
    flex-grow: none;
    height: 0;
  }
`;

export default function EditorSection() {
  const [preview, setPreview] = useState<boolean>(false);

  return (
    <Container>
      <EditorHeader setPreview={setPreview} />
      <EditorPreivew preview={preview} />
    </Container>
  );
}
