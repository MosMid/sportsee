import React from 'react';
import ReactDOM from 'react-dom/client';
import HnavBar from './components/HnavBar'
import VnavBar from './components/VnavBar'
import App from './pages/Home'
import mockData from './mockData/mockData.json'

const [mock, mockUser] = [true, 1]
const backendUser = 18

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HnavBar/>
    <VnavBar/>
    <App mockData={mock? mockData[mockUser] : null} backendUser={backendUser}/>
  </React.StrictMode>
);