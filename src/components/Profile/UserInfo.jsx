import styled from "styled-components";
import { userStore } from "../UserStore";

function UserInfo() {

    const {userInfo} = userStore();

    return (
        <Table>
            <tbody>
                <Tr>
                    <Th>닉네임</Th>
                    <Td>{userInfo.data.nickname}</Td>
                    <Th>이메일</Th>
                    <Td>{userInfo.data.email}</Td>
                </Tr>
                <Tr>
                    <Th>성별</Th>
                    <Td>{userInfo.data.gender}</Td>
                    <Th>직업</Th>
                    <Td>{userInfo.data.job}</Td>
                </Tr>
                <Tr>
                    <Th>관심 분야</Th>
                    <Td>{userInfo.data.interest.map((interest) => (
                        <p key={interest}>{interest}</p>
                    ))}</Td>
                    <Th></Th>
                    <Td></Td>
                </Tr>
            </tbody>
        </Table>
);
}

export default UserInfo;

const Table = styled.table`
    width: 60%;
    margin: 20px auto;
    border-collapse: collapse;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-top: 80px;
`;

const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #f9f9f9;
    }
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
