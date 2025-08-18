import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
// import MainPage from "../Main/Main";
// import LoginPage from "../Login";
import './Signup.css';
const Signup=()=>{
    const auth=useAuth();
    const navigate=useNavigate();
    const [formdata,setformdata]=React.useState({username:"",password:""});
    const handlechange=(e)=>{
setformdata({...formdata,[e.target.name]:e.target.value});
    };
    const Handlesignup=(e)=>{
        e.preventDefault();
        auth.signup(formdata);
        navigate('../Login');
    };
    return(
        <div className="signup-bg">

        <div className="signup">
            <h1>Sign-Up To say-ur-day</h1>
            <form onSubmit={Handlesignup}>
                <input name='username' type='text' placeholder="Enter Username" onChange={handlechange} value={formdata.username}/>
                <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={handlechange}
          value={formdata.password}
          />
        <button type="submit">Sign Up</button>
            </form>
        </div>
          </div>
    );
};
export default Signup;