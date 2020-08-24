import * as actionTypes from '../actions/actionTypes';
import {updateStateObject} from '../utility';

const initialState = {
    token: null,
    error: null,
    loading: false,
    userId: null,
};

const authStart = (state, action) => {
    return updateStateObject(state, {error: null, loading: true});
}

const authSuccess = (state, action) => {
    return updateStateObject(state, {
        token: action.idToken, 
        error: null,
        loading: false,
        userId: action.userId
    })
}

const authFail = (state, action) => {
    return updateStateObject(state, { error: action.error, loading: false});
}

const authLogout = (state, action) => {
    return updateStateObject(state, {
        token: null, 
        userId: null
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state 
    }
}

export default reducer;