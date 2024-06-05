import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const SidebarWrapper = styled.div`
    width: 100%;
    background-color: rgb(20, 20, 63);
    padding: 15px 0px 15px 0px;
    text-align: right;
    margin-right: 0%; /* 우측 마진을 auto로 설정하여 왼쪽 끝으로 이동 */
`

const SidebarMenu = styled.span`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`
const SidebarLink = styled(Link)`
    color: white;
    margin: 20px;
    text-decoration: none;
    font-size: 18px;
    transition: font-size 0.2s;

    &:hover {
        font-size: 20px;
    }

`
const SideBar = () => {
  
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    const handleMenuClick = () => {
        setIsOpen(false);
    }
    return (
    <SidebarWrapper>

            <FontAwesomeIcon icon={faBars} size="2x" onClick={toggleMenu} />
            {isOpen && (
                
                <SidebarMenu>
                    <Link className="navbarMenu" id="umcmovie" to={'/'} onClick={handleMenuClick}>UMC MOVIE</Link>
                    <Link className="navbarMenu" to={'/signup'} onClick={handleMenuClick}>회원가입</Link>           
                    <Link className="navbarMenu" to={'/login'} onClick={handleMenuClick}>로그인</Link>
                    <Link className="navbarMenu" to={'/nowplaying'} onClick={handleMenuClick}>Now Playing</Link>
                    <Link className="navbarMenu" to={'/toprated'} onClick={handleMenuClick}>Top Rated</Link>
                    <Link className="navbarMenu" to={'/popular'} onClick={handleMenuClick}>Popular</Link>
                    <Link className="navbarMenu" to={'/upcoming'} onClick={handleMenuClick}>UpComing</Link>
                    
                </SidebarMenu>
            )
            }
        
    </SidebarWrapper>
  )
}

export default SideBar