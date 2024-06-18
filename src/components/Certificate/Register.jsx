import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import styled from "styled-components";

function Register({certificateId}) {

    Register.propTypes = {
        certificateId: PropTypes.string.isRequired
    }

    const numberId = Number(certificateId)

    const [register, setRegister] = useState([])

    const fetchData = useCallback(async () => {
        try {
            const res = await axios.get(`http://52.78.44.47/api/v1/certificate/register/all`);
            setRegister(res.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData])
    

    const filteredData = register.filter(item => item.certificateId === numberId);
    
    console.log(filteredData)

    
    return (
        <Wrapper>
            <Title>🕗 시험 일정</Title>
            <Table>
                <thead>
                    <tr>
                        <Th>회차</Th>
                        <Th>시험 유형</Th>
                        <Th>접수일</Th>
                        <Th>시험일</Th>
                        <Th>결과 발표</Th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.round}</Td>
                            <Td>{item.type}</Td>
                            <Td>{`${item.receptionStart} - ${item.receptionEnd}`}</Td>
                            <Td>{item.testDay}</Td>
                            <Td>{item.resultDay}</Td>
                        </Tr>
                    ))}
                </tbody>
            </Table>
        </Wrapper>
    )
}

export default Register

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 0 auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

const Th = styled.th`
    padding: 12px;
    background-color: #f2f2f2;
    color: #333;
    border: 1px solid #ddd;
    font-weight: 600;
`;

const Td = styled.td`
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
`;

const Tr = styled.tr``;

const Title = styled.h1`
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 30px;
`;