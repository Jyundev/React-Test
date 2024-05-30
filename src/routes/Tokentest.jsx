import axios from "axios";
import { useEffect, useState } from "react";

function TokenTest() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
        const response = await axios.get('http://52.78.44.47/api/v1');
        setData(response);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };

    console.log(data)

    return (
        <div>콘솔로그 확인</div>
    );
}

export default TokenTest