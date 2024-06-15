// Profile.js
import styled from "styled-components";
import CheckChallenges from "../components/Profile/CheckChallenges";
import Head from "../components/Profile/Head";
import LoadingScreen from "../components/LoadingScreen";
import { useEffect } from "react";
import { userStore } from "../components/UserStore";
import UserInfo from "../components/Profile/UserInfo";

function Profile() {
    const { fetchUserDataLoading, fetchUserData } = userStore();

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);
    
    return (
        <Wrapper>
            {fetchUserDataLoading ? <LoadingScreen /> : 
                <>
                    <Head />
                    <UserInfo />
                    <CheckChallenges />
                </>
            }
        </Wrapper>
    )
}

export default Profile;

const Wrapper = styled.div`
    width: 100%;
    height: 4000px;
`;
