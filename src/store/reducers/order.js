import * as actionTypes from '../actions/actionTypes';
import { updateStateObject } from '../utility';

const initialState= {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_INIT:
            return updateStateObject(state, { purchased: false });
        case actionTypes.PURCHASE_BURGER_START:
            return updateStateObject(state, { loading: true });
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            const updatedState = {                
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            }
            return updateStateObject(state, updatedState);
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateStateObject(state, { loading: false });
        case actionTypes.FETCH_ORDERS_START: 
            return updateStateObject(state, { loading: true });
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateStateObject(state, { 
                loading: false,
                orders: action.orders
            });
        case actionTypes.FETCH_ORDERS_FAILED:
            return updateStateObject(state, { loading: false });
        default: return state;            
    }
};

export default reducer;