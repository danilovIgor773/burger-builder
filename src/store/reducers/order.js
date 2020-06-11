import * as actionTypes from '../actions/actionTypes';
import { updateStateObject } from '../utility';

const initialState= {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseBurgerInit = (state) => {
    return updateStateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state) => {
    return updateStateObject(state, { loading: true });
}

const purchaseBurgerSuccess = (state, action) => {
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
}

const purchaseBurgerFail = (state) => {
    return updateStateObject(state, { loading: false });
}

const fetchOrdersStart = (state) => {
    return updateStateObject(state, { loading: true });
}

const fetchOrdersSuccess = (state, action) => {
    return updateStateObject(state, { 
        loading: false,
        orders: action.orders
    });
}

const fetchOrdersFailed = (state) => {
    updateStateObject(state, { loading: false });
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_BURGER_INIT: return purchaseBurgerInit(state);
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purchaseBurgerFail(state);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state);
        default: return state;            
    }
};

export default reducer;