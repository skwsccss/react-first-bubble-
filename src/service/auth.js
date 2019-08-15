import axios from 'axios';
import environment from '../global.js';
export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post(environment.apiUrl + `/login`, { username, password })
            .then(res => {
                if (res.data.status) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('userID', res.data.userID);
                    localStorage.setItem('username', res.data.username);
                    localStorage.setItem('amount', res.data.amount);
                }
                return resolve(res.data);
            })
    })

}

export const signup = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post(environment.apiUrl + `/signup`, { username, password })
            .then(res => {
                return resolve(res.data)
            })
    })
}


export const getAuth = () => {
    return {
        username: localStorage.getItem('username'),
        userID: localStorage.getItem('userID'),
        token: localStorage.getItem('token'),
        amount: localStorage.getItem('amount')
    }
}

export const logoutAuth = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('userID');
    localStorage.removeItem('token');
    localStorage.removeItem('amount');
    return true;
}

export const getUserData = (userID) => {
    return new Promise((resolve, reject) => {
        axios.post(environment.apiUrl + `/getUserData`, { userID })
            .then(res => {
                return resolve(res.data)
            })
    })
}

export const updateUserData = (userID, amount) => {
    return new Promise((resolve, reject) => {
        axios.post(environment.apiUrl + `/updateUserData`, { userID, amount })
            .then(res => {
                return resolve(res.data)
            })
    })
}