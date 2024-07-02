import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { AuthApi } from './UserApi';
import { FaSearch } from "react-icons/fa";
import { userStore } from './UserStore';

function Layout() {

    const token = localStorage.getItem('token')

    // 로그아웃시 zustand에서 모든 정보 초기화
    // 같은 브라우저 상에서 로그아웃 후 다른 유저로 로그인시 이전 유저의 유저 정보가 나오는 이슈 해결을 위함.
    const {initUserData} = userStore();

    const navigate = useNavigate();

    const [isNavFixed, setIsNavFixed] = useState(false);

    const onLogout = async() => {
        const ok = confirm("정말로 로그아웃 하시겠습니까?");
        if(ok) {
            try {
                // 추후 localStorage 미사용시 zustand로 기능 수정 필요.
                const token = localStorage.getItem('token')
                const LOGOUT = import.meta.env.VITE_USER_LOGOUT
                await AuthApi({token}).post(LOGOUT);
                localStorage.clear();
                initUserData();
                navigate("/login");
            } catch (e) {
                console.error(e);
            }
            
        }
    }

    // 스크롤 시 네비바 상단에 고정되도록.
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0 && !isNavFixed) {
                setIsNavFixed(true);
            } else if (window.scrollY === 0 && isNavFixed) {
                setIsNavFixed(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, [isNavFixed]);

    return (
        <Wrapper>
            {}
            <Nav $isNavFixed={isNavFixed}>
                <Logo>
                    <StyledLink to="/">
                        <LogoImg src='/img/KetutSusilo.png' alt="logo" />
                    </StyledLink>
                </Logo>
                {!token ? 
                        <Menu>
                            <StyledLink to="/login">
                                <MenuItem>
                                    로그인
                                </MenuItem>
                            </StyledLink>
                            <StyledLink to="/join">
                                <MenuItem>
                                    회원가입
                                </MenuItem>
                            </StyledLink>
                            <StyledLink to="/search">
                                <MenuItem>
                                    <FaSearch />
                                </MenuItem>
                            </StyledLink>
                        </Menu>
                    :
                    <Menu>
                        <MenuItem onClick={onLogout}>
                            로그아웃
                        </MenuItem>
                        <StyledLink to="/profile">
                            <MenuItem>
                                내 정보
                            </MenuItem>
                        </StyledLink>
                        <StyledLink to="/search">
                            <MenuItem>
                                <FaSearch />
                            </MenuItem>
                        </StyledLink>
                    </Menu>
                }
            </Nav>
            <Outlet />
        </Wrapper>
    )
}

export default Layout

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const Nav = styled.div`
    height: 70px;
    background-color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: ${props => props.$isNavFixed ? 'fixed' : 'static'};
    top: 0;
    z-index: 999;
    box-shadow: ${props => props.$isNavFixed ? '0px 8px 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const Logo = styled.div`
    display: flex;
    margin-left: 20px;
`;

const LogoImg = styled.img`
    height: 50px;
`;

const Menu = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 0 20px;
    gap: 20px;
`;

const MenuItem = styled.div`
    font-size: 17px;
    font-weight: 300;
    cursor: pointer;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;