import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Site, Block, BlockData } from '../components/Blocks/blockValidator';

//Initial Value
const initialState: Site = {
  id: null,
  name: '',
  domain: '',
  theme: '',
  font: '',
  colorSet: {
    primary: '',
    secondary: '',
    surface: '',
    background: '',
  },
  blocks: [],
};
const initialStateSample: Site = {
  id: 2,
  name: 'First Site',
  domain: 'firstSite',
  theme: 'Simple',
  font: 'Roboto',
  colorSet: {
    primary: '#5754DE',
    secondary: '#ABA9FF',
    background: '#FFFFFF',
    surface: '#B0B0B0',
  },
  //blocks: [],
  blocks: [
    {
      id: 1,
      template: {
        theme: 'Simple',
        blockType: 'Nav',
        layout: null,
      },
      data: {
        navTitle: '',
        style: {
          value: '스타일1',
        },
        logoImage: {
          src: 'www.image.com/source/12312',
          alt: 'logo',
        },
        logoText: {
          value: '블록',
        },
        button: {
          title: '지원하기',
          url: 'form.google.com/joinTeam',
        },
      },
    },
    {
      id: 2,
      template: {
        theme: 'Simple',
        blockType: 'Hero',
        layout: null,
      },
      data: {
        navTitle: '홈',
        style: {
          value: '',
        },
        image: {
          src: 'www.image.com/source/12312',
          alt: 'logo',
        },
        caption: {
          value: '노코드 웹사이트 빌더',
        },
        header: {
          value: '블록으로 웹사이트를 만들어보세요',
        },

        body: {
          value:
            '블록은 노코드 웹사이트 빌더입니다. 빠르고 쉽게 웹사이트를 만들어보세요.',
        },
        button: {
          title: '웹사이트 만들기',
          url: 'block.com/login',
        },
      },
    },
    {
      id: 3,
      template: {
        theme: 'Simple',
        blockType: 'Feature',
        layout: 'RightImg',
      },
      data: {
        navTitle: '기능1',
        style: {
          value: '',
        },
        image: {
          src: 'www.image.com/source/12312',
          alt: 'logo',
        },
        caption: {
          value: '노코드 웹사이트 빌더',
        },
        header: {
          value: '블록으로 웹사이트를 만들어보세요',
        },
        body: {
          value:
            '블록은 노코드 웹사이트 빌더입니다. 빠르고 쉽게 웹사이트를 만들어보세요.',
        },
        button: {
          title: '웹사이트 만들기',
          url: 'block.com/login',
        },
      },
    },
    {
      id: 4,
      template: {
        theme: 'Simple',
        blockType: 'Footer',
        layout: null,
      },
      data: {
        navTitle: '',
        style: { value: '' },
        rightText: {
          value: '다양한 템플릿으로 웹사이트를 만들어보세요.',
        },
        leftText: {
          value: '블록은 랜딩페이지부터 이력서까지 다양한 템플릿을 제공합니다.',
        },
      },
    },
  ],
};
const initialStateTest: Site = {
  id: 2,
  name: 'First Site',
  domain: 'firstSite',
  theme: 'Simple',
  font: 'Roboto',
  colorSet: {
    primary: '#5754DE',
    secondary: '#ABA9FF',
    background: '#FFFFFF',
    surface: '#B0B0B0',
  },
  //blocks: [],
  blocks: [
    {
      id: 3,
      template: {
        theme: 'Simple',
        blockType: 'Feature',
        layout: null,
      },
      data: {
        navTitle: '기능1',
        style: {
          value: 'Simple Default',
        },
        image: {
          src: 'https://images.unsplash.com/photo-1658081459867-108ddc6f7dc5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
          alt: 'logo',
        },
        caption: {
          value: '노코드 웹사이트 빌더',
        },
        header: {
          value: '블록으로 웹사이트를 만들어보세요',
        },
        headerHighlight: {
          value: '웹사이트',
        },
        body: {
          value:
            '블록은 노코드 웹사이트 빌더입니다. 빠르고 쉽게 웹사이트를 만들어보세요.',
        },
        button: {
          title: '웹사이트 만들기',
          url: 'block.com/login',
        },
      },
    },
  ],
};

//Create Slice
export const siteSlice = createSlice({
  name: 'site',
  initialState: initialStateTest,
  reducers: {
    addBlock: (state, action: PayloadAction<Block>) => {
      const block = action.payload;
      const isBlockExist = (blockType: string): boolean => {
        const result = state.blocks.find(
          (block) => block.template.blockType === blockType
        );
        return result ? true : false;
      };
      let startIndex = 0;
      let endIndex = state.blocks.length;

      if (isBlockExist('Nav')) {
        startIndex++;
      }
      if (isBlockExist('Hero')) {
        startIndex++;
      }
      if (isBlockExist('Footer')) {
        endIndex--;
      }

      if (block.template.blockType === 'Nav') {
        //Nav블록 -> 맨 앞에 추가
        state.blocks.splice(0, 0, block);
      } else if (block.template.blockType === 'Hero') {
        //Hero블록 -> Nav 다음에 추가(Nav가 없을경우 맨 앞에 추가, Nav가 있을경우 두번째에 추가)
        state.blocks.splice(startIndex, 0, block);
      } else if (block.template.blockType === 'Footer') {
        //마지막에 추가(ex. Footer)
        state.blocks.splice(endIndex, 0, block);
      } else {
        //특정 순서가 없는 블록 추가 (Footer가 없을경우 마지막에 추가, Footer가 있을경우 마지막 이전에 추가)
        state.blocks.splice(endIndex, 0, block);
      }
    },
    removeBlock: (state, action: PayloadAction<number>) => {
      state.blocks.splice(action.payload, 1);
    },
    updateBlockData: (
      state,
      action: PayloadAction<{ blockId: number; field: string; value: any }>
    ) => {
      const { blockId, field, value } = action.payload;
      let index = state.blocks.findIndex((block) => block.id === blockId);
      //state.blocks[index].data[field] = value;
      console.log(blockId, field, value);
    },
  },
});

/*
리듀서 예시
const changeInputData = (blockId: number, field: string, value: any) => {};
changeInputData(12, 'header', 'Good People Deserves Food');
*/

//Action creators are generated for each case reducer function
export const { addBlock, removeBlock, updateBlockData } = siteSlice.actions;
export default siteSlice.reducer;
