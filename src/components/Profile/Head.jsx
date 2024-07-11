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
    const { userInfo } = userStore();
    const navigate = useNavigate();

    const [profileImage, setProfileImgUrl] = useState(userInfo.data.profileImage);

    const handleFileInput = (e) => {
        // 파일 규격 제한 걸기
        uploadFile(e.target.files[0]);
    };

    // 같은 filePath로 업로드할 시 업로드 후 같은 s3 버킷의 url 주소로 새로 업로드된 s3의 이미지 파일을 가져오지 못하고 이전 이미지를 가져오는 이슈 발생.
    // s3 버킷의 효율적인 활용을 위해 같은 filePath로 덮어 쓰려 했지만 위의 이슈 발생으로 실패.
    // 업로드 시간을 파일명에 포험시키고 따로 저장하여 이슈 해결.
    // 추후 이전 파일을 삭제 후 새로운 파일을 업로드하는 식으로 변경해볼 것 => timestamp 사용은 그대로 하는 것이 더욱 안정적일 것으로 예상됨.
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
                    프로필 수정
                </EditButton>
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
    border: 4px solid #5f5f5f;
    background-color: #ffffff;
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
    font-size: 18px;
    font-weight: 600;
    margin-top: 10px;
    background-color: #4e4e4e;
    border: none;
    border-radius: 5px;
    color: #ececec;
    padding: 10px;
    /* box-shadow: 5px 5px 10px grey; */
    cursor: pointer;
    &:hover {
        background-color: #ff0173;
    }
`;

