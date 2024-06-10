import { useEffect, useState } from "react";
import axios from "axios";

function Test() {

    const [userData, setUserData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://52.78.44.47/api/v1/certificate/calandar');
            setUserData(response.data)
        }
        fetchData();
    }, []);
    console.log(userData)

    return (
        <></>
    );
}

export default Test;