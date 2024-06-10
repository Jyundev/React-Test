import styled from "styled-components"
import Head from "../components/Challenge/Head";
import Body from "../components/Challenge/Body";
import { useEffect } from "react";
import { userStore } from "../components/UserStore";
import LoadingScreen from "../components/LoadingScreen";
import { useParams } from "react-router-dom";

function Challenge() {
    const { fetchUserDataLoading, fetchUserData, fetchChallengeData, fetchChallengeDataLoading } = userStore();

    const { challengeId } = useParams();

    useEffect(() => {
        fetchUserData();
        fetchChallengeData({ challengeId }); 
    }, [fetchUserData, fetchChallengeData, challengeId]);

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
