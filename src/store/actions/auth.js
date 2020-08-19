import * as actionTypes from './actionTypes';
import axios from 'axios';

const AUTH_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const API_KEY = 'AIzaSyCXD8Mf-fq69u2hZfd_w5qDclkceDMiUQA';

const composeURL = (authUrl, apiKey) => {
    return `${authUrl}${apiKey}`;
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
};

export const auth = (email, password) => {
    const url = composeURL(AUTH_URL, API_KEY);    
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        axios.post(url, authData)
            .then(response => {
                console.log('[AUTH_RESP]', response.data);
                dispatch(authSuccess(response.data));                
            })
            .catch(err => {
                console.log('[AUTH_RESP_ERR]', err);
                dispatch(authFail(err));                
            })
    }
}