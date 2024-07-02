import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { JoinApi } from "../components/UserApi";
import axios from "axios";


export default function Join() {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const onSubmit = async (data) => {
        setError("");
        if (isLoading) return;
        try {
            setLoading(true);
            const { nickname, email, password } = data;
            const JOIN = import.meta.env.VITE_USER_JOIN
            await JoinApi.post(JOIN, {
                nickname,
                email,
                password
            });
            const username = email
            const AUTHENTICATE = import.meta.env.VITE_AUTHENTICATE
            const response = await axios.post(AUTHENTICATE, {
                username,
                password
            });
            // 회원가입과 동시에 로그인 되도록 처리
            // 추후 localStorage가 아니라 zustand에 token과 userId 정보를 저장하도록 바꿔야 함. 
            // localStorage 사용시 브라우저가 종료되고 나서도 정보가 그대로 남아 있는 이슈 발생.
            if (response.status === 200) {
                localStorage.clear();
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.headers.user_id);
                //관심사 수집 페이지로 이동
                navigate("/checkinterest");
            } else {
                alert(response ? response.data.message : "Login failed. Please try again.")
            }
        } catch(e) {
            // setError
            setError(e.response ? e.response.data.message : "An error occurred. Please try again.");
        }
        finally {
            setLoading(false)
        }
    };
    

    return (
        <Wrapper>
            <Title>회원 가입</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register("nickname", { required: true })} placeholder="Name" type="text" />
                <Input {...register("email", { required: true })} placeholder="Email" type="email" />
                <Input {...register("password", { required: true })} placeholder="Password" type="password" />
                <Input type="submit" value={isLoading ? "Loading..." : "계정 생성"} />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                계정이 있으신가요? 
                <Link to="/login"> 로그인 &rarr;</Link>
            </Switcher>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    width: 420px;
    padding: 50px 0px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
    font-size: 42px;
`;

const Form = styled.form`
    margin-top: 50px;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 90%;
`;

const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    font-size: 16px;
    &[type="submit"] {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
`;

const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;

const Switcher = styled.span`
    margin-top: 20px;
    a {
        color: #1d9bf0;
    }
`;
