import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './Sideb.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Sidebar() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            if (!mobile) setSidebarOpen(true);  // always open on desktop
            else setSidebarOpen(false);          // closed by default on mobile
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => {
        if (isMobile) setSidebarOpen(prev => !prev);
    };

    const handleNavClick = () => {
        if (isMobile) setSidebarOpen(false);
    };

    return (
        <>
            {/* Hamburger — only on mobile */}
            {isMobile && (
                <div className="hamburger-menu" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            )}

            {/* Dark overlay when sidebar is open on mobile */}
            {isMobile && (
                <div
                    className={`sidebar-overlay ${isSidebarOpen ? 'visible' : ''}`}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`sidebar ${isSidebarOpen ? 'active' : 'hidden'}`}>
                <div className="logo">
                    <img src="/to-do-list.gif" alt="todo" />
                    <h2>Say-Ur-Day</h2>
                </div>
                <ul>
                    <nav className="NavLinks">
                        <li><NavLink to='/Main' onClick={handleNavClick}>Task To-D-o/a/y</NavLink></li>
                        <li><NavLink to='/Calendar' onClick={handleNavClick}>Calendar</NavLink></li>
                        <li><NavLink to='/Fuel' onClick={handleNavClick}>Fuel-Up</NavLink></li>
                        <li><NavLink to='/Notes' onClick={handleNavClick}>Notes</NavLink></li>
                    </nav>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;