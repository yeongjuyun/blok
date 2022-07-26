export const templateCardData = [
  { title: '랜딩페이지', description: '회사 웹사이트 템플릿 입니다.' },
  {
    title: '이력서',
    description: '이력서 템플릿 입니다.',
    color1: '#2B9D67',
    color2: '#CEF0E2',
  },
  {
    title: '모바일 청첩장',
    description: '모바일 청첩장 템플릿 입니다.',
    color1: '#F5E44C',
    color2: '#CEA9D3',
  },
  {
    title: '기본 웹사이트',
    description: '기업소개 템플릿 입니다.',
    color1: '#585858',
    color2: '#8c929c',
  },
];

export default function templateListData() {
  const landingPage = {
    id: null,
    name: '',
    domain: '',
    theme: 'Simple',
    font: 'Roboto',
    colorSet: {
      primary: '#5754DE',
      secondary: '#ABA9FF',
      background: '#FFFFFF',
      surface: '#B0B0B0',
    },
    blocks: [
      {
        id: 1,
        template: {
          theme: 'Simple',
          blockType: 'Nav',
          layout: '',
        },
        data: {
          navTitle: null,
          logoImage: {
            src: 'www.image.com/source/12312',
            alt: 'logo',
          },
          logoText: {
            value: '블록',
          },
        },
      },
      {
        id: 2,
        template: {
          theme: 'Simple',
          blockType: 'Hero',
          layout: '',
        },
        data: {
          navTitle: '홈',
          caption: {
            value: '노코드 웹사이트 빌더 플랫폼',
          },
          header: {
            value: '여기에 블록에 입력한 제목이 들어갑니다. 여러줄도 오케이',
          },
          headerHighlight: {
            value: '',
          },
          body: {
            value:
              '여기에는 설명이 들어갑니다. 여기에는 설명이 들어갑니다. 여러줄도 괜찮습니다.',
          },
          button: {
            title: '여기에는 버튼명',
            url: 'www.google.com',
          },
        },
      },
      {
        id: 3,
        template: {
          theme: 'Simple',
          blockType: 'Feature',
          layout: '',
        },
        data: {
          style: { value: 'Simple Default' },
          navTitle: '기능 1',
          image: {
            src: '',
            alt: 'image',
          },
          caption: {
            value: '여기는 캡션',
          },
          header: {
            value: '여기에 Feature 블록에서 입력한 값이 들어갑니다.',
          },
          headerHighlight: {
            value: '',
          },
          body: {
            value:
              '여기에는 설명이 들어갑니다. 여기에는 설명이 들어갑니다. 여러줄도 괜찮습니다.',
          },
          button: {
            title: '버튼',
            url: 'naver.com',
          },
        },
      },
      {
        id: 4,
        template: {
          theme: 'Simple',
          blockType: 'Feature',
          layout: 'RightImg',
        },
        data: {
          navTitle: '기능 1',
          image: {
            src: '',
            alt: 'image',
          },
          caption: {
            value: '여기는 캡션',
          },
          header: {
            value: '여기에 Feature 블록에서 입력한 값이 들어갑니다.',
          },
          headerHighlight: {
            value: '',
          },
          body: {
            value:
              '여기에는 설명이 들어갑니다. 여기에는 설명이 들어갑니다. 여러줄도 괜찮습니다.',
          },
          button: {
            title: '버튼',
            url: 'naver.com',
          },
        },
      },
      {
        id: 5,
        template: {
          theme: 'Simple',
          blockType: 'Feature',
          layout: 'Text',
        },
        data: {
          navTitle: '기능 1',
          image: {
            src: '',
            alt: 'image',
          },
          caption: {
            value: '여기는 캡션',
          },
          header: {
            value: '여기에 Feature 블록에서 입력한 값이 들어갑니다.',
          },
          headerHighlight: {
            value: '',
          },
          body: {
            value:
              '여기에는 설명이 들어갑니다. 여기에는 설명이 들어갑니다. 여러줄도 괜찮습니다.',
          },
        },
      },
      {
        id: 6,
        template: {
          theme: 'Simple',
          blockType: 'Footer',
          layout: '',
        },
        data: {
          navTitle: null,
          leftText: {
            value: '노코드 웹사이트 빌더 플랫폼',
          },
          rightText: {
            value: '여기에 블록에 입력한 제목이 들어갑니다. 여러줄도 오케이',
          },
        },
      },
    ],
  };

  const portfolio = {
    id: null,
    name: '',
    domain: '',
    theme: 'Resume',
    font: 'Roboto',
    colorSet: {
      primary: '#5754DE',
      secondary: '#ABA9FF',
      background: '#FFFFFF',
      surface: '#B0B0B0',
    },
    blocks: [
      {
        id: 1,
        template: {
          theme: 'Resume',
          blockType: 'Header',
          layout: '',
        },
        data: {
          navTitle: null,
          title: {
            value: 'Header',
          },
          number: {
            value: 5,
          },
        },
      },
      {
        id: 2,
        template: {
          theme: 'Resume',
          blockType: 'Introduce',
          layout: '',
        },
        data: {
          navTitle: null,
          title: {
            value: 'Introduce',
          },
          body: {
            value:
              '여기에 Introduce에 입력한 텍스트가 들어갑니다. 여러줄도 가능합니다.',
          },
        },
      },
      {
        id: 3,
        template: {
          theme: 'Resume',
          blockType: 'Skillset',
          layout: '',
        },
        data: {
          navTitle: null,
          arrText: {
            value: ['javascript', 'java', 'typescript', 'react', 'node'],
          },
          title: {
            value: 'Skillset',
          },
        },
      },
      {
        id: 4,
        template: {
          theme: 'Resume',
          blockType: 'Career',
          layout: '',
        },
        data: {
          navTitle: null,
          title: {
            value: 'Career',
          },
          leftText: {
            value: '엘리스 SW엔지니어 트랙 2기',
          },
          arrText: {
            value: ['javascript', 'typescript', 'react', 'node'],
          },
          caption: {
            value: '2022년 4월 ~ 2022년 7월',
          },
          rightText: {
            value: '프론트 엔드 개발',
          },
          button: {
            title: '',
            url: '',
          },
          body: {
            value:
              '여기에는 설명이 들어갑니다. 여기에는 설명이 들어갑니다. 안쓰셔도 괜찮습니다.',
          },
        },
      },
      {
        id: 5,
        template: {
          theme: 'Resume',
          blockType: 'Project',
          layout: '',
        },
        data: {
          navTitle: null,
          title: {
            value: 'ProJect',
          },
          leftText: {
            value: '웹빌더프로젝트 - 블록',
          },
          arrText: {
            value: ['javascript', 'typescript', 'react', 'node'],
          },
          caption: {
            value: '2022년 6월 29일 ~ 2022년 7월 22일',
          },
          rightText: {
            value: '프론트 엔드 개발',
          },
          button: {
            title: '프로젝트URL',
            url: 'https://naver.com',
          },
          body: {
            value:
              '여기에는 설명이 들어갑니다. 여기에는 설명이 들어갑니다. 여러줄도 괜찮습니다.',
          },
        },
      },

      {
        id: 6,
        template: {
          theme: 'Resume',
          blockType: 'Education',
          layout: '',
        },
        data: {
          navTitle: null,
          title: {
            value: 'Education',
          },
          leftText: {
            value: '블록대학교',
          },
          rightText: {
            value: '블록학과',
          },
          caption: {
            value: '2017년 3월~2021년 12월',
          },
        },
      },
    ],
  };

  const weddingInvitation = {
    id: null,
    name: '',
    domain: '',
    theme: 'Wedding',
    font: 'Song Myung',
    colorSet: {
      primary: '#358873',
      secondary: '#6BAF92',
      background: '#FFFFFF',
      surface: '#95A3A0',
    },
    blocks: [
      {
        id: 1,
        template: {
          theme: 'Wedding',
          blockType: 'Main',
          layout: '',
        },
        data: {
          style: { value: 'Simple Default' },
          image: {
            src: '',
            alt: 'image',
          },
          header: {
            value: '준호 그리고 아름',
          },
          body: {
            value: 'SAVE THE DATE',
          },
          date: {
            value: 'Wed Oct 26 2024 11:00:00 GMT+0900 (한국 표준시)',
          },
          venue: {
            value: '미리웨딩하우스 1층 그랜드홀',
          },
          groomParent: {
            value: '이창훈 · 김미소의 아들 이준호',
          },
          brideParent: {
            value: '한지훈 · 박주명의 딸 한아름',
          },
        },
      },
      {
        id: 2,
        template: {
          theme: 'Wedding',
          blockType: 'Calendar',
          layout: '',
        },
        data: {
          style: { value: 'Simple Default' },
          image: {
            src: '',
            alt: 'image',
          },
          header: {
            value: 'Calendar',
          },
          body: {
            value: 'SAVE THE DATE',
          },
        },
      },
      {
        id: 3,
        template: {
          theme: 'Wedding',
          blockType: 'Gallery',
          layout: '',
        },
        data: {
          style: { value: 'Simple Default' },
          images: [],
          header: {
            value: 'Gallery',
          },
          body: {
            value: 'SAVE THE DATE',
          },
        },
      },
      {
        id: 4,
        template: {
          theme: 'Wedding',
          blockType: 'Map',
          layout: '',
        },
        data: {
          style: { value: 'Simple Default' },
          header: {
            value: 'Map',
          },
          venue: {
            value: '미리웨딩하우스 1층 그랜드홀',
          },
          address: {
            value: '서울특별시 강남구 대치2동 역삼로 607',
          },
          contact: {
            value: '02-1222-1232',
          },
          body: {
            value: '피로연은 신랑/신부 따로 진행됩니다.',
          },
        },
      },
      {
        id: 5,
        template: {
          theme: 'Wedding',
          blockType: 'Money',
          layout: '',
        },
        data: {
          style: { value: 'Simple Default' },
          header: {
            value: 'Money Gift',
          },
          groom: {
            value: '이준호',
          },
          groomAccount: {
            value: '농협 356-12311-12344',
          },
          bride: {
            value: '한아름',
          },
          brideAccount: {
            value: '농협 356-12311-12344',
          },
          body: {
            value: '피로연은 신랑/신부 따로 진행됩니다.',
          },
        },
      },
      {
        id: 6,
        template: {
          theme: 'Wedding',
          blockType: 'Text',
          layout: '',
        },
        data: {
          style: { value: 'Simple Default' },
          header: {
            value: 'Text',
          },
          text: {
            value: '마지막으로 할 말',
          },
          desc: {
            value: '축하주신 여러분 정말 감사합니다.',
          },
          body: {
            value: '',
          },
        },
      },
    ],
  };

  const basicWeb = {
    id: null,
    name: '',
    domain: '',
    theme: 'Simple',
    font: 'Roboto',
    colorSet: {
      primary: '#5754DE',
      secondary: '#ABA9FF',
      background: '#FFFFFF',
      surface: '#B0B0B0',
    },
    blocks: [],
  };
  return { landingPage, portfolio, weddingInvitation, basicWeb };
}
