import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { AuthApi } from './UserApi';
import { FaSearch } from "react-icons/fa";

function Layout() {

    const navigate = useNavigate();
    const [isNavFixed, setIsNavFixed] = useState(false);
    const onLogout = async() => {
        const ok = confirm("정말로 로그아웃 하시겠습니까?");
        if(ok) {
            try {
                await AuthApi.post("http://52.78.44.47/api/v1/logout");
                localStorage.clear();
                navigate("/login")
            } catch (e) {
                console.error(e);
            }
            
        }
    }
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
            <Nav $isNavFixed={isNavFixed}>
                <Logo>
                    <StyledLink to="/">
                        🚀 따자IT
                    </StyledLink>
                </Logo>
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
    font-size: 25px;
    font-weight: 600;
    align-items: center;
    padding: 0 20px;
    margin-left: 10px;
`;

const Menu = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    padding: 0 20px;
    gap: 20px;
`;

const MenuItem = styled.div`
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;