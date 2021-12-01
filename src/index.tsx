import React from 'react';
import ReactDOM from 'react-dom';
import 'src/index.css';
// import App from 'src/App';
import AppThemeWrapper from 'src/theme/AppThemeWrapper';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";

// For loading screen
const loader: any = document.querySelector('.loader');
const showLoader = () => loader.classList.remove('loader--hide');
const hideLoader = () => loader.classList.add('loader--hide');


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* { hideLoader, showLoader } for loading screen */}
      <AppThemeWrapper
        hideLoader={hideLoader}
        showLoader={showLoader}
      />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
