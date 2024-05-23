import styled from "styled-components";
import RecommendNow from "./recommendNow";
import { useRef } from "react";

function Recommend() {

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

    return (
        <Wrapper>
            <Title>🔥늦기 전에 접수하세요!</Title>
            <Slide>
                <LeftButton onClick={onLeftClick}>{'<'}</LeftButton>
                <Row ref={rowRef}>
                    <RecommendNow />
                    <RecommendNow />
                    <RecommendNow />
                    <RecommendNow />
                    <RecommendNow />
                    <RecommendNow />
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
    font-weight: 900;
    font-size: 20px;
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
    border-radius: 50%;
    height: 50px;
    width: 50px;
    cursor: pointer;
    transition: 400ms all ease-in-out;
    &:hover {
        transform: scale(1.08);
    }
`;

const RightButton = styled.button`
border: none;
border-radius: 50%;
height: 50px;
width: 50px;
cursor: pointer;
transition: 400ms all ease-in-out;
&:hover {
    transform: scale(1.08);
}`;