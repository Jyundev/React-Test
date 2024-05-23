import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
import { auth } from "../filebase";
import styled from "styled-components";
import GithubButton from "../components/GithubButton";


export default function Join() {

    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const { register, handleSubmit } = useForm(); // useForm에 제네릭으로 FormData 지정
    const [error, setError] = useState("");

    const onSubmit = async (data) => { // onSubmit 함수의 매개변수 타입을 FormData로 지정
        setError("");
        if (isLoading) return;
        try {
            setLoading(true);
            const { name, email, password } = data;
            // create an account
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            // set the name of the user
            await updateProfile(credentials.user, {
                displayName: name,
            });
            // redirect to the home page     
            navigate("/");   
        } catch(e) {
            // setError
            if (e instanceof FirebaseError) {
                setError(e.message);
            }
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <Wrapper>
            <Title>🚀 Join 🚀</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input {...register("name", { required: true })} placeholder="Name" type="text" />
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
