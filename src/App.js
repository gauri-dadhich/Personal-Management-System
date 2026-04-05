import './App.css';
import React from 'react';
import Home from './Pages/Home/Home';
import { useAuth } from './Context/Auth';
import { Routes, Route } from 'react-router-dom';
import MainPage from './Pages/Main/Main';
import LoginPage from './Pages/Login';
import Signup from './Pages/Sign/Signip';

import Calendar from './Pages/Calendar/Calendar';
import Fuel from './Pages/Fuel/Fuel';
import Notes from './Pages/Notes/Notes';
import AIAssistant from './components/AIAssistant';
import { AppContextProvider } from './Context/AppContext';

import { CopilotKit } from '@copilotkit/react-core';

function App() {
  const {isloggedin}=useAuth();
  
  console.log('🚀 App component rendered');
  console.log('📍 Current route:', window.location.pathname);
  
  return (
    <CopilotKit publicApiKey="process.env.REACT_APP_COPILOT_KEY">
      <AppContextProvider>
        <div className="app-container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/main' element={isloggedin ? <MainPage /> : <LoginPage />} />
            <Route path='/Signip' element={<Signup />} />
            <Route path='/Main' element={<MainPage />} />
            {/* <Route path='/Diary' element={<Diary/>}/> */}
            <Route path='/Calendar' element={<Calendar/>}/>
            <Route path='/Fuel' element={<Fuel/>}/>
            <Route path='/Notes' element={<Notes/>}/>
          </Routes>
          
          {/* AI Assistant - Available on all pages */}
          <AIAssistant />
        </div>
      </AppContextProvider>
    </CopilotKit>
  );
}

export default App;
