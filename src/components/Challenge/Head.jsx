import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Challengers from './Challenger';
import { userStore } from '../UserStore';



function Head() {

    const { challengeId } = useParams();
    
    const { userInfo } = userStore();

    const userId = userInfo.data.nickname

    console.log(userInfo.data.nickname)

    return (
        <Wrapper>
            <Title>
                <MainTitle>
                    {Challengers[userId][0].challenges[0][challengeId][0].name} 2주 챌린지
                </MainTitle>
                <SubTitle>
                    <div>기간: 2024.5.10 - 2024.5.25</div>
                    <div>시험일: 2024.5.26</div>
                    <div>함께 하는 이들: 25명</div>
                </SubTitle>
            </Title>
            <Status>
                <StatusTitle>
                    <Nickname>{Challengers[userId][0].name}</Nickname>
                    님의 챌린지는
                </StatusTitle>
                <Percentage>
                    56%
                </Percentage>
                <StatusTitleBottom>
                    진행 중입니다!
                </StatusTitleBottom>
                <Progress value={0.56} />
            </Status>
        </Wrapper>
    )
}

export default Head

const Wrapper = styled.div`
    width: 100%;
    height: 350px;
    background: #c0392b;
    background: -webkit-linear-gradient(to right, #8e44ad, #c0392b);
    background: linear-gradient(to right, #8e44ad, #c0392b);
    display: grid;
    grid-template-columns: 4fr 3fr;
`;

const Title = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    font-weight: 600;
    gap: 45px;
    color: #fffffff8;
`;

const MainTitle = styled.div`
    font-size: 70px;
    margin-top: 80px;
    margin-left: 40px;
`;

const SubTitle = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 17px;
    gap: 8px;
    margin-left: 160px;
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
`;

const Nickname = styled.div`
    margin-right: 10px;
    font-size: 40px;
    color: white;
`;

const Percentage = styled.div`
    font-weight: 1000;
    font-size: 40px;
`;

const StatusTitleBottom = styled.div`
    font-weight: 600;
    font-size: 17px;
`;

const Progress = styled.progress`
    width: 300px;
    height: 23px;
`;