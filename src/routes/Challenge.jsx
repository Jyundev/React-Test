import styled from "styled-components"
import Head from "../components/Challenge/Head";
import Body from "../components/Challenge/Body";
import { useEffect } from "react";
import { userStore } from "../components/UserStore";
import LoadingScreen from "../components/LoadingScreen";
import { useParams } from "react-router-dom";

function Challenge() {

    //zustand를 통해 해당 챌린지 정보와 유저 정보 저장. 
    // 유저 정보는 home에서 이미 저장 되니 빼보는 것을 검토해볼 것.
    const { fetchUserDataLoading, fetchUserData, fetchChallengeData, fetchChallengeDataLoading } = userStore();

    const { challengeId } = useParams();

    const userId = sessionStorage.getItem('userId');

    useEffect(() => {
        fetchUserData();
        fetchChallengeData({ challengeId, userId }); 
    }, [fetchUserData, fetchChallengeData, challengeId, userId]);

    return (
        <Wrapper>
            {fetchUserDataLoading | fetchChallengeDataLoading ? <LoadingScreen /> : 
                <>
                    <Head />
                    <Body />
                </>
            }
        </Wrapper>
    )
}

export default Challenge

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;
