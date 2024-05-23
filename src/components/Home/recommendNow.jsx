import styled from "styled-components"

function RecommendNow() {
    return (
        <Wrapper>
            <Subject>
                <Img src="/img/ADsP.jpg" alt="" />
                <Title>
                    <SubTitle>ADsP</SubTitle>
                    <TitleDetail>(데이터분석준전문가)</TitleDetail>
                </Title>
                <Detail>
                    데이터분석
                    <br />
                    남은 기간
                    <br />
                    뭐 쓸지 몰라서 일단 대충 씀
                </Detail>
            </Subject>
        </Wrapper>
    )
}

export default RecommendNow

const Wrapper = styled.div`
    width: 100%;
    transition: 400ms all ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.08);
    }
`;

const Subject = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    border-radius: 10px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
`;

const Img = styled.img`
    margin-bottom: 10px;
`;

const Title = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    gap: 5px;
    align-items: baseline;
`;

const SubTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
`;

const TitleDetail = styled.h3`
    font-size: 12px;
`;

const Detail = styled.span`
    padding: 10px 5px;
    font-size: 14px;
`;