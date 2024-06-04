import axios from "axios";

const localToken = localStorage.getItem('token');

export const AuthApi = axios.create({
    baseURL: 'http://52.78.44.47',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localToken}`,
    },
});

export const JoinApi = axios.create({
    baseURL: 'http://52.78.44.47',
    headers: {
        'Content-Type': 'application/json',
    },
});