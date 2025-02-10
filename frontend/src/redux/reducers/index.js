import { combineReducers } from "@reduxjs/toolkit";
import itemsReducer from "./items.reducer";
import modalReducer from "./draggableModalReducer";

export default combineReducers({
  itemsReducer,
  modalReducer,
});
