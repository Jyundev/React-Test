import styled from "styled-components"
import Head from "../components/Challenge/Head";
import Body from "../components/Challenge/Body";

function Challenge() {
    return (
        <Wrapper>
            <Head />
            <Body />
        </Wrapper>
    )
}

export default Challenge

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;