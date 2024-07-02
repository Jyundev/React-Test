import styled from "styled-components";
import Information from "../components/Home/information";
import Recommend from "../components/Home/recommend";
import { userStore } from "../components/UserStore";
import { useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import HotRecommend from "../components/Home/hotRecommend";
import CerfiticateRow from "../components/Home/certificate";

function Home() {

  // 유저 데이터를 먼저 zustand에 불러와 저장하여 다른 페이지들에서 이용해야 할 데이터들을 미리 준비함.
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