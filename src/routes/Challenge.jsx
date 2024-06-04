import styled from "styled-components"
import Head from "../components/Challenge/Head";
import Body from "../components/Challenge/Body";
import { useEffect } from "react";
import { userStore } from "../components/UserStore";
import LoadingScreen from "../components/LoadingScreen";

function Challenge() {
    const { isLoading, fetchUserData } = userStore();

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);
    

    return (
        <Wrapper>
            {isLoading ? <LoadingScreen /> : 
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