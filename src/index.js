import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HnavBar from './components/HnavBar'
import VnavBar from './components/VnavBar'
import App from './pages/Home'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HnavBar/>
    <VnavBar/>
    <App/>
  </React.StrictMode>
);

reportWebVitals();