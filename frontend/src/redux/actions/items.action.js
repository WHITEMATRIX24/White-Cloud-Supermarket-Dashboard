import ItemService from '../../services/items.service';
import { BANNER_ADD, BANNER_DELETE, BANNER_LIST, CREATE_ITEM, DELETE_ITEM, GET_ITEM, RETRIEVE_ALL_ITEM, RETRIEVE_TAG, RETRIEVE_ITEM, UPDATE_ITEM } from './types';

export const retrieve_item = () => async (dispatch) => {
    try {
        const response = await ItemService.getList();
        dispatch({
            type: RETRIEVE_ITEM,
            payload: response
        });
        //console.log('RETRIEVE ITEM RESPONSE : ', response);
        return Promise.resolve(response.data);
    } catch (error) {
        //console.log('RETRIEVE ITEM CATCH BLOCK ERROR : ', error);
        return Promise.reject(error);
    }
}

export const retrieve_all_items = () => async (dispatch) => {
    try {
        const response = await ItemService.getListItems();
        dispatch({
            type: RETRIEVE_ALL_ITEM,
            payload: response
        });
        //console.log('RETRIEVE ITEM RESPONSE : ', response);
        return Promise.resolve(response.data);
    } catch (error) {
        //console.log('RETRIEVE ITEM CATCH BLOCK ERROR : ', error);
        return Promise.reject(error);
    }
}

export const retrieve_tag = () => async (dispatch) => {
    try {
        const response = await ItemService.getTag();
        dispatch({
            type: RETRIEVE_TAG,
            payload: response
        });
        return Promise.resolve(response.data);
    } catch (error) {
        return Promise.reject(error);
    }
}
export const get_item = (id) => {
    try {
        return function (dispatch) {
            const res = ItemService.getItem(id)
                dispatch({
                    type: GET_ITEM,
                    payload: res.data
                });
                return Promise.resolve(res.data);
            
        }
    } catch (error) {
        console.log('GET ITEM CATCH BLOCK ERROR : ', error);
        return Promise.reject(error);
    }
}

export const create_item = (data) => {
    try {   
        return function (dispatch) {
            const res = ItemService.createItem(data)
                dispatch({
                    type: CREATE_ITEM,
                    payload: res
                });
                return Promise.resolve(res.data);
            
        }
    } catch (error) {
        console.log('CREATE ITEM CATCH BLOCK ERROR : ', error);
        return Promise.reject(error);
    }
}

export const update_item = (data) => {
    try {   
        return function (dispatch) {
            const res = ItemService.updateItem(data)
                dispatch({
                    type: UPDATE_ITEM,
                    payload: res.data
                });
                return Promise.resolve(res.data);
            
        }
    } catch (error) {
        console.log('UPDATE ITEM CATCH BLOCK ERROR : ', error);
        return Promise.reject(error);
    }
}

export const Delete_item = (data) => {
    try {   
        return function (dispatch) {
            const res = ItemService.deleteItem(data)
                dispatch({
                    type: DELETE_ITEM,
                    payload: res.data
                });
                return Promise.resolve(res.data);
            
        }
    } catch (error) {
        console.log('DELETE ITEM CATCH BLOCK ERROR : ', error);
        return Promise.reject(error);
    }
}

export const add_banner = (data) => {
    try {   
        return function (dispatch) {
            const res = ItemService.addBanner(data)
                dispatch({
                    type: BANNER_ADD,
                    payload: res
                });
                return Promise.resolve(res.data);
            
        }
    } catch (error) {
        console.log('ADD BANNER CATCH BLOCK ERROR : ', error);
        return Promise.reject(error);
    }
}



export const banner_item = (data) => {
    try {   
        return function (dispatch) {
            const res = ItemService.bannerItem(data)
                dispatch({
                    type: BANNER_DELETE,
                    payload: res.data
                });
                return Promise.resolve(res.data);
            
        }
    } catch (error) {
        console.log('BANNER CATCH BLOCK ERROR : ', error);
        return Promise.reject(error);
    }
}

export const Banner_item = (data) => {
    try {   
        return function (dispatch) {
            const res = ItemService.bannerItem(data)
                dispatch({
                    type: BANNER_DELETE,
                    payload: res.data
                });
                return Promise.resolve(res.data);
            
        }
    } catch (error) {
        console.log('BANNER CATCH BLOCK ERROR : ', error);
        return Promise.reject(error);
    }
}
export const all_banners = () => {
    try {   
        return function (dispatch) {
            const res = ItemService.allBanner()
                dispatch({
                    type: BANNER_LIST,
                    payload: res.data
                });
                return Promise.resolve(res.data);
            
        }
    } catch (error) {
        console.log('BANNER CATCH BLOCK ERROR : ', error);
        return Promise.reject(error);
    }
}