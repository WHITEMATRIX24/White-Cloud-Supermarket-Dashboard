import ordersService from "../../services/orders.service"
import { ORDER_STATUS, RETRIEVE_ORDER } from "./types";

export const retrieve_orders = () => async (dispatch) => {
    try {
        const response = await ordersService.getList();
        dispatch({
            type: RETRIEVE_ORDER,
            payload: response.data
        });
        return Promise.resolve(response.data)
    } catch (error) {
        console.log('RETRIEVE ORDER CATCH BLOCK ERROR : ', error)
        return Promise.reject(error)
    }
}
export const change_status =  (data) => {
    try {   
        return function (dispatch) {
            const response = ordersService.changeStatus(data);
            dispatch({
                type:ORDER_STATUS,
                payload: response
            });
            return Promise.resolve(response)
    }
    } catch (error) {
        console.log('CHANGE STATUS CATCH BLOCK ERROR : ', error);
        return Promise.reject(error);
    }
}