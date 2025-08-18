import './App.css';
import React from 'react';
import Home from './Pages/Home/Home';
import { useAuth } from './Context/Auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/Main/Main';
import LoginPage from './Pages/Login';
import Signup from './Pages/Sign/Signip';
import Diary from './Pages/Diary/Diary';
import Calendar from './Pages/Calendar/Calendar';
import Fuel from './Pages/Fuel/Fuel';


function App() {
  
  const {isloggedin}=useAuth();
  return (
    
    
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/main' element={isloggedin ? <MainPage /> : <LoginPage />} />
    <Route path='/Signip' element={<Signup />} />
    <Route path='/Main' element={<MainPage />} />
   <Route path='/Diary' element={<Diary/>}/>
    <Route path='/Calendar' element={<Calendar/>}/>
    <Route path='/Fuel' element={<Fuel/>}/>
   </Routes>
  
  
    
  );
}

export default App;
