import styled from "styled-components";
import PropTypes from 'prop-types';

function Table({certificate}) {

    Table.propTypes = {
        certificate: PropTypes.object.isRequired,
    };
    
    return (
        <TableWrapper>
            <tbody>
                <Tr>
                    <Th>자격증 종류</Th>
                    <Td>{certificate.field}</Td>
                    <Th>시험 타입</Th>
                    <Td>{certificate.type}</Td>
                </Tr>
                <Tr>
                    <Th>난이도</Th>
                    <Td>{certificate.difficulty}</Td>
                    <Th>홈페이지</Th>
                    <Td><a href={certificate.registrationLink} target="_blank" rel="noopener noreferrer">{certificate.registrationLink}</a></Td>
                </Tr>
            </tbody>
        </TableWrapper>
    )
}

export default Table

const TableWrapper = styled.table`
    width: 60%;
    margin: 20px auto;
    border-collapse: collapse;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Tr = styled.tr`
`;

const Th = styled.th`
    padding: 12px;
    background-color: #f2f2f2;
    color: #333;
    border: 1px solid #ddd;
    font-weight: 600;
    width: 25%;
`;

const Td = styled.td`
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
    width: 25%;
`;