import styled from "styled-components";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PiCertificateFill } from "react-icons/pi";

function CerfiticateRow() {

    const [RowData, setRowData] = useState([])

    const Challenge = useCallback(async() => {
        try {
            const ALL = import.meta.env.VITE_CERIFICATE_ALL
            const response = await axios.get(ALL);
            setRowData(response.data.data);
        } catch (e) {
            console.error(e);
        }
    }, [])

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
            <Title><Icon><PiCertificateFill /></Icon>IT 자격증 보러가기 </Title>
            <Slide>
                <LeftButton onClick={onLeftClick}>{'<'}</LeftButton>
                <Row ref={rowRef}>
                    {RowData.map((data) => (
                        <RecommendWrapper key={data.certificate_id} onClick={() => navigate(`/certificate/${data.certificate_id}`)}>
                            <Subject>
                                <Img src={data.thumbnail} alt="img" />
                                <SubjectDetail>
                                    <RecommentdTitle >
                                        <SubTitle>{data.certificateFullName}</SubTitle>
                                    </RecommentdTitle>
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

export default CerfiticateRow

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    align-self: flex-start;
    margin-bottom: 10px; 
    font-weight: 900;
    font-size: 25px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    margin-left: 10px;
`;

const Icon = styled.p`
    color: #5689ff;
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
`;

const Img = styled.img`
    border-radius: 10px;
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