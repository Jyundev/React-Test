import styled from "styled-components";
import { userStore } from "../UserStore";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../UserApi";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { useCallback, useEffect, useState } from "react";

const S3_BUCKET = import.meta.env.VITE_S3_BUCKET;
const REGION = import.meta.env.VITE_REGION;
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;
const SECRET_ACCESS_KEY = import.meta.env.VITE_SECRET_ACCESS_KEY;
const UPLOAD_PATH = import.meta.env.VITE_UPLOAD_PATH;

const s3 = new S3Client({
    region: REGION,
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY,
    },
});

function Head() {

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId'); 
    const { userInfo, initUserData } = userStore();
    const navigate = useNavigate();

    const [profileImage, setProfileImgUrl] = useState(userInfo.data.profileImage);

    const handleFileInput = (e) => {
        uploadFile(e.target.files[0]);
    };

    const uploadFile = useCallback(async (file) => {

        const timestamp = new Date().getTime();
        const filePath = `${UPLOAD_PATH}${userId}/${timestamp}`;
        const params = {
            Bucket: S3_BUCKET,
            Key: filePath,
            Body: file,
            ContentType: file.type,
            ACL: 'public-read'
        }

        try {
            const command = new PutObjectCommand(params);
            await s3.send(command);
            const url = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${filePath}`;
            setProfileImgUrl(url);
            console.log('File uploaded successfully:', url);
            alert('File uploaded successfully');
        } catch (err) {
            console.error('Error uploading file:', err);
            alert('Error uploading file');
        } 
    }, [userId]);

    const sendProfileImgUrl = useCallback(async () => {
        try {
            const IMAGE = import.meta.env.VITE_USER_IMAGE
            await AuthApi({token}).put(`${IMAGE}${userId}`, {
                profileImage
            });
        } catch (error) {
            console.log(error);
        }
    }, [token, userId, profileImage]);

    useEffect(() => {
        sendProfileImgUrl();
    }, [profileImage, sendProfileImgUrl,]);

    const onEditClick = () => {
        navigate('/changeuserinfo');
    };

    const onDeleteClick = async () => {
        const DELETE = import.meta.env.VITE_USER_DELETE
        const ok = confirm("정말로 아이디를 삭제하시겠습니까?");
        if (ok) {
            try {
                await AuthApi({token}).delete(`${DELETE}${userId}`);
                localStorage.clear();
                initUserData();
                navigate('/login');
            } catch (e) {
                console.log(e);
                navigate('/error', {state: {error: e.message}});
            }
        }
    };

    return (
        <Wrapper>
            <input
                type="file"
                id="fileUpload"
                style={{ display: 'none' }}
                onChange={handleFileInput}
            />
            <Photo
                src={profileImage}
                alt="profile photo"
                onClick={() => document.getElementById('fileUpload').click()}
            />
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
    );
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
    background-color: grey;
    width: 150px;
    height: 150px;
    box-shadow: 0 5px 20px;
    transition: transform 0.3s ease-in-out;
    cursor: pointer; /* Add cursor pointer to indicate clickability */
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
    font-size: 20px;
    font-weight: 600;
    margin-top: 10px;
    background-color: white;
    border: none;
    border-radius: 5px;
    color: black;
    padding: 7px;
    box-shadow: 5px 5px 10px grey;
    cursor: pointer;
    &:hover {
        background-color: #4dcf4d;
    }
`;

const DeleteButton = styled.button`
    font-size: 20px;
    font-weight: 600;
    margin-top: 10px;
    background-color: white; 
    border: none;
    border-radius: 5px;
    color: black;
    padding: 7px;
    box-shadow: 5px 5px 10px grey;
    cursor: pointer;
    &:hover {
        background-color: #ff5a54; 
    }
`;
