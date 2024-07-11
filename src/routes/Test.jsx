import { useEffect } from "react";
import { AuthApi } from "../components/UserApi"

function Test() {

    const fetchData = async() => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const CHALLENGE = import.meta.env.VITE_CHALLENEGE
            const challengeId = 4
            const res = await AuthApi({token}).get(`${CHALLENGE}${challengeId}/${userId}`);
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      fetchData();
    }, [])
    

    return (
        <div>Test</div>
    )
}

export default Test