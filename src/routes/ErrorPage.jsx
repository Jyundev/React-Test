import { useLocation } from "react-router-dom"
import styled from "styled-components"

function ErrorPage() {

    const location = useLocation();

    const { state } = location;
    const error = state?.error;

    return (
        <Wrapper>
            <Title>에러가 발생했어요😶</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Wrapper>
    )
}

export default ErrorPage

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px;
`;

const Title = styled.h1`
    font-size: 30px;
    font-weight: 600;
`;

const ErrorMessage = styled.p`
    font-size: 20px;
    color: red;
`;