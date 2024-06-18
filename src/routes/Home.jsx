import styled from "styled-components";
import Information from "../components/Home/information";
import Recommend from "../components/Home/recommend";
import { userStore } from "../components/UserStore";
import { useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";

function Home() {

  const { fetchUserDataLoading, fetchUserData, userInfo } = userStore();

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    console.log(userInfo);


  return (
    <Wrapper>
    {fetchUserDataLoading ? <LoadingScreen /> : 
        <>
            <Information />
            <Recommend />
        </>
    }
      
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