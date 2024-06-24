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

    const thumbnail = RowData?.thumbnail || '';

    const token = localStorage.getItem('token');

    const UPDATE = import.meta.env.VITE_CHALLENGE_UPDATE;

    const onClick = async () => {
        try {
            const res = await AuthApi({ token }).post(`${UPDATE}${challengeId}/${userId}`, {
                userId,
                challengeId
            });
            if(res.status === 200) {
                window.location.href = `https://d5ki68ixw55w9.cloudfront.net/challenge/${challengeId}`;
            }
        } catch (error) {
            console.error('Error updating challenge:', error);
            alert(`${error.response?.data?.message || error.message}`)
        }
    };

    if (!RowData) {
        return <Wrapper>Loading...</Wrapper>;  // Render a loading state or spinner while data is being fetched
    }

    return (
        <Wrapper>
            <Img src={thumbnail} alt='thumbnail' />
            <Button onClick={onClick}>챌린지 신청하기</Button>
            <Title>
                <UserName>{userNickname}</UserName> <TitleSpan>님, 준비되셨나요?</TitleSpan>
            </Title>
            <Subtitle>
                <ChallengeName>{challenge}</ChallengeName>, 따자잇!
            </Subtitle>
        </Wrapper>
    );
}

export default JoinBody;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    background-color: white;
    margin-bottom: 100px;
`;

const Img = styled.img`
    width: 300px;
    margin-top: 100px;
    margin-bottom: 20px;
`;

const Button = styled.button`
    margin-bottom: 50px;
    width: 200px;
    height: 60px;
    background-color: #3d3d3d;
    box-shadow: 0px 0px 30px lightyellow;
    border: 4px solid white;
    border-radius: 10px;
    color: white;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.5s ease-in-out;
    &:hover {
        transform: scale(1.2)
    }
`;

const Title = styled.div`
    font-size: 40px;
    font-weight: 500;
    color: black;
    display: flex;
    flex-direction: row;
    align-items: end;
`;

const TitleSpan = styled.div`
    padding-bottom: 3px;
`;

const Subtitle = styled.h1`
    font-size: 50px;
    font-weight: 500;
    color: black;
    display: flex;
    flex-direction: row;
    align-items: end;
    margin-top: 20px;
`;

const UserName = styled.div`
    font-size: 60px;
    font-weight: 400;
    color: #ff216b;
    text-shadow: 0px 0px 8px lightyellow;
    margin-right: 10px;
    display: flex; 
    align-items: end;
    &:hover {
        text-shadow: 0px 0px 20px #ffe484;
    }
`;

const ChallengeName = styled.div`
    font-size: 60px;
    font-weight: 600;
    color: #644be4;
`;
