import styled from "styled-components"
import CheckChallenges from "../components/Profile/CheckChallenges"
import Head from "../components/Profile/Head"

function Profile() {
    return (
        <Wrapper>
            <Head />
            <CheckChallenges />
        </Wrapper>
    )
}

export default Profile

const Wrapper = styled.div`
    width: 100%;
    height: 4000px;
`;