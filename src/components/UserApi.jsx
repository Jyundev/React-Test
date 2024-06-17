import axios from "axios";

export const AuthApi = ({token}) => axios.create({
    baseURL: 'http://52.78.44.47',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});

export const JoinApi = axios.create({
    baseURL: 'http://52.78.44.47',
    headers: {
        'Content-Type': 'application/json',
    },
});