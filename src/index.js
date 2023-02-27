import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import MovieComponent from './components/movie/movie.component.tsx'
import LoginComponent from './components/auth/login.component.tsx'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/movies" element={<MovieComponent />} />
      <Route path="/auth/login" element={<LoginComponent />} />
      <Route exact path="/" element={<App />}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
