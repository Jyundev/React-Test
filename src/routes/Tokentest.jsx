import axios from "axios";
import { useEffect, useState } from "react";

const localToken = localStorage.getItem('token');

const AuthApi = axios.create({
    baseURL: 'http://52.78.44.47',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localToken}`,
    },
});

function TokenTest() {

    const [data, setData] = useState()

    useEffect(() => {
        fetchUserData();
    }, [])
    

    const fetchUserData = async () => {
        try {
            const response = await AuthApi.get('/api/v1/user/user');
            setData(response.data); // 서버에서 반환된 사용자 데이터
        } catch (error) {
            throw new Error('Error fetching user data:', error);
        }
    };
    console.log(data)

    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     try {
    //     const response = await AuthApi.get('/api/v1/user/user');
    //     setData(response);
    //     } catch (error) {
    //     console.error('Error fetching data:', error);
    //     }
    // };

    // const localdata = localStorage.getItem('token');
    // console.log(localdata)

    return (
        <div>콘솔로그 확인</div>
    );
}

export default TokenTest