// Head.js
import styled from "styled-components";
import { userStore } from "../UserStore";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../UserApi";

function Head() {

    const token = localStorage.getItem('token');

    const { userInfo, initUserData } = userStore();
    const navigate = useNavigate();

    const onEditClick = () => {
        navigate('/changeuserinfo')
    }

    const onDeleteClick = async () => {
        const userId = localStorage.getItem('userId');
        const ok = confirm("정말로 아이디를 삭제하시겠습니까?");
        if (ok) {
            try {
                await AuthApi({token}).delete(`/api/v1/user/delete/${userId}`, {
                    userId,
                })
                localStorage.clear();
                initUserData();
                navigate('/login');
            } catch (e) {
                console.log(e)
                navigate('/error', {state: {error: e.message}})
            }
        }
    }

    return (
        <Wrapper>
            <Photo src="/img/쉽지않네.png" alt="profile photo" />
            <Name>{userInfo.data.nickname}</Name>
            <ButtonWrapper>
                <EditButton onClick={onEditClick}>
                    수정
                </EditButton>
                <DeleteButton onClick={onDeleteClick}>
                    탈퇴
                </DeleteButton>
            </ButtonWrapper>
        </Wrapper>
    )
}

export default Head;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #12c2e9;
    background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);  
    background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9); 
    width: 100%;
    gap: 20px;
    padding: 40px;
`;

const Photo = styled.img`
    border-radius: 100%;
    border: 6px solid white;
    width: 150px;
    height: 150px;
    box-shadow: 0 5px 20px;
    transition: transform 0.3s ease-in-out;
    &:hover {
        transform: scale(1.08);
    }
`;

const Name = styled.h1`
    font-weight: 900;
    font-size: 45px;
    color: white;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 30px;
`;

const EditButton = styled.button`
    font-size: 25px;
    font-weight: 600;
    margin-top: 10px;
    background-color: #26bd26;
    border: none;
    border-radius: 5px;
    color: white;
    box-shadow: 5px 5px 10px grey;
    cursor: pointer;
    &:hover {
        background-color: #4dcf4d;
    }
`;

const DeleteButton = styled.button`
    font-size: 25px;
    font-weight: 600;
    margin-top: 10px;
    background-color: #d9534f; 
    border: none;
    border-radius: 5px;
    color: white;
    box-shadow: 5px 5px 10px grey;
    cursor: pointer;
    &:hover {
        background-color: #c9302c; 
    }
`;

