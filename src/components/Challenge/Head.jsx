import styled from 'styled-components';
import { userStore } from '../UserStore';



function Head() {

    const { userInfo, challengeInfo } = userStore();

    const userId = userInfo.data.nickname

    return (
        <Wrapper>
            <Title>
                <MainTitle>
                    {challengeInfo.name} 2주 챌린지
                </MainTitle>
                <SubTitle>
                    <div>기간: {challengeInfo.start} - {challengeInfo.end}</div>
                    <div>시험일: {challengeInfo.test_date}</div>
                    <div>함께 하는 이들: {challengeInfo.total_user}명</div>
                </SubTitle>
            </Title>
            <Status>
                <StatusTitle>
                    <Nickname>{userId}</Nickname>
                    님의 챌린지는
                </StatusTitle>
                <Percentage>
                    {challengeInfo.my_progress}%
                </Percentage>
                <StatusTitleBottom>
                    진행 중입니다!
                </StatusTitleBottom>
                <Progress value={challengeInfo.my_progress/100} />
            </Status>
        </Wrapper>
    )
}

export default Head

const Wrapper = styled.div`
    width: 100%;
    height: 350px;
    background: #6c4eff;
    display: grid;
    grid-template-columns: 4fr 3fr;

    @media (max-width: 800px) {
        display: flex;
        flex-direction: column;
        gap: 50px;
        height: auto;
        padding-bottom: 50px;
    }
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end; 
    gap: 45px;
    color: #fffffff8;
    @media (max-width: 768px) {
        align-items: center;
    }
`;

const MainTitle = styled.div`
    font-size: 70px;
    margin-top: 80px;
    margin-left: 40px;
    @media (max-width: 768px) {
        font-size: 60px;
    }
`;

const SubTitle = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 25px;
    gap: 8px;
    @media (max-width: 768px) {
        font-size: 18px;
    }
`;

const Status = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const StatusTitle = styled.div`
    font-size: 25px;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    align-items: baseline;
    @media (max-width: 768px) {
        font-size: 18px;
    }
`;

const Nickname = styled.div`
    margin-right: 10px;
    font-size: 50px;
    color: white;
    @media (max-width: 768px) {
        font-size: 40px;
    }
`;

const Percentage = styled.span`
    font-weight: 1000;
    font-size: 45px;
    color: #f3f396;
    text-shadow: 0 0 5px lightyellow;
    &:hover {
        text-shadow: 0px 0px 25px lightyellow;
    }
`;



const StatusTitleBottom = styled.div`
    font-weight: 600;
    font-size: 17px;
`;

const Progress = styled.progress`
    width: 240px;
    height: 20px;
    appearance: none; 
    &::-webkit-progress-bar {
        background-color: #f0f0f0; 
        border-radius: 50px;
    }
    &::-webkit-progress-value {
        background-color: #9cf371; 
        border-radius: 50px;
    }
`;