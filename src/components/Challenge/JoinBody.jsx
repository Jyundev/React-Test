import styled from "styled-components";
import { useParams } from "react-router-dom";
import { userStore } from "../UserStore";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { AuthApi } from "../UserApi";

function JoinBody() {

    const [challengeDetailData, setChallengeDetailData] = useState(null);  

    const { challengeId } = useParams();

    const DETAIL = import.meta.env.VITE_CHALLENGE_DETAIL;

    const Challenge = useCallback(async () => {
        try {
            const { data } = await axios.get(`${DETAIL}${challengeId}`);
            setChallengeDetailData(data.data);
        } catch (e) {
            console.error("Failed to fetch challenges", e);
        }
    }, [challengeId, DETAIL]);

    useEffect(() => {
        Challenge();
    }, [Challenge]);

    const { userInfo } = userStore();

    const userNickname = userInfo?.data?.nickname || '';  

    const userId = localStorage.getItem('userId');
    
    const challenge = challengeDetailData?.challengeName || ''; 

    const thumbnail = challengeDetailData?.thumbnail || '';

    const token = localStorage.getItem('token');

    const UPDATE = import.meta.env.VITE_CHALLENGE_UPDATE;

    const onClick = async () => {
        try {
            const res = await AuthApi({ token }).post(`${UPDATE}${challengeId}/${userId}`, {
                userId,
                challengeId
            });
            if(res.status === 200) {
                // useNavigate 이용시 api에 새로 업데이트 되는 유저의 해당 챌린지 정보가 적용되지 않은 채 페이지가 넘어가며 첼린지 데이터를 인식 못하는 이슈 발생.
                // useNavigate로 이동시 zustand가 작동하지 않는 것으로 보임.
                // window.location.href를 통해 페이지에 새로 접근하는 방식으로 이슈를 임시적으로 해결.
                // 추후 해당 코드에서 zustand를 통해 challenge 데이터를 업데이트 하고 이동하는 방식을 시도해볼 것.
                window.location.href = `https:/ddajait.com/challenge/${challengeId}`;
            }
        } catch (error) {
            console.error('Error updating challenge:', error);
            alert(`${error.response?.data?.message || error.message}`)
        }
    };

    // JoinChallgenge.jsx에서 데이터를 불러온 다음 props를 통해 전달하는 방식 고려해볼 것.
    if (!challengeDetailData) {
        return <Wrapper>Loading...</Wrapper>;
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
