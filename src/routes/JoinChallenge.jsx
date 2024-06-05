import styled from "styled-components"
import { useEffect } from "react";
import { userStore } from "../components/UserStore";
import LoadingScreen from "../components/LoadingScreen";
import JoinBody from "../components/Challenge/JoinBody";
import JoinHead from "../components/Challenge/JoinHead";

function JoinChallenge() {
    const { isLoading, fetchUserData } = userStore();

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);
    

    return (
        <Wrapper>
            {isLoading ? <LoadingScreen /> : 
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