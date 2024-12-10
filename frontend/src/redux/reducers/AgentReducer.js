import { ADD_AGENT } from "../actions/types";

const initialState=[]

function agentReducer(item=initialState,action){
    const {type,payload}= action;
    console.log("PAYLOAD",payload);
    

    switch (type) {
        
        case ADD_AGENT:
            return payload;

        default:
            return item;
    }
}

export default agentReducer;