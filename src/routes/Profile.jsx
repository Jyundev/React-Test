// Profile.js
import styled from "styled-components";
import CheckChallenges from "../components/Profile/CheckChallenges";
import Head from "../components/Profile/Head";
import LoadingScreen from "../components/LoadingScreen";
import { useEffect } from "react";
import { userStore } from "../components/UserStore";

function Profile() {
    const { isLoading, fetchUserData } = userStore();

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    return (
        <Wrapper>
            {isLoading ? <LoadingScreen /> : 
                <>
                    <Head />
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
