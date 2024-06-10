import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components";

function Certificate() {

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
        <Wrapper>
            <HeadWrapper>
                <Head>
                    <Title>ADsP</Title>
                    <SubTitle>: 데이터분석준전문가</SubTitle>
                </Head>
                <ButtonWrapper>
                    <div>분야: 데이터</div>
                    <div>난이도: 2.5</div>
                    <HeadButton>챌린지 참여하기</HeadButton>
                </ButtonWrapper>
            </HeadWrapper>
            <Body>
                <div>소개</div>
                <div>데이터분석 준전문가(ADsP:Advanced Data Analytics Semi-Professional)란 데이터 이해에 대한 기본지식을 바탕으로 데이터분석 기획 및 데이터분석 등의 직무를 수행하는 실무자를 양성하기 위한 자격제도</div>
                <div>시험 과목</div>
            </Body>
        </Wrapper>
    )
}

export default Certificate

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    width: 80%;
    gap: 40px;
`;

const HeadWrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 2fr; 
    width: 80%;
    border: 1px solid grey;
`;

const Head = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: flex-start;
    padding: 40px;
    border: 1px solid grey;
`;

const Title = styled.h1`
    font-weight: 600;
    font-size: 50px;
`;

const SubTitle = styled.h2`
    font-size: 20px;
    padding: 10px;
    margin-left: 10px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const HeadButton = styled.button`
    width: 200px;
    height: 60px;
`;

const Body = styled.div`
display: flex;
flex-direction: column;
width: 90%;
border: 1px solid black;
`;