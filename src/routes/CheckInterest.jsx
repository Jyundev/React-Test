import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AuthApi } from '../components/UserApi';
import { useNavigate } from 'react-router-dom';

function CheckInterest() {

    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(false);

    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        console.log(data); // 여기서 양식 데이터를 처리합니다.
        if (isLoading) return;
        try {
            setLoading(true);
            const  {job, interest, qualifiedCertificate } = data;
            const response = await AuthApi.put('/api/v1/user/do@g.com', {
                job,
                interest,
                qualifiedCertificate
            });
            console.log(response)
            navigate('/');
        } catch (e) {
            alert(e.response ? e.response.data.message : "An error occurred. Please try again.")
        } finally {
            setLoading(false);
        }
    };

    const job = ["학생", "취준생", "직장인"];
    const interest = ['정보보안', '네트워크', '운영체제'];
    const qualifiedCertificate = ['정보처리기사', '리눅스마스터', 'ADsP', 'SQLd']

    return (
        <Wrapper>
            <Title>입력해주세요😎</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Check>
                    <Subtitle>직업</Subtitle>
                    <CheckList >
                        {job.map((data) => (
                                <InputWrapper  key={data}>
                                    <Input
                                        type="checkbox"
                                        value={data}
                                        id={data}
                                        {...register('job', {required: true})}
                                    />
                                    <Label htmlFor={data}>{data}</Label>
                                </InputWrapper>
                        ))}
                    </CheckList>
                </Check>
                <Check>
                    <Subtitle>관심분야</Subtitle>
                    <CheckList >
                        {interest.map((data) => (
                                <InputWrapper  key={data}>
                                    <Input
                                        type="checkbox"
                                        value={data}
                                        id={data}
                                        {...register('interest', {required: true})}
                                    />
                                    <Label htmlFor={data}>{data}</Label>
                                </InputWrapper>
                        ))}
                    </CheckList>
                </Check>
                <Check>
                    <Subtitle>취득 자격증</Subtitle>
                    <CheckList >
                        {qualifiedCertificate.map((data) => (
                                <InputWrapper  key={data}>
                                    <Input
                                        type="checkbox"
                                        value={data}
                                        id={data}
                                        {...register('qualifiedCertificate', {required: true})}
                                    />
                                    <Label htmlFor={data}>{data}</Label>
                                </InputWrapper>
                        ))}
                    </CheckList>
                </Check>
                <input type="submit" value={isLoading ? "Loading..." : "저장"} />
            </Form>
        </Wrapper>
    );
}

export default CheckInterest;

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    width: 70vw;
    padding: 50px 0px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
    font-size: 35px;
    font-weight: 300;
    padding: 20px;
    margin-bottom: 40px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 70%;
`;

const Check = styled.div`
    display: grid;
    grid-template-columns: 2fr 3fr;
    align-items: center;
    width: 100%;
`;

const Subtitle = styled.h2`
    font-size: 20px;
    padding: 10px;
    width: 60%;
    display: flex;
    justify-content: flex-start;
`;

const CheckList = styled.div`
    display: flex;
    padding: 10px;
    gap: 10px;
    flex-wrap: wrap;
`;

const Label = styled.label`
    background-color: #2898e3;
    border-radius: 60px;
    width: fit-content;
    white-space: nowrap;
    padding: 8px;
    &:hover {
        background-color: #6cc4ff;
    }
`;

const InputWrapper = styled.div`
    cursor: pointer;
    color: white;
    font-weight: 600;
    font-size: 15px;
    border-radius: 60px;
    text-align: center;
    padding: 10px;
    width: fit-content;
    white-space: nowrap;
`;

const Input = styled.input`
    display: none;
    &:checked + label {
        border: 3px solid black;
    }
`;

