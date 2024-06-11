import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

function Test() {

    const [userData, setUserData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://52.78.44.47/api/v1/certificate/calandar');
            setUserData(response.data)
        }
        fetchData();
    }, []);
    console.log(userData)

    const userId = localStorage.getItem('userId');
    console.log(userId)

    const [preview, setPreview] = useState(null)

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <Form>
                <InputWrapper>
                    <Input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <Label htmlFor="fileInput">이미지 선택</Label>
                </InputWrapper>
                {preview && <PreviewImage src={preview} alt="이미지 미리보기" />}
            </Form>
            <div>
                <img src={'https://ddajait-db-s3.s3.ap-northeast-2.amazonaws.com/image/question/%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC%EA%B4%80%EB%A6%AC%EC%82%AC1%EA%B8%8920220410/image/10.png'} alt='img' />
            </div>
        </>
    );
}

export default Test;

const Form = styled.form``;

const Label = styled.label`
    background-color: #2898e3;
    border-radius: 60px;
    width: fit-content;
    white-space: nowrap;
    padding: 8px;
    transition: all 0.3s ease-in-out;
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
`;

const PreviewImage = styled.img`
    margin-top: 20px;
    max-width: 100%;
    max-height: 300px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;