import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import axios from "axios";
import GithubButton from "../components/GithubButton";

export default function Join() {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm(); // useForm에 제네릭으로 FormData 지정
    const [error, setError] = useState("");

    const onSubmit = async (data) => { // onSubmit 함수의 매개변수 타입을 FormData로 지정
        setError("");
        console.log(data)
        if (isLoading) return;
        try {
            setLoading(true);
            const { nickname, email, password } = data;

            const response = await axios.post('http://52.78.44.47/api/v1/public/join', {
                email,
                nickname,
                password,
            });

            if (response.status !== 200) {
                throw new Error(response.data.message || 'Failed to create account');
            }

            // redirect to the home page     
            navigate("/");   
        } catch (e) {
            if (axios.isAxiosError(e) && e.response) {
                // Axios-specific error handling
                setError(e.response.data.message || 'Failed to create account');
                console.log(e)
            } else {
                // Generic error handling
                setError(e.message);
                console.log(e)
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <Title>🚀 Join 🚀</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register("nickname", { required: true })} placeholder="Nickname" type="text" />
                <Input {...register("email", { required: true })} placeholder="Email" type="email" />
                <Input {...register("password", { required: true })} placeholder="Password" type="password" />
                <Input type="submit" value={isLoading ? "Loading..." : "Create Account"} />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Already have an account? 
                <Link to="/login">Log in &rarr;</Link>
            </Switcher>
            <GithubButton />
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
