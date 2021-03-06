import axios from 'axios';
import { url } from '../config/config';
import { headers } from '../utils/headerJWT'

import { LOADING, GET_ERRORS, CREATE_PEOPLE, GET_PEOPLE, FIND_PEOPLE, UPDATE_PEOPLE, CHECK_STATUS, REGISTER_USER } from './types';

export const createPeople = (programData) => dispatch => {
    dispatch(loading());

    return new Promise((resolve, reject) => {
        axios.post(`${url}/profile/create`, programData, { headers: headers })
        .then( res => {
            dispatch({
                type: CREATE_PEOPLE,
                payload: res.data.data
            })
            resolve(res)
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
            reject(err)
        });
    });
}

export const registerUser = (user) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post(`${url}/user/register`, user, { headers: headers })
        .then( res => {
            dispatch({
                type: REGISTER_USER,
                payload: res.data.data
            })
            resolve(res)
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
            reject(err)
        });
    });
}

export const getPeople = () => dispatch => {
    dispatch(loading());
    axios.get(`${url}/profile/`, { headers: headers })
    .then( res => 
        dispatch({
        type: GET_PEOPLE,
        payload: res.data.data
    })
    )
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err
    }));
}

export const findPeople = (query) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post(`${url}/profile/query/`, query, { headers: headers })
        .then( res => {
            dispatch({
                type: FIND_PEOPLE,
                payload: res.data.data[0]
            })
            resolve(res)
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
            reject(err)
        });
    });
}

export const updatePeople = (query) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put(`${url}/profile/`, query, { headers: headers })
            .then( res => {
                dispatch({
                    type: UPDATE_PEOPLE,
                    payload: res.data.data[0]
                })
                resolve(res)
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err
                })
                reject(err)
            });
    });

}

export const deletePeople = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post(`${url}/profile/delete/`, id, { headers: headers })
        .then( res => {
            dispatch({
                type: CREATE_PEOPLE,
                payload: res.data.data
            })
            resolve(res)
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
            reject(err)
        });
    });
}

export const checkStatus = (email) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post(`${url}/user/verifyByAdmin`, email, { headers: headers })
        .then( res => {
            dispatch({
                type: CHECK_STATUS,
                payload: res.data.data
            })
            resolve(res)
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            })
            reject(err)
        });
    });
}

export const loading = () => {
    return {
        type: LOADING,
    }
}