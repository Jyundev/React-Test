import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillAlert } from "react-icons/ai";


function Recommend() {

    const [RowData, setRowData] = useState([])

    const RECENT = import.meta.env.VITE_CHALLENGE_RECENT

    const Challenge = useCallback(async() => {
        try {
            const data = await axios.get(RECENT);
            setRowData(data.data.data);
        } catch (e) {
            console.error(e);
        }
    }, [RECENT])

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
            <Title><Icon><AiFillAlert /></Icon> 자격증 시험일이 얼마 남지 않았어요!</Title>
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

export default Recommend

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    align-self: flex-start;
    margin-bottom: 10px; 
    margin-left: 20px;
    font-weight: 900;
    font-size: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

const Icon = styled.div`
    color: red;
`;

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
    border-radius: 10px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    position: relative;
`;

const Img = styled.img`
    border-radius: 10px;
`;

const SubjectDetail = styled.div`
    position: absolute;
    opacity:0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #ffffffd5;
    width: 200px;
    height: 200px;
    &:hover {
        opacity: 1;
    }
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