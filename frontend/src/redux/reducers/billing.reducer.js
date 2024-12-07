import { CREATE_BILL } from "../actions/types";

const initialStatus = []

function itemReducer(items = initialStatus, action) {
    const { type, payload } = action;

    switch (type) {
        
        case CREATE_BILL:
            return payload;

        default:
            return items;
    }
}

export default itemReducer;