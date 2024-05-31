import styled from "styled-components"

function Head() {
    return (
        <Wrapper>
            <Photo src="\public\img\쉽지않네.png" alt="profile photo" />
            <Name>user1</Name>
            <Word>
                " 코딩 좋아^^ "
            </Word>
        </Wrapper>
    )
}

export default Head

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #12c2e9;
    background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);  
    background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9); 
    width: 100%;
    gap: 20px;
    padding: 40px;
`;


const Photo = styled.img`
    border-radius: 100%;
    border: 6px solid white;
    width: 150px;
    height: 150px;
    box-shadow: 0 5px 20px;
`;

const Name = styled.h1`
    font-weight: 900;
    font-size: 45px;
    color: white;
`;

const Word = styled.h2`
    font-size: 25px;
    font-weight: 600;
    color: white;
    margin-top: 10px;
`;