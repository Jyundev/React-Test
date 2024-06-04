import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./routes/Home"
import ProtectedRoute from "./components/ProtectedRoute"
import Layout from "./components/Layout"
import Login from "./routes/Login"
import { auth } from "./filebase"
import { useEffect, useState } from "react"
import Join from "./routes/Join"
import LoadingScreen from "./components/LoadingScreen"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import Profile from "./routes/Profile"
import Test from "./routes/Test"
import Challenge from "./routes/Challenge"
import LoginTest from "./routes/LoginTest"
import ScrollToTop from "./components/ScrollToTop"

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute>
              <ScrollToTop />
              <Layout />
            </ProtectedRoute>,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "test",
        element: <Test />
      },
      {
        path: ":challengeId",
        element: <Challenge />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/join",
    element: <Join />
  },
  {
    path: "logintest",
    element: <LoginTest />
  },
])

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async() => {
    await auth.authStateReady();
    setLoading(false);
  }
  
  useEffect(() => {init(), []})

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
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
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;
