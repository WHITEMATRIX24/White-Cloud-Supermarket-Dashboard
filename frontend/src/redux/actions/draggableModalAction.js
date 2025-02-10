export const SHOW_MODAL = "SHOW_MODAL";
export const HIDE_MODAL = "HIDE_MODAL";

export const showModal = (data) => {
  return {
    type: SHOW_MODAL,
    payload: data,
  };
};

export const hideModal = () => {
  return {
    type: HIDE_MODAL,
  };
};
