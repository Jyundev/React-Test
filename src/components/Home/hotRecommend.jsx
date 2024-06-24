import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFire } from "react-icons/fa6";

function HotRecommend() {

    const [RowData, setRowData] = useState([])

    const HOT = import.meta.env.VITE_CHALLENGE_HOT

    const Challenge = useCallback(async() => {
        try {
            const data = await axios.get(HOT);
            setRowData(data.data.data);
        } catch (e) {
            console.error(e);
        }
    }, [HOT])

    useEffect(() => {
        Challenge();
    }, [Challenge])

    const rowRef = useRef(null);

    const onLeftClick = () => {
        if (rowRef.current) {
            rowRef.current.scrollLeft -= 500
        }
    }

    const onRightClick = () => {
        if (rowRef.current) {
            rowRef.current.scrollLeft += 500
        }
    }

    const navigate = useNavigate();

    return (
        <Wrapper>
            <Title><Icon><FaFire /></Icon>참여자가 많은 <Red>HOT</Red> 챌린지</Title>
            <Slide>
                <LeftButton onClick={onLeftClick}>{'<'}</LeftButton>
                <Row ref={rowRef}>
                    {RowData.map((data) => (
                        <RecommendWrapper key={data.challengeId} onClick={() => navigate(`/joinchallenge/${data.challengeId}`)}>
                            <Subject>
                                    <Img src={data.thumbnail} alt="img" />
                                    <SubjectDetail>
                                        <RecommentdTitle >
                                            <SubTitle>{data.challengeName}</SubTitle>
                                        </RecommentdTitle>
                                        <Detail>
                                            <Dday>D{Math.floor((new Date() - new Date(data.startDay))/(1000 * 60 * 60 * 24))}</Dday>
                                            <TestDate>{'시작일: '}{data.startDay}</TestDate>
                                            <TestDate>{'마지막일: '}{data.endDay}</TestDate>
                                        </Detail>
                                    </SubjectDetail>
                            </Subject>
                        </RecommendWrapper>
                    ))}
                </Row>
                <RightButton onClick={onRightClick}>{'>'}</RightButton>
            </Slide>
        </Wrapper>
    )
}

export default HotRecommend

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    align-self: flex-start;
    margin-left: 20px;
    margin-bottom: 10px; 
    font-weight: 900;
    font-size: 25px;
    display: flex;
    flex-direction: row;
    gap: 10px;
`;

const Icon = styled.div`
    color: red;
`;

const Red = styled.p`
    color: red;
`

const Slide = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const Row = styled.div`
    display: flex;
    width: 80vw;
    gap: 30px;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px 0px 20px 20px;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const LeftButton = styled.button`
    border: none;
    background-color: #ffffff40;
    font-size: 20px;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    cursor: pointer;
    transition: 400ms all ease-in-out;
    &:hover {
        transform: scale(1.28);
    }
`;

const RightButton = styled.button`
    border: none;
    font-size: 20px;
    background-color: #ffffff40;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    cursor: pointer;
    transition: 400ms all ease-in-out;
    &:hover {
        transform: scale(1.28);
    }
`;


const RecommendWrapper = styled.div`
    transition: 400ms all ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.08);
    }
`;

const Subject = styled.div`
    display: flex;
    flex-direction: column;
    width: 200px;
    height: 200px;
    border-radius: 10px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
`;

const Img = styled.img`
    margin-bottom: 10px;
`;

const SubjectDetail = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffffd5;
    width: 200px;
    height: 200px;
`;

const RecommentdTitle = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    gap: 5px;
    align-items: baseline;
`;

const SubTitle = styled.h2`
    font-size: 23px;
    font-weight: 600;
`;

const Detail = styled.div`
    padding: 10px 5px;
    font-size: 17px;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const TestDate = styled.div``;

const Dday = styled.span`
    color: red;
    font-weight: 600;
    font-size: 20px;
`;