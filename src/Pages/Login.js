import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";
import './Login.css';
import MainPage from "./Main/Main";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useAuth();
    const login = auth.login;
    const navigate = useNavigate();

    const handlelogin = (e) => {
        e.preventDefault();
        login(email, password);
        navigate("/main");
    };

    return (
    
<div className="login-bg">

        <div className="login">
            <h1>Login To Say-ur-Day</h1>
            <form onSubmit={handlelogin}>
                <label>Email Address</label>
                <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label>Password</label> 
                <input
                    type="password"
                    required
                    placeholder="........"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/signip">Sign-Up</Link></p>
        </div>
        
                    </div>
    );
};
export default LoginPage;