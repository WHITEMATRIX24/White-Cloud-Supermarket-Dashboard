import { applyMiddleware, createStore } from "redux";
import rootReducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const initalState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initalState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;