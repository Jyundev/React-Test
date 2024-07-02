// Profile.js
import styled from "styled-components";
import CheckChallenges from "../components/Profile/CheckChallenges";
import Head from "../components/Profile/Head";
import LoadingScreen from "../components/LoadingScreen";
import { useEffect } from "react";
import { userStore } from "../components/UserStore";
import UserInfo from "../components/Profile/UserInfo";
import Memo from "../components/Profile/Memo";

function Profile() {

    // fetchUserData는 home에서 한 번 이뤄졌으니 여기서도 꼭 해야 하는지 다시 검토해볼 것.
    const { fetchUserDataLoading, fetchUserData, fetchChallengeList, fetchChalengeListLoading, userInfo } = userStore();

    useEffect(() => {
        fetchUserData();
        fetchChallengeList();
    }, [fetchUserData, fetchChallengeList]);

    if (!userInfo) return (<div>loading...</div>)
    
    return (
        <Wrapper>
            {fetchUserDataLoading | fetchChalengeListLoading ? <LoadingScreen /> : 
                <>
                    <Head />
                    <UserInfo />
                    <CheckChallenges />
                    <Memo />
                </>
            }
        </Wrapper>
    )
}

export default Profile;

const Wrapper = styled.div`
    width: 100%;
    margin-bottom: 100px;
`;
