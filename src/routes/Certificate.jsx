import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components";
import LoadingScreen from "../components/LoadingScreen";
import Table from "../components/Certificate/Table";
import Description from "../components/Certificate/Description";
import Eligibility from "../components/Certificate/Eligibility";
import ExamStandard from "../components/Certificate/ExamStandard";
import Register from "../components/Certificate/Register";

function Certificate() {

    const { certificateId } = useParams();

    const [certificate, setCertificate] = useState();

    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async() => {
        try {
            const CETIFICATE = import.meta.env.VITE_CERIFICATE
            const response = await axios.get(`${CETIFICATE}${certificateId}`)
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

    if (loading) return <LoadingScreen />;

    return (
        <Wrapper>
            {loading ? <LoadingScreen /> : (
                <>
                    <TitleWrapper>
                        <Title>{certificate.certificateName}</Title>
                        <SubTitle>{certificate.certificateFullName}</SubTitle>
                    </TitleWrapper>
                    <Table certificate={certificate}/>
                    <Description certificate={certificate}/>
                    <Register certificateId={certificateId}/>
                    <Eligibility certificateId={certificateId}/>
                    <ExamStandard certificateId={certificateId} /> 
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
    gap: 100px;
    margin-bottom: 100px;
`;

const TitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: #9CECFB;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to left, #0052D4, #65C7F7, #9CECFB);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to left, #0052D4, #65C7F7, #9CECFB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    width: 100%;
    height: 200px;
`;

const Title = styled.h1`
    font-size: 70px;
    font-weight: 600;
    margin-left: 100px;
`;

const SubTitle = styled.h2`
    font-size: 25px;
    margin-left: 10px;
`;

