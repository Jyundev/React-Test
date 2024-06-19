import styled from "styled-components";
import { useParams } from "react-router-dom";
import { userStore } from "../UserStore";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { AuthApi } from "../UserApi";

function JoinBody() {

    const [RowData, setRowData] = useState(null);  // Initialized as null to differentiate from an empty array

    const { challengeId } = useParams();

    const DETAIL = import.meta.env.VITE_CHALLENGE_DETAIL;

    const Challenge = useCallback(async () => {
        try {
            const { data } = await axios.get(`${DETAIL}${challengeId}`);
            console.log("Fetched challenge data:", data);
            setRowData(data.data);
        } catch (e) {
            console.error("Failed to fetch challenges", e);
        }
    }, [challengeId, DETAIL]);

    useEffect(() => {
        Challenge();
    }, [Challenge]);

    const { userInfo } = userStore();

    const userNickname = userInfo?.data?.nickname || 'Guest';  // Added safe navigation and default value

    const userId = localStorage.getItem('userId');
    
    const challenge = RowData?.challengeName || '';  // Added safe navigation and default value

    const token = localStorage.getItem('token');

    const UPDATE = import.meta.env.VITE_CHALLENGE_UPDATE;

    const onClick = async () => {
        try {
            await AuthApi({ token }).post(`${UPDATE}${challengeId}/${userId}`, {
                userId,
                challengeId
            });
            window.location.href = `http://ddjait-react-cicd.s3-website.ap-northeast-2.amazonaws.com/${challengeId}`;
        } catch (error) {
            console.error('Error updating challenge:', error);
        }
    };

    if (!RowData) {
        return <Wrapper>Loading...</Wrapper>;  // Render a loading state or spinner while data is being fetched
    }

    return (
        <Wrapper>
            <Button onClick={() => onClick()}>도전!</Button>
            <Title>
                <UserName>{userNickname}</UserName> 님, 어디 계세요!
            </Title>
            <Subtitle>
                <ChallengeName>{challenge}</ChallengeName> 챌린지 하러 가셔야죠 🚀
            </Subtitle>
        </Wrapper>
    );
}

export default JoinBody;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    height: auto;
    background: #485563; 
    background: -webkit-linear-gradient(to right, #29323c, #485563); 
    background: linear-gradient(to right, #29323c, #485563); 
`;

const Button = styled.button`
    margin-top: 100px;
    margin-bottom: 50px;
    width: 200px;
    height: 70px;
    background-color: #35e735;
    box-shadow: 0px 0px 30px lightyellow;
    border: 4px solid white;
    border-radius: 10px;
    color: white;
    font-size: 40px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.8s ease-in-out;
    &:hover {
        transform: scale(1.5)
    }
`;

const Title = styled.h1`
    font-size: 35px;
    font-weight: 600;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: end;
`;

const Subtitle = styled.h1`
    font-size: 35px;
    font-weight: 600;
    color: white;
    margin-bottom: 100px;
    display: flex;
    flex-direction: row;
    align-items: end;
`;

const UserName = styled.h1`
    font-size: 70px;
    font-weight: 600;
    color: pink;
    text-shadow: 0px 0px 8px lightyellow;
    margin-right: 10px;
    &:hover {
        text-shadow: 0px 0px 20px lightyellow;
    }
`;

const ChallengeName = styled.h1`
    font-size: 45px;
    font-weight: 600;
    color: #ec6060;
    margin-right: 15px;
`;
