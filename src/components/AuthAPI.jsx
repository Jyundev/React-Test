import axios from "axios";

const TOKEN = localStorage.getItem("token");

export const AuthApi = axios.create({
    baseURL: 'http://52.78.44.47',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `${TOKEN}`,
    },
});
