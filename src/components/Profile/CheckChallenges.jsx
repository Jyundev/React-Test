import styled from "styled-components";
import { userStore } from "../UserStore";

function CheckChallenges() {

    const {chlallengeList} = userStore();

    const onClick = (id) => {
        window.location.href = `http://ddjait-react-cicd.s3-website.ap-northeast-2.amazonaws.com/challenge/${id}`
    } 
    
    return (
        <Wrapper>
            <ChallengeWrapper>
                <Title>나의 챌린지</Title>
                <IconWrapper>
                    <Subtitle>진행중</Subtitle>
                    <Icons>
                        {chlallengeList.data.map((challenge) => (
                            <Icon key={challenge.challengeId} onClick={() => onClick(challenge.challengeId)}>
                                <Image src={challenge.thumbnail} alt={challenge.challengeName} />
                                <Name>{challenge.challengeName}</Name>
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
    font-weight: 900;
    font-size: 35px;
    color: #00008b8d;
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
    width: 70vw;
    margin-top: 70px;
    padding: 40px;
    background: #C9D6FF; 
    background: -webkit-linear-gradient(to right, #E2E2E2, #C9D6FF); 
    background: linear-gradient(to right, #E2E2E2, #C9D6FF); 
    border-radius: 10px;
`;

const Subtitle = styled.div`
    font-size: 25px;
    font-weight: 600;
    color: white;
    text-shadow: 0 0 14px darkblue;
    width: 100%;
    text-align: end;
`;

const Icons = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 35px;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

const Icon = styled.div``;

const Image = styled.img`
    border-radius: 100%;
    width: 70px;
    height: 70px;
    box-shadow: 5px 5px 10px grey;
    transition: transform 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.08);
    }
`;

const Name = styled.h3`
    display: flex;
    justify-content: center;
    padding: 10px;
`;