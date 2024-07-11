import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AuthApi } from '../components/UserApi';

function CheckInterest() {

    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('token');

    const [isLoading, setLoading] = useState(false);

    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        if (isLoading) return;
        try {
            setLoading(true);
            const  {gender, age, job, interest, qualifiedCertificate } = data;
            const INFO = import.meta.env.VITE_USER_INFO
            await AuthApi({token}).post(INFO + userId, {
                age,
                gender,
                job,
                interest,
                qualifiedCertificate
            });
            // useNavigate 사용시 업데이트된 유저 정보 관련 api를 인식하지 못하고 에러 발생.
            // useNavigate를 이용하면 home의 zustand가 작동하지 않는 것으로 추정됨.
            // 임시대책으로 window.location.href를 통해 페이지에 다시 접근하여 zustand를 새롭게 작동시킴.
            // 여기서 zustand를 동작시키고 useNavigate를 통해 home으로 이동할 수 있는지 시도해볼 것.
            window.location.href = `https://ddajait.com/`;
        } catch (e) {
            alert(e.response ? e.response.data.message : "An error occurred. Please try again.")
        } finally {
            setLoading(false);
        }
    };

    // 넣어 놓은 항목 대로 선택지가 형성됨.
    const job = ["학생", "취준생", "직장인"];
    const interest = ['운영체제', '데이터베이스', '클라우드', '네트워크', '정보보안'];
    const qualifiedCertificate = ['데이터분석준전문가', 'SQL 개발자', '빅데이터분석기사', '정보처리기사', '정보처리산업기사', '정보보안기사', '리눅스마스터 1급', '리눅스마스터 2급', '네트워크관리사 1급', '네트워크관리사 2급']

    // checkbox의 경우 한 가지만 선택할 시 api에 array가 아니라 string으로 값이 넘어가는 이슈 발생
    return (
        <Wrapper>
            <Title>입력해주세요😎</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Check>
                    <Subtitle>나이</Subtitle>
                    <Age>
                        <AgeInput type='number' min={0} max={120} placeholder='나이' {...register('age', {required: true})} />
                        <label>세</label>
                    </Age>
                </Check>
                <Check>
                    <Subtitle>성별</Subtitle>
                    <Select {...register('gender', {required: true})} defaultValue=''>
                        <option value='' disabled>성별</option>
                        <option value='남자'>남</option>
                        <option value='여자'>여</option>
                    </Select>
                </Check>
                <Check>
                    <Subtitle>직업</Subtitle>
                    <CheckList >
                        {job.map((data) => (
                                <InputWrapper  key={data}>
                                    <Input
                                        type="radio"
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
                <SubmitButton type="submit" value={isLoading ? "Loading..." : "저장"} />
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
    margin-bottom: 100px;
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

const Age = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;

const AgeInput = styled.input`
    width: 150px;
    padding: 10px;
    margin-left: 20px;
    font-size: 16px;
    text-align: center;
    border: 2px solid #ccc;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
    transition: border-color 0.3s;
    &:focus {
        border-color: #66afe9;
        outline: none;
        box-shadow: 0 0 5px rgba(102, 175, 233, 0.5);
    }
`;

const Select = styled.select`
    width: 150px;
    padding: 10px;
    margin-left: 20px;
    font-size: 16px;
    text-align: center;
    border: 2px solid #ccc;
    border-radius: 5px;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
    transition: border-color 0.3s;
    &:focus {
        border-color: #66afe9;
        outline: none;
        box-shadow: 0 0 5px rgba(102, 175, 233, 0.5);
    }
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
    font-weight: 300;
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

const SubmitButton = styled.input`
    margin-top: 30px;
    border: 3px solid green;
    width: 100px;
    height: 40px;
    font-size: 20px;
    font-weight: 600;
    background-color: #26bd26;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #4dcf4d;
    }
`;