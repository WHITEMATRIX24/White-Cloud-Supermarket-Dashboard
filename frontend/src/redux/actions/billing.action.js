import BillingService from '../../services/billing.service'
import { CREATE_BILL, RETRIEVE_INVOICES } from './types';

export const retrieve_invoice = () => {
    try {   
        return function (dispatch) {
            const res = BillingService.getList()
                dispatch({
                    type: RETRIEVE_INVOICES,
                    payload: res.data
                });
                return Promise.resolve(res.data);
        }
    } catch (error) {
        console.log('RETRIEVE INVOICES CATCH BLOCK ERROR : ', error);
        return Promise.reject(error);
    }
}

export const create_invoice = (data) => {
    try {   
        return function (dispatch) {
            const res = BillingService.createItem(data)
                dispatch({
                    type: CREATE_BILL,
                    payload: res.data
                });
                return Promise.resolve(res.data);
        }
    } catch (error) {
        console.log('CREATE INVOICE CATCH BLOCK ERROR : ', error);
        return Promise.reject(error);
    }
}

