import styled from "styled-components"
import {  useEffect } from "react";
import { userStore } from "../components/UserStore";
import LoadingScreen from "../components/LoadingScreen";
import JoinBody from "../components/Challenge/JoinBody";
import JoinHead from "../components/Challenge/JoinHead";
import { useParams } from "react-router-dom";

function JoinChallenge() {

    const {challengeId} = useParams();

    const { fetchUserDataLoading, fetchUserData  } = userStore();


    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);
    

    return (
        <Wrapper>
            {fetchUserDataLoading ? <LoadingScreen /> : 
                <>
                    <JoinHead />
                    <JoinBody />
                </>
            }
        </Wrapper>
    )
}

export default JoinChallenge

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;