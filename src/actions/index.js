import axios from 'axios';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import { AUTH_USER,
    AUTH_ERROR,
    UNAUTH_USER } from './types';

const API_URL = 'http://auth-world-of-mincroservices.127.0.0.1.nip.io';

export function errorHandler(dispatch, error, type) {
    let errorMessage = '';

    if(error.data.error) {
        errorMessage = error.data.error;
    } else if(error.data){
        errorMessage = error.data;
    } else {
        errorMessage = error;
    }

    if(error.status === 401) {
        dispatch({
            type: type,
            payload: 'You are not authorized to do this. Please login and try again.'
        });
        logoutUser();
    } else {
        dispatch({
            type: type,
            payload: errorMessage
        });
    }
}

export function loginUser({ email, password }) {
    return function(dispatch) {
        var username = email;
        axios.post(`${API_URL}/login`, { username, password })
            .then(response => {
                cookie.save('token', response.data.token, { path: '/' });
                dispatch({ type: AUTH_USER });
                window.location.href = 'http://localhost:8080/dashboard';
            })
            .catch((error) => {
                errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}

export function registerUser({ email, firstName, lastName, password }) {
    return function(dispatch) {
        var username = email;
        axios.post(`${API_URL}/users/sign-up`, { username, firstName, lastName, password })
            .then(response => {
                window.location.href = 'http://localhost:8080/login';
            })
            .catch((error) => {
                errorHandler(dispatch, error.response, AUTH_ERROR)
            });
    }
}

export function logoutUser() {
    return function (dispatch) {
        dispatch({ type: UNAUTH_USER });
        cookie.remove('token', { path: '/' });

        window.location.href = 'http://localhost:8080/login';
    }
}