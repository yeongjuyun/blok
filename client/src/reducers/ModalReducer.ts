type ModalState = {
  isModal: boolean;
};

const initialState: ModalState = {
  isModal: false,
};
// 액션 타입 정의
const MODAL_ON = "MODAL_ON";
const MODAL_OFF = "MODAL_OFF";

// 액션 생성 함수
export const ModalOnAction = {
  type: MODAL_ON,
};
export const modalOff = {
  type: MODAL_OFF,
};

export const modalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case MODAL_ON:
      return { ...state, isModal: true };
    case MODAL_OFF:
      return { ...initialState };
    default:
      return { ...state };
  }
};
