import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";
import LoadingScreen from "../components/LoadingScreen";

function Certificate() {

    const { certificateId } = useParams();

    const [certificate, setCertificate] = useState();

    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async() => {
        try {
            const response = await axios.get(`http://52.78.44.47/api/v1/certificate/${certificateId}`)
            setCertificate(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }, [certificateId])

    useEffect(() => {
        fetchData();
    }, [fetchData])
    
    console.log(certificate)

    if (loading) return <LoadingScreen />;

    return (
        <Wrapper>
            {loading ? <LoadingScreen /> : (
                <>
                    <TitleWrapper>
                        <Title>{certificate.certificateName}</Title>
                        <SubTitle>{certificate.certificateFullName}</SubTitle>
                    </TitleWrapper>
                    <DescriptionWrapper>
                        <DescriptionTitle>🔎 {certificate.certificateName} 란?</DescriptionTitle>
                        <Description>
                            <DescriptionImg src={certificate.thumbnail} alt='certificate image' />
                            <Overview>{certificate.overview}</Overview>
                        </Description>
                    </DescriptionWrapper>
                </>
            )}
            
        </Wrapper>
    )
}

export default Certificate

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 50px;
    background: #9CECFB;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #0052D4, #65C7F7, #9CECFB);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #0052D4, #65C7F7, #9CECFB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    width: 100%;
    height: 200px;
`;

const Title = styled.h1`
    font-size: 70px;
    font-weight: 600;
`;

const SubTitle = styled.h2`
    font-size: 25px;
    margin-left: 10px;
`;

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const DescriptionTitle = styled.h1`
    font-size: 28px;
    font-weight: 600;
`;

const Description = styled.div`
    display: grid;
    grid-template-columns: 2fr 4fr;
    align-items: center;
`;

const DescriptionImg = styled.img``;

const Overview = styled.span`
    font-size: 19px;
    line-height: 30px;
    text-indent: 20px;
    border: 3px solid lightgreen;
    border-radius: 10px;
    padding: 10px;
`;