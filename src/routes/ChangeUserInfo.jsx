import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { AuthApi } from '../components/UserApi';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../components/UserStore';

function ChangeUserInfo() {

    const { userInfo } = userStore();

    const userId = localStorage.getItem('userId');

    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(false);

    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        console.log(data); // 여기서 양식 데이터를 처리합니다.
        if (isLoading) return;
        try {
            setLoading(true);
            const  {gender, age, job, interest, qualifiedCertificate } = data;
            const USER = import.meta.env.VITE_USER
            await AuthApi({token}).put(USER + userId, {
                age,
                gender,
                job,
                interest,
                qualifiedCertificate
            });
            navigate('/profile');
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
                    <Subtitle>나이</Subtitle>
                    <Age>
                        <AgeInput 
                                type='number' 
                                min={0} 
                                max={120} 
                                placeholder='나이' 
                                defaultValue={userInfo.data.age ? userInfo.data.age : '나이'}
                                {...register('age', {required: true})} 
                        />
                        <label>세</label>
                    </Age>
                </Check>
                <Check>
                    <Subtitle>성별</Subtitle>
                    <Select {...register('gender', {required: true})} defaultValue={userInfo.data.gender ? userInfo.data.gender : '성별'}>
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
                                        defaultChecked={userInfo.data.job}
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
                                        defaultChecked={userInfo.data.interest.includes(data)}
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
                                        defaultChecked = {userInfo.data.qualifiedCertificate.includes(data)}
                                        {...register('qualifiedCertificate', {required: false})}
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

export default ChangeUserInfo;

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
        border: 3px solid blue;
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
`

