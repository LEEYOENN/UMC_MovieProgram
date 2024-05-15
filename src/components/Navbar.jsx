import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import './Nav.css'
import 'normalize.css'

function Nav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginClick = () => {
        setIsLoggedIn(true);
    }

    const handleLogoutClick = () => {
        setIsLoggedIn(false);
    }
    const handleMenuClick = (e) => {
        const menuItems = document.querySelectorAll('.navbarMenu');
        menuItems.forEach(item => item.classList.remove('clicked'));
        e.target.classList.add('clicked');
    }
    return (
        <div>
            <div className="navbar">
                <Link className="navbarMenu" id="umcmovie" to={'/'} onClick={handleMenuClick}>UMC MOVIE</Link>
            {/* {isLoggedIn ? (
                    <Link className="navbarMenu" onClick={handleLogoutClick}>Logout</Link>
                ) : (
                    <Link className="navbarMenu" onClick={handleLoginClick}>Login</Link>
                )} */}
                <Link className="navbarMenu" to={'/signup'} onClick={handleMenuClick}>회원가입</Link>           
                <Link className="navbarMenu" to={'/nowplaying'} onClick={handleMenuClick}>Now Playing</Link>
                <Link className="navbarMenu" to={'/toprated'} onClick={handleMenuClick}>Top Rated</Link>
                <Link className="navbarMenu" to={'/popular'} onClick={handleMenuClick}>Popular</Link>
                <Link className="navbarMenu" to={'/upcoming'} onClick={handleMenuClick}>UpComing</Link>
            </div>
        </div>
    )
}
export default Nav