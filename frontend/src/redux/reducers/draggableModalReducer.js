import { HIDE_MODAL, SHOW_MODAL } from "../actions/draggableModalAction";

const initialState = {
  showModal: false,
  modalData: null,
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        showModal: true,
        modalData: action.payload,
      };
    case HIDE_MODAL:
      return {
        ...state,
        showModal: false,
        modalData: null,
      };
    default:
      return state;
  }
};

export default modalReducer;
