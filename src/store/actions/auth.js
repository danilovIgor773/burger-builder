import * as actionTypes from './actionTypes';
import axios from 'axios';

const AUTH_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const API_KEY = 'AIzaSyCXD8Mf-fq69u2hZfd_w5qDclkceDMiUQA';
const SIGN_IN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='

const composeURL = (authUrl, apiKey) => {
    return `${authUrl}${apiKey}`;
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken,
        userId
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
};

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (experationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, experationTime * 1000)
    }
}

export const auth = (email, password, signUpFlag) => {
    
    let url = composeURL(AUTH_URL, API_KEY);    
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        if(!signUpFlag){            
            url = composeURL(SIGN_IN_URL, API_KEY);            
        }
        axios.post(url, authData)
            .then(response => {
                const {idToken, localId, expiresIn} = response.data;
                dispatch(authSuccess(idToken, localId));
                dispatch(checkAuthTimeout(expiresIn));                
            })
            .catch(err => {
                const {message} = err.response.data.error;                
                dispatch(authFail(message));                
            })
    }
}