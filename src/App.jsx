import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./routes/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"
import Login from "./routes/Login"
import Join from "./routes/Join"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import Profile from "./routes/Profile"
import Challenge from "./routes/Challenge"
import ScrollToTop from "./components/ScrollToTop"
import CheckInterest from "./routes/CheckInterest"
import JoinChallenge from "./routes/JoinChallenge"
import Search from "./routes/Search"
import ChangeUserInfo from "./routes/ChangeUserInfo"
import ErrorPage from "./routes/ErrorPage"
import Certificate from "./routes/Certificate"

const router = createBrowserRouter([
  // 로그인 없이 접근할 수 있는 페이지
  // ScrollToTop => useNavigate를 통해 이동시 이동 전 페이지의 스크롤 위치 그대로 다음 페이지로 이동하는 이슈 해결
  {
    path: "/",
    element: <>
              <ScrollToTop />
              <Layout />
            </>,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/join",
        element: <Join />
      },
    ]
  },
  // 로그인이 필요한 페이지. ProtectedRoute를 통해 token 여부 검사.
  {
    path: "/",
    element: <ProtectedRoute>
              <ScrollToTop />
              <Layout />
            </ProtectedRoute>,
    children: [
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "checkinterest",
        element: <CheckInterest />
      },
      {
        path: "changeuserinfo",
        element: <ChangeUserInfo />
      },
    ]
  },
  // challenge param
  {
    path: "/challenge",
    element: <ProtectedRoute>
              <ScrollToTop />
              <Layout />
            </ProtectedRoute>,
    children: [
      {
        path: ":challengeId",
        element: <Challenge />
      },
    ]
  },
  // challenge param
  {
    path: "/joinchallenge",
    element: <ProtectedRoute>
              <ScrollToTop />
              <Layout />
            </ProtectedRoute>,
    children: [
      {
        path: ":challengeId",
        element: <JoinChallenge />
      },
    ]
  },
  // certificate param
  {
    path: "/certificate",
    element: <>
              <ScrollToTop />
              <Layout />
            </>,
    children: [
      {
        path: ":certificateId",
        element: <Certificate />
      },
    ]
  },
  {
    path: "/error",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <ErrorPage />
      }
    ]
  }
])

function App() {

  return (
    <Wrapper>
      <GlobalStyles />
      <RouterProvider router={router} />
    </Wrapper>
  )
}

export default App

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: white;
    color: black;
    font-family: "Jua", sans-serif;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
