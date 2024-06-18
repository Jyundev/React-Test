import axios from "axios"
import { useEffect, useState } from "react"

function Test() {

    const [register, setRegister] = useState()

    const certificateId = 1

    const fetchData = async() => {
        const res = await axios.get(`http://52.78.44.47/api/v1/certificate/register/all`)
        setRegister(res.data.data);
    }

    useEffect(() => {
        fetchData();
    }, [])
    

    const filteredData = register.filter(item => item.certificateId === certificateId);
    
    console.log(filteredData)

    return (
        <div>Test</div>
    )
}

export default Test