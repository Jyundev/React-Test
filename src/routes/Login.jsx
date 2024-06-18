import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

function LoginTest() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const onSubmit = async (data) => {
        setError("");
        if (isLoading) return;
        try {
            setLoading(true);
            const { username, password } = data;
            const AUTHENTICATE = import.meta.env.VITE_AUTHENTICATE
            const response = await axios.post(AUTHENTICATE, {
                username,
                password
            })
            if (response.status === 200) {
                localStorage.clear();
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.headers.user_id);
                navigate("/");
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (e) {
            setError(e.response ? e.response.data.message : "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Wrapper>
            <Title>🚀 Log in 🚀</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register("username", {required: true})} placeholder="Email" type="email" />
                <Input {...register("password", {required: true})} placeholder="Password" type="password" />
                <Input type="submit" value={isLoading ? "Loading..." : "Login"} />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Don&apos;t have an account? {/* '를 &apos; 로 대체합니다. */}
                <Link to="/join">Create one &rarr;</Link>
            </Switcher>
        </Wrapper>
    );
}

export default LoginTest;

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