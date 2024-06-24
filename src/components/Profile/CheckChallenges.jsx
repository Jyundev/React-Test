import styled from "styled-components";
import { userStore } from "../UserStore";

function CheckChallenges() {

    const {challengeList} = userStore();

    const onClick = (id) => {
        window.location.href = `https://d5ki68ixw55w9.cloudfront.net/challenge/${id}`
    } 
    
    return (
        <Wrapper>
            <ChallengeWrapper>
                <Title>나의 챌린지</Title>
                <IconWrapper>
                    <Subtitle>진행중</Subtitle>
                    <Icons>
                        {challengeList.data.map((challenge) => (
                            <Icon key={challenge.challengeId} onClick={() => onClick(challenge.challengeId)}>
                                <Name>{challenge.challengeName}</Name>
                                <Progress value={challenge.progress/100}/>
                            </Icon>
                        ))}
                    </Icons>
                </IconWrapper>
            </ChallengeWrapper>
        </Wrapper>
    )
}

export default CheckChallenges

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    font-weight: 400;
    font-size: 35px;
    color: #3b3b3b;
    text-shadow: 0 0 10px white;
`;

const IconWrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 4fr;
    align-items: center;
    justify-content: center;
    gap: 50px;
    margin-top: 50px;
`;

const ChallengeWrapper = styled.div`
    width: 60vw;
    margin-top: 70px;
    padding: 40px;
    background: #e0e8ff; 
    /* background: -webkit-linear-gradient(to right, #E2E2E2, #C9D6FF); 
    background: linear-gradient(to right, #E2E2E2, #C9D6FF);  */
    border-radius: 10px;
`;

const Subtitle = styled.div`
    font-size: 30px;
    font-weight: 200;
    color: #626262;
    text-shadow: 0 0 15px white;
    width: 100%;
    text-align: end;
`;

const Icons = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 35px;
    justify-content: center;
    align-items: center;
`;

const Icon = styled.div`
    /* background-color: #e7e7e7;  */
    border-radius: 30px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.6s ease-in-out;
    &:hover {
        transform: scale(1.13);
        box-shadow: 0 0 10px lightyellow;
    }
`;

const Name = styled.h3`
    display: flex;
    justify-content: center;
    font-weight: 600;
    color: #3c3c3c;
    margin: 0 20px;
`;

const Progress = styled.progress`
    width: 80%;
    height: 9px;
    margin-top: 5px;
    appearance: none; 
    &::-webkit-progress-bar {
        background-color: #f0f0f0; 
        border-radius: 50px;
    }
    &::-webkit-progress-value {
        background-color: #0048ff; 
        border-radius: 50px;
    }
`;