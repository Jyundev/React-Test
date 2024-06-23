import styled from "styled-components";
import Information from "../components/Home/information";
import Recommend from "../components/Home/recommend";
import { userStore } from "../components/UserStore";
import { useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import HotRecommend from "../components/Home/hotRecommend";
import CerfiticateRow from "../components/Home/certificate";

function Home() {

  const { fetchUserDataLoading, fetchUserData } = userStore();

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);


  return (
    <Wrapper>
    {fetchUserDataLoading ? <LoadingScreen /> : 
        <>
            <Information />
            <CerfiticateRow />
            <Recommend />
            <HotRecommend />
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
  margin-bottom: 100px;
`;