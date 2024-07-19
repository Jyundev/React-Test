import styled from 'styled-components';
import { useState } from 'react';
import { AuthApi } from '../components/UserApi';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../components/UserStore';

function ChangeUserInfo() {

    const { userInfo, initUserData } = userStore();

    const userId = sessionStorage.getItem('userId');

    const token = sessionStorage.getItem('token');

    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(false);

    const [age, setAge] = useState(userInfo.data.age);
    const [gender, setGender] = useState(userInfo.data.gender);
    const [job, setJob] = useState(userInfo.data.job);
    const [interest, setInterest] = useState(userInfo.data.interest);
    const [qualifiedCertificate, setQualifiedCertificate] = useState(userInfo.data.qualifiedCertificate);

    const onChange = (e) => {
        const { target: { name, value, checked } } = e;
        if (name === "age") {
            setAge(value);
        } else if (name === 'gender') {
            setGender(value);
        } else if (name === 'job') {
            setJob(value);
        } else if (name === 'interest') {
            setInterest((prev) => {
                if (checked) {
                    return [...prev, value];
                } else {
                    return prev.filter((item) => item !== value)
                }
            });
        } else if (name === 'qualifiedCertificate') {
            setQualifiedCertificate((prev) => {
                if (checked) {
                    return [...prev, value];
                } else {
                    return prev.filter((item) => item !== value) 
                }
            });
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;
        try {
            setLoading(true);
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

    const onDeleteClick = async () => {
        const DELETE = import.meta.env.VITE_USER_DELETE
        const ok = confirm("정말로 아이디를 삭제하시겠습니까?");
        if (ok) {
            try {
                const res = await AuthApi({token}).delete(`${DELETE}${userId}`);
                sessionStorage.clear();
                initUserData();
                if (res.status === 200) {
                    navigate('/login');
                }
            } catch (e) {
                console.log(e);
                navigate('/error', {state: {error: e.message}});
            }
        }
    };

    const selectJob = ["학생", "취준생", "직장인"];
    const selectInterest = ['운영체제', '데이터베이스', '클라우드', '네트워크', '정보보안'];
    const selectQualifiedCertificate = ['데이터분석준전문가', 'SQL 개발자', '빅데이터분석기사', '정보처리기사', '정보처리산업기사', '정보보안기사', '리눅스마스터 1급', '리눅스마스터 2급', '네트워크관리사 1급', '네트워크관리사 2급']

    return (
        <Wrapper>
            <Title>입력해주세요😎</Title>
            <Form onSubmit={onSubmit}>
                <Check>
                    <Subtitle>나이</Subtitle>
                    <Age>
                        <AgeInput 
                            type='number' 
                            name='age'
                            min={0} 
                            max={120} 
                            placeholder='나이' 
                            required={true} 
                            onChange={onChange}
                            defaultValue={userInfo.data.age ? userInfo.data.age : '나이'}
                        />
                        <label>세</label>
                    </Age>
                </Check>
                <Check>
                    <Subtitle>성별</Subtitle>
                    <Select 
                        defaultValue={userInfo.data.gender ? userInfo.data.gender : '성별'} 
                        required={true} 
                        onChange={onChange} 
                        name='gender' 
                    >
                        <option value='' disabled>성별</option>
                        <option value='남자'>남</option>
                        <option value='여자'>여</option>
                    </Select>
                </Check>
                <Check>
                    <Subtitle>직업</Subtitle>
                    <CheckList >
                        {selectJob.map((data) => (
                                <InputWrapper  key={data}>
                                    <Input
                                        type="radio"
                                        name='job'
                                        value={data}
                                        id={data}
                                        required={true} 
                                        defaultChecked={userInfo.data.job === data}
                                        onChange={onChange}
                                    />
                                    <Label htmlFor={data}>{data}</Label>
                                </InputWrapper>
                        ))}
                    </CheckList>
                </Check>
                <Check>
                    <Subtitle>관심분야</Subtitle>
                    <CheckList >
                        {selectInterest.map((data) => (
                                <InputWrapper  key={data}>
                                    <Input
                                        type="checkbox"
                                        name='interest'
                                        value={data}
                                        id={data}
                                        onChange={onChange}
                                        defaultChecked={userInfo.data.interest.includes(data)}
                                    />
                                    <Label htmlFor={data}>{data}</Label>
                                </InputWrapper>
                        ))}
                    </CheckList>
                </Check>
                <Check>
                    <Subtitle>취득 자격증</Subtitle>
                    <CheckList >
                        {selectQualifiedCertificate.map((data) => (
                                <InputWrapper  key={data}>
                                    <Input
                                        type="checkbox"
                                        name='qualifiedCertificate'
                                        value={data}
                                        id={data}
                                        onChange={onChange}
                                        defaultChecked = {userInfo.data.qualifiedCertificate.includes(data)}
                                    />
                                    <Label htmlFor={data}>{data}</Label>
                                </InputWrapper>
                        ))}
                    </CheckList>
                </Check>
                <SubmitButton type="submit" value={isLoading ? "Loading..." : "저장"} />
            </Form>
                <Delete>
                    <DeleteSpan>만약 탈퇴하고 싶으시다면 저를 눌러주세요...🐯</DeleteSpan>
                    <DeleteButton onClick={onDeleteClick}>😶‍🌫️</DeleteButton>
                </Delete>
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
    margin-bottom: 100px;
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
`;

const Delete = styled.div`
    display: flex;
    flex-direction: column;
    margin: 50px;
    align-items: center;
    border: 1px solid grey;
    border-radius: 10px;
    padding: 10px;
`;

const DeleteSpan = styled.span`
    font-size: 13px;
    font-weight: 600;
`;

const DeleteButton = styled.button`
    display: flex;
    background-color: white;
    width: 25%;
    border: none;
    margin-top: 10px;
    font-size: 40px;
    transition: transform 2s ease-in-out;
    cursor: pointer;
    &:hover {
        transform: scale(1.05);
        text-shadow: 0 0 10px #ff5a54; 
    }
`;


