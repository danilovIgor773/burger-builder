import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
} 

export const purchasBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchasBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log('PURCHASE_BURGER_START - response', response.data);
                dispatch(purchaseBurgerSuccess(response.data, orderData));                 
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
        });
    }
}

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}

