type ModalState = {
  isTemplateModal: boolean;
  isAlertModal: boolean;
  alertData: string;
};

const initialState: ModalState = {
  isTemplateModal: false,
  isAlertModal: false,
  alertData: "",
};
// 액션 타입 정의
const TEMPLATE_ON = "TEMPLATE/MODAL_ON";
const TEMPLATE_OFF = "TEMPLATE/MODAL_OFF";
const ALERT_ON = "ALERT/MODAL_ON";
const ALERT_OFF = "ALERT/MODAL_OFF";

export const modalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case TEMPLATE_ON:
      return { ...state, isTemplateModal: true };
    case TEMPLATE_OFF:
      return { ...initialState };
    case ALERT_ON:
      return { ...state, isAlertModal: true, alertData: action.payload };
    case ALERT_OFF:
      return { ...initialState };
    default:
      return { ...state };
  }
};
