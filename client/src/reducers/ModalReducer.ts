type ConfirmDataType = {
  title: string;
  msg: string;
  action: string;
  props?: string;
};

type ModalState = {
  isTemplateModal: boolean;
  isConfirmModal: boolean;
  isAddModal: boolean;
  confirmData?: ConfirmDataType;
  confirmState: boolean;
};

const initialState: ModalState = {
  isTemplateModal: false,
  isConfirmModal: false,
  isAddModal: false,
  confirmData: {
    title: '',
    msg: '',
    action: '',
    props: '',
  },
  confirmState: false,
};

// 액션 타입 정의

const ActionTypes = {
  TEMPLATE_ON: 'TEMPLATE/MODAL_ON',
  TEMPLATE_OFF: 'TEMPLATE/MODAL_OFF',
  CONFIRM_ON: 'CONFIRM/MODAL_ON',
  CONFIRM_OFF: 'CONFIRM/MODAL_OFF',
  CONFIRM_YES: 'CONFIRM/CONFIRM_YES',
  CONFIRM_RESET: 'CONFIRM/CONFIRM_RESET',
  ADD_ON: 'ADD/MODAL_ON',
  ADD_OFF: 'ADD/MODAL_OFF',
};

type ActionType = keyof typeof ActionTypes;

export const modalReducer = (
  state = initialState,
  action: { type: ActionType; payload?: ConfirmDataType }
) => {
  switch (action.type) {
    case ActionTypes.TEMPLATE_ON:
      return { ...state, isTemplateModal: true };
    case ActionTypes.TEMPLATE_OFF:
      return { ...initialState };
    case ActionTypes.CONFIRM_ON:
      return { ...state, isConfirmModal: true, confirmData: action.payload };
    case ActionTypes.CONFIRM_OFF:
      return { ...initialState };
    case ActionTypes.ADD_ON:
      return { ...state, isAddModal: true };
    case ActionTypes.ADD_OFF:
      return { ...initialState };
    case ActionTypes.CONFIRM_YES:
      return { ...state, confirmState: true };
    case ActionTypes.CONFIRM_RESET:
      return { ...state, confirmState: false };
    default:
      return { ...state };
  }
};
