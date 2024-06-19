import axios from "axios";

export const AuthApi = ({token}) => axios.create({
    baseURL: 'https://ddajait.shop',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});

export const JoinApi = axios.create({
    baseURL: 'https://ddajait.shop',
    headers: {
        'Content-Type': 'application/json',
    },
});