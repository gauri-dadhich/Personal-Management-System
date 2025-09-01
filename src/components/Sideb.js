// import React,{useEffect, useState} from "react";
// import { NavLink } from "react-router-dom";
// import './Sideb.css';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
// import { setSelectionRange } from "@testing-library/user-event/dist/utils";


// function Sidebar() {
//     const [isSidebaropen, setsidebaropen] = useState(true);
    
//         useEffect(()=>{

//             // if (window.innerWidth <= 768) {
//             //     setsidebaropen(false);
//             // }else{
//             //     setsidebaropen(true);
//             // }
//             const handleResize=()=>{
//                 if(window.innerWidth<=768){
//                     setsidebaropen(false);
//                 }else{
//                     setsidebaropen(true);
//                 }
//             };
//  window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//         const toggleSidebar=()=>{
//            setsidebaropen(prev=>!prev);
//             };
      


//     const handleNavClick = () => {
//         if (window.innerWidth <= 768) setsidebaropen(false);
//     };

//     return (
//         <>
//             <div className="hamburger-menu" onClick={toggleSidebar}>
//                 <FontAwesomeIcon icon={faBars} />
//             </div>
//             <div className={`sidebar${isSidebaropen ? 'active' : 'hidden'}`}>
//                 <div className="logo">
//                     <img src="/to-do-list.gif" alt="todo" />
//                     <h2>Say-Ur-Day</h2>
//                 </div>
//                 <ul>
//                     <nav className="NavLinks">
//                         {/* <li>  <NavLink to='/Home'>Home</NavLink></li> */}
//                         <li>  <NavLink to='/Main' onClick={handleNavClick}>Task To-D-o/a/y</NavLink></li>
//                         <li>  <NavLink to='/Diary' onClick={handleNavClick}>Diary</NavLink></li>
//                         <li>  <NavLink to='/Calendar' onClick={handleNavClick}>Calendar</NavLink></li>
//                         <li>  <NavLink to='/Fuel' onClick={handleNavClick}>Fuel-Up</NavLink></li>
//                     </nav>
//                 </ul>
//             </div>
//         </>
//     );
// }
// export default Sidebar;
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
            setSidebarOpen(!mobile);
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
            {isMobile && (
                <div className="hamburger-menu" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            )}
            <div className={`sidebar ${isSidebarOpen ? 'active' : 'hidden'}`}>
                <div className="logo">
                    <img src="/to-do-list.gif" alt="todo" />
                    <h2>Say-Ur-Day</h2>
                </div>
                <ul>
                    <nav className="NavLinks">
                        <li><NavLink to='/Main' onClick={handleNavClick}>Task To-D-o/a/y</NavLink></li>
                        <li><NavLink to='/Diary' onClick={handleNavClick}>Diary</NavLink></li>
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
