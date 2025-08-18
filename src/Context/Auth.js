import React,{useState,createContext,useContext} from "react";
import { BrowserRouter,Routes,Route,Link,useNavigate,Navigate } from "react-router-dom";
const Authcontext=createContext(null);
export const AuthProvider=({children})=>{
    const [isloggedin,setloggedin]=useState(false);
    const login=(email,password)=>{setloggedin(true)};
    const logout=()=>{setloggedin(false)};
const signup=(userData)=>{
    alert("user signed in succefully");
    setloggedin(true);
}


return(
    <Authcontext.Provider value={{isloggedin,login,logout,signup}}>
        {children}
    </Authcontext.Provider>
);
    };
    export const useAuth =()=>useContext(Authcontext);

