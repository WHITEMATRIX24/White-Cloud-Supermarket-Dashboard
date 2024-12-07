import { GET_ITEM, RETRIEVE_ITEM } from "../actions/types";

const initialStatus = []

function itemReducer(items = initialStatus, action) {
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_ITEM:
            return payload;
        
        case GET_ITEM:
            return payload;

        default:
            return items;
    }
}

export default itemReducer;