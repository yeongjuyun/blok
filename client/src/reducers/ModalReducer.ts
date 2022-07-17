type ModalState = {
  isTemplateModal: boolean;
  isConfirmModal: boolean;
  confirmData: string;
  isAddModal: boolean;
};

const initialState: ModalState = {
  isTemplateModal: false,
  isConfirmModal: false,
  confirmData: '',
  isAddModal: false,
};
// 액션 타입 정의
const TEMPLATE_ON = 'TEMPLATE/MODAL_ON';
const TEMPLATE_OFF = 'TEMPLATE/MODAL_OFF';
const CONFIRM_ON = 'CONFIRM/MODAL_ON';
const CONFIRM_OFF = 'CONFIRM/MODAL_OFF';
const ADD_ON = 'ADD/MODAL_ON';
const ADD_OFF = 'ADD/MODAL_OFF';

export const modalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TEMPLATE_ON:
      return { ...state, isTemplateModal: true };
    case TEMPLATE_OFF:
      return { ...initialState };
    case CONFIRM_ON:
      return { ...state, isConfirmModal: true, confirmData: action.payload };
    case CONFIRM_OFF:
      return { ...initialState };
    case ADD_ON:
      return { ...state, isAddModal: true };
    case ADD_OFF:
      return { ...initialState };
    default:
      return { ...state };
  }
};
