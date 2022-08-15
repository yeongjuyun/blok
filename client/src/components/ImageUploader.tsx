import React from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import styled from 'styled-components';
import * as icon from '../icons';
import { useAppDispatch } from '../reducers';
import { updateBlockData } from '../reducers/SiteReducer';
import axios from 'axios';

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  flex: 0 0 33.333333%;
  width: 100px;
  height: 100px;
  margin: 5px;
  border-radius: 10px;
  cursor: pointer;
`;

const UploadIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
`;

const RemoveIcon = styled.img`
  width: 25px;
  height: 25px;
  padding: 8px;
  border-radius: 100%;
  position: absolute;
  right: 0;
  z-index: 20;
`;

export default function ImageUploader(props: any) {
  const dispatch = useAppDispatch();
  const [images, setImages] = React.useState([]);

  const maxNumber = 9;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);

    const data = imageList.map((image) => image.dataURL);
  };

  return (
    <>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
      >
        {({ imageList, onImageUpload, onImageRemove }) => (
          // write your building UI
          <div className='upload__image-wrapper'>
            <ImageContainer>
              <UploadIcon
                src={icon.plus}
                alt='upload'
                onClick={onImageUpload}
              ></UploadIcon>
              {imageList.map((image, index) => (
                <ImageContainer key={index} className='image-item'>
                  <Image src={image.dataURL} alt='image' width='100' />
                  <RemoveIcon
                    src={icon.x2}
                    alt='close'
                    onClick={() => onImageRemove(index)}
                  />
                </ImageContainer>
              ))}
            </ImageContainer>
          </div>
        )}
      </ImageUploading>
    </>
  );
}
