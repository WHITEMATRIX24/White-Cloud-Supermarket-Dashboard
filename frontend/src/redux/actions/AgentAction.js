import AgentService from "../../services/Agent_Services";
import { ADD_AGENT, GET_AGENTDETAILS } from "./types";

export const add_Agent = (data) => {
    return async function (dispatch) {
        try {
            // Call the service and wait for the response
            const res = await AgentService.addAgent(data);

            // Dispatch the result to the reducer
            dispatch({
                type: ADD_AGENT,
                payload: res, // Assuming `res` contains the agent data
            });

            return res; // Optional, if you want to handle it after dispatch
        } catch (err) {
            console.error("Error in add_Agent action:", err);
            throw err; // Propagate the error
        }
    };
};


export const getAllAgents=()=>{
    try {   
        return function (dispatch) {
            const res = AgentService.getAgents()
            console.log("res",res);
            
                dispatch({
                    type: GET_AGENTDETAILS,
                    payload: res.data
                });
             return Promise.resolve(res.data)
        }
    } catch (error) {
        console.log('RETRIEVE AGENT DETAILS CATCH BLOCK ERROR : ', error);
        return Promise.reject(error);
    }
}