import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Context/Auth';
import { CopilotKit } from "@copilotkit/react-core";

// import { useAuth } from './Context/Auth';

// import RootLayout from './Pages/Root';s

const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>  
     <CopilotKit publicApiKey={process.env.REACT_APP_COPILOT_KEY}>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </CopilotKit>
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
