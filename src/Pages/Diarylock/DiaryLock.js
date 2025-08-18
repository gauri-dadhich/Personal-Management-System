import React,{useState,useEffect} from 'react';
import './DiaryLock.css';
export default function DiaryLock({onUnlock}){
    const [error,setError]=useState('');
    const [haspassword,sethaspassword]=useState(false);
    useEffect(()=>{
const storedpassword=localStorage.getItem('diarypassword');
if(storedpassword){
    sethaspassword(true);
}
    },[]);

const setPassword=()=>{
    const pwd=prompt("Set your Password");
    if(pwd){
        localStorage.setItem('diarypassword',pwd);
        sethaspassword(true);
        alert('password set successfully');
        onUnlock();
    }
};
const checkPassword=()=>{
    const entered =prompt("Enter Your Password");
    const stored=localStorage.getItem('diarypassword');
    if(entered===stored){
        onUnlock();
    }else{
        setError('❌ Incorrect Password.Please try again.');
    }
};
const resetPassword=()=>{
    if(window.confirm('are you sure you want to reset password')){
        localStorage.removeItem('diarypassword');
        sethaspassword(false);
        setError('');

    }
};
return (
    <div className='lock-screen'>
        <h2>🔒Secure Diary</h2>
        {!haspassword?(
            <button onClick={setPassword}>Set  Diary Password</button>
        ):(
            <>
            <button onClick={checkPassword}>Enter Password</button>
            <button onClick={resetPassword}>Reset Password</button>
            </>
        )}
        {error && <p style={{color:'red',marginTop:'10px'}}>{error}</p>}
    </div>

);
}