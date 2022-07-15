type ModalState = {
  isTemplateModal: boolean;
  isConfirmModal: boolean;
  confirmData: string;
  confirmState: boolean;
};

const initialState: ModalState = {
  isTemplateModal: false,
  isConfirmModal: false,
  confirmData: "",
  confirmState: false,
};

// 액션 타입 정의
const TEMPLATE_ON = "TEMPLATE/MODAL_ON";
const TEMPLATE_OFF = "TEMPLATE/MODAL_OFF";
const CONFIRM_ON = "CONFIRM/MODAL_ON";
const CONFIRM_OFF = "CONFIRM/MODAL_OFF";
const CONFIRM_YES = "CONFIRM/CONFIRM_YES";
const CONFIRM_RESET = "CONFIRM/CONFIRM_RESET";

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
    case CONFIRM_YES:
      return { ...state, confirmState: true };
    case CONFIRM_RESET:
      return { ...state, confirmState: false };
    default:
      return { ...state };
  }
};
