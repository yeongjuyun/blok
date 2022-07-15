//By BlockType

export interface NavData {
  style: StyleData;
  logoImage?: ImageData;
  logoText?: TextData;
  button?: ButtonData;
}
export interface HeroData {
  style: StyleData;
  image?: ImageData;
  caption?: TextData;
  header?: TextData;
  body?: TextData;
  button?: ButtonData;
}
export interface FeatureData {
  style: StyleData;
  image?: ImageData;
  caption?: TextData;
  header?: TextData;
  body?: TextData;
  button?: ButtonData;
}

//Block Interface

export interface Block {
  id: number;
  type: string;
  navTitle: string | null;
  template: {
    theme: string;
    blockType: string;
    layout: string | null;
  };
  data: BlockData;
}
export interface BlockData {
  style: StyleData;
  logoImage?: ImageData;
  logoText?: TextData;
  image?: ImageData;
  caption?: TextData;
  header?: TextData;
  body?: TextData;
  button?: ButtonData;
}
export interface StyleData {
  value: string;
}
export interface ImageData {
  src: string;
  alt?: string;
}
export interface TextData {
  value: string;
}
export interface ButtonData {
  title: string;
  url: string;
}
