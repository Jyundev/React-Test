import styled from "styled-components";
import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

function ExamStandard({ certificateId }) {
    ExamStandard.propTypes = {
        certificateId: PropTypes.string.isRequired,
    };

    const EXAMSTANDARD = import.meta.env.VITE_CERIFICATE_EXAMSTANDARD;

    const [examStandard, setExamStandard] = useState();

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(`${EXAMSTANDARD}${certificateId}`);
            setExamStandard(res.data.data)
        } catch (error) {
            console.error('Error fetching eligibility:', error);
        }
    }, [certificateId, EXAMSTANDARD]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Wrapper>
            <Title>📖시험 내용</Title>
            {examStandard?.link && (
                <SubWrapper>
                    <SubTitle>관련 주소 링크</SubTitle>
                    <Condition>
                        <a href={examStandard.link} target="_blank" rel="noopener noreferrer">{examStandard.link}</a>
                    </Condition>
                </SubWrapper>
            )}
            {examStandard?.subject && (
                <Table>
                    <thead>
                        <tr>
                            <th>Chapter</th>
                            <th>Unit</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examStandard.subject.map((subject, subjectIdx) => (
                            subject.unit.map((unit, unitIdx) => (
                                <tr key={`${subjectIdx}-${unitIdx}`}>
                                    <td>{subject.chapter}</td>
                                    <td>{unit.detail.join(', ')}</td>
                                    <td>
                                        {unit.detail.map((detail, detailIdx) => (
                                            <p key={detailIdx}>• {detail}</p>
                                        ))}
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </Table>
            )}
        </Wrapper>
    );
}

export default ExamStandard;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 50px;
`;

const Table = styled.table`
    width: 70%;
    margin-top: 20px;
    margin-left: 15%;
    border-collapse: collapse;
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
        line-height: 23px;
    }
    th {
        background-color: #f4f4f4;
        text-align: center;
    }
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
