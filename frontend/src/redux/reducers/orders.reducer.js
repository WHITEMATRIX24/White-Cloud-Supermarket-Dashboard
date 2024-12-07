import { RETRIEVE_ORDER } from "../actions/types";

const initialStatus = []

function itemReducer(orders = initialStatus, action) {
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_ORDER:
            return payload;
        
        default:
            return orders;
    }
}

export default itemReducer;