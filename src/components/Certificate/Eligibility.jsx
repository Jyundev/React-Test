import styled from "styled-components";
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

function Eligibility({ certificateId }) {
    Eligibility.propTypes = {
        certificateId: PropTypes.string.isRequired,
    };

    const ELIGIBILITY = import.meta.env.VITE_CERIFICATE_ELIGIBILITY

    const [eligibility, setEligibility] = useState();

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(`${ELIGIBILITY}${certificateId}`);
            setEligibility(res.data.data);
        } catch (error) {
            console.error('Error fetching eligibility:', error);
        }
    }, [certificateId, ELIGIBILITY]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Wrapper>
            <Title>✅자격 요건</Title>
            <SimpleStandard>{eligibility?.Simplestandard}</SimpleStandard>
            {eligibility?.standard && eligibility.standard.map((standard, idx) => (
                <SubWrapper key={idx}>
                    <SubTitle>{standard.qualification}</SubTitle>
                    <Condition>
                        {standard.condition.map((condition, idx) => (
                            <p key={idx}>• {condition}</p>
                        ))}
                    </Condition>
                </SubWrapper>
            ))}
        </Wrapper>
    );
}

export default Eligibility;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 600;
`;

const SimpleStandard = styled.div`
    font-size: 23px;
    font-weight: 600;
    padding: 20px;
`;

const SubWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
`;

const SubTitle = styled.h2`
    font-size: 23px;
    font-weight: 600;
    padding: 10px;
`;

const Condition = styled.span`
    padding: 20px;
    font-size: 16px;
    line-height: 30px;
`;
