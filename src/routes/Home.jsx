import styled from "styled-components";
import Information from "../components/Home/information";
import Recommend from "../components/Home/recommend";

function Home() {
  return (
    <Wrapper>
      <Information />
      <Recommend />
    </Wrapper>

  )
}

export default Home

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 60px;
`;