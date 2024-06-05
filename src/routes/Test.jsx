import axios from "axios"
import { useEffect, useState } from "react"

function Test() {

    const [RowData, setRowData] = useState([]);

    const Challenge = async () => {
        try {
            const { data } = await axios.get('http://52.78.44.47/api/v1/challenge/chapter/all');
            setRowData(data);
        } catch (error) {
            console.error("Failed to fetch challenges", error);
        }
    }

    const challengeId = 1;

    useEffect(() => {
        Challenge();
    }, []);

    const specificChallenge = RowData.find(data => data.challenge_id === challengeId);

    console.log(specificChallenge)

    return (
        <div>Test</div>
    )
}

export default Test